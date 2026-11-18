import { getSiteAbout, getServices, getProjects, getPosts } from "@/lib/siteContent";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Sparkles,
  Users2,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import PostCard from "@/components/PostCard";
import MediaFrame from "@/components/MediaFrame";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParticleGrid from "@/components/ParticleGrid";

export const revalidate = 3600;

export const metadata = {
  title: "About Us",
  description: "Learn about Manu Maso — our mission, vision, team, and the digital solutions we build for businesses in Papua New Guinea.",
};

function ValueChip({ value }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
      <BadgeCheck size={15} className="text-emerald-400" />
      {value}
    </span>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5">
      <MediaFrame
        image={project?.image}
        video={project?.video}
        alt={project?.title || "Project"}
        className="aspect-[16/10]"
        sizes="(max-width: 768px) 100vw, 33vw"
        overlay
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white">
          {project?.title || "Project title"}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          {project?.description ||
            project?.shortDescription ||
            "Project details will appear here."}
        </p>
        {project?.link ? (
          <a
            href={project.link}
            target={project.link.startsWith("http") ? "_blank" : undefined}
            rel={project.link.startsWith("http") ? "noreferrer" : undefined}
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            View project
            <ArrowRight size={16} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function TeamCard({ member }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5">
      {member?.image || member?.video ? (
        <MediaFrame
          image={member.image}
          video={member.video}
          alt={member?.name || "Team member"}
          className="aspect-[4/5]"
          sizes="(max-width: 768px) 100vw, 25vw"
          overlay
        />
      ) : (
        <div className="flex aspect-[4/5] items-end bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-900 p-6 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-200">
              Team
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              {member?.name || "Team member"}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {member?.role || "Role"}
            </p>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">
          {member?.name || "Team member"}
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          {member?.role || "Role"}
        </p>
        {member?.bio && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{member.bio}</p>}
      </div>
    </article>
  );
}

export default async function AboutPage() {
  const [about, services, projects, posts] = await Promise.all([
    getSiteAbout(),
    getServices(),
    getProjects(),
    getPosts(),
  ]);

  const projectShowcase = projects.slice(0, 3);
  const serviceShowcase = services.slice(0, 3);
  const postShowcase = posts.slice(0, 3);
  const heroMedia =
    about.history?.video ||
    about.history?.image ||
    about.mvv?.video ||
    about.mvv?.image ||
    serviceShowcase[0]?.video ||
    serviceShowcase[0]?.image ||
    "/images/project1.webp";
  const heroIsVideo = Boolean(
    about.history?.video || about.mvv?.video || serviceShowcase[0]?.video
  );
  const heroText =
    about.history?.text ||
    about.mission ||
    about.contact?.tagline ||
    "A focused team turning design, engineering, and operations into dependable digital experiences.";
  const contact = about.contact || {};

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
              About Manu Maso
            </span>

            <h1 className="hero-fade-up-delay-1 mt-6 text-5xl font-black tracking-tight md:text-7xl">
              We build digital systems that{" "}
              <span className="gradient-text">perform.</span>
            </h1>

            <p className="hero-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {heroText}
            </p>

            <div className="hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                View services
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10"
              >
                Talk to us
              </Link>
            </div>
          </div>

          <div className="hero-fade-up-delay-4 relative">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
              {heroIsVideo ? (
                <MediaFrame
                  video={heroMedia}
                  alt="About page hero"
                  className="min-h-[420px]"
                  overlay
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              ) : (
                <MediaFrame
                  image={heroMedia}
                  alt="About page hero"
                  className="min-h-[420px]"
                  overlay
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              )}

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur md:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-200">
                      Our tagline
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {contact.tagline ||
                        "Digital solutions that feel intentional and reliable."}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/8 p-3 text-center">
                      <p className="text-2xl font-black text-emerald-400">
                        <AnimatedCounter end={services.length} />
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">
                        Services
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/8 p-3 text-center">
                      <p className="text-2xl font-black text-emerald-400">
                        <AnimatedCounter end={projects.length} />
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-300">
                        Projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="border-y border-white/5 bg-slate-950 py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Layers3,
              label: "Services",
              value: services.length,
              detail: "Live offerings managed from the admin dashboard.",
            },
            {
              icon: Users2,
              label: "Team",
              value: about.team.length,
              detail: "Team members showcased on this page.",
            },
            {
              icon: Sparkles,
              label: "Projects",
              value: projects.length,
              detail: "Delivered solutions for real clients.",
            },
            {
              icon: BadgeCheck,
              label: "Updates",
              value: posts.length,
              detail: "Published stories and announcements.",
            },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
                    <stat.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      <AnimatedCounter end={stat.value} />
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {stat.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ STORY + MISSION/VISION ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Story"
            title="Our Journey & Operating Rhythm"
            subtitle="Learn about our history and what drives us forward."
            align="left"
          />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-400">
                Short history
              </p>
              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-300 md:text-base">
                {about.history?.text ||
                  "Use the admin dashboard to add the company history. Once stored, it will appear here."}
              </p>

              {about.values.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {about.values.map((value, index) => (
                    <ValueChip key={`${value}-${index}`} value={value} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-slate-500">
                  Add company values from the admin dashboard.
                </div>
              )}
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="h-full rounded-2xl border border-white/8 bg-gradient-to-br from-emerald-500/10 to-transparent p-7">
                <Target size={24} className="text-emerald-400" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-emerald-400">
                  Mission
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {about.mission ||
                    "Define the mission in the admin dashboard."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="h-full rounded-2xl border border-white/8 bg-gradient-to-br from-sky-500/10 to-transparent p-7">
                <Eye size={24} className="text-sky-400" />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-sky-400">
                  Vision
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {about.vision ||
                    "Define the vision in the admin dashboard."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300} className="sm:col-span-2">
              <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-slate-800 to-slate-900 p-7">
                <Heart size={20} className="text-emerald-400" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
                  Contact profile
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-semibold text-white">
                      {contact.companyName || "Manu Maso"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {contact.address || "Port Moresby, Papua New Guinea"}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    {contact.email ? <p>{contact.email}</p> : null}
                    {contact.phone ? <p>{contact.phone}</p> : null}
                    {contact.hours ? <p>{contact.hours}</p> : null}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      {about.team.length > 0 ? (
        <section id="team" className="scroll-mt-24 border-t border-white/5 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <SectionTitle
                eyebrow="People"
                title="Leadership & Team"
                subtitle="Meet the people who make Manu Maso what it is."
              />
            </ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {about.team.map((member, i) => (
                <ScrollReveal key={member._id || member.name} delay={i * 100}>
                  <TeamCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ═══ SERVICES ═══ */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Services"
              title="What We Offer"
              subtitle="Reliable digital services for your technology needs."
            />
          </ScrollReveal>
          {serviceShowcase.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {serviceShowcase.map((service, i) => (
                <ScrollReveal key={service._id} delay={i * 100}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
              No services are published yet.
            </div>
          )}
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Projects"
              title="Selected Work"
              subtitle="Solutions that have made a real impact for our clients."
            />
          </ScrollReveal>
          {projectShowcase.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projectShowcase.map((project, i) => (
                <ScrollReveal
                  key={project._id || project.title}
                  delay={i * 100}
                >
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
              No projects published yet.
            </div>
          )}
        </div>
      </section>

      {/* ═══ UPDATES ═══ */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Updates"
              title="Latest News & Stories"
              subtitle="Stay informed with our most recent posts and announcements."
            />
          </ScrollReveal>
          {postShowcase.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {postShowcase.map((post, i) => (
                <ScrollReveal key={post._id} delay={i * 100}>
                  <PostCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
              No updates have been published yet.
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-6 py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-950 p-8 text-center shadow-2xl shadow-emerald-500/10 md:p-12">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Need a polished digital{" "}
              <span className="gradient-text">presence?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 md:text-lg">
              Reach out through the contact page and let us build something
              extraordinary together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Contact Us
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
