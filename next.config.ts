import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.redalyc.org",
      },
    ],
  },
};

export default nextConfig;
