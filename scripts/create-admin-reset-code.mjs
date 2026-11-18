import { randomInt } from "node:crypto";
import mongoose from "mongoose";
import { getAdminEmails, getAuthSecret, normalizeEmail } from "../lib/adminAccess.js";
import { reservePasswordReset } from "../lib/adminPasswordStore.js";
import { digestResetCode, resetLifetimeMs } from "../lib/passwordReset.js";

const configuredEmails = getAdminEmails();
const email = normalizeEmail(process.argv[2] || (configuredEmails.length === 1 ? configuredEmails[0] : ""));

if (!configuredEmails.includes(email) || !getAuthSecret() || !process.env.MONGODB_URI) {
  console.error("Load the site's MongoDB and auth settings and select an explicitly configured admin email.");
  process.exit(1);
}

try {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const now = Date.now();
  const issued = await reservePasswordReset(
    email,
    digestResetCode(email, code),
    new Date(now),
    new Date(now + resetLifetimeMs),
  );
  if (issued) {
    process.stdout.write(`Reset code (expires in 15 minutes): ${code}\n`);
  } else {
    console.error("A code was issued less than a minute ago. Wait a minute and retry.");
    process.exitCode = 1;
  }
} catch (error) {
  console.error("Could not create a reset code:", error.name);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
