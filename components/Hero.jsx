import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(250,204,21,0.06),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
        <div>
          <span className="mb-6 inline-block rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Web Development &bull; IT Support &bull; Digital Solutions
          </span>

          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Building Smart Technology Solutions for{" "}
            <span className="gradient-text">PNG Businesses</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Manu Maso Digital Solutions delivers professional websites, digital systems,
            database-driven platforms, and IT support for modern organizations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/images/manu-maso-logo.png"
            alt="Manu Maso Digital Solutions"
            width={600}
            height={500}
            className="h-auto w-full rounded-2xl object-contain p-8"
          />
          <div className="absolute -inset-1 -z-10 rounded-2xl bg-emerald-400/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
