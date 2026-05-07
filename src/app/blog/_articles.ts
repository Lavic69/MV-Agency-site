/**
 * Registre des articles de blog — source unique de vérité.
 *
 * Workflow de publication d'un nouvel article :
 *   1. Créer le dossier `src/app/blog/<slug>/page.tsx` (généré par IA via le brief template)
 *   2. Ajouter une entrée dans le tableau `articles` ci-dessous
 *   3. Push → l'article apparaît auto sur /blog, dans le sitemap.xml et dans les
 *      RelatedArticles des autres articles du même pilier.
 *
 * Le registre est en pure data (pas de JSX) pour pouvoir être lu côté server
 * dans le sitemap, et côté client dans le filtre /blog.
 */

export type ArticlePillar =
  | "creation-site-web"
  | "ia-pme"
  | "seo-marketing"
  | "site-par-metier";

export type ArticleMeta = {
  /** Slug = segment d'URL final (ex: `combien-coute-un-site-internet`) */
  slug: string;
  /** Titre H1 de l'article */
  title: string;
  /** Description courte (155c max) — utilisée pour /blog + meta description */
  description: string;
  /** ISO date YYYY-MM-DD de publication initiale */
  publishedAt: string;
  /** ISO date YYYY-MM-DD de la dernière mise à jour (=publishedAt si jamais modifié) */
  updatedAt: string;
  /** Pilier de rattachement (hub-and-spoke) */
  pillar: ArticlePillar;
  /** Étiquette catégorie affichée sur la card (libre, pour filtre UI) */
  category: string;
  /** Image cover sur /blog ET image OG. Chemin relatif `/public`. */
  cover: string;
  /** Mot-clé principal SEO */
  primaryKeyword: string;
  /** Statut de publication (draft = non listé, non sitemap, non indexé) */
  status?: "published" | "draft";
};

export const PILLAR_LABEL: Record<ArticlePillar, string> = {
  "creation-site-web": "Création de site web",
  "ia-pme": "IA & Automatisation PME",
  "seo-marketing": "SEO & Marketing digital",
  "site-par-metier": "Site web par métier",
};

/**
 * Liste des articles en production. Ordre = du plus récent au plus ancien
 * (le tri est préservé tel quel sur /blog).
 */
export const articles: ReadonlyArray<ArticleMeta> = [
  {
    slug: "combien-coute-un-site-internet",
    title: "Combien coûte un site internet en 2026 ?",
    description:
      "Le prix d'un site internet en 2026 varie de 1 500 € à 8 000 €. Détail des fourchettes par type de projet et des 5 facteurs qui font varier le coût.",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    pillar: "creation-site-web",
    category: "Création de site web",
    cover: "/og/combien-coute-un-site-internet.png",
    primaryKeyword: "prix site internet",
    status: "published",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers de lecture                                                 */
/* ------------------------------------------------------------------ */

export function getPublishedArticles(): ReadonlyArray<ArticleMeta> {
  return articles.filter((a) => a.status !== "draft");
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  pillar: ArticlePillar,
  limit = 3
): ReadonlyArray<ArticleMeta> {
  return getPublishedArticles()
    .filter((a) => a.slug !== currentSlug && a.pillar === pillar)
    .slice(0, limit);
}
