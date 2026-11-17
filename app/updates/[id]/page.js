import { notFound } from "next/navigation";
import Link from "next/link";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";

export const revalidate = 60;

async function getPost(id) {
  try {
    await connectMongoDB();
    const post = await Post.findById(id).lean();
    return post;
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
    <main className="bg-slate-950">
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
        <div className="mb-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
            Company update
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            {post.title || "Update"}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-base text-slate-500">
            <Calendar size={16} />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {post.image ? (
          <div className="relative mb-12 h-[320px] overflow-hidden rounded-2xl border border-white/8 md:h-[480px]">
            <Image
              src={post.image}
              alt={post.title || "Post image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {post.summary ? (
          <div className="mb-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-5">
            <p className="text-lg italic leading-relaxed text-slate-300 md:text-xl">
              {post.summary}
            </p>
          </div>
        ) : null}

        <div className="max-w-none">
          {post.content ? (
            <div className="whitespace-pre-wrap break-words text-lg leading-8 text-slate-300">
              {post.content}
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
