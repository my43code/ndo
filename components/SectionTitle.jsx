"use client";

import AnimatedText from "./AnimatedText";

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  gradient = false,
}) {
  const isLeft = align === "left";

  const lastWord = title.split(" ").slice(-1)[0];
  const restWords = title.split(" ").slice(0, -1).join(" ");

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
            <AnimatedText text={restWords} stagger={50} />{" "}
            <span className="gradient-text">
              <AnimatedText text={lastWord} stagger={50} blur={false} />
            </span>
          </>
        ) : (
          <AnimatedText text={title} stagger={50} />
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
