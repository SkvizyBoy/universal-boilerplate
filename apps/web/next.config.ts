import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.19.160.1', 'localhost'],
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
