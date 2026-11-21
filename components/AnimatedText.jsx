"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 60,
  threshold = 0.2,
  blur = true,
}) {
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
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`motion-reduce:opacity-100! ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <span
            className="inline-block transition-all"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(100%)",
              filter: blur ? (visible ? "blur(0)" : "blur(4px)") : undefined,
              transitionProperty: "opacity, transform, filter",
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * stagger}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
