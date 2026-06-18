import { notFound } from "next/navigation";
import Link from "next/link";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";

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
    <main>
      {/* Back Button */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/updates" className="text-emerald-600 font-medium hover:underline">
            ← Back to Updates
          </Link>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-16">
        {/* Title and Date */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {post.title || "Update"}
          </h1>
          <p className="text-slate-600 text-lg">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-[480px] overflow-hidden rounded-2xl border border-slate-200 shadow-lg mb-12">
            <Image
              src={post.image}
              alt={post.title || "Post image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Summary */}
        {post.summary && (
          <div className="bg-slate-50 border-l-4 border-emerald-600 pl-6 py-4 mb-12 rounded-r-lg">
            <p className="text-xl text-slate-700 italic leading-relaxed">{post.summary}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-slate max-w-none">
          {post.content && (
            <div className="text-slate-800 leading-relaxed whitespace-pre-wrap break-words text-lg">
              {post.content}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
