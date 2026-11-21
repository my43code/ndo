import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export default function PostCard({ post }) {
  const postedAt = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const readingTime = Math.max(
    1,
    Math.ceil(((post?.content || post?.summary || "").length || 240) / 900)
  );

  return (
    <Link href={`/updates/${post._id}`} className="group block h-full">
      <article className="gradient-border flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-emerald-500/20 group-hover:shadow-xl group-hover:shadow-emerald-500/5">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          <Image
            src={post.image || "/images/project1.webp"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300 backdrop-blur">
              Update
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
              <Clock size={12} />
              {readingTime} min read
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {postedAt}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl animated-underline">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {post.summary}
          </p>
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition group-hover:text-emerald-300">
              Read story
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
