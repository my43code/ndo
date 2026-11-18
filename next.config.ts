import type { NextConfig } from "next";

const privateAuthHeaders = [
  { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
  { key: "CDN-Cache-Control", value: "no-store" },
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp"],
    localPatterns: [
      { pathname: "/api/media/**" },
      { pathname: "/**", search: "" },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      ...["/admin/:path*", "/login", "/forgot-password", "/api/auth/:path*"].map((source) => ({
        source,
        headers: privateAuthHeaders,
      })),
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
