import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Create a response first
    const res = NextResponse.next();

    // Create the Supabase client
    const supabase = createMiddlewareClient(
      { 
        req: request, 
        res 
      },
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return res;
    }

    // Auth pages (login, register)
    if (['/login', '/register'].includes(request.nextUrl.pathname)) {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return res;
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};