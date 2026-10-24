const contentOrigin = (import.meta.env.VITE_SERVER_CONTENT_URL || '').replace(/\/+$/, '');

export function serverContentUrl(path: string): string {
  return `${contentOrigin}/${path.replace(/^\/+/, '')}`;
}
