export function normalizeEmail(value) {
  return (value || "").toString().trim().toLowerCase();
}

function splitEmailList(value) {
  return (value || "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean);
}

export function getAuthSecret() {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.ADMIN_SESSION_SECRET
  );
}

export function getAdminEmails() {
  return Array.from(
    new Set([
      ...splitEmailList(process.env.ADMIN_EMAILS),
      normalizeEmail(process.env.ADMIN_EMAIL),
    ].filter(Boolean))
  );
}

export function isAdminEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return false;

  if (getAdminEmails().includes(normalizedEmail)) {
    return true;
  }

  const allowedDomain = normalizeEmail(process.env.ADMIN_DOMAIN);
  if (allowedDomain && normalizedEmail.endsWith(`@${allowedDomain}`)) {
    return true;
  }

  return false;
}

export const secureSessionCookie = process.env.NEXTAUTH_URL
  ? new URL(process.env.NEXTAUTH_URL).protocol === "https:"
  : process.env.NODE_ENV === "production";
