import { cache } from "react";
import { unstable_cache } from "next/cache";
import { connectMongoDB } from "@/lib/mongodb";
import { readContentList } from "@/lib/contentImages";
import About from "@/models/About";
import { createDefaultAbout, normalizeAboutContent } from "@/lib/siteDefaults";

function siteQuery(key, query, fallback, revalidate = 3600) {
  const read = unstable_cache(async () => {
    await connectMongoDB();
    return JSON.parse(JSON.stringify(await query()));
  }, [key], { tags: ["site-content"], revalidate });

  return cache(async () => {
    try {
      return await read();
    } catch (error) {
      if (process.env.npm_lifecycle_event !== "build") {
        console.error(`Failed to load ${key}:`, error.name);
      }
      return fallback();
    }
  });
}

export const getSiteAbout = siteQuery("site-media-about", async () => {
  const about = await About.findOne().sort({ createdAt: -1 }).lean();
  return normalizeAboutContent(about);
}, createDefaultAbout);

export const getServices = siteQuery("site-media-services",
  () => readContentList("services"), () => []);

export const getProjects = siteQuery("site-media-projects",
  () => readContentList("projects"), () => []);

export const getPosts = siteQuery("site-media-posts",
  () => readContentList("posts"), () => [], 300);
