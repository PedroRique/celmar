import { environment } from '../../environments/environment';

/**
 * Builds a URL for gallery media.
 * Local folders were moved to Firebase Storage under media/{relativePath}.
 */
export function mediaUrl(relativePath: string): string {
  const clean = relativePath.replace(/^\/+/, '');
  if (environment.useLocalMedia) {
    return `assets/${clean}`;
  }
  const objectPath = `media/${clean}`;
  const encoded = encodeURIComponent(objectPath);
  return `${environment.mediaBaseUrl}${encoded}?alt=media`;
}
