import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Always bypass the login page and auth API endpoints
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/login/') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth;

  // Intercept all protected /admin routes
  if (pathname.startsWith('/admin') && !isLoggedIn) {
    // Domain-agnostic relative redirection preserves Vercel preview URLs and custom domains
    const loginUrl = new URL('/admin/login', req.url);
    if (pathname !== '/admin') {
      loginUrl.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
