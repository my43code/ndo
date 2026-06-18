import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  experimental: {
    workerThreads: true,
    webpackBuildWorker: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
