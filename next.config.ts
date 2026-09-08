import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // placeholder photo hosts — swap for the real CDN when photos move off URL-paste
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
