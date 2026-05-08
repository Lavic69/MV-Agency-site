import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Web App Manifest — déclare les icônes PWA et les couleurs d'app.
 *
 * Les icônes sont générées dynamiquement par `src/app/icon.tsx`
 * (Next 16 file-based metadata + generateImageMetadata) :
 *   - /icon/favicon      → 32×32  (favicon navigateur)
 *   - /icon/android-192  → 192×192 (Android home screen)
 *   - /icon/android-512  → 512×512 (Android splash + app drawer)
 *
 * Le pendant iOS est `src/app/apple-icon.tsx` (180×180), référencé
 * automatiquement par Next via `<link rel="apple-touch-icon">`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#1A1F4B",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "design"],
    lang: "fr-FR",
    icons: [
      {
        src: "/icon/android-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/android-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/android-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
