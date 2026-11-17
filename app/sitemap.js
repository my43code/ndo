import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";

const BASE_URL = process.env.NEXTAUTH_URL || "https://manumaso.com";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/updates`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/yutok`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  let dynamicRoutes = [];

  try {
    await connectMongoDB();

    const posts = await Post.find({}, { _id: 1, updatedAt: 1 })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    dynamicRoutes = posts.map((post) => ({
      url: `${BASE_URL}/updates/${post._id}`,
      lastModified: post.updatedAt || now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // DB unavailable — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes];
}
