import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
export const metadata = {
  title: {
    default: "Manu Maso | Digital Solutions",
    template: "%s | Manu Maso",
  },
  description:
    "Manu Maso delivers cutting-edge websites, digital systems, and technology services for businesses and organizations in Papua New Guinea and beyond.",
  keywords: [
    "web development",
    "digital solutions",
    "IT support",
    "Papua New Guinea",
    "Manu Maso",
    "software development",
    "cloud solutions",
  ],
  icons: {
    icon: "/images/manu-maso-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-200 antialiased selection:bg-emerald-400/30 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
