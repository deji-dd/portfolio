import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/apple-touch-icon.png",
        destination: "/favicon.ico",
        permanent: false,
      },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/favicon.ico",
        permanent: false,
      },
    ];
  },
  allowedDevOrigins: ["100.99.211.68"],
};

export default nextConfig;
