/**
 * Google Analytics 4 — mesure d'audience complémentaire à Vercel Analytics.
 *
 * État : ACTIF en production (propriété GA4 « MV Agency » — G-Q3D2LHMFJ0).
 * En dev, dormant sauf si `NEXT_PUBLIC_GA_ID` est défini (le composant retourne
 * `null`, aucun script injecté) — évite de polluer les stats avec le trafic local.
 * `NEXT_PUBLIC_GA_ID` (Vercel ou .env.local) reste prioritaire sur le fallback.
 *
 * RGPD / Consent Mode v2 :
 *   - gtag.js démarre avec `analytics_storage: denied` → AUCUN cookie posé.
 *     GA4 reçoit des pings anonymes (events visibles, attribution modélisée).
 *   - Si l'utilisateur accepte via le futur ConsentBanner (cf. src/lib/consent.ts),
 *     on passe à `granted` → mesure complète avec cookies.
 *
 * Côté GA4, vérifier que la mesure améliorée « Changements de page (historique) »
 * est activée — c'est elle qui tracke les navigations SPA.
 *
 * Les custom events (contact_cta_clicked, cal_booking_opened, …) sont routés
 * vers GA4 par `trackEvent` (src/lib/analytics.ts) — rien à faire par page.
 */

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from "@/lib/consent";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? "G-Q3D2LHMFJ0" : undefined);

export function GoogleAnalytics() {
  // Upgrade Consent Mode → granted dès que le consentement est (ou devient) accordé.
  useEffect(() => {
    if (!GA_ID) return;

    const syncConsent = () => {
      if (hasAnalyticsConsent()) {
        window.gtag?.("consent", "update", { analytics_storage: "granted" });
      }
    };

    syncConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {/* Bootstrap inline AVANT la lib : file d'attente dataLayer + consent default.
          L'ordre dans la queue garantit que `consent default` précède `config`,
          donc aucun cookie n'est posé sans consentement. */}
      <Script
        id="ga4-bootstrap"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
      <Script
        id="ga4-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
