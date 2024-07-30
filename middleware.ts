import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const apiKeyHeader = req.headers.get("API-Key");
  const path = req.nextUrl.pathname;

  if (
    path.includes("api") &&
    apiKeyHeader !== process.env.NEXT_PUBLIC_API_KEY &&
    !path.includes("auth")
  ) {
    return new NextResponse("API key is missing", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
