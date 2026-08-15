import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["fs", "path", "crypto"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
