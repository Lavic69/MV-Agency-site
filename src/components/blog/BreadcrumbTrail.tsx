import Link from "next/link";
import styles from "./Article.module.css";

type BreadcrumbTrailItem = {
  /** Nom affiché de l'étape */
  name: string;
  /** URL relative — ne pas fournir pour la dernière étape (page courante) */
  href?: string;
};

type BreadcrumbTrailProps = {
  items: ReadonlyArray<BreadcrumbTrailItem>;
};

/**
 * Fil d'ariane visuel. À placer juste sous le header global.
 * Le BreadcrumbList JSON-LD doit être injecté séparément via
 * `buildBreadcrumbSchema()` pour le balisage Schema.org.
 */
export function BreadcrumbTrail({ items }: BreadcrumbTrailProps) {
  return (
    <nav aria-label="Fil d'ariane" className={styles.breadcrumb}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span
            key={`${item.name}-${index}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            {item.href && !isLast ? (
              <Link href={item.href} className={styles.breadcrumbLink}>
                {item.name}
              </Link>
            ) : (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {item.name}
              </span>
            )}
            {!isLast && <span className={styles.breadcrumbSeparator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
