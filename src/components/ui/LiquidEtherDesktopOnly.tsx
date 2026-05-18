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
 *   5. PAUSE si l'utilisateur a scrollé au-delà du premier viewport (avec
 *      debounce 800 ms anti-thrash pour les scrolls courts) : le fond n'est
 *      plus visible sous le contenu opaque, l'animation devient invisible
 *      mais continue à consommer en arrière-plan sans cela.
 *
 * Sur mobile + reduced-motion + offscreen, on retourne `null` → fond noir
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
const SCROLL_PAUSE_DEBOUNCE_MS = 800;
const HERO_VIEWPORT_MULTIPLIER = 1.2;

export default function LiquidEtherDesktopOnly(props: LiquidEtherDesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mountDelayElapsed, setMountDelayElapsed] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);

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

  // Pause si l'utilisateur a scrollé au-delà du hero (debounce 800 ms).
  useEffect(() => {
    if (!isDesktop) return;
    let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let rafTicking = false;

    const evaluate = () => {
      rafTicking = false;
      const scrolledPastHero = window.scrollY > window.innerHeight * HERO_VIEWPORT_MULTIPLIER;
      if (scrolledPastHero) {
        if (!scrollTimeoutId) {
          scrollTimeoutId = setTimeout(() => {
            setIsHeroInView(false);
            scrollTimeoutId = null;
          }, SCROLL_PAUSE_DEBOUNCE_MS);
        }
      } else {
        if (scrollTimeoutId) {
          clearTimeout(scrollTimeoutId);
          scrollTimeoutId = null;
        }
        setIsHeroInView(true);
      }
    };

    const onScroll = () => {
      if (!rafTicking) {
        requestAnimationFrame(evaluate);
        rafTicking = true;
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
    };
  }, [isDesktop]);

  // Toutes les gates additionnées : skip si une seule échoue.
  if (prefersReducedMotion) return null;
  if (!isDesktop || !mountDelayElapsed) return null;
  if (!isPageVisible || !isHeroInView) return null;

  return <LiquidEther {...props} />;
}
