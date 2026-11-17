"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Updates", href: "/updates" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-emerald-500/10 bg-slate-950/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          : "border-b border-white/5 bg-slate-950/60 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Logo compact={scrolled} />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-[13px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}

          <Link
            href="/yutok"
            className="ml-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:brightness-110"
          >
            YuTok AI
          </Link>
        </nav>

        <button
          className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 text-slate-300 backdrop-blur transition hover:border-emerald-500/30 hover:bg-slate-800 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-white/5 bg-slate-950/98 px-4 py-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ChevronRight
                    size={16}
                    className={isActive ? "text-emerald-400" : "text-slate-600"}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 border-t border-white/5 pt-4">
            <Link
              href="/yutok"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20"
              onClick={() => setIsOpen(false)}
            >
              Try YuTok AI Assistant
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
