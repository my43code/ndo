import { getServices, getProjects } from "@/lib/siteContent";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Globe,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  MonitorSmartphone,
  Database,
  Cloud,
  Headphones,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TypewriterText from "@/components/TypewriterText";
import ParticleGrid from "@/components/ParticleGrid";
import GlowingCard from "@/components/GlowingCard";
import FloatingActions from "@/components/FloatingActions";

export const revalidate = 3600;

const capabilities = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Custom websites, web apps, and portals built with modern frameworks.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile & Responsive",
    desc: "Apps and interfaces that work flawlessly on every device.",
  },
  {
    icon: Database,
    title: "Database Systems",
    desc: "Robust MongoDB and SQL solutions for your data needs.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure and deployment pipelines.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Secure systems with encryption, auth, and best practices.",
  },
  {
    icon: Headphones,
    title: "IT Support",
    desc: "Reliable ongoing technical support and maintenance.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "Tailwind CSS",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "REST APIs",
];

export default async function HomePage() {
  let services = [];
  let projects = [];

  try {
    [services, projects] = await Promise.all([getServices(), getProjects()]);
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Data loading error:", error);
    }
  }

  return (
    <main>
      <FloatingActions />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(2,6,23,0.97)_0%,rgba(15,23,42,0.75)_48%,rgba(6,78,59,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(250,204,21,0.08),transparent_40%)]" />
        </div>

        <ParticleGrid />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
                <Zap size={14} className="text-yellow-400" />
                Papua New Guinea&apos;s Digital Partner
              </span>

              <h1 className="hero-fade-up-delay-1 mt-8 text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
                We build
                <span className="block">
                  <TypewriterText
                    words={[
                      "powerful websites",
                      "smart systems",
                      "digital solutions",
                      "mobile apps",
                      "cloud platforms",
                    ]}
                    className="gradient-text"
                  />
                </span>
              </h1>

              <p className="hero-fade-up-delay-2 mt-8 max-w-xl text-lg leading-8 text-slate-300">
                Manu Maso delivers cutting-edge web development, IT systems, and
                digital transformation services that make your business stand out
                and perform at its best.
              </p>

              <div className="hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 hover:brightness-110"
                >
                  Explore Services
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/10"
                >
                  Get a Quote
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="hero-fade-up-delay-4 mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  5+ Years Experience
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  PNG Based
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  24/7 Support
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hero-fade-up-delay-4 relative hidden lg:block">
              <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
              <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-yellow-400/8 blur-[80px]" />

              <div className="animate-pulse-glow relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src="/images/manu-maso-logo.png"
                    alt="Manu Maso Digital Solutions"
                    width={600}
                    height={500}
                    className="h-auto w-full object-contain p-8"
                    sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, 1px"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/8 p-3 text-center backdrop-blur">
                      <p className="text-2xl font-black text-emerald-400">
                        <AnimatedCounter end={50} suffix="+" />
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">
                        Projects
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/8 p-3 text-center backdrop-blur">
                      <p className="text-2xl font-black text-emerald-400">
                        <AnimatedCounter end={30} suffix="+" />
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">
                        Clients
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/8 p-3 text-center backdrop-blur">
                      <p className="text-2xl font-black text-emerald-400">
                        <AnimatedCounter end={5} suffix="+" />
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">
                        Years
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Scroll
            </span>
            <div className="h-10 w-[1px] animate-pulse bg-gradient-to-b from-emerald-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionTitle
              eyebrow="What We Do"
              title="End-to-End Digital Capabilities"
              subtitle="From concept to deployment, we handle every aspect of your digital transformation with precision and expertise."
            />
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 100}>
                <GlowingCard className="h-full border border-white/8 bg-white/[0.03] p-7 backdrop-blur hover-lift">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
                    <cap.icon size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {cap.desc}
                  </p>
                </GlowingCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES FROM DB ═══ */}
      <section className="bg-[linear-gradient(180deg,#020617_0%,#0f172a_50%,#020617_100%)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Our Services"
              title="Services That Drive Growth"
              subtitle="Tailored digital solutions built to elevate your business and deliver measurable results."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services && services.length > 0 ? (
              services.slice(0, 6).map((service, i) => (
                <ScrollReveal key={service._id} delay={i * 120}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/20 hover:shadow-emerald-500/10">
                    <div className="relative h-[220px] overflow-hidden">
                      {service.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        >
                          <source src={service.video} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={service.image || "/images/project1.webp"}
                          alt={service.title || "Service"}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur">
                          Service
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-bold text-white">
                        {service.title || "Service Title"}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {service.shortDescription ||
                          service.description ||
                          "Service description will appear here."}
                      </p>
                      {service.link && (
                        <Link
                          href={service.link}
                          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                        >
                          Learn More
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <p className="col-span-3 rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-500">
                No services available yet. Add services from the admin dashboard.
              </p>
            )}
          </div>

          {services.length > 0 && (
            <ScrollReveal className="mt-12 text-center">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
              >
                View All Services
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ═══ STATS BANNER ═══ */}
      <section className="relative overflow-hidden border-y border-white/5 bg-slate-950 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-yellow-500/5" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 50, suffix: "+", label: "Projects Delivered" },
            { value: 30, suffix: "+", label: "Happy Clients" },
            { value: 99, suffix: "%", label: "Uptime Guarantee" },
            { value: 5, suffix: "+", label: "Years in Business" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 150}>
              <div className="text-center">
                <p className="text-5xl font-black text-white md:text-6xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="gradient-text"
                  />
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Portfolio"
              title="Projects We&apos;ve Delivered"
              subtitle="Real solutions built for real businesses. Every project is crafted with care and precision."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects && projects.length > 0 ? (
              projects.slice(0, 6).map((project, i) => (
                <ScrollReveal key={project._id} delay={i * 100}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5">
                    <div className="relative h-[200px] overflow-hidden">
                      {project.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        >
                          <source src={project.video} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={project.image || "/images/project1.webp"}
                          alt={project.title || "Project"}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-white">
                        {project.title || "Project Title"}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {project.shortDescription ||
                          project.description ||
                          "Project description will appear here."}
                      </p>
                      {project.link && (
                        <Link
                          href={project.link}
                          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                        >
                          View Project
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <p className="col-span-3 rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-500">
                No projects available yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK MARQUEE ═══ */}
      <section className="border-y border-white/5 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Technologies We Work With
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex gap-12 whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex items-center gap-3 text-lg font-bold text-slate-600"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500/50" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  Why Manu Maso
                </span>
                <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Professional solutions you can{" "}
                  <span className="gradient-text">trust.</span>
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300">
                  We combine modern technology with deep local understanding to
                  build digital solutions that work for PNG businesses and
                  organizations. Our commitment to quality and reliability sets
                  us apart.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    {
                      icon: Globe,
                      text: "Built for Papua New Guinea businesses and beyond",
                    },
                    {
                      icon: Zap,
                      text: "Fast delivery with modern tech stack",
                    },
                    {
                      icon: Users,
                      text: "Dedicated support team always available",
                    },
                    {
                      icon: Shield,
                      text: "Enterprise-grade security and reliability",
                    },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
                        <item.icon size={18} className="text-emerald-400" />
                      </div>
                      <p className="text-base text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-yellow-500/5 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <Image
                    src="/images/project1.webp"
                    alt="Professional software development"
                    width={600}
                    height={450}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                        Our Promise
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-200">
                        Every project is delivered with precision, tested
                        thoroughly, and supported long after launch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-slate-950 px-6 py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-950 p-10 text-center shadow-2xl shadow-emerald-500/10 md:p-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Get Started Today
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              Ready to transform your{" "}
              <span className="gradient-text">digital presence?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Let Manu Maso build something extraordinary for your business.
              Contact us today for a free consultation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/yutok"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur transition-all hover:border-emerald-400/30 hover:bg-white/10"
              >
                Chat with YuTok AI
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
