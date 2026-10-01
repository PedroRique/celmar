import * as crypto from "crypto";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as http from "http";
import * as https from "https";

const CACHE_MS = 12 * 60 * 60 * 1000;
const PROJECT_ID = "celmarrio";

interface PlaceSource {
  placeId: string;
  label: string;
}

interface GoogleReview {
  nome: string;
  texto: string;
  foto: string;
  nota: number;
  tempo: string;
  autorUrl: string;
  loja: string;
  mapsUrl: string;
  publishTime: string;
}

interface ReviewsPayload {
  rating: number;
  total: number;
  mapsUrl: string;
  reviews: GoogleReview[];
}

interface CachedReviews {
  fetchedAt?: number;
  signature?: string;
  payload?: ReviewsPayload;
}

interface AuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

interface PlaceReview {
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: {text?: string};
  originalText?: {text?: string};
  authorAttribution?: AuthorAttribution;
}

interface PlaceDetails {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
}

const BRANDS: Record<string, PlaceSource[]> = {
  celmar: [
    {
      placeId: "ChIJgfkK5lR8mQAR6k2m1RMa920",
      label: "Engenho de Dentro",
    },
  ],
  predilecta: [
    {
      placeId: "ChIJdQgSvP9_mQARnn5vNu2XN5I",
      label: "Copacabana",
    },
    {
      placeId: "ChIJWftw_N7cmwARmJ--pVla4z8",
      label: "Recreio",
    },
    {
      placeId: "ChIJa7DfGTDYmwARZbHxxz9agfo",
      label: "Jacarepaguá",
    },
    {
      placeId: "ChIJb96b6VR8mQARkGsOd8yt4HA",
      label: "Engenho de Dentro",
    },
  ],
};

/**
 * Public Google reviews for the current brand.
 * Results are cached so each page view does not call Places.
 */
export const googleReviews = functions
    .runWith({timeoutSeconds: 30, memory: "256MB"})
    .https.onRequest(async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");

      if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
      }

      if (req.method !== "GET") {
        res.status(405).json({error: "method_not_allowed"});
        return;
      }

      const brand = queryValue(req.query.brand) || "celmar";
      const places = BRANDS[brand];
      if (!places) {
        res.status(400).json({error: "invalid_brand"});
        return;
      }

      try {
        const payload = await loadReviews(brand, places);
        res.set("Cache-Control", "no-store");
        res.status(200).json(payload);
      } catch (err) {
        console.error("googleReviews", err);
        res.set("Cache-Control", "no-store");
        res.status(503).json({error: "unavailable"});
      }
    });

/**
 * Reads a string query parameter.
 * @param {unknown} value Raw query value.
 * @return {string} First string value, or empty.
 */
function queryValue(value: unknown): string {
  if (typeof value === "string") {
    return value.toLowerCase();
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0].toLowerCase();
  }
  return "";
}

/**
 * Returns cached reviews or fetches them from Places.
 * @param {string} brand Brand key.
 * @param {PlaceSource[]} places Listings to load.
 * @return {Promise<ReviewsPayload>} Public payload.
 */
async function loadReviews(
    brand: string,
    places: PlaceSource[]
): Promise<ReviewsPayload> {
  const ref = admin.database().ref(`googleReviews/${brand}`);
  const snap = await ref.once("value");
  const cached = snap.val() as CachedReviews | null;
  if (
    cached &&
    cached.payload &&
    cached.fetchedAt &&
    cached.signature &&
    cached.payload.reviews &&
    cached.payload.reviews.length &&
    Date.now() - cached.fetchedAt < CACHE_MS &&
    cached.signature === cacheSignature(cached.payload, cached.fetchedAt)
  ) {
    return cached.payload;
  }

  const headers = await getAuthHeaders();
  const settled = await Promise.all(places.map(async (place) => {
    try {
      const details = await fetchPlace(place.placeId, headers);
      return {place, details};
    } catch (err) {
      console.error(place.label, err);
      return null;
    }
  }));

  const loaded = settled.filter((item): item is {
    place: PlaceSource;
    details: PlaceDetails;
  } => item !== null);

  if (!loaded.length) {
    throw new Error("no place details");
  }

  let weighted = 0;
  let weight = 0;
  const reviews: GoogleReview[] = [];

  loaded.forEach(({place, details}) => {
    const count = details.userRatingCount || 0;
    const rating = details.rating || 0;
    if (count > 0 && rating > 0) {
      weighted += rating * count;
      weight += count;
    }
    const placeUrl = details.googleMapsUri || "";
    (details.reviews || []).forEach((review) => {
      reviews.push(toReview(review, place.label, placeUrl));
    });
  });

  reviews.sort((a, b) => b.publishTime.localeCompare(a.publishTime));

  const payload: ReviewsPayload = {
    rating: weight ? Math.round((weighted / weight) * 10) / 10 : 0,
    total: weight,
    mapsUrl: loaded.length === 1 ?
      (loaded[0].details.googleMapsUri || "") :
      "",
    reviews,
  };
  const fetchedAt = Date.now();
  await ref.set({
    fetchedAt,
    signature: cacheSignature(payload, fetchedAt),
    payload,
  });
  return payload;
}

