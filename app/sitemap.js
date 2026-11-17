import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Service from "@/models/Service";
import Project from "@/models/Project";

const BASE_URL = process.env.NEXTAUTH_URL || "https://manumaso.com";

export default async function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/updates`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/yutok`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/search`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let dynamicRoutes = [];

  try {
    await connectMongoDB();

    const posts = await Post.find({}, { _id: 1, updatedAt: 1 })
      .sort({ createdAt: -1 })
      .lean();

    dynamicRoutes = posts.map((post) => ({
      url: `${BASE_URL}/updates/${post._id}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // DB unavailable — return static routes only
  }

  return [...staticRoutes, ...dynamicRoutes];
}
