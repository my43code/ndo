"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "", recoveryKey: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (form.newPassword.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          recoveryKey: form.recoveryKey,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Reset failed." });
      } else {
        setStatus({ type: "success", message: data.message });
        setForm({ email: "", recoveryKey: "", newPassword: "", confirmPassword: "" });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.2),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(250,204,21,0.1),_transparent_26%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
              <KeyRound className="text-emerald-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-sm text-slate-400">
                Enter your admin email and recovery key
              </p>
            </div>
          </div>

          {status.message && (
            <div
              className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-400/30 bg-rose-500/10 text-rose-200"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Admin Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="admin@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Recovery Key
              </span>
              <input
                type="password"
                name="recoveryKey"
                value={form.recoveryKey}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter your recovery key"
                required
              />
              <p className="mt-1.5 text-xs text-slate-500">
                This is the ADMIN_RECOVERY_KEY set in your environment variables.
              </p>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                New Password
              </span>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Confirm Password
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Re-enter new password"
                minLength={6}
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {status.type === "success" && (
            <Link
              href="/login"
              className="mt-6 block text-center text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Go to Login Page
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
