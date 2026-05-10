"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Wrapper pour LiquidEther :
 *   1. Charge le bundle three.js de manière LAZY (next/dynamic + ssr:false)
 *   2. Skip totalement le composant sur mobile (<769px)
 *   3. Sur desktop, différe le mount de 1200ms après FCP pour laisser le
 *      navigateur atteindre TTI avec un TBT bas. L'animation prend la main
 *      ensuite, le temps que les chunks critiques soient parsés.
 *
 * Raison : LiquidEther est un effet fluide piloté par la souris. Sur tactile,
 * l'expérience interactive n'existe pas. En plus, three.js (~150 KB gzip) +
 * 1170 lignes de WebGL custom consomment ~20-29s de CPU à l'init (shaders,
 * WebGL context, premières frames), ce qui dégrade massivement le TBT.
 *
 * Sur mobile, on retourne `null` → fond noir `--bg-neutral` reprend la main.
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
const MOUNT_DELAY_MS = 1200;

export default function LiquidEtherDesktopOnly(props: LiquidEtherDesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Différé : mount LiquidEther 1200ms après FCP côté desktop seulement.
  // Pendant ce délai le navigateur peut atteindre TTI avec TBT bas.
  useEffect(() => {
    if (!isDesktop) return;
    const timer = setTimeout(() => setShouldMount(true), MOUNT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  if (!isDesktop || !shouldMount) return null;
  return <LiquidEther {...props} />;
}
