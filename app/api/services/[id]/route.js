import { connectMongoDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidateSite } from "@/lib/revalidateSite";

export async function GET(request, { params }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    await connectMongoDB();
    const item = await Service.findById(id).lean();
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ message: "Item not found" }, { status: 404 });
  } catch (error) {
    console.error("Could not load item:", error.name);
    return NextResponse.json({ message: "Failed to load item" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return NextResponse.json({ message: "Missing service id" }, { status: 400 });
    }

    await connectMongoDB();
    const updatedService = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    revalidateSite();

    return NextResponse.json({ message: "Service updated", service: updatedService }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/services/[id] error:", error);
    return NextResponse.json({ message: "Failed to update service" }, { status: 500 });
  }
}
