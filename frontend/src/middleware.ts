import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getSession } from './cookie-handler';
 
export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (user || request.nextUrl.pathname == '/') return NextResponse.next();
  else return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!auth/login|_next/static|_next/image|icon.ico|sitemap.xml|robots.txt).*)',
  ],
}