/**
 * Google Analytics 4 — mesure d'audience complémentaire à Vercel Analytics.
 *
 * État : ACTIF en production (propriété GA4 « MV Agency »), dormant en dev
 * sauf NEXT_PUBLIC_GA_ID — cf. src/lib/tracking-config.ts.
 *
 * Ce composant ne fait QUE charger la lib gtag.js en différé (idle, via
 * DeferredAnalytics). Tout le reste vit ailleurs :
 *   - file d'attente, consent default, `config` : AnalyticsBootstrap
 *     (synchrone au parse — aucun event précoce perdu) ;
 *   - bascule du Consent Mode au choix du visiteur : setAnalyticsConsent
 *     (src/lib/consent.ts) ;
 *   - routage des custom events : trackEvent (src/lib/analytics.ts).
 *
 * RGPD / Consent Mode v2 : sans consentement, aucun cookie — pings anonymes.
 * Après accord via le ConsentBanner : mesure complète (cookies _ga, 13 mois).
 *
 * Côté GA4, vérifier que la mesure améliorée « Changements de page
 * (historique) » est activée — c'est elle qui tracke les navigations SPA.
 */

"use client";

import Script from "next/script";
import { GA_ID } from "@/lib/tracking-config";

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <Script
      id="ga4-lib"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  );
}
