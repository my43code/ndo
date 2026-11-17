import Image from "next/image";
import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-300 hover:bg-white/5"
    >
      <div className="relative">
        <Image
          src="/images/manu-maso-logo.png"
          alt="Manu Maso"
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="rounded-lg object-contain transition-all duration-300"
        />
        <div className="absolute -inset-1 -z-10 rounded-xl bg-emerald-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="leading-tight">
        <h1 className="text-lg font-black tracking-wide text-white md:text-xl">
          Manu
          <span className="text-emerald-400"> Maso</span>
        </h1>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-slate-400 transition-colors group-hover:text-emerald-300">
          Digital Solutions
        </p>
      </div>
    </Link>
  );
}
