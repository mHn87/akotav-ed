import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login page and API routes
  if (pathname === '/panel/login' || pathname.startsWith('/api/auth/login')) {
    return NextResponse.next()
  }

  // Protect all /panel routes except login
  if (pathname.startsWith('/panel')) {
    const session = await verifySession()

    if (!session) {
      return NextResponse.redirect(new URL('/panel/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/panel/:path*'],
}
