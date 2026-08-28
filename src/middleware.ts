import { NextRequest, NextResponse } from "next/server";

import { ACCESS_COOKIE, accessTokenMatches } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (accessTokenMatches(accessToken)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/"],
};
