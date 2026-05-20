"use client";

import { useRef, useState } from "react";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./BeforeAfterIA.module.css";

/**
 * Drag-to-compare before/after IA workflow card.
 *
 * V0 behavior: both panes are visible side-by-side in a 2-column grid.
 * The vertical handle is a visual cue that the user can drag — it follows
 * the cursor / finger between 0% and 100% but does not clip the panes.
 */
export function BeforeAfterIA() {
  const { workflowName, before, after } = formationIACommon.beforeAfter;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updateFromClientX(clientX: number) {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  }

  function stopDrag() {
    setDragging(false);
  }

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches.length === 0) return;
    setDragging(true);
    updateFromClientX(e.touches[0].clientX);
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!dragging) return;
    if (e.touches.length === 0) return;
    updateFromClientX(e.touches[0].clientX);
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.workflow}>Workflow</p>
      <p className={styles.workflowName}>{workflowName}</p>

      <div
        ref={viewportRef}
        className={styles.viewport}
        role="slider"
        aria-label="Comparateur avant / après IA"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={stopDrag}
      >
        <div className={styles.panes}>
          <div className={`${styles.pane} ${styles.paneBefore}`}>
            <p className={`${styles.paneLabel} ${styles.paneLabelBefore}`}>
              Avant
            </p>
            <p className={styles.duree}>{before.duree}</p>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Outils</p>
              <ul className={styles.outils}>
                {before.outils.map((o) => (
                  <li key={o} className={styles.outil}>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Qualité</p>
              <p className={styles.quality}>{before.quality}</p>
            </div>
          </div>

          <div className={`${styles.pane} ${styles.paneAfter}`}>
            <p className={`${styles.paneLabel} ${styles.paneLabelAfter}`}>
              Après IA
            </p>
            <p className={styles.duree}>{after.duree}</p>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Outils</p>
              <ul className={styles.outils}>
                {after.outils.map((o) => (
                  <li key={o} className={styles.outil}>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Qualité</p>
              <p className={styles.quality}>{after.quality}</p>
            </div>
          </div>
        </div>

        <div
          className={styles.handle}
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className={styles.handleGrip}>⇄</span>
        </div>
      </div>
    </div>
  );
}
