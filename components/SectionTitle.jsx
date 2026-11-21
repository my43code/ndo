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
        <p className="page-kicker">
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
