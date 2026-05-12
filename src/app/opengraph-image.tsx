import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

// Image OG par défaut (globale) générée dynamiquement au build/à la demande.
// Next.js injecte automatiquement les balises <meta property="og:image*" />
// à partir de ce fichier — aucune référence manuelle nécessaire dans metadata.

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Palette alignée sur la signature de marque :
// gradient diagonal noir → navy MV → primary blue → indigo,
// même esprit que LiquidEther (#1A1F4B / #2563EB / #4F46E5) en statique.
const COLORS = {
  bg0: "#050510",
  bg1: "#1A1F4B",
  bg2: "#2563EB",
  bg3: "#4F46E5",
  accent: "#60A5FA",
  text: "#FFFFFF",
  textMuted: "#CBD5E1",
};

export default async function OpengraphImage() {
  // Logo officiel : anneau bleu MV (Logo_Rond_MV_V2 du brand kit),
  // embarqué en data URI car Satori ne supporte pas les filtres du SVG d'origine.
  const logoBuffer = await fs.readFile(
    path.join(process.cwd(), "public", "brand", "og-logo.png")
  );
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${COLORS.bg0} 0%, ${COLORS.bg1} 38%, ${COLORS.bg2} 78%, ${COLORS.bg3} 100%)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bloc du haut : brand (vrai logo bleu MV) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUri}
            alt=""
            width={84}
            height={84}
            style={{ display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: 700,
              color: COLORS.text,
              letterSpacing: "-0.5px",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Bloc du milieu : titre principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "900px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 900,
              color: COLORS.text,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Création de site web & IA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              fontWeight: 400,
              color: COLORS.textMuted,
              lineHeight: 1.2,
            }}
          >
            pour TPE, PME & indépendants
          </div>
        </div>

        {/* Bloc du bas : localisations + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.10)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              La Réunion
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.10)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              Belgique
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.10)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              France
            </div>
          </div>

          <div
            style={{
              display: "flex",
              color: COLORS.text,
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            mvagency.ai
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
