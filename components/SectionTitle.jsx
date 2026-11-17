export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
}) {
  const isLeftAligned = align === "left";

  return (
    <div
      className={`mb-12 max-w-4xl ${isLeftAligned ? "text-left" : "mx-auto text-center"}`}
    >
      {eyebrow ? (
        <p className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg ${
            !isLeftAligned ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
