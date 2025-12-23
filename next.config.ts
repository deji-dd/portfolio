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
};

export default nextConfig;