/**
 * Signs cached reviews so a public database write is ignored.
 * @param {ReviewsPayload} payload Review payload.
 * @param {number} fetchedAt Cache timestamp.
 * @return {string} Hex signature.
 */
function cacheSignature(
    payload: ReviewsPayload,
    fetchedAt: number
): string {
  const key = process.env.GOOGLE_REVIEWS_CACHE_KEY ||
    "celmar-google-reviews";
  const body = JSON.stringify({
    fetchedAt,
    rating: payload.rating,
    total: payload.total,
    mapsUrl: payload.mapsUrl,
    reviews: payload.reviews.map((review) => ({
      nome: review.nome,
      texto: review.texto,
      foto: review.foto || "",
      nota: review.nota,
      tempo: review.tempo || "",
      autorUrl: review.autorUrl || "",
      loja: review.loja,
      mapsUrl: review.mapsUrl || "",
      publishTime: review.publishTime || "",
    })),
  });
  return crypto.createHmac("sha256", key).update(body).digest("hex");
}

/**
 * Maps a Places review into the site payload.
 * @param {PlaceReview} review Raw review.
 * @param {string} loja Store label.
 * @param {string} mapsUrl Google Maps URL for the store.
 * @return {GoogleReview} Review card.
 */
function toReview(
    review: PlaceReview,
    loja: string,
    mapsUrl: string
): GoogleReview {
  const author = review.authorAttribution || {};
  const texto = (review.text && review.text.text) ||
    (review.originalText && review.originalText.text) ||
    "";
  return {
    nome: author.displayName || "Cliente Google",
    texto,
    foto: author.photoUri || "",
    nota: review.rating || 0,
    tempo: review.relativePublishTimeDescription || "",
    autorUrl: author.uri || "",
    loja,
    mapsUrl,
    publishTime: review.publishTime || "",
  };
}

/**
 * Builds Places API auth headers from an API key or the function identity.
 * @return {Promise<Record<string, string>>} Request headers.
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (apiKey) {
    return {"X-Goog-Api-Key": apiKey};
  }
  const token = await getMetadataToken();
  return {
    "Authorization": `Bearer ${token}`,
    "X-Goog-User-Project": PROJECT_ID,
  };
}

/**
 * Reads an access token from the Google metadata server.
 * @return {Promise<string>} Bearer token.
 */
function getMetadataToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: "metadata.google.internal",
      path: "/computeMetadata/v1/instance/service-accounts/default/token",
      headers: {"Metadata-Flavor": "Google"},
      timeout: 2000,
    }, (res) => {
      let raw = "";
      res.on("data", (chunk) => {
        raw += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(raw) as {access_token?: string};
          if (!parsed.access_token) {
            reject(new Error("missing access token"));
            return;
          }
          resolve(parsed.access_token);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("metadata timeout"));
    });
    req.end();
  });
}

/**
 * Loads one place, including reviews, from the Places API.
 * @param {string} placeId Google place id.
 * @param {Record<string, string>} authHeaders Auth headers.
 * @return {Promise<PlaceDetails>} Place details.
 */
function fetchPlace(
    placeId: string,
    authHeaders: Record<string, string>
): Promise<PlaceDetails> {
  const path = `/v1/places/${encodeURIComponent(placeId)}` +
    "?languageCode=pt-BR";
  return new Promise((resolve, reject) => {
    const req = https.request({
      host: "places.googleapis.com",
      path,
      method: "GET",
      headers: {
        ...authHeaders,
        "X-Goog-FieldMask":
          "rating,userRatingCount,googleMapsUri,reviews",
      },
    }, (res) => {
      let raw = "";
      res.on("data", (chunk) => {
        raw += chunk;
      });
      res.on("end", () => {
        if ((res.statusCode || 500) !== 200) {
          reject(new Error(
              `Places ${placeId} status ${res.statusCode}: ${raw.slice(0, 400)}`
          ));
          return;
        }
        try {
          resolve(JSON.parse(raw) as PlaceDetails);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}
