/**
 * Microsoft Clarity — heatmaps & session recordings, gratuit, illimité.
 *
 * État actuel : DORMANT.
 *
 * Le composant ne charge le snippet que si DEUX conditions sont réunies :
 *   1. La variable d'environnement `NEXT_PUBLIC_CLARITY_ID` est définie.
 *   2. L'utilisateur a accepté les cookies analytics (cf. ConsentBanner — non
 *      encore en place).
 *
 * Tant que `NEXT_PUBLIC_CLARITY_ID` n'est pas définie, le composant retourne
 * `null` et n'injecte aucun script. Le code reste prêt pour activation future
 * sans toucher au layout.
 *
 * Pour activer :
 *   1. Créer un projet Clarity gratuit sur https://clarity.microsoft.com/
 *   2. Coller l'ID du projet dans la variable `NEXT_PUBLIC_CLARITY_ID` côté Vercel.
 *   3. Brancher le ConsentBanner pour le passage à `granted`.
 */

"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from "@/lib/consent";

export function Clarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    // Réagit aux changements de consentement (ConsentBanner émet un CustomEvent).
    const handler = () => setConsented(hasAnalyticsConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, handler);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
  }, []);

  if (!clarityId || !consented) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}
