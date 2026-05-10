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
