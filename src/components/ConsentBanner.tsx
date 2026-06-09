/**
 * Bandeau de consentement analytics (CNIL « cookies et autres traceurs »).
 *
 * S'affiche tant que le visiteur n'a pas choisi (localStorage vide), puis plus
 * jamais — sauf réouverture via « Gérer les cookies » (footer).
 *
 * Accepter → GA4 passe en mesure complète (cookies) + Clarity se charge si
 * configuré. Refuser → GA4 reste en Consent Mode v2 sans cookies (pings
 * anonymes). Les deux boutons ont le même poids : un clic chacun.
 *
 * Le choix lui-même est tracké (consent_granted / consent_denied) via
 * trackEvent — Vercel Analytics étant sans cookies, c'est légal dans les deux
 * cas et ça donne le taux d'acceptation.
 */

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  getStoredConsent,
  setAnalyticsConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { trackEvent, EVENTS } from "@/lib/analytics";
import styles from "./ConsentBanner.module.css";

// Hors composant : références stables pour useSyncExternalStore.
function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
}

// Sentinelle SSR/hydratation : on ne rend rien tant que le client n'a pas lu
// localStorage — évite un flash du bandeau chez les visiteurs ayant déjà choisi.
const PENDING = "pending";
const getServerSnapshot = () => PENDING as typeof PENDING;

export function ConsentBanner() {
  const stored = useSyncExternalStore<ConsentChoice | null | typeof PENDING>(
    subscribeToConsent,
    getStoredConsent,
    getServerSnapshot,
  );

  // Réouverture manuelle via le lien « Gérer les cookies » du footer.
  const [reopened, setReopened] = useState(false);
  useEffect(() => {
    const handler = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handler);
  }, []);

  if (stored === PENDING) return null;
  if (stored !== null && !reopened) return null;

  const choose = (choice: ConsentChoice) => {
    setAnalyticsConsent(choice);
    trackEvent(choice === "granted" ? EVENTS.CONSENT_GRANTED : EVENTS.CONSENT_DENIED);
    setReopened(false);
  };

  return (
    <div className={styles.banner} role="dialog" aria-label="Consentement aux cookies">
      <p className={styles.text}>
        Ce site utilise Google Analytics pour mesurer son audience. Sans votre
        accord, aucun cookie n&apos;est déposé.{" "}
        <Link href="/politique-de-confidentialite" className={styles.link}>
          En savoir plus
        </Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.refuse} onClick={() => choose("denied")}>
          Refuser
        </button>
        <button type="button" className={styles.accept} onClick={() => choose("granted")}>
          Accepter
        </button>
      </div>
    </div>
  );
}

/**
 * Lien « Gérer les cookies » (footer) — rouvre le bandeau pour modifier son
 * choix à tout moment (exigence CNIL de retrait aussi simple que l'accord).
 * `className` : style de lien du parent (ex. Footer.module.css).
 */
export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      Gérer les cookies
    </button>
  );
}
