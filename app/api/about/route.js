import { connectMongoDB } from "@/lib/mongodb";
import About from "@/models/About";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { createDefaultAbout, normalizeAboutContent } from "@/lib/siteDefaults";
import { revalidateSite } from "@/lib/revalidateSite";

export async function GET() {
  try {
    await connectMongoDB();
    const about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      const created = await About.create(createDefaultAbout());
      return NextResponse.json(normalizeAboutContent(created.toObject()));
    }

    return NextResponse.json(normalizeAboutContent(about.toObject()));
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json(createDefaultAbout(), { status: 500 });
  }
}

export async function PUT(request) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    if (!body || Array.isArray(body) || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid About page content." }, { status: 400 });
    }
    if ("team" in body && !Array.isArray(body.team)) {
      return NextResponse.json({ message: "Team profiles must be a list." }, { status: 400 });
    }
    await connectMongoDB();

    const fields = Object.keys(createDefaultAbout()).filter((key) => Object.hasOwn(body, key));
    const existingAbout = await About.findOne().sort({ createdAt: -1 });
    const payload = normalizeAboutContent({
      ...(existingAbout ? existingAbout.toObject() : createDefaultAbout()),
      ...Object.fromEntries(fields.map((key) => [key, body[key]])),
    });

    let about;
    if (existingAbout) {
      const filter = { _id: existingAbout._id };
      if ("expectedUpdatedAt" in body) {
        const expected = new Date(body.expectedUpdatedAt);
        if (!body.expectedUpdatedAt || Number.isNaN(expected.getTime())) {
          return NextResponse.json({ message: "Reload the Team tab before publishing." }, { status: 400 });
        }
        filter.updatedAt = expected;
      }
      const changes = Object.fromEntries(fields.map((key) => [key, payload[key]]));
      about = await About.findOneAndUpdate(filter, { $set: changes }, { new: true });
      if (!about) {
        return NextResponse.json({ message: "The About page changed. Reload the dashboard and try again." }, { status: 409 });
      }
    } else {
      about = await About.create(payload);
    }

    revalidateSite();

    return NextResponse.json({
      message: "About updated",
      about: normalizeAboutContent(about.toObject()),
    });
  } catch (error) {
    console.error("PUT /api/about error:", error);
    return NextResponse.json(
      { message: "Failed to update about" },
      { status: 500 }
    );
  }
}
