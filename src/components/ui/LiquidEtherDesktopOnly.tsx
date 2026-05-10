"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Wrapper pour LiquidEther :
 *   1. Charge le bundle three.js de manière LAZY (next/dynamic + ssr:false)
 *   2. Skip totalement le composant sur mobile (<769px)
 *
 * Raison : LiquidEther est un effet fluide piloté par la souris. Sur tactile,
 * l'expérience interactive n'existe pas. En plus, three.js (~150 KB gzip) +
 * 1170 lignes de WebGL custom consomment ~29s de CPU sur un mobile bas de
 * gamme, ce qui dégrade massivement le TBT Lighthouse.
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

export default function LiquidEtherDesktopOnly(props: LiquidEtherDesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) return null;
  return <LiquidEther {...props} />;
}
