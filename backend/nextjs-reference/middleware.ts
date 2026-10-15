import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminToken, COOKIE_NAME } from './lib/jwt';

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Always bypass login page and auth API endpoints
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/login/') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Check admin_token cookie using jose
  const token = req.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    const payload = await verifyAdminToken(token);
    if (payload) {
      isAuthenticated = true;
    }
  }

  // Intercept protected /admin routes
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.url);
    if (pathname !== '/admin') {
      loginUrl.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
