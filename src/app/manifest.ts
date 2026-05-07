import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Web App Manifest. Référence le logo SVG existant pour les icônes — les PNGs
 * dédiés (192x192, 512x512, apple-touch-icon 180x180) devront être ajoutés
 * dans /public/icons/ pour une prise en charge complète Android / iOS.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "design"],
    lang: "fr-FR",
    icons: [
      {
        src: "/Logo_Rond_MV_V2.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
