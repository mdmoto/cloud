import type { NextConfig } from "next";
import path from "path";

// Configuration for Next.js static HTML export on Cloudflare Pages
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
