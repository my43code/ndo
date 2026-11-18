import { connectMongoDB } from "@/lib/mongodb";
import AdminPassword from "@/models/AdminPassword";

const resendDelayMs = 60000;
const maxAttempts = 5;
const resetFields = { resetDigest: "", resetExpiresAt: "", resetAttempts: "" };

export async function readAdminPassword(email) {
  await connectMongoDB();
  const row = await AdminPassword.findOne({ email }).select("passwordHash").lean();
  return row?.passwordHash ?? null;
}

export async function reservePasswordReset(email, digest, requestedAt, expiresAt) {
  await connectMongoDB();
  await AdminPassword.init();
  try {
    await AdminPassword.updateOne({
      email,
      $or: [
        { resetRequestedAt: { $exists: false } },
        { resetRequestedAt: { $lte: new Date(Date.parse(requestedAt) - resendDelayMs) } },
      ],
    }, {
      $set: {
        resetDigest: digest,
        resetRequestedAt: requestedAt,
        resetExpiresAt: expiresAt,
        resetAttempts: 0,
      },
    }, { upsert: true });
    return true;
  } catch (error) {
    if (error.code === 11000) return false;
    throw error;
  }
}

export async function countPasswordResetAttempt(email) {
  await connectMongoDB();
  return AdminPassword.findOneAndUpdate({
    email,
    resetExpiresAt: { $gt: new Date() },
    resetAttempts: { $lt: maxAttempts },
  }, { $inc: { resetAttempts: 1 } }, {
    projection: { resetDigest: 1, resetRequestedAt: 1 },
  }).lean();
}

export async function clearPasswordReset(email, digest, requestedAt, passwordHash) {
  await connectMongoDB();
  const filter = { email, resetDigest: digest, resetRequestedAt: requestedAt };
  const update = { $unset: resetFields };
  if (passwordHash) {
    filter.resetExpiresAt = { $gt: new Date() };
    update.$set = { passwordHash };
  }
  return (await AdminPassword.updateOne(filter, update)).modifiedCount === 1;
}
