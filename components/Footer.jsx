import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { getSiteAbout } from "@/lib/siteContent";
import { getTelHref, getWhatsAppHref } from "@/lib/contactLinks";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-emerald-500/15 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      {children}
    </a>
  );
}

export default async function Footer() {
  const about = await getSiteAbout();
  const contact = about.contact || {};
  const companyName = contact.companyName || "Manu Maso";
  const tagline =
    contact.tagline ||
    "Digital systems, modern websites, and dependable support.";
  const whatsappHref = getWhatsAppHref(contact.whatsapp, contact.phone);
  const phoneHref = getTelHref(contact.phone);

  return (
    <footer className="border-t border-white/5 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_0.9fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/images/manu-maso-logo.png"
                alt="Manu Maso"
                width={44}
                height={44}
                className="rounded-lg object-contain"
              />
              <div className="leading-tight">
                <h2 className="text-xl font-black tracking-wide text-white">
                  Manu<span className="text-emerald-400"> Maso</span>
                </h2>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Digital Solutions
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <SocialLink href={contact.facebook} label="Facebook">
                <FaFacebookF size={16} />
              </SocialLink>
              <SocialLink href={contact.linkedin} label="LinkedIn">
                <FaLinkedinIn size={16} />
              </SocialLink>
              <SocialLink href={whatsappHref} label="WhatsApp">
                <FaWhatsapp size={16} />
              </SocialLink>
              <SocialLink
                href={`mailto:${contact.email}`}
                label="Email"
              >
                <FaEnvelope size={16} />
              </SocialLink>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Explore
            </h4>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Updates", href: "/updates" },
                { name: "Contact Us", href: "/contact" },
                { name: "YuTok AI", href: "/yutok" },
                { name: "Admin", href: "/login" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Contact
            </h4>
            <div className="mt-5 space-y-4 text-sm">
              <p className="font-bold text-white">{companyName}</p>

              {contact.address ? (
                <div className="flex gap-3 text-slate-400">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-emerald-400/60" />
                  <p>{contact.address}</p>
                </div>
              ) : null}

              {contact.email ? (
                <div className="flex gap-3 text-slate-400">
                  <FaEnvelope className="mt-1 shrink-0 text-emerald-400/60" />
                  <a
                    className="transition hover:text-white"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
              ) : null}

              {contact.phone ? (
                <div className="flex gap-3 text-slate-400">
                  <FaPhoneAlt className="mt-1 shrink-0 text-emerald-400/60" />
                  <a className="transition hover:text-white" href={phoneHref}>
                    {contact.phone}
                  </a>
                </div>
              ) : null}

              {contact.hours ? (
                <p className="text-slate-500">{contact.hours}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>&copy; 2026 Manu Maso. All rights reserved.</p>
          <p className="text-xs text-slate-600">
            Powered by Next.js, React & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
