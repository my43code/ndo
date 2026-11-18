import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { publicPages } from "@/lib/publicPages";
import { getPosts } from "@/lib/siteContent";

export const revalidate = 3600;

export const metadata = {
  title: "Site map",
  description: "Browse the Manu Maso website and all published updates.",
  alternates: { canonical: "/site-map" },
};

export default async function SiteMapPage() {
  const posts = await getPosts();
  return (
    <div className="relative bg-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">Site <span className="text-emerald-400">map</span></h1>
          <a href="/sitemap.xml" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-white">
            XML sitemap <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <nav aria-label="Main pages" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {publicPages.map(({ href, title, description }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/50 hover:bg-emerald-400/5 focus-visible:outline-2 focus-visible:outline-emerald-400">
              <span className="flex items-center justify-between gap-2 font-semibold text-white">
                {title} <ArrowUpRight size={17} aria-hidden="true" className="text-emerald-400 transition-transform motion-safe:group-hover:-translate-y-1" />
              </span>
              <span className="mt-2 block text-sm leading-6 text-slate-400">{description}</span>
            </Link>
          ))}
        </nav>
        <Link href="/search" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-white">
          Search the site <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <details open className="group mt-10 rounded-2xl border border-white/10 bg-white/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
            <span>Published updates <span className="ml-2 text-sm text-emerald-300">{posts.length}</span></span>
            <ChevronDown size={18} aria-hidden="true" className="text-emerald-400 transition-transform group-open:rotate-180" />
          </summary>
          {posts.length ? (
            <ul className="grid gap-2 border-t border-white/10 p-5 sm:grid-cols-2">
              {posts.map(({ _id, title }) => (
                <li key={_id}>
                  <Link prefetch={false} href={`/updates/${_id}`} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-emerald-400/10 hover:text-white">
                    {title} <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-emerald-400" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-t border-white/10 p-5 text-sm text-slate-400">No updates to display.</p>
          )}
        </details>
      </div>
    </div>
  );
}
