// middleware.ts
import { getSession } from "next-auth/react";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();

  console.log( pathname, pathname === "/" );
  if ( isPathProtected ) {
    const session = await getSession();

    console.log( session );

    if ( session ) {
      const url = new URL( "/studies", req.url );
      url.searchParams.set( "callbackUrl", pathname );
      
      return NextResponse.redirect( url );
    }
  }
  return res;
}