"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./BeforeAfterIA.module.css";

type ViewState = "before" | "after";

/**
 * Toggle-based before/after IA comparator.
 *
 * Two pill buttons at the top ("Sans IA" / "Avec IA") switch the card
 * below between two content states with a crossfade. Replaces the
 * previous drag-slider interaction, which was fragile across browsers.
 */
export function BeforeAfterIA() {
  const { workflowName, before, after } = formationIACommon.beforeAfter;
  const reduced = useReducedMotion();

  const [view, setView] = useState<ViewState>("before");
  const data = view === "before" ? before : after;
  const isAfter = view === "after";

  return (
    <div className={styles.wrap}>
      <p className={styles.workflow}>Workflow</p>
      <p className={styles.workflowName}>{workflowName}</p>

      <div
        className={styles.toggle}
        role="group"
        aria-label="Comparer avec ou sans IA"
      >
        <button
          type="button"
          aria-pressed={!isAfter}
          className={`${styles.toggleBtn} ${
            !isAfter ? styles.toggleBtnActive : ""
          }`}
          onClick={() => setView("before")}
        >
          Sans IA
        </button>
        <button
          type="button"
          aria-pressed={isAfter}
          className={`${styles.toggleBtn} ${
            isAfter ? styles.toggleBtnActive : ""
          }`}
          onClick={() => setView("after")}
        >
          Avec IA
        </button>
      </div>

      <div
        className={`${styles.card} ${isAfter ? styles.cardAfter : styles.cardBefore}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className={styles.cardInner}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={`${styles.label} ${isAfter ? styles.labelAfter : styles.labelBefore}`}>
              {isAfter ? "Avec IA" : "Sans IA"}
            </p>
            <p className={styles.duree}>{data.duree}</p>

            <div className={styles.metric}>
              <p className={styles.metricLabel}>Outils</p>
              <ul className={styles.outils}>
                {data.outils.map((o) => (
                  <li key={o} className={styles.outil}>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.metric}>
              <p className={styles.metricLabel}>Qualité</p>
              <p className={styles.quality}>{data.quality}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
