import { COMPANY_NAME } from "@/lib/siteDefaults";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_URL = process.env.NEXTAUTH_URL || "https://manumaso.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Manu Maso Digital Solutions delivers cutting-edge websites, digital systems, and technology services for businesses and organizations in Papua New Guinea and beyond.",
  keywords: [
    "web development",
    "digital solutions",
    "IT support",
    "Papua New Guinea",
    COMPANY_NAME,
    "software development",
    "cloud solutions",
    "mobile apps",
    "database systems",
    "Port Moresby",
  ],
  icons: {
    icon: "/images/manu-maso-logo.png",
    apple: "/images/manu-maso-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: COMPANY_NAME,
    title: COMPANY_NAME,
    description:
      "Professional web development, IT support, and digital solutions for PNG businesses.",
    images: [{ url: "/images/manu-maso-logo.png", width: 512, height: 512, alt: COMPANY_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description:
      "Professional web development, IT support, and digital solutions for PNG businesses.",
    images: ["/images/manu-maso-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/images/manu-maso-logo.png`,
  description:
    "Manu Maso Digital Solutions delivers cutting-edge websites, digital systems, and technology services for businesses in Papua New Guinea.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Moresby",
    addressCountry: "PG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+675-78337326",
    contactType: "customer service",
    email: "info@manumaso.com",
  },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-200 antialiased selection:bg-emerald-400/30 selection:text-white">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
