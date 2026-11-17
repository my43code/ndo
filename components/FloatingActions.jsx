"use client";

import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Link
        href="/search"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-300 shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-slate-800 hover:text-white hover:shadow-emerald-500/10"
      >
        <Search size={18} />
        <span className="hidden font-medium md:inline">Search</span>
      </Link>

      <Link
        href="/yutok"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-medium text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-emerald-500/40 hover:brightness-110"
      >
        <MessageCircle size={18} />
        <span className="hidden font-medium md:inline">YuTok AI</span>
      </Link>
    </div>
  );
}
