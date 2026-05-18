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
 * `experimental.inlineCss` inline tout le CSS dans <style> du <head>, ce qui
 * supprime les 6 fichiers CSS render-blocking observés dans Lighthouse mobile
 * (-650 ms sur le LCP estimé).
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
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
