import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const auth = NextAuth(authConfig).auth;

export default auth((req) => {
  const { nextUrl } = req;

  const apiKeyHeader = req.headers.get("API-Key");
  const path = req.nextUrl.pathname;

  if (
    path.includes("api") &&
    apiKeyHeader !== process.env.NEXT_PUBLIC_API_KEY &&
    !path.includes("auth")
  ) {
    return new NextResponse("API key is missing", { status: 401 });
  }

  if ((path.includes("login") || path.includes("register")) && req.auth?.user) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
