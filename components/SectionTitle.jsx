export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  gradient = false,
}) {
  const isLeft = align === "left";

  return (
    <div
      className={`mb-14 max-w-4xl ${isLeft ? "text-left" : "mx-auto text-center"}`}
    >
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
        {gradient ? (
          <>
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">
              {title.split(" ").slice(-1)[0]}
            </span>
          </>
        ) : (
          title
        )}
      </h2>

      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500/0 ${
          !isLeft ? "mx-auto" : ""
        }`}
      />

      {subtitle ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg ${
            !isLeft ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
