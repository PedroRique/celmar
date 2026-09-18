/**
 * Uploads gallery images/videos from src/assets to Firebase Storage under media/.
 *
 * Auth options (first match wins):
 * 1. GOOGLE_APPLICATION_CREDENTIALS → service account JSON path
 * 2. FIREBASE_SERVICE_ACCOUNT → inline JSON string
 * 3. Application Default Credentials (gcloud auth application-default login)
 *
 * Usage:
 *   node scripts/upload-media-to-firebase.js
 *   node scripts/upload-media-to-firebase.js --dry-run
 */

const fs = require('fs');
const path = require('path');

const BUCKET = 'celmarrio.appspot.com';
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'src', 'assets');

const UPLOAD_ENTRIES = [
  { local: path.join(ASSETS, 'images', 'cases'), remote: 'media/images/cases' },
  { local: path.join(ASSETS, 'images', 'decorados'), remote: 'media/images/decorados' },
  { local: path.join(ASSETS, 'images', 'eventos'), remote: 'media/images/eventos' },
  { local: path.join(ASSETS, 'images', 'galeria'), remote: 'media/images/galeria' },
  { local: path.join(ASSETS, 'images', 'showrooms'), remote: 'media/images/showrooms' },
  {
    local: path.join(ASSETS, 'images', 'celmar-70-anos.mp4'),
    remote: 'media/images/celmar-70-anos.mp4',
  },
  { local: path.join(ASSETS, 'videos'), remote: 'media/videos' },
];

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const dryRun = process.argv.includes('--dry-run');

function walkFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    out.push(dir);
    return out;
  }
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const s = fs.statSync(full);
    if (s.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

function contentTypeFor(filePath) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function collectJobs() {
  const jobs = [];
  for (const entry of UPLOAD_ENTRIES) {
    if (!fs.existsSync(entry.local)) {
      console.warn(`Skip missing: ${entry.local}`);
      continue;
    }
    const files = walkFiles(entry.local);
    for (const file of files) {
      const rel = path.relative(entry.local, file).split(path.sep).join('/');
      const remotePath = fs.statSync(entry.local).isFile()
        ? entry.remote
        : `${entry.remote}/${rel}`;
      jobs.push({ file, remotePath });
    }
  }
  return jobs;
}

async function main() {
  const jobs = collectJobs();
  console.log(`Found ${jobs.length} files to upload to gs://${BUCKET}/media/...`);
  if (dryRun) {
    jobs.slice(0, 20).forEach((j) => console.log(`  ${j.remotePath}`));
    if (jobs.length > 20) console.log(`  ... and ${jobs.length - 20} more`);
    return;
  }

  let initializeApp;
  let getApps;
  let applicationDefault;
  let cert;
  let getStorage;
  try {
    ({ initializeApp, getApps, applicationDefault, cert } = require('firebase-admin/app'));
    ({ getStorage } = require('firebase-admin/storage'));
  } catch {
    console.error('Install firebase-admin first: npm i -D firebase-admin');
    process.exit(1);
  }

  if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
        storageBucket: BUCKET,
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      initializeApp({
        credential: applicationDefault(),
        storageBucket: BUCKET,
      });
    } else {
      console.error(
        'Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path, then retry.'
      );
      process.exit(1);
    }
  }

  const bucket = getStorage().bucket(BUCKET);
  let ok = 0;
  let fail = 0;

  for (const job of jobs) {
    try {
      await bucket.upload(job.file, {
        destination: job.remotePath,
        metadata: {
          contentType: contentTypeFor(job.file),
          cacheControl: 'public,max-age=31536000',
        },
      });
      ok += 1;
      if (ok % 50 === 0) console.log(`Uploaded ${ok}/${jobs.length}...`);
    } catch (err) {
      fail += 1;
      console.error(`FAIL ${job.remotePath}:`, err.message);
    }
  }

  console.log(`Done. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
