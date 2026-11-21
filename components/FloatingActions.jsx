"use client";

import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Link
        href="/search"
        className="animate-blur-in flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-300 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-800 hover:text-white hover:shadow-emerald-500/10"
        style={{ animationDelay: "1s" }}
      >
        <Search size={18} />
        <span className="hidden font-medium md:inline">Search</span>
      </Link>

      <Link
        href="/yutok"
        className="animate-scale-bounce flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-medium text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/40 hover:brightness-110"
        style={{ animationDelay: "1.2s" }}
      >
        <MessageCircle size={18} />
        <span className="hidden font-medium md:inline">YuTok AI</span>
      </Link>
    </div>
  );
}
