import { NextResponse } from "next/server";

import { ACCESS_COOKIE } from "@/lib/auth";

export function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.delete(ACCESS_COOKIE);
  return response;
}
