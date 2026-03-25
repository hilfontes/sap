import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/default/:path*', 
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
