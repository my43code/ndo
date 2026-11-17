"use client";

export default function LoadingState({
  eyebrow = "Loading",
  title = "Fetching the latest content",
  subtitle = "Please wait while we load the newest data.",
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
          {eyebrow}
        </p>
        <div className="text-4xl font-black tracking-tight text-white md:text-6xl">
          {title}
        </div>
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded-full bg-white/5" />
        <div className="h-5 w-5/6 animate-pulse rounded-full bg-white/5" />
        <p className="max-w-2xl text-sm leading-7 text-slate-500">{subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]"
          >
            <div className="h-56 animate-pulse bg-white/5" />
            <div className="space-y-4 p-6">
              <div className="h-4 w-24 animate-pulse rounded-full bg-white/5" />
              <div className="h-7 w-5/6 animate-pulse rounded-full bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.03]" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
