"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  diagnosticProfile,
  formationIACommon,
} from "@/data/formation-ia-content";
import styles from "./DiagnosticIA.module.css";

/**
 * 4-question interactive diagnostic.
 * Score 0..16 → profile from diagnosticProfile().
 */
export function DiagnosticIA() {
  const { questions } = formationIACommon.diagnostic;
  const { primary } = formationIACommon.ctaFinal;

  const [answers, setAnswers] = useState<number[]>([]);

  const done = answers.length === questions.length;
  const score = answers.reduce((a, b) => a + b, 0);
  const profile = done ? diagnosticProfile(score) : null;

  const current = questions[answers.length];

  function choose(points: number) {
    setAnswers((prev) => [...prev, points]);
  }

  function reset() {
    setAnswers([]);
  }

  if (done && profile) {
    return (
      <div className={styles.wrap}>
        <div className={styles.result}>
          <div className={styles.profileLabel}>Votre profil</div>
          <h3 className={styles.profileName}>{profile.name}</h3>
          <p className={styles.profileMessage}>{profile.message}</p>
          <div className={styles.actions}>
            <Button href={primary.href} size="lg">
              Réserver l&apos;appel gratuit
            </Button>
            <button type="button" onClick={reset} className={styles.reset}>
              Recommencer le diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    // Defensive: questions array shouldn't be empty, but typecheck-safe.
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div
        className={styles.progress}
        aria-live="polite"
        aria-atomic="true"
      >
        Question {answers.length + 1} / {questions.length}
      </div>
      <h3 className={styles.question}>{current.question}</h3>
      <div className={styles.choices} role="radiogroup" aria-label={current.question}>
        {current.choices.map((c, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={false}
            className={styles.choice}
            onClick={() => choose(c.points)}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
