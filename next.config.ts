import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cosmicjs.com",
      },
      {
        protocol: "https",
        hostname: "imgix.cosmicjs.com",
      },
    ],
  },
};

export default nextConfig;
