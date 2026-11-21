import { notFound } from "next/navigation";
import { readPublicPost } from "@/lib/contentImages";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 300;

async function getPost(id) {
  try {
    return await readPublicPost(id);
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Failed to load post:", error);
    }
    return null;
  }
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-hero bg-slate-950">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            <ArrowLeft size={16} />
            Back to Updates
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-6 py-16">
        <ScrollReveal blur>
          <div className="mb-8">
            <p className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Company update
            </p>
            <h1 className="hero-fade-up-delay-1 mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              {post.title || "Update"}
            </h1>
            <p className="hero-fade-up-delay-2 mt-4 flex items-center gap-2 text-base text-slate-500">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </ScrollReveal>

        {post.image ? (
          <ScrollReveal scale blur delay={100}>
            <div className="relative mb-12 h-[320px] overflow-hidden rounded-2xl border border-white/8 md:h-[480px]">
              <Image
                src={post.image}
                alt={post.title || "Post image"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 976px"
                fetchPriority="high"
              />
            </div>
          </ScrollReveal>
        ) : null}

        {post.summary ? (
          <ScrollReveal blur delay={200}>
            <div className="mb-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-5">
              <p className="text-lg italic leading-relaxed text-slate-300 md:text-xl">
                {post.summary}
              </p>
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal blur delay={300}>
          <div className="max-w-none">
            {post.content ? (
              <div className="whitespace-pre-wrap break-words text-lg leading-8 text-slate-300">
                {post.content}
              </div>
            ) : null}
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
