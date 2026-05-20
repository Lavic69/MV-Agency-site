"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  diagnosticProfile,
  formationIACommon,
} from "@/data/formation-ia-content";
import { TextReveal } from "@/components/ui/TextReveal";
import styles from "./DiagnosticIA.module.css";

/**
 * 4-question interactive diagnostic, presented in a single elevated
 * call-to-action card. Score 0..16 → profile from diagnosticProfile().
 */
export function DiagnosticIA() {
  const { eyebrow, title, intro, questions } = formationIACommon.diagnostic;
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

  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>
            <TextReveal>{title}</TextReveal>
          </h2>
          <p className={styles.intro}>{intro}</p>
        </header>

        {done && profile ? (
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
        ) : current ? (
          <>
            <div
              className={styles.progress}
              aria-live="polite"
              aria-atomic="true"
            >
              Question {answers.length + 1} / {questions.length}
            </div>
            <h3 className={styles.question}>{current.question}</h3>
            <div
              className={styles.choices}
              role="radiogroup"
              aria-label={current.question}
            >
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
          </>
        ) : null}
      </div>
    </div>
  );
}
