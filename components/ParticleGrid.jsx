"use client";

import { useEffect, useRef } from "react";

export default function ParticleGrid({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    let width;
    let height;
    let particles = [];

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    }

    function createParticles() {
      particles = [];
      const w = width;
      const h = height;
      const count = Math.min(55, Math.floor((w * h) / 12000));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function draw() {
      const w = width;
      const h = height;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function stop() {
      cancelAnimationFrame(animationId);
      animationId = undefined;
    }

    let inView = false;
    function updateAnimation() {
      if (inView && !motion.matches && !document.hidden) {
        if (animationId === undefined) draw();
      } else {
        stop();
        if (motion.matches) ctx.clearRect(0, 0, width, height);
      }
    }

    function handleResize() {
      resize();
      createParticles();
    }

    handleResize();
    const sizeObserver = new ResizeObserver(handleResize);
    sizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    });
    visibilityObserver.observe(canvas);
    motion.addEventListener("change", updateAnimation);
    document.addEventListener("visibilitychange", updateAnimation);

    return () => {
      stop();
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", updateAnimation);
      document.removeEventListener("visibilitychange", updateAnimation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
