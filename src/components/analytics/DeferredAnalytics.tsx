"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Wrapper qui sort Vercel Analytics + Speed Insights du critical path JS.
 *
 * Les composants natifs (`<Analytics />`, `<SpeedInsights />`) sont chargés
 * pendant l'hydratation initiale, ce qui pénalise le Script Evaluation
 * sur le main thread mobile (~50-100 ms TBT mesurés sur lighthouse mobile).
 *
 * Ici on les charge via `next/dynamic` (`ssr: false` car ce sont des hooks
 * purs côté client) et on attend `requestIdleCallback` pour les mount,
 * garantissant qu'ils n'interfèrent pas avec le LCP. Fallback `setTimeout`
 * de 1500 ms pour Safari < 17 qui n'a pas RIC.
 */

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => ({ default: m.SpeedInsights })),
  { ssr: false }
);

export function DeferredAnalytics() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    type IdleCallbackHandle = number;
    type RICWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => IdleCallbackHandle;
      cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
    };
    const w = window as RICWindow;
    const ric = w.requestIdleCallback;
    const cic = w.cancelIdleCallback;

    if (typeof ric === "function") {
      const handle = ric(() => setShouldMount(true), { timeout: 3000 });
      return () => {
        if (typeof cic === "function") cic(handle);
      };
    }

    const t = window.setTimeout(() => setShouldMount(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!shouldMount) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
