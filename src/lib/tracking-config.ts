/**
 * IDs des outils de mesure — source unique pour le bootstrap et les loaders.
 *
 * En production les IDs sont actifs par défaut (hardcodés — un Measurement ID
 * est public de toute façon, visible dans le source de n'importe quel site).
 * En dev ils sont absents pour ne pas polluer les stats avec le trafic local ;
 * les env vars NEXT_PUBLIC_* permettent de les surcharger (tests, staging).
 */

/** Google Analytics 4 — propriété « MV Agency ». */
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? "G-Q3D2LHMFJ0" : undefined);

/** Google Tag Manager — conteneur « MV Agency ». */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID ??
  (process.env.NODE_ENV === "production" ? "GTM-KWSDWLR5" : undefined);
