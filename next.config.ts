import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["got-scraping"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "in.bmscdn.com",
      },
      {
        protocol: "https",
        hostname: "assets-in.bmscdn.com",
      },
      {
        protocol: "https",
        hostname: "img-global.cpcdn.com",
      },
    ],
  },
};

export default nextConfig;
