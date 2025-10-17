import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  // If user is logged in and tries to access login/register → redirect to home
  if (refresh_token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and tries to access protected pages → redirect to login
  if (!refresh_token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Otherwise, allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard"],
};
