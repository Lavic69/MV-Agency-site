import React from "react";
import { CoverKeyword } from "./CoverKeyword";
import type { CoverKeyword as CoverKeywordType } from "@/app/blog/_articles";
import styles from "./Article.module.css";

interface ArticleHeaderProps {
  pillarLabel: string;        // libellé affiché dans le pillar tag, ex: "CRÉATION SITE WEB"
  num: string;                // numéro article 2 chars, ex: "01"
  keyword: CoverKeywordType;
  title: string;
  publishedAt: string;        // ISO YYYY-MM-DD
  updatedAt: string;          // ISO YYYY-MM-DD
  readingTime: number;        // en minutes
  authorName?: string;        // par défaut "Victor Marchetti"
}

const formatDateMono = (iso: string): string => {
  // Format JJ.MM.AA pour le hero (cohérent avec la signature monospace)
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
};

const formatDateLong = (iso: string): string => {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  pillarLabel,
  num,
  keyword,
  title,
  publishedAt,
  updatedAt,
  readingTime,
  authorName = "Victor Marchetti",
}) => {
  const showUpdated = updatedAt !== publishedAt;

  return (
    <header className={styles.header}>
      <div className={styles.heroBox}>
        <div className={styles.heroPillar}>— {pillarLabel.toUpperCase()}</div>
        <div className={styles.heroNum}>Nº {num}</div>
        <div className={styles.heroBigword}>
          <CoverKeyword keyword={keyword} size="xl" />
        </div>
        <div className={styles.heroTitleStack}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <div className={styles.heroSep} aria-hidden="true" />
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaAuthor}>
              Par <strong>{authorName}</strong>
            </span>
            <time className={styles.heroMetaMono} dateTime={publishedAt}>
              {formatDateMono(publishedAt)}
            </time>
            <span className={styles.heroMetaMono}>{readingTime} MIN</span>
            {showUpdated && (
              <span className={styles.heroMetaUpdated}>
                Maj {formatDateLong(updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
