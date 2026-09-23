import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Acesso ao dev server via Tailscale (sem isso o Next bloqueia /_next/* e a página não hidrata).
  allowedDevOrigins: ["100.113.113.100"],
  output: "standalone",
};

export default nextConfig;
