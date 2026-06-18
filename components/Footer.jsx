import Link from "next/link";
import Logo from "./Logo";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { getSiteAbout } from "@/lib/siteContent";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-slate-950"
    >
      {children}
    </a>
  );
}

export default async function Footer() {
  const about = await getSiteAbout();
  const contact = about.contact || {};
  const companyName = contact.companyName || "Nexus DevOps Limited";
  const tagline =
    contact.tagline ||
    "Digital systems, modern websites, and dependable support.";

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <div className="mb-5">
            <Logo />
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
            {tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <SocialLink href={contact.facebook || "https://www.facebook.com/"} label="Facebook">
              <FaFacebookF />
            </SocialLink>
            <SocialLink href={contact.linkedin || "https://www.linkedin.com/"} label="LinkedIn">
              <FaLinkedinIn />
            </SocialLink>
            <SocialLink
              href={
                contact.whatsapp ||
                `https://wa.me/${(contact.phone || "").replace(/[^0-9]/g, "")}`
              }
              label="WhatsApp"
            >
              <FaWhatsapp />
            </SocialLink>
            <SocialLink href={`mailto:${contact.email || "info@ndo.com"}`} label="Email">
              <FaEnvelope />
            </SocialLink>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300">
            Explore
          </h4>
          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/about" className="transition hover:text-white">
              About Us
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/updates" className="transition hover:text-white">
              Updates
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact Us
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Admin
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300">
            Contact
          </h4>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <p className="font-semibold text-white">{companyName}</p>

            {contact.address ? (
              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-emerald-300" />
                <p>{contact.address}</p>
              </div>
            ) : null}

            {contact.email ? (
              <div className="flex gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-emerald-300" />
                <a className="transition hover:text-white" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            ) : null}

            {contact.phone ? (
              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 shrink-0 text-emerald-300" />
                <a className="transition hover:text-white" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </div>
            ) : null}

            {contact.hours ? <p>{contact.hours}</p> : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-400">
        © 2026 Nexus DevOps Limited. All rights reserved.
      </div>
    </footer>
  );
}
