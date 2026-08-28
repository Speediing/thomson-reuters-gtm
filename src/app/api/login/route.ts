import { NextResponse } from "next/server";

import {
  ACCESS_COOKIE,
  accessCookieOptions,
  createAccessToken,
  parseLoginPayload,
  passwordMatches,
} from "@/lib/auth";

export async function POST(request: Request) {
  const input: unknown = await request.json().catch(() => null);
  const payload = parseLoginPayload(input);

  if (!payload) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!passwordMatches(payload.password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, next: payload.next });
  response.cookies.set(ACCESS_COOKIE, createAccessToken(), accessCookieOptions);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
