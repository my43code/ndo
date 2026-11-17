const BASE_URL = process.env.NEXTAUTH_URL || "https://manumaso.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/login", "/forgot-password"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
