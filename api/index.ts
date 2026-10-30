import type { Request, Response } from 'express';
import { app } from '../backend/src/app';

export default function handler(req: Request, res: Response) {
  if (req.url) {
    try {
      const urlObj = new URL(req.url, 'http://localhost');
      const routeParam = urlObj.searchParams.get('__route');
      if (routeParam) {
        urlObj.searchParams.delete('__route');
        const remainingSearch = urlObj.searchParams.toString();
        req.url = '/api/' + routeParam.replace(/^\/+/, '') + (remainingSearch ? '?' + remainingSearch : '');
      } else {
        const originalUrl =
          (req.headers['x-forwarded-url'] as string) ||
          (req.headers['x-matched-path'] as string);

        if (originalUrl && originalUrl.startsWith('/api') && req.url === '/api') {
          req.url = originalUrl;
        }
      }
    } catch {
      // Keep req.url as-is
    }
  }

  return app(req, res);
}
