"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  computeROI,
  formationIACommon,
} from "@/data/formation-ia-content";
import styles from "./ROITimeCalculator.module.css";

/**
 * Interactive ROI/time-savings calculator.
 * Split layout: title + sliders on the left, projection result on the right.
 * 4 sliders → live computeROI() projection (60 % recoverable, monthly figure).
 */
export function ROITimeCalculator() {
  const { eyebrow, title, intro, sliders, resultLabel, subtext, cta } =
    formationIACommon.roiCalculator;

  const [values, setValues] = useState<Record<string, number>>(() =>
    sliders.reduce<Record<string, number>>((acc, s) => {
      acc[s.id] = s.default;
      return acc;
    }, {})
  );

  const { mensuelLabel, mensuelH } = computeROI(values);

  function update(id: string, v: number) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  // Replace {mensuelLabel} in resultLabel and bold the **...** segment.
  const filled = resultLabel.replace("{mensuelLabel}", mensuelLabel);
  const parts = filled.split(/\*\*(.+?)\*\*/g);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <div className={styles.sliders}>
            {sliders.map((s) => (
              <div key={s.id} className={styles.slider}>
                <div className={styles.sliderHeader}>
                  <label htmlFor={`roi-${s.id}`} className={styles.label}>
                    {s.label}
                  </label>
                  <span className={styles.value} aria-live="polite">
                    {values[s.id]} h
                  </span>
                </div>
                <input
                  id={`roi-${s.id}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={values[s.id]}
                  onChange={(e) => update(s.id, Number(e.target.value))}
                  className={styles.range}
                  aria-label={s.label}
                />
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.result} aria-live="polite">
          <p className={styles.resultEyebrow}>Projection mensuelle</p>
          <p className={styles.bigNumber}>
            <span className={styles.bigNumberValue}>{mensuelH}</span>
            <span className={styles.bigNumberUnit}>h&nbsp;/&nbsp;mois</span>
          </p>
          <p className={styles.resultLabel}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
          <p className={styles.subtext}>{subtext}</p>
          <div className={styles.cta}>
            <Button href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
