import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import ResetToken from "@/models/ResetToken";
import { isAdminEmail } from "@/lib/auth";
import { sendResetCodeEmail } from "@/lib/email";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!isAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        { message: "If that email is an admin account, a reset code has been sent." },
        { status: 200 }
      );
    }

    await connectMongoDB();

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await ResetToken.deleteMany({ email: normalizedEmail, used: false });

    await ResetToken.create({ email: normalizedEmail, code, expiresAt });

    try {
      await sendResetCodeEmail(normalizedEmail, code);
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Check SMTP settings." },
        { status: 503 }
      );
    }

    return NextResponse.json({
      message: "If that email is an admin account, a reset code has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
