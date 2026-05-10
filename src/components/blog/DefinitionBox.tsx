import React from "react";
import styles from "./Article.module.css";

interface DefinitionBoxProps {
  term: string;
  children: React.ReactNode;
  label?: string;
}

export const DefinitionBox: React.FC<DefinitionBoxProps> = ({ term, children, label = "DÉFINITION" }) => {
  return (
    <aside className={styles.defbox} aria-label={`Définition : ${term}`}>
      <div className={styles.defboxLabel}>— {label}</div>
      <dfn className={styles.defboxTerm}>{term}</dfn>
      <div className={styles.defboxDesc}>{children}</div>
    </aside>
  );
};
