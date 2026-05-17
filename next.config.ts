import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.45",
    "192.168.0.45:3000",
    "http://192.168.0.45:3000",
    "localhost",
    "localhost:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;