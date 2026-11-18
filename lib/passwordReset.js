import { createHmac } from "node:crypto";
import { getAuthSecret } from "@/lib/adminAccess";

export const resetLifetimeMs = 15 * 60 * 1000;

export function digestResetCode(email, code) {
  return createHmac("sha256", getAuthSecret()).update(JSON.stringify([email, code])).digest("hex");
}
