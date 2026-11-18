import { readContentList } from "@/lib/contentImages";
import { connectMongoDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidateSite } from "@/lib/revalidateSite";

async function readFullList() {
  await connectMongoDB();
  return Service.find().sort({ createdAt: -1 }).lean();
}

export async function GET(request) {
  try {
    const summary = request.nextUrl.searchParams.get("summary") === "1";
    const services = summary
      ? await readContentList("services", { includeContent: true, includeVideo: false })
      : await readFullList();
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    await connectMongoDB();
    const service = await Service.create(body);
    revalidateSite();
    return NextResponse.json(
      { message: "Service created", service },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { message: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await request.json();
    await connectMongoDB();
    await Service.findByIdAndDelete(id);
    revalidateSite();
    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return NextResponse.json(
      { message: "Failed to delete service" },
      { status: 500 }
    );
  }
}
