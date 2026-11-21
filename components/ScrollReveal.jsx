"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 700,
  threshold = 0.15,
  once = true,
  blur = false,
  scale = false,
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
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  };

  const hiddenTransform = [
    transforms[direction],
    scale ? "scale(0.92)" : "",
  ].filter(Boolean).join(" ") || "none";

  return (
    <div
      ref={ref}
      className={`motion-reduce:opacity-100! motion-reduce:transform-none! motion-reduce:transition-none! motion-reduce:filter-none! ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        filter: blur ? (visible ? "blur(0)" : "blur(6px)") : undefined,
        transition: [
          `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          blur ? `filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : "",
        ].filter(Boolean).join(", "),
      }}
    >
      {children}
    </div>
  );
}
