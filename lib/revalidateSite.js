import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateSite() {
  revalidateTag("site-content", { expire: 0 });
  revalidatePath("/", "layout");
  revalidatePath("/updates/[id]", "page");
  revalidatePath("/sitemap.xml");
}
