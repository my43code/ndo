export const revalidate = 60;

import SectionTitle from "@/components/SectionTitle";
import PostCard from "@/components/PostCard";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";

async function getPosts() {
  try {
    await connectMongoDB();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    return { posts };
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Failed to load posts:", error);
    }
    return { posts: [] };
  }
}

export default async function UpdatesPage() {
  const data = await getPosts();
  const posts = data?.posts || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionTitle
        title="Company Updates"
        subtitle="This section is connected to MongoDB. You can manage your own posts from the Admin page."
      />

      {posts.length === 0 ? (
        <p className="text-center text-slate-600">No updates yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
