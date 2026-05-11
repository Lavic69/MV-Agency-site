import React from "react";
import styles from "./Article.module.css";

export type ComparisonRow = {
  feature: string;
  values: Array<string | boolean>;
  highlight?: boolean;
};

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  caption?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ columns, rows, caption }) => {
  return (
    <figure className={styles.comparisonWrap}>
      {/* Mobile : cards stack vertical (visible <768px) */}
      <div className={styles.comparisonMobile}>
        {columns.map((col, ci) => (
          <div key={col} className={styles.comparisonMobileCard}>
            <div className={styles.comparisonMobileCardTitle}>{col}</div>
            <ul className={styles.comparisonMobileList}>
              {rows.map((row) => {
                const val = row.values[ci];
                if (val === false) return null;
                return (
                  <li key={row.feature}>
                    <strong>{row.feature}</strong>
                    {typeof val === "string" && <span> : {val}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {/* Desktop : table (visible ≥768px) */}
      <div className={styles.comparisonScroll}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th scope="col" aria-label="Critère"></th>
              {columns.map((col, i) => (
                <th key={i} scope="col">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={row.highlight ? styles.comparisonHighlight : undefined}>
                <th scope="row" className={styles.comparisonFeature}>{row.feature}</th>
                {row.values.map((value, j) => (
                  <td key={j} className={typeof value === "boolean" ? (value ? styles.comparisonYes : styles.comparisonNo) : undefined}>
                    {typeof value === "boolean" ? (value ? "✓" : "—") : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className={styles.comparisonCaption}>{caption}</figcaption>}
    </figure>
  );
};
