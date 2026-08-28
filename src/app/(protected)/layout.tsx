import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ACCESS_COOKIE, accessTokenMatches } from "@/lib/auth";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  if (!accessTokenMatches(accessToken)) {
    redirect("/login?next=%2F");
  }

  return children;
}
