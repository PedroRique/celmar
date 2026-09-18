import { environment } from '../../environments/environment';

/**
 * Builds a URL for gallery media.
 * - Dev (useLocalMedia): local assets/{relativePath}
 * - Prod: public Firebase Storage object under media/{relativePath}
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

/** CSS background-image helper */
export function mediaBgUrl(relativePath: string): string {
  return `url(${mediaUrl(relativePath)})`;
}
