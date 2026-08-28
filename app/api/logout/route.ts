import { NextResponse } from "next/server";

import { ACCESS_COOKIE } from "@/lib/auth";

export function POST() {
  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: "/login" },
  });
  response.cookies.delete(ACCESS_COOKIE);
  return response;
}
