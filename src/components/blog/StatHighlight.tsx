import React from "react";
import styles from "./Article.module.css";

interface StatHighlightProps {
  value: string;        // ex: "94%", "1 900 €", "x4"
  label: string;        // étiquette courte uppercase, ex: "PREMIÈRE IMPRESSION"
  description: string;  // 1-2 phrases de contexte
  source?: string;      // source courte, ex: "Stanford Web Credibility Project, 2024"
}

export const StatHighlight: React.FC<StatHighlightProps> = ({ value, label, description, source }) => {
  return (
    <aside className={styles.stat} role="figure" aria-label={`${label}: ${description}`}>
      <div className={styles.statNum}>{value}</div>
      <div className={styles.statText}>
        <div className={styles.statLabel}>— {label}</div>
        <p className={styles.statDesc}>{description}</p>
        {source && <div className={styles.statSource}>Source : {source}</div>}
      </div>
    </aside>
  );
};
