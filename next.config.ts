import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  images: {
    domains: ["images.unsplash.com", "images.prismic.io"],
  },
  /* config options here */
};

export default nextConfig;
