import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAuthSecret, isAdminEmail, secureSessionCookie } from "@/lib/adminAccess";

export async function requireAdmin(request) {
  const secret = getAuthSecret();
  const token = secret && await getToken({ req: request, secret, secureCookie: secureSessionCookie });

  if (!token?.email || !isAdminEmail(token.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
