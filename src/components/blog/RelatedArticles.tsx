import Link from "next/link";
import { getRelatedArticles, PILLAR_LABEL, type ArticlePillar } from "@/app/blog/_articles";
import styles from "./Article.module.css";

type RelatedArticlesProps = {
  /** Slug de l'article courant — exclu de la liste des suggestions */
  currentSlug: string;
  /** Pilier de l'article courant — les suggestions seront du même pilier */
  pillar: ArticlePillar;
  /** Nombre max de suggestions affichées */
  limit?: number;
  /** Titre de section — défaut "À lire aussi" */
  title?: string;
};

/**
 * Bloc "À lire aussi" en pied d'article. Sert le maillage hub-and-spoke
 * en proposant des articles du même pilier. Si aucun frère n'existe encore,
 * le composant ne rend rien (pas de section vide).
 */
export function RelatedArticles({
  currentSlug,
  pillar,
  limit = 3,
  title = "À lire aussi",
}: RelatedArticlesProps) {
  const related = getRelatedArticles(currentSlug, pillar, limit);
  if (related.length === 0) return null;

  return (
    <section className={styles.relatedSection} aria-labelledby="related-heading">
      <h2 id="related-heading" className={styles.relatedTitle}>
        {title}
      </h2>
      <div className={styles.relatedGrid}>
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={styles.relatedCard}
          >
            <span className={styles.relatedCardEyebrow}>
              {PILLAR_LABEL[article.pillar]}
            </span>
            <h3 className={styles.relatedCardTitle}>{article.title}</h3>
            <p className={styles.relatedCardDesc}>{article.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
