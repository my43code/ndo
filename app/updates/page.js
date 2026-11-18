import { getPosts } from "@/lib/siteContent";
export const revalidate = 300;

export const metadata = {
  title: "Updates",
  description: "Latest news, articles, and updates from Manu Maso — stay informed about our projects and digital solutions.",
};

import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import PostCard from "@/components/PostCard";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleGrid from "@/components/ParticleGrid";
import { Newspaper, ArrowRight } from "lucide-react";

export default async function UpdatesPage() {
  const posts = await getPosts();
  const latestPost = posts[0];

  return (
    <main className="bg-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(250,204,21,0.06),transparent_40%)]" />
        </div>
        <ParticleGrid />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur">
              <Newspaper size={16} />
              Company Updates
            </span>
            <h1 className="hero-fade-up-delay-1 mt-6 text-5xl font-black tracking-tight md:text-7xl">
              News & stories from{" "}
              <span className="gradient-text">our team.</span>
            </h1>
            <p className="hero-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Stay informed with the latest updates, insights, and stories. We
              share news about our projects, milestones, and industry trends.
            </p>
            <div className="hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
              >
                Contact us
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href={latestPost ? `/updates/${latestPost._id}` : "/contact"}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10"
              >
                Read latest update
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Editorial"
            title="Published Updates"
            subtitle="Stay informed with the latest news and insights from our team."
            align="left"
          />
        </ScrollReveal>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-slate-500">
            No updates yet. Publish the first post from the admin dashboard.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 100}>
                <PostCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
