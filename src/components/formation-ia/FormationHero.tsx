"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";
import {
  formationIACommon,
  territoires,
  type Territoire,
} from "@/data/formation-ia-content";
import styles from "./FormationHero.module.css";

interface Props {
  territoire: Territoire;
}

export function FormationHero({ territoire }: Props) {
  const t = territoires[territoire];
  const c = formationIACommon.hero;

  const strikeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const el = strikeRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(el, {
      strokeDashoffset: 0,
      duration: 1.1,
      delay: 0.9,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.pillSlot}>
        <AvailabilityPill />
      </div>
      <p className={styles.eyebrow}>Formation IA · {t.nom}</p>
      <h1 className={styles.h1}>
        <TextReveal>{c.h1Main}</TextReveal>{" "}
        <span className={styles.strikeWrap}>
          <span className={styles.strikeText}>{c.h1Strike}</span>
          <svg
            className={styles.strikeSvg}
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={strikeRef}
              d="M2 14 C 80 6, 160 18, 298 8"
              fill="none"
              stroke="var(--primary-400)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>
      <p className={styles.sub}>{c.sub}</p>
      <div className={styles.ctas}>
        <Button href={c.ctaPrimary.href} variant="primary" size="lg">
          {c.ctaPrimary.label}
        </Button>
        <Button href={c.ctaSecondary.href} variant="outline" size="lg">
          {c.ctaSecondary.label}
        </Button>
      </div>
    </section>
  );
}
