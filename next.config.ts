import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/daily-challenge",
        destination: "/challenges",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
