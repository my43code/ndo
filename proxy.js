import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAuthSecret, isAdminEmail, secureSessionCookie } from "@/lib/adminAccess";

export async function proxy(request) {
  const secret = getAuthSecret();
  const token = secret && await getToken({ req: request, secret, secureCookie: secureSessionCookie });
  const isAdmin = isAdminEmail(token?.email);
  const isLogin = request.nextUrl.pathname === "/login";
  const origin = process.env.NEXTAUTH_URL || request.url;

  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin", origin));
  }
  if (!isLogin && !isAdmin) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
