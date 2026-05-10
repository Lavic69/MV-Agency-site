import type { NextConfig } from "next";

/**
 * Configuration Next.js.
 *
 * `images.remotePatterns` autorise l'optimisation par `next/image` des assets
 * hébergés en dehors du projet (Unsplash pour les photos placeholder, svgl.app
 * pour les logos animés du LogoLoop sur la home).
 *
 * Sans cette whitelist, `next/image` lève une erreur runtime sur les hosts non
 * déclarés.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "svgl.app",
      },
    ],
  },
};

export default nextConfig;
