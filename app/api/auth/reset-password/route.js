import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { countPasswordResetAttempt, clearPasswordReset } from "@/lib/adminPasswordStore";
import { getAuthSecret, isAdminEmail, normalizeEmail } from "@/lib/adminAccess";
import { digestResetCode } from "@/lib/passwordReset";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const newPassword = body?.newPassword;

  if (!email || email.length > 254 || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter your email and six-digit reset code." }, { status: 400 });
  }

  if (typeof newPassword !== "string" || newPassword.length < 12 || Buffer.byteLength(newPassword, "utf8") > 72) {
    return NextResponse.json({ error: "Use at least 12 characters and at most 72 UTF-8 bytes." }, { status: 400 });
  }

  const invalidCode = () => NextResponse.json(
    { error: "That reset code is invalid, expired or out of attempts. Request a new code if needed." },
    { status: 403 }
  );
  if (!isAdminEmail(email) || !getAuthSecret()) return invalidCode();

  try {
    const pending = await countPasswordResetAttempt(email);

    const resetDigest = digestResetCode(email, code);
    if (pending?.resetDigest?.length !== resetDigest.length ||
        !timingSafeEqual(Buffer.from(pending.resetDigest, "ascii"), Buffer.from(resetDigest, "ascii"))) {
      return invalidCode();
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    if (!await clearPasswordReset(email, resetDigest, pending.resetRequestedAt, passwordHash)) {
      return invalidCode();
    }

    return NextResponse.json({ message: "Password reset successfully. You can now sign in." });
  } catch (error) {
    console.error("Password reset failed:", error.code || error.name);
    return NextResponse.json({ error: "Password reset is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
