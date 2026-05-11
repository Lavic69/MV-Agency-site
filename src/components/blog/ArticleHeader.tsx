import React from "react";
import { CoverKeyword } from "./CoverKeyword";
import { TextReveal } from "@/components/ui/TextReveal";
import type { CoverKeyword as CoverKeywordType } from "@/app/blog/_articles";
import { formatDateMono, formatDateLong } from "@/lib/formatDate";
import { FOUNDER_NAME } from "@/lib/seo";
import styles from "./Article.module.css";

interface ArticleHeaderProps {
  pillarLabel: string;        // libellé affiché dans le pillar tag, ex: "Création de site web"
  num: string;                // numéro article 2 chars, ex: "01"
  keyword: CoverKeywordType;
  title: string;
  publishedAt: string;        // ISO YYYY-MM-DD
  updatedAt: string;          // ISO YYYY-MM-DD
  readingTime: number;        // en minutes
  authorName?: string;        // par défaut FOUNDER_NAME (Victor Marchetti)
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  pillarLabel,
  num,
  keyword,
  title,
  publishedAt,
  updatedAt,
  readingTime,
  authorName = FOUNDER_NAME,
}) => {
  const showUpdated = updatedAt !== publishedAt;

  return (
    <header className={styles.header}>
      <div className={styles.heroBox}>
        <div className={styles.heroPillar}>— {pillarLabel}</div>
        <div className={styles.heroNum}>Nº {num}</div>
        <div className={styles.heroBigword}>
          <CoverKeyword keyword={keyword} size="xl" />
        </div>
        <div className={styles.heroTitleStack}>
          <h1 className={styles.heroTitle}><TextReveal>{title}</TextReveal></h1>
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
                Maj <time dateTime={updatedAt}>{formatDateLong(updatedAt)}</time>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
