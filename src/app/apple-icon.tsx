import { ImageResponse } from "next/og";

/**
 * Apple Touch Icon — 180×180 PNG.
 * Utilisé par iOS lors d'un "Ajouter à l'écran d'accueil" depuis Safari, ainsi
 * que par certaines apps (Slack, Outlook…) pour les aperçus de partage.
 *
 * Sans ce fichier, iOS génère un screenshot tronqué de la page d'accueil —
 * illisible et non brandé.
 *
 * Design aligné sur src/app/icon.tsx : monogramme MV sur dégradé navy → bleu.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: "76px",
          letterSpacing: "-0.04em",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
          // iOS applique automatiquement un masque arrondi : pas besoin de
          // border-radius, le système s'en occupe.
          lineHeight: 1,
        }}
      >
        MV
      </div>
    ),
    {
      ...size,
    }
  );
}
