import type { NextConfig } from "next";

/**
 * Configuration Next.js.
 *
 * `images.remotePatterns` autorise l'optimisation par `next/image` des assets
 * hébergés en dehors du projet (Unsplash pour les photos placeholder, svgl.app
 * pour les logos animés du LogoLoop sur la home).
 *
 * `images.formats` priorise AVIF (≈20% plus léger que WebP) avec fallback WebP.
 *
 * `images.minimumCacheTTL` met le cache navigateur des images optimisées à
 * 1 an : nos assets sont versionnés par hash, donc la fraîcheur n'est jamais
 * un problème, autant maximiser le cache.
 *
 * NOTE : `experimental.inlineCss` a été testé en PR #23 et reverté ici. Il
 * inlinait tout le CSS (~27 KB) dans le <head>, gonflant le HTML de 35 KB à
 * 671 KB. Sur slow 4G (PSI mobile), le first paint attendait que la totalité
 * du HTML soit téléchargée, ce qui dégradait TBT (10 → 180 ms) sans bénéfice
 * sur LCP. Le défaut Next.js (CSS en chunks parallèles, cssChunking: true)
 * est plus performant pour notre profile de bundle.
 */
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
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
