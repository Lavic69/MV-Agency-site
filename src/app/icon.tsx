import { ImageResponse } from "next/og";

/**
 * Icônes PNG dynamiques générées à la volée par Next.js (Next 16 file-based metadata).
 * Trois variantes émises pour couvrir favicon navigateur, manifest Android et splash :
 *   - 32×32  : favicon classique (onglet navigateur)
 *   - 192×192 : home screen Android + manifest PWA
 *   - 512×512 : splash screen Android, app drawer, partages haute résolution
 *
 * Design : monogramme "MV" centré sur fond MV Navy (#1A1F4B), liseré bleu primaire.
 * Cohérent avec la palette du site (cf. layout.tsx + opengraph-image.tsx).
 */

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { contentType: "image/png", size: { width: 32, height: 32 }, id: "favicon" },
    { contentType: "image/png", size: { width: 192, height: 192 }, id: "android-192" },
    { contentType: "image/png", size: { width: 512, height: 512 }, id: "android-512" },
  ];
}

const SIZES: Record<string, number> = {
  favicon: 32,
  "android-192": 192,
  "android-512": 512,
};

export default function Icon({ id }: { id: string }) {
  const size = SIZES[id] ?? 192;
  // Le ratio police/canvas reste constant pour que le rendu soit lisible
  // à toutes les tailles (32px → 512px).
  const fontSize = Math.round(size * 0.42);
  const padding = Math.round(size * 0.12);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1F4B 0%, #2563EB 100%)",
          color: "#FFFFFF",
          fontWeight: 900,
          fontSize: `${fontSize}px`,
          letterSpacing: "-0.04em",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
          padding: `${padding}px`,
          boxSizing: "border-box",
          lineHeight: 1,
        }}
      >
        MV
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
