import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "reqres.in",
        protocol: "https",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
