"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Wrapper pour LiquidEther. Stratégie de chargement adaptative pour minimiser
 * le coût CPU/GPU sans dégrader l'expérience visuelle :
 *
 *   1. SKIP TOTAL sur mobile (<769px) : l'animation est mouse-reactive, donc
 *      sans souris elle n'a aucun sens et three.js (~150 KB gzip) tue le TBT.
 *
 *   2. SKIP TOTAL si `prefers-reduced-motion: reduce` : un fond fluide en
 *      mouvement constant est exactement ce que ces utilisateurs cherchent
 *      à éviter.
 *
 *   3. Sur desktop, MOUNT différé de 3 secondes après FCP pour laisser
 *      le navigateur atteindre TTI avec un TBT bas. Cette fenêtre couvre
 *      le LCP (texte hero) et l'hydratation des composants critiques.
 *
 *   4. PAUSE si `document.visibilityState !== "visible"` (onglet inactif,
 *      fenêtre minimisée) : aucun utilisateur ne regarde, autant arrêter
 *      le WebGL et libérer le CPU.
 *
 * Choix design assumé : l'animation reste active pendant TOUT le scroll de
 * la page (pas juste le hero). Le fond fluide est un élément d'identité
 * visuelle qu'on veut voir partout pour la cohérence, on accepte le coût
 * CPU/GPU associé sur desktop.
 *
 * Sur mobile + reduced-motion + tab inactif, on retourne `null` → fond noir
 * `--bg-neutral` reprend la main.
 */

const LiquidEther = dynamic(() => import("./LiquidEther"), {
  ssr: false,
  loading: () => null,
});

type LiquidEtherDesktopOnlyProps = {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  style?: CSSProperties;
};

const DESKTOP_MQ = "(min-width: 769px)";
const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";
const MOUNT_DELAY_MS = 3000;

export default function LiquidEtherDesktopOnly(props: LiquidEtherDesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mountDelayElapsed, setMountDelayElapsed] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Detect desktop + prefers-reduced-motion (réactif aux changements de prefs).
  useEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const reducedMq = window.matchMedia(REDUCED_MOTION_MQ);
    setIsDesktop(desktopMq.matches);
    setPrefersReducedMotion(reducedMq.matches);

    const onDesktop = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const onReduced = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    desktopMq.addEventListener("change", onDesktop);
    reducedMq.addEventListener("change", onReduced);
    return () => {
      desktopMq.removeEventListener("change", onDesktop);
      reducedMq.removeEventListener("change", onReduced);
    };
  }, []);

  // Mount delay : laisse passer LCP/TTI avant d'initialiser three.js.
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const timer = setTimeout(() => setMountDelayElapsed(true), MOUNT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isDesktop, prefersReducedMotion]);

  // Pause si l'onglet est inactif.
  useEffect(() => {
    if (!isDesktop) return;
    const update = () => setIsPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [isDesktop]);

  // Toutes les gates additionnées : skip si une seule échoue.
  if (prefersReducedMotion) return null;
  if (!isDesktop || !mountDelayElapsed) return null;
  if (!isPageVisible) return null;

  return <LiquidEther {...props} />;
}
