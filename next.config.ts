import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "your-real-image-host.com"], // Add all domains you use for images
  },
};

export default nextConfig;
