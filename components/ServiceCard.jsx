import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service, index }) {
  const {
    title = "Service",
    description = "",
    shortDescription = "",
    image = "/images/project1.webp",
    video,
    link = "",
  } = service || {};

  const mediaSrc = video || image;
  const isVideo = Boolean(video);
  const hasLink = typeof link === "string" && link.trim().length > 0;
  const isExternalLink = hasLink && /^https?:\/\//i.test(link);

  return (
    <article className="gradient-border group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-emerald-400/25 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300 backdrop-blur">
          {isVideo ? "Video" : "Service"}
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-7 text-slate-400">
          {shortDescription || description || "No description available."}
        </p>

        {hasLink ? (
          <div className="mt-auto pt-6">
            {isExternalLink ? (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Explore this service
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            ) : (
              <Link
                href={link}
                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Explore this service
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
