import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ACCESS_COOKIE = "thomson_reuters_gtm_access";

const TOKEN_SCOPE = "thomson-reuters-gtm:v1";

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
} as const;

function sitePassword() {
  const value = process.env.SITE_PASSWORD;
  if (!value) {
    throw new Error("SITE_PASSWORD is required.");
  }
  return value;
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function matches(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

export function passwordMatches(input: string) {
  return matches(input, sitePassword());
}

export function createAccessToken() {
  return createHmac("sha256", sitePassword()).update(TOKEN_SCOPE).digest("hex");
}

export function accessTokenMatches(input: string | undefined) {
  return input ? matches(input, createAccessToken()) : false;
}

export function safeNextPath(input: string | undefined) {
  if (!input?.startsWith("/") || input.startsWith("//")) {
    return "/";
  }

  try {
    const url = new URL(input, "https://local.invalid");
    return url.origin === "https://local.invalid"
      ? `${url.pathname}${url.search}${url.hash}`
      : "/";
  } catch {
    return "/";
  }
}

export type LoginPayload = {
  password: string;
  next: string;
};

export function parseLoginPayload(input: unknown): LoginPayload | null {
  if (!input || typeof input !== "object" || !("password" in input)) {
    return null;
  }

  const password = input.password;
  const next = "next" in input ? input.next : "/";

  if (typeof password !== "string" || typeof next !== "string") {
    return null;
  }

  return { password, next: safeNextPath(next) };
}
