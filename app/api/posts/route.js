import { readContentList } from "@/lib/contentImages";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidateSite } from "@/lib/revalidateSite";

async function readFullList() {
  await connectMongoDB();
  return Post.find().sort({ createdAt: -1 }).lean();
}

export async function GET(request) {
  try {
    const summary = request.nextUrl.searchParams.get("summary") === "1";
    const posts = summary
      ? await readContentList("posts", { includeContent: true, includeVideo: false })
      : await readFullList();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", posts: [] },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { title, summary, content, image } = await request.json();

    if (!title || !summary || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newPost = await Post.create({
      title,
      summary,
      content,
      image,
    });

    revalidateSite();

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { message: "Failed to create post", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
