import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import AdminPassword from "@/models/AdminPassword";
import ResetToken from "@/models/ResetToken";
import { isAdminEmail } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, code, newPassword } = await req.json();
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail || !code || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "This email is not an authorized admin account." },
        { status: 403 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const token = await ResetToken.findOne({
      email: normalizedEmail,
      code: code.trim(),
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return NextResponse.json(
        { error: "Invalid or expired reset code. Request a new one." },
        { status: 403 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await AdminPassword.findOneAndUpdate(
      { email: normalizedEmail },
      { email: normalizedEmail, passwordHash },
      { upsert: true, new: true }
    );

    token.used = true;
    await token.save();

    return NextResponse.json({
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
