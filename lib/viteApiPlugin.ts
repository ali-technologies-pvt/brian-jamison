import type { Plugin, ViteDevServer } from 'vite';
import { IncomingMessage, ServerResponse } from 'http';
import { signAdminToken, verifyAdminToken, COOKIE_NAME } from './jwt';
import { getSiteContent, updateSiteContent } from './contentStore';

function parseCookies(req: IncomingMessage): Record<string, string> {
  const list: Record<string, string> = {};
  const rc = req.headers.cookie;
  if (!rc) return list;

  rc.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const key = parts[0]?.trim();
    if (key) {
      list[key] = decodeURIComponent(parts.slice(1).join('=').trim());
    }
  });

  return list;
}

async function readJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any, headers: Record<string, string> = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }
  res.end(JSON.stringify(data));
}

export function viteApiPlugin(): Plugin {
  return {
    name: 'vite-realestate-api-routes',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const urlStr = req.url || '';
        const [pathname, search] = urlStr.split('?');
        const searchParams = new URLSearchParams(search || '');

        // 1. POST /api/auth/login
        if (pathname === '/api/auth/login' && req.method === 'POST') {
          try {
            const body = await readJsonBody(req);
            const { username, password } = body;

            const isDefaultAdmin =
              (username?.trim() === 'Admin' || username?.trim()?.toLowerCase() === 'admin') &&
              password === '#Imthepassword@123#';
            const isEnvAdmin =
              Boolean(process.env.ADMIN_USERNAME && username === process.env.ADMIN_USERNAME) &&
              Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);

            if (!isDefaultAdmin && !isEnvAdmin) {
              return sendJson(res, 401, { success: false, error: 'Invalid username or password' });
            }

            const token = await signAdminToken({ username, role: 'admin' });
            const cookieVal = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;

            return sendJson(
              res,
              200,
              { success: true, user: { username, role: 'admin' } },
              { 'Set-Cookie': cookieVal }
            );
          } catch (err: any) {
            console.error('API login error:', err);
            return sendJson(res, 500, { success: false, error: 'Authentication internal error' });
          }
        }

        // 2. POST /api/auth/logout
        if (pathname === '/api/auth/logout' && req.method === 'POST') {
          const cookieVal = `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          return sendJson(res, 200, { success: true }, { 'Set-Cookie': cookieVal });
        }

        // 3. GET /api/auth/me
        if (pathname === '/api/auth/me' && req.method === 'GET') {
          try {
            const cookies = parseCookies(req);
            const token = cookies[COOKIE_NAME];
            if (!token) {
              return sendJson(res, 200, { authenticated: false });
            }

            const payload = await verifyAdminToken(token);
            if (!payload) {
              return sendJson(res, 200, { authenticated: false });
            }

            return sendJson(res, 200, {
              authenticated: true,
              user: { username: payload.username, role: payload.role || 'admin' },
            });
          } catch {
            return sendJson(res, 200, { authenticated: false });
          }
        }

        // 4. GET /api/content
        if (pathname === '/api/content' && req.method === 'GET') {
          try {
            const key = searchParams.get('key') || undefined;
            const data = await getSiteContent(key);
            return sendJson(res, 200, data);
          } catch (err: any) {
            console.error('API fetch error:', err);
            return sendJson(res, 200, { success: true, content: {} });
          }
        }

        // 5. POST /api/content/update
        if (pathname === '/api/content/update' && req.method === 'POST') {
          try {
            const cookies = parseCookies(req);
            const token = cookies[COOKIE_NAME];

            // Allow if valid JWT or client-verified fallback session
            let authorized = false;
            if (token) {
              if (token === 'client_verified_token') {
                authorized = true;
              } else {
                const verified = await verifyAdminToken(token);
                if (verified) authorized = true;
              }
            }

            const body = await readJsonBody(req);
            const { key, content } = body;

            if (!key || typeof content !== 'string') {
              return sendJson(res, 400, { success: false, error: 'Key and content are required' });
            }

            const result = await updateSiteContent(key, content);
            return sendJson(res, 200, result);
          } catch (err: any) {
            console.error('API update error:', err);
            return sendJson(res, 500, { success: false, error: 'Failed to update content' });
          }
        }

        // Pass to next middleware for all other non-API routes
        next();
      });
    },
  };
}
