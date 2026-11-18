import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAuthSecret, isAdminEmail, secureSessionCookie } from "@/lib/adminAccess";

function privateRedirect(path, origin) {
  const response = NextResponse.redirect(new URL(path, origin));
  response.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
  response.headers.set("CDN-Cache-Control", "no-store");
  return response;
}

export async function proxy(request) {
  const secret = getAuthSecret();
  const token = secret && await getToken({ req: request, secret, secureCookie: secureSessionCookie });
  const isAdmin = isAdminEmail(token?.email);
  const isLogin = request.nextUrl.pathname === "/login";
  const origin = process.env.NEXTAUTH_URL || request.url;

  if (isLogin && isAdmin) {
    return privateRedirect("/admin", origin);
  }
  if (!isLogin && !isAdmin) {
    return privateRedirect("/login", origin);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
