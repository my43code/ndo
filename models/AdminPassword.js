import mongoose from "mongoose";

const AdminPasswordSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: String,
    resetDigest: String,
    resetExpiresAt: Date,
    resetRequestedAt: Date,
    resetAttempts: Number,
  },
  { timestamps: true }
);

export default mongoose.models.AdminPassword ||
  mongoose.model("AdminPassword", AdminPasswordSchema);
