import { ImageResponse } from "next/og";
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

// Palette : reprend les couleurs de LiquidEther dans le layout pour cohérence visuelle.
const COLORS = {
  bgGradientFrom: "#0b0b0f",
  bgGradientVia: "#1A1F4B",
  bgGradientTo: "#4F46E5",
  accent: "#60A5FA",
  text: "#FFFFFF",
  textMuted: "#CBD5E1",
};

export default async function OpengraphImage() {
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
          background: `linear-gradient(135deg, ${COLORS.bgGradientFrom} 0%, ${COLORS.bgGradientVia} 50%, ${COLORS.bgGradientTo} 100%)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cercle décoratif flou en arrière-plan */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0) 70%)",
            display: "flex",
          }}
        />

        {/* Bloc du haut : brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.bgGradientTo} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.text,
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            MV
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
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
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "72px",
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
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              La Réunion
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Belgique
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                color: COLORS.text,
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              France
            </div>
          </div>

          <div
            style={{
              display: "flex",
              color: COLORS.accent,
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
