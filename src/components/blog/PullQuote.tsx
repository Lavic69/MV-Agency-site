import React from "react";
import styles from "./Article.module.css";

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution }) => {
  return (
    <figure className={styles.pullQuote}>
      <span className={styles.pullQuoteMark} aria-hidden="true">“</span>
      <blockquote className={styles.pullQuoteText}>{children}</blockquote>
      {attribution && (
        <figcaption className={styles.pullQuoteAttr}>— {attribution}</figcaption>
      )}
    </figure>
  );
};
