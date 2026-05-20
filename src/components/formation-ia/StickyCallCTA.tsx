"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./StickyCallCTA.module.css";

/**
 * Floating mobile-only CTA. Appears after the user scrolls > 60vh.
 * Hidden on desktop via CSS media query.
 *
 * Also auto-hides when the final FormationCTA banner enters the viewport,
 * since at that point the user already sees a primary CTA — the sticky
 * version would otherwise overlap the footer copyright and the in-banner
 * button.
 */
export function StickyCallCTA() {
  const [scrolledPastFold, setScrolledPastFold] = useState(false);
  const [finalCtaInView, setFinalCtaInView] = useState(false);
  const { primary } = formationIACommon.ctaFinal;

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setScrolledPastFold(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // The final CTA banner sits inside <main>; the last <section> in <main>
    // is the FormationCTA wrapper. Once any part of it enters the viewport
    // (rootMargin grows the trigger zone upward so the sticky disappears
    // a touch before the banner button is visible), the sticky hides.
    const candidates = document.querySelectorAll("main > section, main > div");
    const finalBanner = candidates[candidates.length - 1];
    if (!finalBanner) return;
    const obs = new IntersectionObserver(
      (entries) => {
        setFinalCtaInView(entries[0]?.isIntersecting ?? false);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    obs.observe(finalBanner);
    return () => obs.disconnect();
  }, []);

  const visible = scrolledPastFold && !finalCtaInView;

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <Link href={primary.href} className={styles.cta}>
        {primary.label}
      </Link>
    </div>
  );
}
