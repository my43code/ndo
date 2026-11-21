"use client";

import { useState } from "react";
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function useExistingCode(event) {
    if (!event.currentTarget.form?.reportValidity()) return;
    setStatus({ type: "", message: "" });
    setStep(2);
  }

  const handleSendCode = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to send code." });
      } else {
        setStatus({ type: "success", message: data.message });
        setStep(2);
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (newPassword.length < 12 || new TextEncoder().encode(newPassword).length > 72) {
      setStatus({ type: "error", message: "Use at least 12 characters and at most 72 UTF-8 bytes." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Reset failed." });
      } else {
        setStatus({ type: "success", message: data.message });
        setStep(3);
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-hero relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.2),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(250,204,21,0.1),_transparent_26%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <a
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={16} />
          Back to Login
        </a>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
              <KeyRound className="text-emerald-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-sm text-slate-400">
                {step === 1 && "Request a code by email or enter one you already have."}
                {step === 2 && "Enter the code and your new password"}
                {step === 3 && "Password reset complete"}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-emerald-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Status */}
          {status.message && (
            <div
              role={status.type === "error" ? "alert" : "status"}
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

          {/* Step 1: Enter email */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Mail size={14} />
                  Admin Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter your admin email"
                  autoComplete="email"
                  required
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={useExistingCode}
                className="w-full rounded-xl px-4 py-2 text-sm font-medium text-emerald-300 hover:text-white disabled:opacity-50"
              >
                Use a reset code
              </button>
            </form>
          )}

          {/* Step 2: Enter code + new password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <ShieldCheck size={14} />
                  Reset Code
                </span>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xl font-bold tracking-[0.5em] text-white outline-none transition placeholder:text-slate-600 placeholder:tracking-normal placeholder:text-sm placeholder:font-normal focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  required
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Enter the six-digit code issued for {email}.
                </p>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  New Password
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="At least 12 characters"
                  minLength={12}
                  autoComplete="new-password"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm Password
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Re-enter new password"
                  minLength={12}
                  autoComplete="new-password"
                  required
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => { setStep(1); setStatus({ type: "", message: "" }); }}
                className="w-full text-center text-sm text-slate-400 transition hover:text-white"
              >
                Change email or request another code
              </button>
            </form>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">Password Reset!</h2>
              <p className="mt-2 text-sm text-slate-400">
                Your admin password has been updated. You can now sign in.
              </p>
              <a
                href="/login"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
