"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const errorMessages = {
  AccessDenied: "That account is not allowed to administer this site.",
  CredentialsSignin: "Invalid admin email or password.",
  AdminSignInUnavailable: "Admin sign-in is temporarily unavailable. Please try again shortly.",
  Configuration: "Authentication is not configured yet.",
  OAuthAccountNotLinked:
    "Please sign in with the same provider you used before.",
  default: "Sign in failed. Please try again.",
};

function getErrorMessage(errorCode) {
  if (!errorCode) return "";
  return errorMessages[errorCode] || errorMessages.default;
}

function ProviderIcon({ id }) {
  if (id === "google") {
    return <FaGoogle className="text-white" />;
  }

  if (id === "github") {
    return <FaGithub className="text-white" />;
  }

  return <span className="inline-block h-3 w-3 rounded-full bg-white" />;
}

export default function LoginClient({ initialErrorCode = "", providers }) {
  const [loadingProvider, setLoadingProvider] = useState("");
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const activeError = error ?? getErrorMessage(initialErrorCode);

  async function handleOAuthSignIn(providerId) {
    setLoadingProvider(providerId);
    setError("");
    try {
      await signIn(providerId, { callbackUrl: "/admin" });
    } catch {
      setError(errorMessages.default);
      setLoadingProvider("");
    }
  }

  async function handleCredentialsSubmit(event) {
    event.preventDefault();
    setLoadingProvider("credentials");
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/admin",
        email: credentials.email,
        password: credentials.password,
      });

      if (!result?.ok || result.error) {
        setError(getErrorMessage(result?.error || "default"));
        setLoadingProvider("");
        return;
      }

      const destination = result.url && new URL(result.url, window.location.origin);
      if (destination?.pathname !== "/admin" || destination.origin !== window.location.origin) {
        setError(getErrorMessage(destination?.searchParams.get("error") || "default"));
        setLoadingProvider("");
        return;
      }
      window.location.assign(destination.href);
    } catch {
      setError(errorMessages.default);
      setLoadingProvider("");
    }
  }

  return (
    <section className="page-hero relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(250,204,21,0.14),_transparent_26%),linear-gradient(135deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.92))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-15" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            Admin access
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Admin sign-in
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            Sign in to manage the Manu Maso Digital Solutions website.
          </p>

          <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
            <Link
              href="/"
              className="font-medium text-emerald-300 hover:text-emerald-200"
            >
              Back to home
            </Link>
            <span className="h-4 w-px bg-white/20" />
            <span>After sign in, you will be sent to the dashboard.</span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Sign in
            </h2>

            {activeError ? (
              <div role="alert" className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {activeError}
              </div>
            ) : null}

            <div className="mt-6 space-y-3">
              {providers.length > 0 ? (
                providers.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => handleOAuthSignIn(provider.id)}
                    disabled={Boolean(loadingProvider)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-black/30 ring-1 ring-white/10">
                        <ProviderIcon id={provider.id} />
                      </span>
                      <span>
                        <span className="block text-base">{provider.name}</span>
                        <span className="block text-xs text-slate-400">
                          Sign in with your {provider.name} account
                        </span>
                      </span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {loadingProvider === provider.id ? "Opening..." : "Continue"}
                    </span>
                  </button>
                ))
              ) : null}
            </div>

            {providers.length > 0 && <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>}

            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="admin-email">
                  Admin email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="admin-password">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/60"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={Boolean(loadingProvider)}
                className="flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingProvider === "credentials"
                  ? "Signing in..."
                  : "Sign in with password"}
              </button>

              <div className="mt-3 text-center">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
