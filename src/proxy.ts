import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/dashboard',
    '/admin/users/:path*',
    '/admin/users',
  ],
};

export default function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session')?.value;

  if (!sessionCookie) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token structure verification: header.payload.signature
  const parts = sessionCookie.split('.');
  if (parts.length !== 3) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const decodedStr = atob(base64);
    const payload = JSON.parse(decodedStr);
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
