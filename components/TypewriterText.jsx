"use client";

import { useEffect, useState } from "react";

export default function TypewriterText({
  words = [],
  className = "",
  typingSpeed = 56,
  deletingSpeed = 28,
  pauseDuration = 2300,
}) {
  const [{ wordIndex, length, deleting }, setAnimation] = useState(() => ({
    wordIndex: 0,
    length: words[0]?.length ?? 0,
    deleting: false,
  }));
  const word = words[wordIndex] || words[0] || "";

  useEffect(() => {
    if (words.length < 2) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    function schedule() {
      clearTimeout(timer);
      if (motion.matches || document.hidden) return;
      const complete = !deleting && length >= word.length;
      const delay = complete ? pauseDuration : deleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        if (complete) {
          setAnimation({ wordIndex, length, deleting: true });
        } else if (deleting && length <= 1) {
          setAnimation({ wordIndex: (wordIndex + 1) % words.length, length: 1, deleting: false });
        } else {
          setAnimation({ wordIndex, length: length + (deleting ? -1 : 1), deleting });
        }
      }, delay);
    }
    schedule();
    motion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [wordIndex, word, length, deleting, words.length, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      <span className="sr-only motion-reduce:not-sr-only">{words[0]}</span>
      <span className="typewriter-words motion-reduce:hidden" aria-hidden="true">
        {words.map((label) => <span key={label} className="invisible">{label}</span>)}
        <span>{word.slice(0, length)}<span className="animate-blink">|</span></span>
      </span>
    </span>
  );
}
