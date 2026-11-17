import mongoose from "mongoose";

const AdminPasswordSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AdminPassword ||
  mongoose.model("AdminPassword", AdminPasswordSchema);
