/**
 * Registre central des articles de blog.
 * Toute publication / dépublication / mise à jour passe par ce fichier.
 */

export type ArticlePillar =
  | "creation-site-web"
  | "ecosysteme-digital"
  | "ia"
  | "formation";

export const PILLAR_LABEL: Record<ArticlePillar, string> = {
  "creation-site-web": "Création de site web",
  "ecosysteme-digital": "Écosystème digital",
  "ia": "IA",
  "formation": "Formation",
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
  {
    slug: "seo-marketing-pme-guide",
    title: "SEO & marketing digital pour PME : le guide complet 2026",
    description:
      "Le guide opérationnel pour piloter le marketing digital d'une PME en 2026 : SEO, Google Business Profile, contenu, réseaux sociaux et IA. La méthode MV Agency en 6 étapes, les 3 erreurs qui coulent 80 % des PME, et les fourchettes de coûts par taille d'entreprise.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    pillar: "ecosysteme-digital",
    category: "Écosystème digital",
    keyword: { type: "text", value: "DIGITAL" },
    takeaways: [
      "5 piliers du marketing digital qui fonctionnent en 2026 : SEO, GBP, contenu, réseaux, IA",
      "80 % des PME ratent leur SEO à cause de 3 erreurs fondamentales",
      "Méthode MV Agency en 6 étapes pour piloter un écosystème digital cohérent",
      "Fourchettes de coûts par taille d'entreprise — ROI mesurable en 6-12 mois",
    ],
    tocItems: [
      { id: "c-est-quoi", label: "SEO et marketing digital — c'est quoi ?" },
      { id: "5-piliers", label: "Les 5 piliers du marketing digital 2026" },
      { id: "3-erreurs", label: "Pourquoi 80 % des PME ratent leur SEO" },
      { id: "methode-mv", label: "La méthode MV Agency en 6 étapes" },
      { id: "combien-ca-coute", label: "Combien ça coûte ?" },
      { id: "roi", label: "Comment mesurer le ROI" },
    ],
    readingTime: 13,
    primaryKeyword: "agence référencement naturel",
    status: "published",
  },
  {
    slug: "ia-automatisation-pme-guide",
    title: "IA et automatisation pour PME : le guide pour commencer sans jargon",
    description:
      "Le guide opérationnel pour intégrer l'IA dans une PME en 2026 : 5 cas d'usage qui marchent vraiment, la cartographie des outils (ChatGPT, Claude, Mistral, n8n), les fourchettes de coûts, la conformité RGPD et un plan de démarrage en 30 jours.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    pillar: "ia",
    category: "IA",
    keyword: { type: "text", value: "IA × PME" },
    takeaways: [
      "5 cas d'usage IA qui marchent : support, qualification, contenu, recherche, automatisation",
      "Cartographie des outils — ChatGPT, Claude, Mistral, Midjourney, n8n",
      "RGPD et souveraineté : 4 points à vérifier avant tout déploiement",
      "Plan de démarrage IA en 30 jours, sans jargon ni perte de temps",
    ],
    tocItems: [
      { id: "ia-2-minutes", label: "L'IA en 2 minutes pour un dirigeant" },
      { id: "5-cas-usage", label: "Les 5 cas d'usage qui marchent" },
      { id: "carte-outils", label: "La carte des outils — qui fait quoi ?" },
      { id: "combien-ca-coute", label: "Combien ça coûte vraiment ?" },
      { id: "rgpd", label: "RGPD et souveraineté" },
      { id: "demarrer-30-jours", label: "Comment démarrer en 30 jours" },
    ],
    readingTime: 13,
    primaryKeyword: "IA pour PME",
    status: "published",
  },
  {
    slug: "no-code-vs-code-entreprise",
    title: "No-code vs code : quelle solution pour votre entreprise en 2026 ?",
    description:
      "No-code, low-code, code sur-mesure : comparatif honnête sur 8 dimensions, les cas où chaque approche gagne, les 6 outils no-code à connaître et un guide pour choisir et se former en 2026.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    pillar: "formation",
    category: "Formation",
    keyword: { type: "text", value: "NO-CODE" },
    takeaways: [
      "Comparatif sur 8 dimensions : vitesse, coût, scalabilité, maintenance, contrôle",
      "Le no-code suffit pour 70 % des projets PME (MVP, automatisations, sites simples)",
      "Le code reste obligatoire pour les apps complexes ou ultra-performantes",
      "6 outils no-code à connaître : Make, n8n, Webflow, Airtable, Bubble, Notion",
    ],
    tocItems: [
      { id: "la-confusion", label: "La confusion no-code vs code en 2026" },
      { id: "tableau-comparatif", label: "Comparatif sur 8 dimensions" },
      { id: "no-code-suffit", label: "Cas où le no-code suffit" },
      { id: "code-obligatoire", label: "Cas où le code reste obligatoire" },
      { id: "6-outils", label: "Les 6 outils no-code à connaître" },
      { id: "se-former", label: "Comment se former (formats + organismes)" },
    ],
    readingTime: 10,
    primaryKeyword: "formation no code",
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
  const published = getPublishedArticles().filter((a) => a.slug !== currentSlug);
  const samePillar = published.filter((a) => a.pillar === pillar);
  if (samePillar.length >= limit) return samePillar.slice(0, limit);
  // Fallback : complète les slots restants avec d'autres piliers (cas d'un hub
  // seul dans son pilier). Garde l'ordre du registre pour cohérence éditoriale.
  const remaining = limit - samePillar.length;
  const otherPillars = published.filter((a) => a.pillar !== pillar).slice(0, remaining);
  return [...samePillar, ...otherPillars];
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
