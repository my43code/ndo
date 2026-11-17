import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleGrid from "@/components/ParticleGrid";
import Image from "next/image";
import { getSiteAbout } from "@/lib/siteContent";
import { getTelHref, getWhatsAppHref } from "@/lib/contactLinks";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

function DetailRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
        <Icon className="text-emerald-400" size={18} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-sm leading-7 text-slate-200">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="block rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.06]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      {content}
    </div>
  );
}

export default async function ContactPage() {
  const about = await getSiteAbout();
  const contact = about.contact || {};
  const companyName = contact.companyName || "Manu Maso";
  const tagline =
    contact.tagline ||
    "Digital systems, modern websites, and dependable support.";
  const mapHref =
    contact.mapUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(contact.address || companyName)}`;
  const whatsappHref = getWhatsAppHref(contact.whatsapp, contact.phone);
  const phoneHref = getTelHref(contact.phone);

  return (
    <main className="bg-slate-950">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(250,204,21,0.06),transparent_40%)]" />
        </div>
        <ParticleGrid />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur">
              <MessageCircle size={16} />
              Contact
            </span>
            <h1 className="hero-fade-up-delay-1 mt-6 text-5xl font-black tracking-tight md:text-7xl">
              Let&apos;s talk about your{" "}
              <span className="gradient-text">next build.</span>
            </h1>
            <p className="hero-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {tagline} Reach out with a project brief, support request, or
              partnership idea and we will respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT DETAILS + FORM ═══ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Get in touch"
            title="Contact Details & Response Form"
            subtitle="We read every message carefully and usually respond within one business day."
            align="left"
          />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal direction="left">
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/team.webp"
                  alt={`${companyName} contact`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
                    Office profile
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
                    {companyName}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">
                    {tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-6">
                <DetailRow
                  icon={MapPin}
                  label="Address"
                  value={
                    contact.address ||
                    "Port Moresby, Papua New Guinea"
                  }
                  href={mapHref}
                />
                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={contact.email || "info@manumaso.com"}
                  href={`mailto:${contact.email || "info@manumaso.com"}`}
                />
                <DetailRow
                  icon={Phone}
                  label="Phone"
                  value={contact.phone || "+675 78337326"}
                  href={phoneHref}
                />
                <DetailRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value={contact.phone || "+675 78337326"}
                  href={whatsappHref}
                />

                {contact.hours ? (
                  <DetailRow
                    icon={Clock}
                    label="Hours"
                    value={contact.hours}
                  />
                ) : null}

                <div className="flex flex-wrap gap-3 pt-3">
                  <a
                    href={`mailto:${contact.email || "info@manumaso.com"}`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
                  >
                    Email us
                  </a>
                  <a
                    href={mapHref}
                    target={mapHref.startsWith("http") ? "_blank" : undefined}
                    rel={
                      mapHref.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-400/30 hover:bg-white/10"
                  >
                    Open map
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
