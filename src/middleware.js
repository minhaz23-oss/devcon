import { NextResponse } from 'next/server';
import { getSession } from './utils/getSession';




export async function middleware(request) {
  const path = request.nextUrl.pathname; 
  const session = await getSession(request);
  const isPublic = path === '/login' || path === '/signup'
  if(session && isPublic ){
    return NextResponse.redirect(new URL('/', request.url))
  }
  if(!session && !isPublic){
    return NextResponse.redirect(new URL('/login', request.url))
  }


}
 

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/onboarding',
    '/profile'
  ],
}