import { FOUNDER_NAME } from "@/lib/seo";
import styles from "./Article.module.css";

type ArticleHeaderProps = {
  /** Étiquette catégorie ou pilier (ex : "IA & Automatisation PME") */
  eyebrow: string;
  /** Titre H1 de l'article */
  title: string;
  /** ISO date YYYY-MM-DD de publication */
  publishedAt: string;
  /** ISO date YYYY-MM-DD de la dernière mise à jour */
  updatedAt: string;
  /** Image cover (url relative `/public` ou absolue) */
  coverImage: string;
  /** Texte alternatif descriptif de l'image */
  coverAlt: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function ArticleHeader({
  eyebrow,
  title,
  publishedAt,
  updatedAt,
  coverImage,
  coverAlt,
}: ArticleHeaderProps) {
  const showUpdatedNotice = updatedAt !== publishedAt;

  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.metaRow}>
        <span className={styles.metaAuthor}>Par {FOUNDER_NAME}</span>
        <span className={styles.metaSeparator}>·</span>
        <time dateTime={publishedAt}>Publié le {formatDate(publishedAt)}</time>
        {showUpdatedNotice && (
          <>
            <span className={styles.metaSeparator}>·</span>
            <span className={styles.metaUpdated}>Mis à jour le {formatDate(updatedAt)}</span>
          </>
        )}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverImage}
        alt={coverAlt}
        className={styles.coverImage}
        loading="eager"
      />
    </header>
  );
}
