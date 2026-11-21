import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import { updateLegacyBrand } from "@/lib/siteDefaults";
import Post from "@/models/Post";
import Project from "@/models/Project";
import Service from "@/models/Service";

const models = new Map([
  ["posts", Post],
  ["projects", Project],
  ["services", Service],
]);

function normalizePublicCopy(entry) {
  const copyFields = ["title", "summary", "content", "description", "shortDescription"];
  for (const field of copyFields) {
    if (typeof entry[field] === "string") {
      entry[field] = updateLegacyBrand(entry[field]);
    }
  }
  return entry;
}

const inlineImage = {
  $regexMatch: {
    input: { $ifNull: ["$image", ""] },
    regex: /^data:image\/(?:png|jpe?g|webp|gif|avif);base64,/i,
  },
};

// Project image URLs in MongoDB so list queries never transfer the inline image.
function imageProjection(collection) {
  return {
    $cond: [
      inlineImage,
      {
        $concat: [
          `/api/media/${collection}/`,
          { $toString: "$_id" },
          "?v=",
          { $toString: { $toLong: { $ifNull: ["$updatedAt", 0] } } },
        ],
      },
      "$image",
    ],
  };
}

export async function readContentList(collection, { includeContent = false, includeVideo = true } = {}) {
  const fields = collection === "posts"
    ? { title: 1, summary: 1, ...(includeContent && { content: 1 }) }
    : { title: 1, description: 1, shortDescription: 1, icon: 1, link: 1, ...(includeVideo && { video: 1 }) };

  await connectMongoDB();
  const entries = await models.get(collection).aggregate([
    { $sort: { createdAt: -1 } },
    { $project: { ...fields, image: imageProjection(collection), createdAt: 1, updatedAt: 1 } },
  ]);
  return entries.map(normalizePublicCopy);
}

export async function readPublicPost(id) {
  if (!mongoose.isObjectIdOrHexString(id)) return null;
  await connectMongoDB();
  const [post] = await Post.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $project: { title: 1, summary: 1, content: 1, createdAt: 1, image: imageProjection("posts") } },
  ]);
  return post ? normalizePublicCopy(post) : null;
}

export async function readInlineImage(collection, id) {
  const model = models.get(collection);
  if (!model || !mongoose.isObjectIdOrHexString(id)) return null;
  await connectMongoDB();
  return model.findById(id).select("image updatedAt").lean();
}
