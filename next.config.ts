import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Acesso ao dev server via Tailscale (sem isso o Next bloqueia /_next/* e a página não hidrata).
  allowedDevOrigins: ["100.113.113.100"],
  // standalone é para o Docker; na Vercel conflita com o adaptador da plataforma (ENOENT next-server.js.nft.json).
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
