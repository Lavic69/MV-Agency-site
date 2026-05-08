/**
 * Helper centralisé pour tracker des événements custom.
 *
 * Routage :
 *  - Vercel Web Analytics (sans cookies, gratuit) — toujours actif.
 *  - Microsoft Clarity (heatmap) — si chargé ET consentement donné.
 *  - Google Analytics 4 — non câblé pour l'instant (ajouter ici quand le bandeau
 *    de consentement RGPD sera prêt et que `NEXT_PUBLIC_GA_ID` sera défini).
 *
 * Convention de nommage des events : `snake_case`, verbe au passé.
 *   ex : `cal_booking_opened`, `pack_selected`, `contact_form_submitted`.
 *
 * Usage :
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("cal_booking_opened", { source: "contact_page" });
 */

import { track as vercelTrack } from "@vercel/analytics";

type EventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    clarity?: (action: "event" | "set" | "identify" | "consent", ...args: unknown[]) => void;
  }
}

/**
 * Envoie un événement custom à toutes les sources de tracking actives.
 * Silencieux côté serveur (no-op) et côté client si la lib Vercel n'a pas chargé.
 */
export function trackEvent(name: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  // 1. Vercel Analytics (toujours actif, sans cookies)
  try {
    vercelTrack(name, props);
  } catch {
    // Silencieux — l'analytics ne doit jamais casser l'app
  }

  // 2. Microsoft Clarity (uniquement si chargé)
  try {
    window.clarity?.("event", name);
  } catch {
    // idem
  }
}

/**
 * Événements clés du funnel — listés ici pour autocomplete + cohérence
 * cross-pages. Toujours préférer ces constantes à des strings inline.
 */
export const EVENTS = {
  CAL_BOOKING_OPENED: "cal_booking_opened",
  CAL_BOOKING_COMPLETED: "cal_booking_completed",
  CONTACT_CTA_CLICKED: "contact_cta_clicked",
  PACK_SELECTED: "pack_selected",
  PHONE_CLICKED: "phone_clicked",
  EMAIL_CLICKED: "email_clicked",
  BLOG_ARTICLE_OPENED: "blog_article_opened",
  GEO_PAGE_CTA_CLICKED: "geo_page_cta_clicked",
} as const;
