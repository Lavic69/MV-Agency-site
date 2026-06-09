import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { GA_ID, GTM_ID } from "@/lib/tracking-config";

/**
 * Bootstrap analytics SYNCHRONE — rendu serveur, exécuté au parse du HTML,
 * avant l'hydratation et toute interaction possible.
 *
 * Pourquoi pas dans DeferredAnalytics ? Les libs (gtag.js ~70 KB, gtm.js
 * ~300 KB) y sont chargées à l'idle pour protéger le LCP — mais sans file
 * d'attente préalable, tout event tiré avant ce mount (clic CTA rapide, choix
 * du ConsentBanner, cal_booking_opened précoce) était silencieusement perdu
 * pour GA4/GTM (bug confirmé en revue). Ce script ne coûte rien (~600 octets,
 * zéro réseau) : il crée les stubs `dataLayer`/`gtag` et y met en file
 * consentement + config. Les libs rejouent la file entière à leur chargement —
 * ordre garanti : consent default → config → events précoces.
 *
 * Le consent default lit le choix stocké (cf. ConsentBanner) de façon
 * synchrone : un visiteur revenant qui a accepté envoie son premier page_view
 * directement en `granted`, sans course avec l'effet React.
 */
export function AnalyticsBootstrap() {
  if (!GA_ID && !GTM_ID) return null;

  return (
    <script
      id="analytics-bootstrap"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var stored = null;
          try { stored = localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: stored === 'granted' ? 'granted' : 'denied'
          });
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { cookie_expires: 33696000 }); /* 13 mois — plafond CNIL */` : ""}
        `,
      }}
    />
  );
}
