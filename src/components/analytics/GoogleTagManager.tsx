/**
 * Google Tag Manager — conteneur de tags marketing (pixels, conversions, etc.).
 *
 * État : ACTIF en production (conteneur « MV Agency »), dormant en dev sauf
 * NEXT_PUBLIC_GTM_ID — cf. src/lib/tracking-config.ts.
 *
 * Architecture : GA4 N'EST PAS chargé via GTM mais en direct (cf.
 * GoogleAnalytics.tsx). Ne JAMAIS ajouter de tag Google Analytics pour
 * G-Q3D2LHMFJ0 dans le conteneur GTM — cela compterait chaque visite deux
 * fois. GTM ne sert qu'aux tags tiers ajoutés depuis l'interface GTM.
 *
 * Consentement : le consent default est posé par AnalyticsBootstrap (synchrone,
 * toujours avant gtm.js). Tout tag ajouté dans GTM doit déclarer ses exigences
 * de consentement (GTM → Admin → Consent Overview) pour le respecter — par
 * défaut ad_storage est `denied` : me prévenir avant d'ajouter des tags
 * publicitaires, il faudra étendre le ConsentBanner.
 *
 * Déclencheurs : chaque event du funnel (contact_cta_clicked,
 * cal_booking_opened, …) est aussi poussé au format message GTM par
 * `trackEvent` — utilisable tel quel comme déclencheur « Custom Event ».
 *
 * Pas de variante <noscript> volontairement : l'iframe ns.html ne peut pas
 * respecter le Consent Mode (pas de JS) et n'apporte rien tant que le
 * conteneur n'a pas de tags image.
 */

"use client";

import Script from "next/script";
import { GTM_ID } from "@/lib/tracking-config";

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script
      id="gtm-loader"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}
