import { readInlineImage } from "@/lib/contentImages";

const inlineImage = /^data:image\/(png|jpe?g|webp|gif|avif);base64,([A-Za-z0-9+/=]+)$/i;

export async function GET(request, { params }) {
  const { collection, id } = await params;
  let record;
  try {
    record = await readInlineImage(collection, id);
  } catch (error) {
    console.error("Could not read image:", error.name);
    return new Response(null, { status: 503 });
  }

  const match = typeof record?.image === "string" && inlineImage.exec(record.image);
  if (!match) return new Response(null, { status: 404 });

  const [, extension, encoded] = match;
  const format = extension.toLowerCase() === "jpg" ? "jpeg" : extension.toLowerCase();
  const version = String(new Date(record.updatedAt).getTime() || 0);
  const isVersioned = new URL(request.url).searchParams.get("v") === version;
  const bytes = Buffer.from(encoded, "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": `image/${format}`,
      "Content-Length": String(bytes.length),
      "Cache-Control": isVersioned ? "public, max-age=86400, stale-while-revalidate=604800" : "public, max-age=60",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
