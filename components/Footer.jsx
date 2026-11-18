import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { publicPages } from "@/lib/publicPages";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { createDefaultContact } from "@/lib/siteDefaults";
import { getTelHref, getWhatsAppHref } from "@/lib/contactLinks";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-emerald-500/15 hover:text-emerald-400"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const contact = createDefaultContact();
  const companyName = contact.companyName;
  const tagline = contact.tagline;
  const whatsappHref = getWhatsAppHref(contact.whatsapp, contact.phone);
  const phoneHref = getTelHref(contact.phone);

  return (
    <footer className="border-t border-white/5 bg-slate-950 text-white">
      {/* CTA strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div>
            <h3 className="text-lg font-bold text-white">
              Ready to start your project?
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Get in touch and let&apos;s build something great.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:brightness-110"
          >
            Contact Us
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
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

            <div className="mt-6 flex flex-wrap gap-2">
              <SocialLink href={contact.facebook} label="Facebook">
                <FaFacebookF size={14} />
              </SocialLink>
              <SocialLink href={contact.linkedin} label="LinkedIn">
                <FaLinkedinIn size={14} />
              </SocialLink>
              <SocialLink href={whatsappHref} label="WhatsApp">
                <FaWhatsapp size={14} />
              </SocialLink>
              <SocialLink
                href={`mailto:${contact.email}`}
                label="Email"
              >
                <FaEnvelope size={14} />
              </SocialLink>
            </div>
          </div>

          <nav aria-label="Footer site map">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Navigation
            </h4>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {publicPages.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
              <Link href="/site-map" className="inline-flex items-center gap-1 font-semibold text-emerald-300 hover:text-white">
                Full site map <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </nav>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
              Contact
            </h4>
            <div className="mt-5 space-y-4 text-sm">
              <p className="font-bold text-white">{companyName}</p>

              <div className="flex gap-3 text-slate-400">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-emerald-400/60" size={12} />
                <p>{contact.address}</p>
              </div>

              <div className="flex gap-3 text-slate-400">
                <FaEnvelope className="mt-1 shrink-0 text-emerald-400/60" size={12} />
                <a
                  className="transition hover:text-white"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </div>

              <div className="flex gap-3 text-slate-400">
                <FaPhoneAlt className="mt-1 shrink-0 text-emerald-400/60" size={12} />
                <a className="transition hover:text-white" href={phoneHref}>
                  {contact.phone}
                </a>
              </div>

              <p className="text-slate-500">{contact.hours}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Manu Maso. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/sitemap.xml" className="transition hover:text-white">XML sitemap</a>
            <a href="/login" className="transition hover:text-white">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
