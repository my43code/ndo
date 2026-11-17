import Link from "next/link";
import { ArrowRight, Layers3, Sparkles, ShieldCheck, Zap } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import MediaFrame from "@/components/MediaFrame";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParticleGrid from "@/components/ParticleGrid";
import { connectMongoDB } from "@/lib/mongodb";
import Service from "@/models/Service";

export const revalidate = 3600;

async function getServices() {
  try {
    await connectMongoDB();
    return await Service.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Failed to load services:", error);
    }
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  const featuredService = services[0];
  const videoCount = services.filter((s) => s.video).length;
  const imageCount = services.filter((s) => s.image && !s.video).length;

  return (
    <main className="bg-slate-950">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(250,204,21,0.06),transparent_40%)]" />
        </div>
        <ParticleGrid />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div className="max-w-2xl">
            <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur">
              <Sparkles size={16} />
              Services
            </span>

            <h1 className="hero-fade-up-delay-1 mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Premium digital services built to{" "}
              <span className="gradient-text">ship.</span>
            </h1>

            <p className="hero-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              We deliver tailored digital solutions that drive growth and
              innovation for businesses of all sizes.
            </p>

            <div className="hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Start a project
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10"
              >
                View updates
              </Link>
            </div>
          </div>

          <div className="hero-fade-up-delay-4 relative">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
              <MediaFrame
                image={featuredService?.image || "/images/project1.webp"}
                video={featuredService?.video}
                alt={featuredService?.title || "Featured service"}
                className="min-h-[420px]"
                overlay
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur sm:grid-cols-3">
                  {[
                    {
                      icon: Layers3,
                      label: "Services",
                      value: services.length,
                    },
                    { icon: Zap, label: "Videos", value: videoCount },
                    {
                      icon: ShieldCheck,
                      label: "Images",
                      value: imageCount,
                    },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-3 p-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                        <m.icon size={16} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                          {m.label}
                        </p>
                        <p className="text-xl font-black text-white">
                          <AnimatedCounter end={m.value} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICE CARDS ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Portfolio"
            title="Browse Our Service Library"
            subtitle="Each service is carefully crafted to deliver real value and measurable results."
          />
        </ScrollReveal>

        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={service._id} delay={i * 100}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-500">
            No services available in the database yet.
          </div>
        )}
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-6 pb-20">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-950 p-8 text-white shadow-2xl shadow-emerald-500/10 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                  Let us shape your{" "}
                  <span className="gradient-text">digital future.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 md:text-lg">
                  Bring your idea, your existing system, or your support request.
                  We will match it with the right service and deliver excellence.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Contact us
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
