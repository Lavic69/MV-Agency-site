/**
 * Consentement analytics — source de vérité partagée entre le ConsentBanner
 * et les intégrations qui posent (ou peuvent poser) des cookies :
 * Microsoft Clarity, Google Analytics 4.
 *
 * Modèle :
 *   - localStorage[CONSENT_STORAGE_KEY] ∈ { "granted", "denied" } — absent tant
 *     que le visiteur n'a pas choisi (le ConsentBanner s'affiche alors).
 *   - Chaque changement émet CONSENT_CHANGE_EVENT ; les intégrations écoutent :
 *     GA4 passe en Consent Mode `granted`, Clarity se charge.
 *   - CONSENT_OPEN_EVENT rouvre le bandeau (lien « Gérer les cookies » du footer,
 *     exigence CNIL : retirer son consentement doit être aussi simple que le donner).
 *
 * Sans consentement, GA4 reste en Consent Mode v2 `denied` : aucun cookie,
 * pings anonymes uniquement.
 */

export const CONSENT_STORAGE_KEY = "mv-analytics-consent";
export const CONSENT_CHANGE_EVENT = "mv-consent-change";
export const CONSENT_OPEN_EVENT = "mv-consent-open";

export type ConsentChoice = "granted" | "denied";

/** Lit le choix stocké. `null` = pas encore de choix (bandeau à afficher). */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Lit le consentement analytics. `false` côté serveur ou si localStorage indisponible. */
export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "granted";
}

/** Enregistre le choix et notifie toutes les intégrations à l'écoute. */
export function setAnalyticsConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // localStorage indisponible (navigation privée stricte) — le choix ne
    // persistera pas, mais l'event permet quand même d'agir sur la session.
  }
  if (choice === "denied") purgeAnalyticsCookies();
  // Bascule du Consent Mode Google directement ici : le stub gtag existe dès
  // le parse (AnalyticsBootstrap), donc l'update est mis en file même si le
  // choix intervient avant le chargement différé de gtag.js/gtm.js.
  try {
    window.gtag?.("consent", "update", {
      analytics_storage: choice === "granted" ? "granted" : "denied",
    });
  } catch {
    // l'analytics ne doit jamais casser l'app
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));
}

/**
 * Supprime les cookies GA (`_ga`, `_ga_*`) après un retrait de consentement —
 * le retrait doit être effectif, pas seulement déclaratif (CNIL).
 * Tente les variantes de domaine (hôte exact et domaine parent) car GA pose
 * ses cookies sur le domaine de premier niveau.
 */
function purgeAnalyticsCookies(): void {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  const host = window.location.hostname;
  const parentDomain = "." + host.split(".").slice(-2).join(".");
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name || !name.startsWith("_ga")) continue;
    document.cookie = `${name}=; ${expired}`;
    document.cookie = `${name}=; ${expired}; domain=${host}`;
    document.cookie = `${name}=; ${expired}; domain=${parentDomain}`;
  }
}

/** Rouvre le bandeau de consentement (lien « Gérer les cookies »). */
export function openConsentBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
