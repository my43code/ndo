"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";

function FadeInText({ children, className = "", delay = 300 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:filter-none! ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        filter: visible ? "blur(0)" : "blur(6px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
        <FadeInText
          delay={400}
          className={`mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg ${
            !isLeft ? "mx-auto" : ""
          }`}
        >
          <p>{subtitle}</p>
        </FadeInText>
      ) : null}
    </div>
  );
}
