import { getPosts } from "@/lib/siteContent";
import { publicPages } from "@/lib/publicPages";

export const revalidate = 3600;

const baseUrl = process.env.NEXTAUTH_URL || "https://manumaso.com";

export default async function sitemap() {
  const posts = await getPosts();
  return [
    ...publicPages.map(({ href, frequency, priority }) => ({
      url: new URL(href, baseUrl).href,
      changeFrequency: frequency,
      priority,
    })),
    { url: new URL("/site-map", baseUrl).href },
    ...posts.map((post) => ({
      url: new URL(`/updates/${post._id}`, baseUrl).href,
      lastModified: post.updatedAt || post.createdAt,
    })),
  ];
}
