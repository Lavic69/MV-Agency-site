/**
 * Consentement analytics — source de vérité partagée entre les intégrations
 * qui posent (ou peuvent poser) des cookies : Microsoft Clarity, Google Analytics 4.
 *
 * Le ConsentBanner (pas encore en place) devra :
 *   1. Écrire `granted` / `denied` dans localStorage sous CONSENT_STORAGE_KEY.
 *   2. Émettre `window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))`.
 *
 * Tant qu'aucun consentement n'est enregistré, les intégrations restent en mode
 * sans cookies (Clarity : non chargé ; GA4 : Consent Mode v2 `denied`).
 */

export const CONSENT_STORAGE_KEY = "mv-analytics-consent";
export const CONSENT_CHANGE_EVENT = "mv-consent-change";

/** Lit le consentement analytics. `false` côté serveur ou si localStorage indisponible. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}
