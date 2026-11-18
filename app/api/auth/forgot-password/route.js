import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import { reservePasswordReset, clearPasswordReset } from "@/lib/adminPasswordStore";
import { getAuthSecret, isAdminEmail, normalizeEmail } from "@/lib/adminAccess";
import { digestResetCode, resetLifetimeMs } from "@/lib/passwordReset";
import { isResetEmailConfigured, sendResetCodeEmail } from "@/lib/email";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!isResetEmailConfigured() || !getAuthSecret()) {
    return NextResponse.json({ error: "Email delivery is unavailable. If you have a reset code from the site operator, select Use a reset code." }, { status: 503 });
  }

  const response = NextResponse.json({
    message: "If this is an admin account, a reset code will arrive by email.",
  });
  if (!isAdminEmail(email)) return response;

  const code = String(randomInt(0, 1000000)).padStart(6, "0");
  const resetDigest = digestResetCode(email, code);
  const now = Date.now();

  try {
    const requestedAt = new Date(now).toISOString();
    const expiresAt = new Date(now + resetLifetimeMs).toISOString();
    if (!await reservePasswordReset(email, resetDigest, requestedAt, expiresAt)) return response;

    try {
      await sendResetCodeEmail(email, code);
    } catch (error) {
      await clearPasswordReset(email, resetDigest, requestedAt);
      throw error;
    }

    return response;
  } catch (error) {
    console.error("Reset code delivery failed:", error.code || error.name);
    return NextResponse.json({ error: "Password reset is temporarily unavailable. Try again in a minute." }, { status: 503 });
  }
}
