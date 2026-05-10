/**
 * Registre central des articles de blog.
 * Toute publication / dépublication / mise à jour passe par ce fichier.
 */

export type ArticlePillar =
  | "creation-site-web"
  | "ia-pme"
  | "seo-marketing"
  | "site-par-metier";

export const PILLAR_LABEL: Record<ArticlePillar, string> = {
  "creation-site-web": "Création de site web",
  "ia-pme": "IA pour PME",
  "seo-marketing": "SEO & Marketing",
  "site-par-metier": "Site par métier",
};

/**
 * Mot-clé géant rendu en cover (hero d'article + carte liste + BlogPreview featured).
 * 4 patterns supportés :
 *   - text simple : { type: "text", value: "PRIX" }
 *   - composite avec opérateur : { type: "text", value: "IA × PME" }  (le composant détecte ×, +, /, vs, —)
 *   - chiffre / code : { type: "text", value: "974" }
 *   - versus avec logos : { type: "vs", logos: ["nextjs", "wordpress"] }
 */
export type CoverKeyword =
  | { type: "text"; value: string }
  | { type: "vs"; logos: [string, string] };

/**
 * Item du sommaire (TOC) affiché dans la sidebar de l'article.
 * - `id` : ancre HTML (kebab-case, ex: "site-vitrine") posée sur le <h2 id="..."> dans le JSX
 * - `label` : libellé affiché dans le sommaire
 */
export type TocItem = {
  id: string;
  label: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;        // ISO date YYYY-MM-DD
  updatedAt: string;          // ISO date YYYY-MM-DD
  pillar: ArticlePillar;
  category: string;           // libellé affiché (peut différer du label du pillar)
  keyword: CoverKeyword;
  takeaways: string[];        // 3-5 enseignements clés pour la sidebar sticky
  tocItems: TocItem[];        // ✨ NEW (v2)
  readingTime?: number;       // minutes ; calculé auto à partir du body si absent
  primaryKeyword: string;     // mot-clé SEO principal
  status?: "published" | "draft";
};

export const articles: ReadonlyArray<ArticleMeta> = [
  {
    slug: "combien-coute-un-site-internet",
    title: "Combien coûte un site internet en 2026 ?",
    description:
      "Le prix d'un site internet en 2026 varie de 500 € à plus de 8 000 €. Détail des fourchettes par type de projet, des 5 facteurs qui font varier le coût, et comparatif honnête des packs MV Agency.",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    pillar: "creation-site-web",
    category: "Création de site web",
    keyword: { type: "text", value: "PRIX" },
    takeaways: [
      "Vitrine 100 % customisée = 1 900 € à 4 000 € (template dès 500 €)",
      "E-commerce sur-mesure démarre à 6 000 €",
      "5 facteurs principaux font varier le prix",
      "Coûts récurrents = 1/3 du devis sur 3 ans",
    ],
    tocItems: [
      { id: "de-quoi-parle-t-on", label: "De quoi parle-t-on ?" },
      { id: "site-vitrine", label: "Combien coûte un site vitrine ?" },
      { id: "automatisations-ia", label: "Sites avec automatisations ou IA" },
      { id: "e-commerce", label: "Combien coûte un site e-commerce ?" },
      { id: "5-facteurs", label: "5 facteurs qui font varier le prix" },
      { id: "couts-recurrents", label: "Quels sont les coûts récurrents ?" },
      { id: "moins-cher", label: "Pourquoi le « moins cher » coûte plus cher ?" },
      { id: "devis-fiable", label: "Comment obtenir un devis fiable en 4 étapes ?" },
    ],
    readingTime: 12,
    primaryKeyword: "prix site web",
    status: "published",
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

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

/**
 * Index slug → numéro d'article ("01", "02", …) construit une fois à l'init
 * du module. Lookup O(1) au lieu de O(n) sur findIndex.
 */
const ARTICLE_NUMBERS: ReadonlyMap<string, string> = new Map(
  articles.map((a, i) => [a.slug, String(i + 1).padStart(2, "0")])
);

/**
 * Numéro d'article (Nº 01, Nº 02, …) basé sur l'ordre d'ajout au registre,
 * 1-indexed. Stable dans le temps : un nouvel article ajouté reçoit le
 * prochain numéro, les articles existants gardent le leur.
 * Retourne "00" si le slug est inconnu (cas qui ne devrait pas arriver).
 *
 * **Important :** ne jamais retirer un article du registre — marquer le
 * `status: "draft"` à la place. Supprimer une entrée décalerait les numéros
 * de tous les articles publiés ensuite.
 */
export function getArticleNumber(slug: string): string {
  return ARTICLE_NUMBERS.get(slug) ?? "00";
}

const WORDS_PER_MINUTE = 200;

/**
 * Calcule un temps de lecture en minutes à partir d'un texte brut.
 * Base : 200 mots / minute. Minimum 1 minute. Arrondi à l'entier supérieur.
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
