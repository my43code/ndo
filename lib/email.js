import nodemailer from "nodemailer";

export function isResetEmailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
}

export async function sendResetCodeEmail(to, code) {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("Email is not configured. Set SMTP_USER and SMTP_PASS in environment variables.");
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Manu Maso" <${from}>`,
    to,
    subject: "Password Reset Code - Manu Maso Admin",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0f172a;color:#e2e8f0;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#10b981;margin:0;font-size:24px;">Manu Maso</h1>
          <p style="color:#94a3b8;font-size:13px;margin-top:4px;">Admin Password Reset</p>
        </div>
        <p style="font-size:15px;line-height:1.6;">You requested a password reset. Use this code to reset your admin password:</p>
        <div style="background:#1e293b;border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
          <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#10b981;">${code}</span>
        </div>
        <p style="font-size:13px;color:#94a3b8;line-height:1.6;">This code expires in <strong>15 minutes</strong>. If you didn't request this, ignore this email.</p>
        <hr style="border:none;border-top:1px solid #1e293b;margin:24px 0;" />
        <p style="font-size:11px;color:#64748b;text-align:center;">&copy; 2026 Manu Maso. Port Moresby, Papua New Guinea.</p>
      </div>
    `,
  });
}
