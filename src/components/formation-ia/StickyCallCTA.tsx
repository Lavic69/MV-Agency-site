"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./StickyCallCTA.module.css";

/**
 * Floating mobile-only CTA. Appears after the user scrolls > 60vh.
 * Hidden on desktop via CSS media query.
 */
export function StickyCallCTA() {
  const [visible, setVisible] = useState(false);
  const { primary } = formationIACommon.ctaFinal;

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ""}`}>
      <Link href={primary.href} className={styles.cta}>
        {primary.label}
      </Link>
    </div>
  );
}
