"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  formationIACommon,
  detectSector,
} from "@/data/formation-ia-content";
import styles from "./MiniAuditIA.module.css";

/**
 * MiniAuditIA — canned interactive "mini audit" module.
 *
 * - User types a short description of their activity (max 80 chars).
 * - detectSector() matches keywords against the 10 canned sectors.
 *   If matched: returns 3 sector-specific actionable axes.
 *   If not matched: falls back to defaultAxes (generic but useful).
 * - Reveals the 3 axes with a typewriter animation (char-by-char,
 *   280ms pause between axes).
 * - Respects prefers-reduced-motion: reveals all 3 axes instantly.
 * - Honest disclaimer: this is a sample, the real audit goes deeper.
 *
 * Typewriter safety: a ref-based cancellation token (animationIdRef) is
 * bumped on each submit so any in-flight typewriter from a previous
 * submit stops before stepping again. This prevents two animations
 * fighting over `revealedAxes` if the user re-submits quickly.
 */
export function MiniAuditIA() {
  const c = formationIACommon.miniAudit;
  const [input, setInput] = useState("");
  const [revealedAxes, setRevealedAxes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Cancellation token for the typewriter so re-submits don't race.
  const animationIdRef = useRef(0);

  // Cancel any in-flight animation on unmount.
  useEffect(() => {
    return () => {
      animationIdRef.current += 1;
    };
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().length < 5) return;
    const sector = detectSector(input);
    const axes = sector ? sector.axes : c.defaultAxes;
    setSubmitted(true);

    // Bump the animation token — any prior in-flight step() will bail.
    animationIdRef.current += 1;
    const myId = animationIdRef.current;

    if (prefersReducedMotion) {
      setRevealedAxes([...axes]);
      return;
    }
    setRevealedAxes([]);
    typewriter(axes, setRevealedAxes, () => animationIdRef.current === myId);
  }

  const disabled = input.trim().length < 5;

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit}>
        <textarea
          className={styles.input}
          rows={2}
          placeholder={c.placeholder}
          maxLength={80}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Décrivez votre activité"
        />
        <p className={styles.counter}>{input.length} / 80</p>
        <div className={styles.submitRow}>
          <Button type="submit" size="lg" disabled={disabled}>
            Lancer le mini-audit
          </Button>
        </div>
      </form>

      {submitted && (
        <div className={styles.result} aria-live="polite">
          <p className={styles.resultLabel}>
            3 axes IA actionnables pour vous
          </p>
          {revealedAxes.map((axe, i) => (
            <p key={i} className={styles.axe}>
              {axe}
            </p>
          ))}
          <p className={styles.honesty}>
            Ceci est un échantillon. L&apos;audit réel (gratuit, 30 min) va
            beaucoup plus loin sur votre cas précis.
          </p>
          <div className={styles.ctaRow}>
            <Button href={c.ctaAfter.href} size="lg">
              {c.ctaAfter.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/**
 * Reveal `axes` char-by-char with 18ms per char and 280ms pause between
 * axes. `isAlive` is checked at the top of every step; when it returns
 * false (because the cancellation token advanced) the chain stops.
 */
function typewriter(
  axes: readonly string[],
  setRevealed: (v: string[]) => void,
  isAlive: () => boolean
) {
  let axeIdx = 0;
  let charIdx = 0;
  let buffer: string[] = [];
  const step = () => {
    if (!isAlive()) return;
    if (axeIdx >= axes.length) return;
    const target = axes[axeIdx];
    if (charIdx === 0) buffer = [...buffer, ""];
    buffer[axeIdx] = target.slice(0, charIdx + 1);
    setRevealed([...buffer]);
    charIdx++;
    if (charIdx >= target.length) {
      axeIdx++;
      charIdx = 0;
      setTimeout(step, 280);
    } else {
      setTimeout(step, 18);
    }
  };
  step();
}
