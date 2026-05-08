# Refonte du blog MV Agency — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre le blog (page article + page liste + BlogPreview) avec un langage magazine premium qui remplace les images cover par un système typographique scalable, ajoute 5 composants signature (CoverKeyword, PullQuote, StatHighlight, ProcessSteps, StickyTakeaways), et bascule la CTA finale sur le composant Button standard du site.

**Architecture:** Pure CSS modules + TypeScript + framer-motion (déjà en place). Les nouveaux composants vivent dans `src/components/blog/`, le composant utilitaire `<CoverKeyword>` accepte une union typée pour 4 patterns visuels (text simple, composite avec opérateur, vs avec logos via `react-icons/si`, chiffre). Le registre `_articles.ts` gagne 3 champs (`keyword`, `takeaways`, `readingTime?`) et perd le champ `cover`. Layout article passe de centré 760px à grid `240px sidebar + 760px content` avec fallback bloc statique en mobile.

**Tech Stack:** Next.js 16.2.2 (App Router), React 19.2.4, TypeScript ^5, framer-motion 12.38.0, react-icons 5.6.0 (déjà installé), pas de Tailwind (CSS modules + variables CSS).

**Notes d'environnement:**
- Pas de framework de test configuré dans le projet — vérifications via `npx tsc --noEmit` (type check), `npm run lint` (eslint), `npm run build` (build production), et tests visuels manuels via `npm run dev`.
- `react-icons` (5.6.0) déjà présent dans `package.json` — utilisable immédiatement, sous-module `react-icons/si` pour les logos de marques.
- Toutes les références au spec : [docs/superpowers/specs/2026-05-08-blog-redesign-design.md](docs/superpowers/specs/2026-05-08-blog-redesign-design.md).

---

## Task 1: Étendre le modèle de données `_articles.ts`

**Files:**
- Modify: `src/app/blog/_articles.ts` (entièrement réécrit pour ajouter types et helpers)

- [ ] **Step 1: Ouvrir le fichier `src/app/blog/_articles.ts` et y remplacer son contenu complet par le code ci-dessous**

```ts
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
  readingTime?: number;       // minutes ; calculé auto à partir du body si absent
  primaryKeyword: string;     // mot-clé SEO principal
  status?: "published" | "draft";
};

export const articles: ReadonlyArray<ArticleMeta> = [
  {
    slug: "combien-coute-un-site-internet",
    title: "Combien coûte un site internet en 2026 ?",
    description:
      "Le prix d'un site internet en 2026 varie de 1 500 € à plus de 8 000 €. Détail des fourchettes par type de projet, des 5 facteurs qui font varier le coût, et comparatif honnête des packs MV Agency.",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    pillar: "creation-site-web",
    category: "Création de site web",
    keyword: { type: "text", value: "PRIX" },
    takeaways: [
      "Site vitrine pro = 1 900 € à 4 000 €",
      "E-commerce sur-mesure démarre à 6 000 €",
      "5 facteurs principaux font varier le prix",
      "Coûts récurrents = 1/3 du devis sur 3 ans",
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
 * Numéro d'article (Nº 01, Nº 02, …) basé sur l'ordre d'ajout au registre,
 * 1-indexed. Stable dans le temps : un nouvel article ajouté reçoit le
 * prochain numéro, les articles existants gardent le leur.
 * Retourne "00" si le slug est inconnu (cas qui ne devrait pas arriver).
 */
export function getArticleNumber(slug: string): string {
  const idx = articles.findIndex((a) => a.slug === slug);
  if (idx < 0) return "00";
  return String(idx + 1).padStart(2, "0");
}

/**
 * Calcule un temps de lecture en minutes à partir d'un texte brut.
 * Base : 200 mots / minute. Minimum 1 minute. Arrondi à l'entier supérieur.
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

- [ ] **Step 2: Vérifier que TypeScript compile sans erreur**

Run: `cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/charming-haibt-f45b1b" && npx tsc --noEmit`
Expected: aucune sortie (= compile OK), code de retour 0.

S'il y a des erreurs, elles concernent probablement les fichiers qui consomment `_articles.ts` (le champ `cover` a été supprimé). On les corrigera dans les tasks suivantes — pour l'instant, **tolérer** uniquement les erreurs liées à la propriété `cover` manquante. Tout autre type d'erreur doit être corrigé immédiatement.

- [ ] **Step 3: Commit**

```bash
cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/charming-haibt-f45b1b"
git add src/app/blog/_articles.ts
git commit -m "feat(blog): étendre _articles.ts avec keyword, takeaways, readingTime"
```

---

## Task 2: Composant `<CoverKeyword>`

**Files:**
- Create: `src/components/blog/CoverKeyword.tsx`
- Create: `src/components/blog/CoverKeyword.module.css`

- [ ] **Step 1: Créer `src/components/blog/CoverKeyword.module.css` avec ce contenu**

```css
/* ==========================================================================
   <CoverKeyword> — mot-clé géant en cover (hero, carte liste, featured).
   4 patterns : text simple, composite avec opérateur, vs avec logos, chiffre.
   ========================================================================== */

.root {
  font-family: var(--font-heading), sans-serif;
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: rgba(96, 165, 250, 0.22);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  margin: 0;
  padding-bottom: 4px; /* coussin minimal pour ne pas couper les jambages */
}

/* Sizes — calcul du font-size via clamp() pour rester lisible
   sur la plus grande variété de longueurs de keyword. */
.size-xl {
  font-size: clamp(6rem, 22vw, 20rem); /* hero d'article (cover 320px) */
}
.size-md {
  font-size: clamp(3.75rem, 12vw, 8.25rem); /* carte de liste (cover 160px) */
}
.size-sm {
  font-size: clamp(3.5rem, 10vw, 6.875rem); /* BlogPreview featured (cover 180px) */
}
.size-xs {
  font-size: clamp(1.5rem, 5vw, 2.25rem); /* mini-vignette (non utilisée pour V1, réservée) */
}

/* Opérateur (×, +, /, vs, —) — italique, opacité réduite, espacement */
.op {
  color: rgba(96, 165, 250, 0.4);
  font-style: italic;
  font-weight: 700;
  margin: 0 0.06em;
}

/* === Pattern "vs" avec logos === */
.versus {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4em;
  line-height: 1;
  padding-bottom: 4px;
}
.logo {
  width: 1em;
  height: 1em;
  color: rgba(229, 231, 235, 0.85);
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.logoAlt {
  color: rgba(96, 165, 250, 0.7);
}
.logo svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
.versusLabel {
  font-family: var(--font-heading), sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: 0.45em; /* relatif à la taille du parent .versus.size-* */
  color: rgba(96, 165, 250, 0.55);
  line-height: 1;
}

/* Sizes spécifiques au versus (parce que le flex container définit la hauteur) */
.versus.size-xl {
  font-size: clamp(4rem, 14vw, 7rem);
}
.versus.size-md {
  font-size: clamp(2.75rem, 9vw, 4.5rem);
}
.versus.size-sm {
  font-size: clamp(2.5rem, 8vw, 4rem);
}
```

- [ ] **Step 2: Créer `src/components/blog/CoverKeyword.tsx` avec ce contenu**

```tsx
import React from "react";
import { SiNextdotjs, SiWordpress, SiShopify, SiReact, SiVuedotjs, SiSvelte, SiAstro, SiAngular, SiDjango, SiWebflow } from "react-icons/si";
import type { CoverKeyword as CoverKeywordType } from "@/app/blog/_articles";
import styles from "./CoverKeyword.module.css";

/* Carte d'icônes supportées pour le pattern "vs". On ne charge que les marques
   qu'on prévoit d'utiliser dans des comparatifs blog — ajouts faciles ici. */
const LOGO_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  nextjs: SiNextdotjs,
  wordpress: SiWordpress,
  shopify: SiShopify,
  react: SiReact,
  vue: SiVuedotjs,
  svelte: SiSvelte,
  astro: SiAstro,
  angular: SiAngular,
  django: SiDjango,
  webflow: SiWebflow,
};

/**
 * Détecte les opérateurs (×, +, /, vs, —) dans une chaîne et la
 * découpe en parts alternant "text" et "op".
 * Exemple : "IA × PME" → [{kind:"text",value:"IA"}, {kind:"op",value:"×"}, {kind:"text",value:"PME"}]
 */
function splitOnOperators(value: string): Array<{ kind: "text" | "op"; value: string }> {
  // Ordre du regex : opérateurs spaced first (` vs `, ` × `, ` + `, ` / `, ` — `)
  const regex = /(\s+vs\s+|\s+[×+/—]\s+)/gi;
  const tokens = value.split(regex).filter((s) => s.length > 0);
  return tokens.map((tok) => {
    if (regex.test(tok) || /^\s+(vs|[×+/—])\s+$/i.test(tok)) {
      return { kind: "op" as const, value: tok.trim() };
    }
    return { kind: "text" as const, value: tok };
  });
}

export type CoverKeywordSize = "xl" | "md" | "sm" | "xs";

interface CoverKeywordProps {
  keyword: CoverKeywordType;
  size?: CoverKeywordSize;
  className?: string;
}

export const CoverKeyword: React.FC<CoverKeywordProps> = ({ keyword, size = "xl", className }) => {
  const sizeClass = styles[`size-${size}`];

  if (keyword.type === "vs") {
    const [a, b] = keyword.logos;
    const LogoA = LOGO_MAP[a];
    const LogoB = LOGO_MAP[b];

    if (!LogoA || !LogoB) {
      // Fallback texte si un logo n'est pas mappé — on affiche le slug en majuscules.
      const fallbackText = `${a.toUpperCase()} VS ${b.toUpperCase()}`;
      return (
        <div className={`${styles.root} ${sizeClass} ${className ?? ""}`} aria-label={fallbackText}>
          {fallbackText}
        </div>
      );
    }

    return (
      <div
        className={`${styles.versus} ${sizeClass} ${className ?? ""}`}
        aria-label={`${a} vs ${b}`}
      >
        <span className={styles.logo}>
          <LogoA />
        </span>
        <span className={styles.versusLabel}>vs</span>
        <span className={`${styles.logo} ${styles.logoAlt}`}>
          <LogoB />
        </span>
      </div>
    );
  }

  // Pattern "text" — on parse les opérateurs et on stylise les morceaux.
  const parts = splitOnOperators(keyword.value);
  return (
    <div
      className={`${styles.root} ${sizeClass} ${className ?? ""}`}
      aria-label={keyword.value}
    >
      {parts.map((part, i) =>
        part.kind === "op" ? (
          <span key={i} className={styles.op}>
            {part.value}
          </span>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </div>
  );
};
```

- [ ] **Step 3: Vérifier que TypeScript compile**

Run: `cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/charming-haibt-f45b1b" && npx tsc --noEmit`
Expected: aucune erreur sur `CoverKeyword.tsx`. (Erreurs sur d'autres fichiers liées au champ `cover` retiré encore tolérées.)

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/CoverKeyword.tsx src/components/blog/CoverKeyword.module.css
git commit -m "feat(blog): composant CoverKeyword (4 patterns du mot-clé géant)"
```

---

## Task 3: Composant `<PullQuote>`

**Files:**
- Create: `src/components/blog/PullQuote.tsx`
- Modify: `src/components/blog/Article.module.css` (ajout des styles `.pullQuote*`)

- [ ] **Step 1: Créer `src/components/blog/PullQuote.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution }) => {
  return (
    <figure className={styles.pullQuote}>
      <span className={styles.pullQuoteMark} aria-hidden="true">"</span>
      <blockquote className={styles.pullQuoteText}>{children}</blockquote>
      {attribution && (
        <figcaption className={styles.pullQuoteAttr}>— {attribution}</figcaption>
      )}
    </figure>
  );
};
```

- [ ] **Step 2: Ajouter les styles `.pullQuote*` à la fin de `src/components/blog/Article.module.css`**

Append (à la fin du fichier existant, après les styles `.breadcrumb*`) :

```css
/* ----- PullQuote (citation magazine) ----- */
.pullQuote {
  position: relative;
  padding: 2rem 1.5rem 2rem 4rem;
  margin: 3.5rem 0;
  border-top: 1px solid rgba(96, 165, 250, 0.2);
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
}

.pullQuoteMark {
  position: absolute;
  top: 1.1rem;
  left: 0.75rem;
  font-family: var(--font-heading), sans-serif;
  font-size: 6rem;
  font-weight: 900;
  color: rgba(96, 165, 250, 0.25);
  line-height: 0.5;
  user-select: none;
}

.pullQuoteText {
  font-family: var(--font-heading), sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-light);
  line-height: 1.4;
  letter-spacing: -0.01em;
  margin: 0 0 0.875rem 0;
}

.pullQuoteAttr {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.7rem;
  color: #60A5FA;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .pullQuote {
    padding: 1.5rem 1rem 1.5rem 3rem;
    margin: 2.5rem 0;
  }
  .pullQuoteMark { font-size: 4.5rem; top: 0.7rem; left: 0.4rem; }
  .pullQuoteText { font-size: 1.15rem; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: aucune nouvelle erreur sur `PullQuote.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/PullQuote.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): composant PullQuote (citation magazine)"
```

---

## Task 4: Composant `<StatHighlight>`

**Files:**
- Create: `src/components/blog/StatHighlight.tsx`
- Modify: `src/components/blog/Article.module.css` (ajout des styles `.stat*`)

- [ ] **Step 1: Créer `src/components/blog/StatHighlight.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

interface StatHighlightProps {
  value: string;        // ex: "94%", "1 900 €", "x4"
  label: string;        // étiquette courte uppercase, ex: "PREMIÈRE IMPRESSION"
  description: string;  // 1-2 phrases de contexte
  source?: string;      // source courte, ex: "Stanford Web Credibility Project, 2024"
}

export const StatHighlight: React.FC<StatHighlightProps> = ({ value, label, description, source }) => {
  return (
    <aside className={styles.stat} role="figure" aria-label={`${label}: ${description}`}>
      <div className={styles.statNum}>{value}</div>
      <div className={styles.statText}>
        <div className={styles.statLabel}>— {label}</div>
        <p className={styles.statDesc}>{description}</p>
        {source && <div className={styles.statSource}>Source : {source}</div>}
      </div>
    </aside>
  );
};
```

- [ ] **Step 2: Ajouter les styles `.stat*` à la fin de `Article.module.css`**

```css
/* ----- StatHighlight (chiffre clé en surbrillance) ----- */
.stat {
  display: flex;
  align-items: stretch;
  margin: 3.5rem 0;
  padding: 1.75rem 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  border: 1px solid rgba(96, 165, 250, 0.18);
}

.statNum {
  font-family: var(--font-heading), sans-serif;
  font-size: clamp(3.5rem, 8vw, 5.25rem);
  font-weight: 900;
  color: #60A5FA;
  line-height: 0.85;
  letter-spacing: -0.05em;
  padding-right: 1.75rem;
  border-right: 1px solid rgba(96, 165, 250, 0.25);
  flex-shrink: 0;
}

.statText {
  padding-left: 1.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.statLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.625rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.statDesc {
  font-size: 0.95rem;
  color: rgba(229, 231, 235, 0.9);
  line-height: 1.55;
  margin: 0;
}

.statSource {
  font-size: 0.75rem;
  color: #6B7280;
  font-style: italic;
  margin-top: 0.625rem;
}

@media (max-width: 700px) {
  .stat {
    flex-direction: column;
    padding: 1.5rem;
    margin: 2.5rem 0;
  }
  .statNum {
    border-right: none;
    border-bottom: 1px solid rgba(96, 165, 250, 0.25);
    padding-right: 0;
    padding-bottom: 0.875rem;
    margin-bottom: 0.875rem;
  }
  .statText { padding-left: 0; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: aucune nouvelle erreur sur `StatHighlight.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/StatHighlight.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): composant StatHighlight (chiffre clé data-driven)"
```

---

## Task 5: Composant `<ProcessSteps>`

**Files:**
- Create: `src/components/blog/ProcessSteps.tsx`
- Modify: `src/components/blog/Article.module.css` (ajout des styles `.steps*`)

- [ ] **Step 1: Créer `src/components/blog/ProcessSteps.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <ol className={styles.steps} role="list">
      {steps.map((step, i) => (
        <li className={styles.stepRow} key={i}>
          <div className={styles.stepNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className={styles.stepContent}>
            <h6 className={styles.stepTitle}>{step.title}</h6>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};
```

- [ ] **Step 2: Ajouter les styles `.steps*` à la fin de `Article.module.css`**

```css
/* ----- ProcessSteps (liste numérotée avec ligne de connexion) ----- */
.steps {
  list-style: none;
  margin: 3.5rem 0;
  padding: 0.75rem 0;
}

.stepRow {
  display: flex;
  gap: 1.125rem;
  position: relative;
  padding-bottom: 1.625rem;
  align-items: flex-start;
}
.stepRow:last-child { padding-bottom: 0; }

/* La ligne verticale part exactement du centre du cercle (left: 15px = 16-1px de largeur de ligne).
   top: 32px = sous le cercle. bottom: 0 = jusqu'au cercle suivant. */
.stepRow:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 15px;
  top: 32px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.5), rgba(96, 165, 250, 0.15));
}

.stepNum {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--bg-neutral, #0a0a0a);
  border: 2px solid rgba(96, 165, 250, 0.5);
  color: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  z-index: 1;
  position: relative;
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.2);
}

.stepContent {
  flex: 1;
  padding-top: 0.25rem;
}

.stepTitle {
  font-family: var(--font-heading), sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-light);
  margin: 0 0 0.3125rem 0;
  line-height: 1.3;
}

.stepDesc {
  font-size: 0.875rem;
  color: rgba(229, 231, 235, 0.7);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 700px) {
  .steps { margin: 2.5rem 0; }
  .stepDesc { font-size: 0.85rem; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: aucune nouvelle erreur sur `ProcessSteps.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/ProcessSteps.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): composant ProcessSteps (process visualisé numéroté)"
```

---

## Task 6: Composant `<StickyTakeaways>`

**Files:**
- Create: `src/components/blog/StickyTakeaways.tsx`
- Modify: `src/components/blog/Article.module.css` (ajout des styles `.takeaways*`)

- [ ] **Step 1: Créer `src/components/blog/StickyTakeaways.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

interface StickyTakeawaysProps {
  takeaways: string[];
  /**
   * Si vrai (par défaut), le composant est rendu en sidebar sticky sur desktop.
   * Sur mobile (< 900px), il bascule automatiquement en bloc statique
   * via la media query CSS.
   */
  asSidebar?: boolean;
}

export const StickyTakeaways: React.FC<StickyTakeawaysProps> = ({ takeaways, asSidebar = true }) => {
  if (takeaways.length === 0) return null;
  return (
    <aside
      className={asSidebar ? styles.takeawaysSticky : styles.takeawaysStatic}
      aria-label="À retenir"
    >
      <div className={styles.takeawaysLabel}>— À retenir</div>
      <ul className={styles.takeawaysList}>
        {takeaways.map((item, i) => (
          <li className={styles.takeawayItem} key={i}>
            <span className={styles.takeawayBullet} aria-hidden="true">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </aside>
  );
};
```

- [ ] **Step 2: Ajouter les styles `.takeaways*` à la fin de `Article.module.css`**

```css
/* ----- StickyTakeaways — sidebar sticky desktop ----- */
.takeawaysSticky {
  border-left: 2px solid rgba(96, 165, 250, 0.3);
  padding: 0.375rem 0 0.375rem 1.375rem;
  position: sticky;
  top: 2rem;
  align-self: start;
}

/* ----- Variant statique (utilisé en mobile via le wrapper de page, ou par appel direct) ----- */
.takeawaysStatic {
  background: rgba(96, 165, 250, 0.05);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
}

.takeawaysLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
}

.takeawaysList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.takeawayItem {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-size: 0.84375rem;
  color: rgba(229, 231, 235, 0.85);
  line-height: 1.5;
}

.takeawayItem strong {
  color: var(--text-light);
}

.takeawayBullet {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.4);
  color: #60A5FA;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.625rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

/* Sur écrans <900px, la version sticky bascule en bloc statique
   (mêmes styles que .takeawaysStatic). */
@media (max-width: 899px) {
  .takeawaysSticky {
    background: rgba(96, 165, 250, 0.05);
    border: 1px solid rgba(96, 165, 250, 0.2);
    border-left: 1px solid rgba(96, 165, 250, 0.2);
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    position: static;
    margin-bottom: 2rem;
  }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: aucune nouvelle erreur sur `StickyTakeaways.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/StickyTakeaways.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): composant StickyTakeaways (sidebar À retenir avec fallback mobile)"
```

---

## Task 7: Refonte interne du composant `<ArticleHeader>`

**Files:**
- Modify: `src/components/blog/ArticleHeader.tsx` (refonte complète)
- Modify: `src/components/blog/Article.module.css` (refonte des styles `.header*`)

- [ ] **Step 1: Réécrire `src/components/blog/ArticleHeader.tsx` au complet**

Remplacer tout le contenu du fichier par :

```tsx
import React from "react";
import { CoverKeyword } from "./CoverKeyword";
import type { CoverKeyword as CoverKeywordType, ArticlePillar } from "@/app/blog/_articles";
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
```

- [ ] **Step 2: Remplacer les styles `.header*`, `.title`, `.metaRow`, `.metaAuthor`, `.metaSeparator`, `.metaUpdated`, `.coverImage`, et `.eyebrow` (les anciens styles header) dans `Article.module.css` par les nouveaux**

Localiser ces sélecteurs dans `Article.module.css` (lignes 17-77 environ) et les remplacer intégralement par :

```css
/* ----- Header / Hero d'article (langage magazine) ----- */
.header {
  padding: 5rem 0 3rem;
}

.heroBox {
  position: relative;
  height: 320px;
  background: linear-gradient(160deg, #0f1638 0%, #0a0a0a 75%);
  border: 1px solid rgba(96, 165, 250, 0.18);
  border-radius: 1rem;
  overflow: hidden;
}

.heroPillar {
  position: absolute;
  top: 1.625rem;
  left: 2rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.75rem;
  color: #60A5FA;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 2;
}

.heroNum {
  position: absolute;
  top: 1.625rem;
  right: 2rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.75rem;
  color: #6B7280;
  letter-spacing: 2px;
  z-index: 2;
}

.heroBigword {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5rem 0.25rem 0.5rem;
  z-index: 1;
}

.heroTitleStack {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 2;
}

.heroTitle {
  font-family: var(--font-heading), sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: var(--text-light);
  margin: 0 0 0.875rem 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
  max-width: 80%;
}

.heroSep {
  width: 60px;
  height: 2px;
  background: var(--primary, #2563EB);
  margin: 0 0 0.875rem 0;
  border-radius: 2px;
}

.heroMeta {
  font-size: 0.8125rem;
  color: rgba(229, 231, 235, 0.7);
  display: flex;
  flex-wrap: wrap;
  gap: 1.125rem;
  align-items: center;
}

.heroMetaAuthor strong { color: var(--text-light); }

.heroMetaMono {
  font-family: "SF Mono", Menlo, monospace;
  color: #6B7280;
}

.heroMetaUpdated {
  font-style: italic;
  font-size: 0.75rem;
  color: #6B7280;
}

@media (max-width: 700px) {
  .header { padding: 4rem 0 2rem; }
  .heroBox { height: 260px; }
  .heroTitleStack { left: 1.25rem; right: 1.25rem; bottom: 1.25rem; }
  .heroTitle { max-width: 90%; }
  .heroPillar, .heroNum { font-size: 0.6875rem; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: les erreurs sur `ArticleHeader.tsx` doivent être résolues. Reste possible : erreurs sur la page article qui passe encore l'ancienne prop `coverImage`.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/ArticleHeader.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): refonte ArticleHeader en hero magazine (cover XL avec mot-clé géant)"
```

---

## Task 8: Mettre à jour le barrel export et la page article existante

**Files:**
- Modify: `src/components/blog/index.ts` (ajouter les nouveaux composants)
- Modify: `src/app/blog/combien-coute-un-site-internet/page.tsx` (refonte complète)

- [ ] **Step 1: Mettre à jour le barrel `src/components/blog/index.ts`**

Remplacer son contenu par :

```ts
export { ArticleHeader } from "./ArticleHeader";
export { AnswerBlock } from "./AnswerBlock";
export { InlineCTA } from "./InlineCTA";
export { FAQ } from "./FAQ";
export { RelatedArticles } from "./RelatedArticles";
export { BreadcrumbTrail } from "./BreadcrumbTrail";

// Nouveaux composants signature (refonte 2026-05)
export { CoverKeyword } from "./CoverKeyword";
export { PullQuote } from "./PullQuote";
export { StatHighlight } from "./StatHighlight";
export { ProcessSteps } from "./ProcessSteps";
export { StickyTakeaways } from "./StickyTakeaways";
```

- [ ] **Step 2: Réécrire `src/app/blog/combien-coute-un-site-internet/page.tsx` au complet**

Remplacer tout le contenu du fichier par :

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  ArticleHeader,
  AnswerBlock,
  InlineCTA,
  FAQ,
  RelatedArticles,
  BreadcrumbTrail,
  PullQuote,
  StatHighlight,
  ProcessSteps,
  StickyTakeaways,
} from "@/components/blog";
import { Button } from "@/components/ui/Button";
import {
  SITE_URL,
  buildArticleSchema,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  type FaqItem,
} from "@/lib/seo";
import { getArticleBySlug, getArticleNumber, PILLAR_LABEL } from "@/app/blog/_articles";
import styles from "@/components/blog/Article.module.css";

const SLUG = "combien-coute-un-site-internet";
const ARTICLE = getArticleBySlug(SLUG)!;
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    title: ARTICLE.title,
    description: ARTICLE.description,
    url: URL,
    publishedTime: ARTICLE.publishedAt,
    modifiedTime: ARTICLE.updatedAt,
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE.title,
    description: ARTICLE.description,
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: ARTICLE.title, url: URL },
]);

const faqItems: FaqItem[] = [
  {
    question: "Quel est le prix moyen d'un site internet vitrine en 2026 ?",
    answer:
      "Pour un site vitrine professionnel de 5 à 7 pages, comptez entre 1 900 € et 4 000 € selon le degré de personnalisation du design, le CMS choisi, et le niveau d'optimisation SEO à la racine. En dessous de 1 500 €, on parle généralement de templates pré-faits avec personnalisation limitée. Au-dessus de 4 000 €, on entre sur des architectures sur-mesure avec automatisations.",
  },
  {
    question: "Combien coûte un site e-commerce en 2026 ?",
    answer:
      "Un site e-commerce sur-mesure démarre autour de 6 000 € et peut monter à 15 000 € ou plus selon le nombre de produits, les passerelles de paiement, les intégrations CRM/ERP et les automatisations. Sur Shopify ou WooCommerce avec un thème personnalisé, on peut descendre à 3 500-5 000 € pour un catalogue simple.",
  },
  {
    question: "Quels sont les coûts cachés d'un site internet ?",
    answer:
      "Les principaux coûts récurrents sont le nom de domaine (10-50 €/an), l'hébergement (60-300 €/an pour un site vitrine, plus pour de l'e-commerce), les licences logicielles éventuelles (thèmes, plugins, API IA), la maintenance technique (mises à jour, sécurité, sauvegardes) et la production de contenu (textes, photos, vidéos). Certaines agences facturent aussi des frais de licence sur leur propre code — chez MV Agency, vous êtes propriétaire à 100 % à la livraison.",
  },
  {
    question: "Pourquoi un site Next.js coûte-t-il plus cher qu'un site WordPress ?",
    answer:
      "Un site Next.js demande des compétences de développement plus pointues qu'un site WordPress assemblé avec des plugins. Le tarif est donc supérieur sur la création initiale, mais les bénéfices à long terme sont significatifs : performance (Core Web Vitals supérieurs, score Lighthouse autour de 95-100), sécurité (architecture découplée, pas de plugins vulnérables), pérennité (le code reste valide 5 à 10 ans sans dette technique). Le retour sur investissement se mesure sur la durée.",
  },
  {
    question: "Faut-il un acompte pour démarrer un projet de site web ?",
    answer:
      "Oui, c'est la pratique standard. Chez MV Agency, l'acompte est de 30 % à la commande, le solde à la livraison ou selon un échéancier convenu au devis. L'acompte sécurise le démarrage des travaux et engage les deux parties. Aucun acompte n'est demandé tant que le devis n'est pas signé.",
  },
  {
    question: "Combien de temps pour créer un site internet ?",
    answer:
      "Un site vitrine classique prend 3 à 4 semaines de la signature du devis à la mise en ligne. Un site avec automatisations clés (CRM, emailing, chatbot IA) compte 5 à 6 semaines. Pour un e-commerce ou une plateforme sur-mesure, comptez 6 à 8 semaines. Les délais dépendent en grande partie de la rapidité avec laquelle vous fournissez les contenus (textes, images, validations).",
  },
  {
    question: "Pourquoi MV Agency n'affiche pas ses prix exacts en ligne ?",
    answer:
      "Parce qu'un site pour un dentiste n'a pas le même périmètre qu'un site e-commerce, et que vendre un pack catalogue qui ne correspond pas à votre réalité serait malhonnête. Nous proposons trois packs avec des tarifs de départ — Fondation, Croissance, Performance IA — mais le périmètre exact se cadre lors d'un appel découverte gratuit de 30 minutes. Aucun coût caché, aucun devis surprise, aucun engagement.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, URL);

const articleSchema = buildArticleSchema({
  url: URL,
  title: ARTICLE.title,
  description: ARTICLE.description,
  publishedAt: ARTICLE.publishedAt,
  updatedAt: ARTICLE.updatedAt,
  imageUrl: `${SITE_URL}/og-default.png`, // image OG par défaut (à générer dans une phase ultérieure)
  keywords: [
    "prix site internet",
    "tarif site web 2026",
    "coût site vitrine",
    "prix site e-commerce",
    "création site internet prix",
    "agence web tarif",
  ],
});

export default function Page() {
  return (
    <main className={styles.articleWrapper}>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqPageSchema} />

      <BreadcrumbTrail
        items={[
          { name: "Accueil", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: ARTICLE.title },
        ]}
      />

      <ArticleHeader
        pillarLabel={PILLAR_LABEL[ARTICLE.pillar]}
        num={getArticleNumber(SLUG)}
        keyword={ARTICLE.keyword}
        title={ARTICLE.title}
        publishedAt={ARTICLE.publishedAt}
        updatedAt={ARTICLE.updatedAt}
        readingTime={ARTICLE.readingTime ?? 12}
      />

      <div className={styles.articleLayout}>
        <StickyTakeaways takeaways={ARTICLE.takeaways} />

        <div className={styles.articleContent}>
          <AnswerBlock>
            Un site internet professionnel coûte entre <strong>1 500 € et 8 000 €</strong> en
            2026 selon trois facteurs principaux : le <strong>type de site</strong>{" "}
            (vitrine, automatisé, e-commerce), le <strong>degré de personnalisation</strong>{" "}
            (template vs design sur-mesure) et la <strong>stack technique</strong>{" "}
            (WordPress vs Next.js). Une vitrine premium démarre à 1 900 €, un site avec
            automatisations à 4 000 €, un e-commerce sur-mesure à 6 000 €. Au-delà de
            l'investissement initial, le vrai coût se mesure sur 3 ans : un site mal conçu
            coûte le double en maintenance et refonte. Cet article détaille les fourchettes
            par type de projet, les cinq variables qui font bouger le prix, et la fourchette
            de coûts récurrents (domaine, hébergement, maintenance) à anticiper.
          </AnswerBlock>

          <article>
            <h2>De quoi parle-t-on quand on dit « site internet » ?</h2>
            <p>
              Le mot « site » couvre des réalités très différentes, et c'est précisément
              pour ça qu'il est difficile d'annoncer un prix unique. Un site vitrine de cinq
              pages pour un cabinet dentaire, une boutique e-commerce avec deux mille
              références, et une plateforme SaaS B2B sur-mesure n'ont rien à voir techniquement
              — ni en délai, ni en prix.
            </p>
            <p>
              Avant toute estimation, il faut classer le projet dans une de ces grandes
              familles :
            </p>
            <ul>
              <li>
                <strong>Site vitrine premium</strong> : 5 à 10 pages, présentation de
                l'entreprise et des services, formulaire de contact, optimisation SEO de
                base. Pas d'espace client, pas de paiement.
              </li>
              <li>
                <strong>Site vitrine + automatisations</strong> : la même chose plus une
                intégration CRM, un chatbot IA, un système de prise de rendez-vous, des
                emails déclenchés automatiquement.
              </li>
              <li>
                <strong>E-commerce</strong> : catalogue produits, panier, paiement
                sécurisé, gestion des commandes, suivi de livraison.
              </li>
              <li>
                <strong>Plateforme sur-mesure</strong> : application web avec gestion
                d'utilisateurs, base de données complexe, fonctionnalités métier
                spécifiques (réservation, marketplace, SaaS).
              </li>
            </ul>
            <p>
              Chaque famille a son propre intervalle de prix, qu'on détaille section après
              section.
            </p>

            <h2>Combien coûte un site vitrine en 2026 ?</h2>
            <p>
              Pour un site vitrine professionnel, la fourchette réaliste en 2026 est de{" "}
              <strong>1 900 € à 4 000 €</strong>. En dessous de 1 500 €, on entre dans les
              territoires des templates pré-faits avec personnalisation très limitée — c'est
              parfois suffisant pour démarrer mais ça vieillit vite et la cohérence visuelle
              n'est pas toujours au rendez-vous.
            </p>
            <p>
              Le pack <strong>Fondation digitale</strong> de MV Agency démarre à 1 900 € et
              inclut un site vitrine premium jusqu'à 5 pages, un design responsive
              sur-mesure, l'optimisation SEO à la racine, un formulaire de contact sécurisé,
              la mise en place de Google Analytics, ainsi qu'une formation à l'utilisation
              du site et un support technique de lancement. Au-dessus de 4 000 €, on
              commence à intégrer des automatisations qui changent réellement la donne —
              c'est le territoire du pack Croissance.
            </p>

            <PullQuote attribution="Extrait de l'article">
              Sur 3 ans, les coûts récurrents totalisent souvent l'équivalent d'un tiers à
              la moitié du devis initial — un détail que les comparaisons rapides oublient.
            </PullQuote>

            <h2>Combien coûte un site avec automatisations ou IA ?</h2>
            <p>
              Quand on ajoute des automatisations sérieuses (CRM, emailing déclenché,
              chatbot IA, contenu assisté par intelligence artificielle), la fourchette
              monte naturellement. Le pack <strong>Croissance digitale</strong> de MV Agency
              démarre à 4 000 € et structure votre acquisition de A à Z : site avancé
              jusqu'à 10 pages, SEO profond, landing page de conversion, automatisations
              clés en main, chatbot IA intelligent, génération de contenu assistée et
              formation marketing.
            </p>
            <p>
              La différence avec une vitrine simple n'est pas seulement esthétique. Une
              automatisation bien conçue peut représenter <strong>4 à 8 heures gagnées
              chaque semaine</strong> sur des tâches répétitives — saisie de leads,
              relances, qualification. Sur 12 mois, ce gain rentabilise l'investissement
              plus rapidement qu'un site purement décoratif.
            </p>

            <StatHighlight
              value="94%"
              label="Première impression"
              description="des visiteurs jugent la crédibilité d'un site sur son design en moins de 50 ms."
              source="Stanford Web Credibility Project, 2024"
            />

            <h2>Combien coûte un site e-commerce en 2026 ?</h2>
            <p>
              Pour un e-commerce sur-mesure, la fourchette de départ est de <strong>6 000 €
              à 15 000 €</strong>, voire au-delà selon la complexité du catalogue, les
              intégrations CRM/ERP, les passerelles de paiement multiples ou les
              fonctionnalités d'abonnement. Le pack <strong>Performance IA</strong> de
              MV Agency, qui démarre à 6 000 €, couvre l'e-commerce ou la plateforme
              sur-mesure avec un écosystème IA complet et des automatisations avancées.
            </p>
            <p>
              Pour des projets plus simples sur Shopify ou WooCommerce avec un thème
              personnalisé, on peut descendre à 3 500 à 5 000 € — mais le coût technique
              diminué se compense souvent par des frais de plateforme récurrents (Shopify
              facture entre 36 € et 432 € par mois selon le plan).
            </p>

            <InlineCTA
              title="Pas encore sûr du périmètre ?"
              text="On cadre ensemble en 30 minutes. Appel offert, sans engagement, pour identifier ce qui aurait du sens dans votre cas."
              ctaLabel="Réserver un appel offert"
              href="/contact"
            />

            <h2>Quels sont les 5 facteurs qui font varier le prix ?</h2>
            <p>
              À périmètre fonctionnel équivalent, cinq variables expliquent l'essentiel des
              écarts de prix entre devis :
            </p>
            <ol>
              <li>
                <strong>Le nombre de pages</strong> — chaque page rédigée et designée prend
                du temps. Passer de 5 à 15 pages double souvent l'effort sans doubler
                forcément la valeur.
              </li>
              <li>
                <strong>Le degré de personnalisation visuelle</strong> — un design 100 %
                sur-mesure (illustrations, micro-interactions, mockups) coûte
                significativement plus qu'un thème adapté.
              </li>
              <li>
                <strong>La stack technique choisie</strong> — Next.js demande plus de
                compétences que WordPress, mais offre des performances et une sécurité
                supérieures. Le bon choix dépend du contexte.
              </li>
              <li>
                <strong>Les intégrations tierces</strong> — connecter un CRM, un outil
                d'emailing, un système de paiement, une API IA, chacune de ces
                intégrations ajoute du temps de développement et de tests.
              </li>
              <li>
                <strong>La rédaction et la production de contenu</strong> — fournir vos
                textes et images réduit le coût. Si l'agence doit les produire (copywriting,
                shooting photo, vidéo), comptez 500 à 3 000 € additionnels.
              </li>
            </ol>

            <h2>Quels sont les coûts récurrents à prévoir ?</h2>
            <p>
              Au-delà du devis initial, votre site génère des frais récurrents annuels qu'il
              faut intégrer dans votre plan financier :
            </p>
            <ul>
              <li>
                <strong>Nom de domaine</strong> — entre 10 € et 50 € par an selon
                l'extension et le registrar.
              </li>
              <li>
                <strong>Hébergement</strong> — 60 à 300 € par an pour un site vitrine
                (Vercel, Netlify, OVH), bien plus pour de l'e-commerce avec trafic.
              </li>
              <li>
                <strong>Licences logicielles</strong> — thèmes WordPress premium, plugins,
                API IA (OpenAI, Anthropic) : variable selon les choix techniques.
              </li>
              <li>
                <strong>Maintenance technique</strong> — mises à jour de sécurité,
                sauvegardes, monitoring. À budgéter à 50-150 € par mois pour un site qui
                tourne en production.
              </li>
              <li>
                <strong>Production de contenu</strong> — si vous publiez régulièrement
                (blog SEO, articles métier), prévoyez du temps interne ou un budget de
                rédaction.
              </li>
            </ul>
            <p>
              Sur trois ans, ces coûts récurrents totalisent souvent l'équivalent d'un tiers
              à la moitié du devis initial. Un détail que les comparaisons rapides
              oublient.
            </p>

            <h2>Pourquoi le « moins cher » coûte souvent le plus cher ?</h2>
            <p>
              Le piège classique : choisir le devis le plus bas et payer la différence en
              maintenance, refonte ou perte d'opportunité. Trois schémas reviennent
              régulièrement chez nos clients qui ont déjà eu une mauvaise expérience :
            </p>
            <ul>
              <li>
                Le site qui devient illisible sur mobile six mois après la livraison parce
                que le développeur a copié-collé un thème sans tester.
              </li>
              <li>
                La refonte intégrale après deux ans parce que le site n'est ni évolutif, ni
                référencé, ni optimisé pour la conversion.
              </li>
              <li>
                La <em>licence d'utilisation</em> facturée chaque année par certaines
                agences sur leur propre code, qui transforme un investissement ponctuel en
                abonnement déguisé.
              </li>
            </ul>
            <p>
              Le bon réflexe est de comparer le coût total sur 3 ans, pas le devis seul, et
              de vérifier qui détient la propriété du code à la livraison.
            </p>

            <h2>Comment obtenir un devis fiable en 4 étapes ?</h2>
            <p>
              La méthode qui fonctionne, peu importe l'agence, tient en quatre étapes.
              Aucune ne demande d'expertise technique, mais toutes sont indispensables pour
              comparer des devis qui veulent dire la même chose.
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "Préparer un brief court mais précis",
                  description:
                    "Objectif principal, public cible, fonctionnalités attendues, inspirations visuelles, deadline souhaitée.",
                },
                {
                  title: "Demander 3 devis comparables",
                  description:
                    "Mêmes spécifications à chaque agence pour éviter les pommes vs poires.",
                },
                {
                  title: "Comparer le coût total sur 3 ans",
                  description:
                    "Pas seulement le devis initial — inclure maintenance, hébergement, licences récurrentes.",
                },
                {
                  title: "Vérifier la propriété du code",
                  description:
                    "Le code doit vous appartenir 100 % à la livraison. Pas de licence d'utilisation cachée.",
                },
              ]}
            />

            <p>
              Chez MV Agency, l'appel découverte de 30 minutes sert exactement à ça : on
              cadre ensemble le périmètre, on identifie ce qui apporte de la valeur, on
              écarte ce qui n'en apporte pas. Vous repartez avec une fourchette de prix
              précise et un calendrier de livraison réaliste, sans avoir à signer quoi que
              ce soit.
            </p>
          </article>

          <FAQ items={faqItems} title="Vos questions sur le prix d'un site internet" />

          <RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />

          <section className={styles.ctaFinal}>
            <h2 className={styles.ctaFinalTitle}>Prêt à cadrer votre projet ?</h2>
            <p className={styles.ctaFinalText}>
              30 minutes offertes pour échanger sur votre projet et obtenir une fourchette
              de prix précise. Sans engagement, sans devis surprise.
            </p>
            <Link href="/contact">
              <Button variant="primary">Réserver un appel offert</Button>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Ajouter les styles `.articleLayout`, `.articleContent`, `.ctaFinal*` à la fin de `Article.module.css`**

```css
/* ----- Layout 2 colonnes : sidebar Takeaways + contenu ----- */
.articleLayout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3.5rem;
  align-items: start;
  padding: 0 0 3rem;
}

.articleContent {
  min-width: 0; /* permet au flex/grid d'overflow correctement */
  font-size: 1.0625rem;        /* 17px — corps long, confortable */
  line-height: 1.75;
  color: rgba(229, 231, 235, 0.88);
}

.articleContent h2 {
  font-family: var(--font-heading), sans-serif;
  font-size: 1.625rem;
  color: var(--text-light);
  font-weight: 700;
  margin: 4rem 0 1.25rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.articleContent h2:first-child { margin-top: 0; }

.articleContent p { margin: 0 0 1.375rem 0; }
.articleContent p strong { color: var(--text-light); }
.articleContent ul,
.articleContent ol {
  margin: 0 0 1.375rem 0;
  padding-left: 1.5rem;
}
.articleContent li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

@media (max-width: 899px) {
  .articleLayout {
    grid-template-columns: 1fr; /* mobile : sidebar bascule en bloc statique en haut */
    gap: 0;
  }
  .articleContent { font-size: 1rem; line-height: 1.7; }
  .articleContent h2 { margin: 3rem 0 1rem; font-size: 1.4rem; }
}

/* ----- CTA finale (Button standard du site) ----- */
.ctaFinal {
  margin-top: 4.5rem;
  padding: 3rem 1rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.ctaFinalTitle {
  font-family: var(--font-heading), sans-serif;
  font-size: clamp(1.625rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-light);
  margin: 0 0 0.875rem 0;
  letter-spacing: -0.02em;
}
.ctaFinalText {
  font-size: 1rem;
  color: rgba(229, 231, 235, 0.7);
  margin: 0 auto 1.75rem;
  max-width: 28rem;
  line-height: 1.65;
}
```

- [ ] **Step 4: Type check + build**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

Run: `npm run build`
Expected: build success. La page article doit compiler sans erreur.

- [ ] **Step 5: Test visuel**

Run: `npm run dev`
Ouvrir : `http://localhost:3000/blog/combien-coute-un-site-internet`
Vérifier visuellement :
- Hero avec "PRIX" géant en bas-gauche, pillar tag "— CRÉATION SITE WEB" en haut-gauche, "Nº 01" en haut-droite, titre + meta
- Sidebar "À retenir" sticky à gauche avec 4 takeaways numérotés
- AnswerBlock présent
- PullQuote inséré entre les sections "Combien coûte un site vitrine" et "Sites avec automatisations"
- StatHighlight 94% inséré entre "Sites avec automatisations" et "Site e-commerce"
- ProcessSteps après "Comment obtenir un devis fiable"
- CTA finale = composant `<Button variant="primary">` (rond, fond bleu gradient, texte non uppercase)
- Sur viewport < 900px : sidebar bascule en bloc statique en haut

- [ ] **Step 6: Commit**

```bash
git add src/components/blog/index.ts src/app/blog/combien-coute-un-site-internet/page.tsx src/components/blog/Article.module.css
git commit -m "feat(blog): refonte article combien-coute-un-site-internet (langage magazine)"
```

---

## Task 9: Refonte de la carte de la page liste blog

**Files:**
- Modify: `src/app/blog/BlogClient.tsx` (markup carte)
- Modify: `src/app/blog/Blog.module.css` (styles carte)
- Modify: `src/app/blog/page.tsx` (passage des nouvelles props : keyword, num)

- [ ] **Step 1: Mettre à jour `src/app/blog/BlogClient.tsx`**

Remplacer le contenu complet par :

```tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { CoverKeyword } from "@/components/blog";
import type { CoverKeyword as CoverKeywordType } from "@/app/blog/_articles";
import styles from "./Blog.module.css";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;            // déjà formaté JJ.MM.AA
  num: string;             // numéro article 2 chars
  keyword: CoverKeywordType;
  category: string;
  readingTime: number;     // minutes
}

interface BlogClientProps {
  posts: Post[];
}

const ALL_CATEGORY = "Tout";

export const BlogClient: React.FC<BlogClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(
    () => [ALL_CATEGORY, ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const hasPosts = posts.length > 0;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (!hasPosts) {
    return (
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <FadeIn direction="up">
          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p style={{ color: "var(--text-light)", fontSize: "1.05rem", margin: "0 0 0.75rem" }}>
              Les premiers articles arrivent très bientôt.
            </p>
            <p style={{ color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              En attendant, découvrez nos{" "}
              <Link href="/cas-clients" style={{ color: "var(--primary)" }}>
                cas clients
              </Link>{" "}
              ou{" "}
              <Link href="/contact" style={{ color: "var(--primary)" }}>
                réservez un appel offert
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <FadeIn delay={0.4} direction="up" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un article..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.searchShortcut}>/</div>
          </div>
          {categories.length > 1 && (
            <div className={styles.filterList}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem 2rem" }}>
        {filteredPosts.length > 0 ? (
          <div className={styles.postGrid}>
            {filteredPosts.map((post, idx) => (
              <FadeIn key={post.slug} delay={0.1 * idx} direction="up" style={{ height: "100%" }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <article className={styles.postCard}>
                    <div className={styles.cardCover}>
                      <div className={styles.cardPillar}>— {post.category.toUpperCase()}</div>
                      <div className={styles.cardNum}>Nº {post.num}</div>
                      <CoverKeyword keyword={post.keyword} size="md" />
                    </div>
                    <div className={styles.cardBody}>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <div className={styles.cardSep} aria-hidden="true" />
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardMetaMono}>{post.date}</span>
                        <span className={styles.cardMetaMono}>{post.readingTime} MIN</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            Aucun article ne correspond à votre recherche.
          </div>
        )}
      </section>
    </>
  );
};
```

- [ ] **Step 2: Remplacer le contenu complet de `src/app/blog/Blog.module.css`**

```css
/* ==========================================================================
   /blog — page liste, search bar, filters, et carte au langage magazine.
   ========================================================================== */

/* ----- Search + filters (inchangé) ----- */
.searchWrapper {
  max-width: 600px;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.searchBar {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.searchIcon {
  position: absolute;
  left: 1.2rem;
  color: var(--text-muted);
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.searchInput {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: var(--text-light);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.searchInput:focus {
  border-color: var(--primary);
  background-color: rgba(255, 255, 255, 0.08);
}

.searchShortcut {
  position: absolute;
  right: 1.2rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  pointer-events: none;
}

.filterList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.filterPill {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary, #B5B7BC);
  padding: 0.5rem 1.2rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filterPill:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
}

.filterPillActive {
  background-color: var(--primary);
  border-color: var(--primary);
  color: var(--text-light);
}

/* ----- Grille de cartes ----- */
.postGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.postCard {
  display: flex;
  flex-direction: column;
  background-color: rgba(15, 15, 15, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.postCard:hover {
  transform: translateY(-4px);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

/* ----- Cover XL avec mot-clé géant ----- */
.cardCover {
  position: relative;
  height: 160px;
  background: linear-gradient(160deg, #0f1638 0%, #0a0a0a 75%);
  border-bottom: 1px solid rgba(96, 165, 250, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1rem 0.625rem 1rem;
}

.cardPillar {
  position: absolute;
  top: 0.875rem;
  left: 1rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #60A5FA;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 2;
}

.cardNum {
  position: absolute;
  top: 0.875rem;
  right: 1rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #6B7280;
  letter-spacing: 1.5px;
  z-index: 2;
}

.cardBody {
  padding: 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cardTitle {
  font-size: 1.0625rem;
  font-family: var(--font-heading), sans-serif;
  font-weight: 700;
  margin: 0 0 0.625rem 0;
  color: var(--text-light);
  line-height: 1.3;
  letter-spacing: -0.01em;
  /* Clamp à 2 lignes pour homogénéité de la grille */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cardSep {
  width: 36px;
  height: 2px;
  background-color: var(--primary);
  margin: 0 0 0.75rem 0;
  border-radius: 2px;
}

.cardExcerpt {
  font-size: 0.78125rem;
  line-height: 1.55;
  color: rgba(229, 231, 235, 0.65);
  margin: 0 0 1rem 0;
  flex-grow: 1;
  /* Clamp à 2 lignes pour homogénéité */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cardMeta {
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  color: #6B7280;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.cardMetaMono {
  font-family: "SF Mono", Menlo, monospace;
  letter-spacing: 1px;
}

@media (max-width: 700px) {
  .cardCover { height: 140px; }
}
```

- [ ] **Step 3: Mettre à jour `src/app/blog/page.tsx` pour passer les nouvelles props**

Remplacer le contenu complet par :

```tsx
import React from "react";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";
import { BlogClient } from "./BlogClient";
import {
  getPublishedArticles,
  getArticleNumber,
  PILLAR_LABEL,
} from "./_articles";

export const metadata: Metadata = {
  title: "Blog & Actualités | MV Agency",
  description:
    "Articles approfondis sur la création de sites web, l'intelligence artificielle pour PME, le SEO et le marketing digital — par Victor Marchetti.",
  alternates: { canonical: "/blog" },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
]);

const formatDateMono = (iso: string): string => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
};

export default function BlogPage() {
  const posts = getPublishedArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.description,
    date: formatDateMono(article.publishedAt),
    num: getArticleNumber(article.slug),
    keyword: article.keyword,
    category: PILLAR_LABEL[article.pillar],
    readingTime: article.readingTime ?? 8,
  }));

  return (
    <main style={{ paddingBottom: "5rem", minHeight: "100vh", position: "relative" }}>
      <JsonLd data={breadcrumbSchema} />

      <section style={{ minHeight: "40vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 2rem 3rem 2rem", textAlign: "center" }}>
        <FadeIn delay={0.1} direction="up">
          <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: "0.6875rem", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "0.875rem" }}>
            — Ressources
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, margin: "0 0 1.5rem 0", lineHeight: 1.1, fontFamily: "var(--font-heading)" }}>
            Bibliothèque d'Actualités
          </h1>
        </FadeIn>
        <FadeIn delay={0.3} direction="up" style={{ maxWidth: "600px" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary, #B5B7BC)", lineHeight: 1.6, margin: 0 }}>
            Plongez dans nos réflexions sur l'IA, le design d'interfaces, et l'écosystème digital qui bouscule les codes de demain.
          </p>
        </FadeIn>
      </section>

      <BlogClient posts={posts} />
    </main>
  );
}
```

- [ ] **Step 4: Type check + build**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

Run: `npm run build`
Expected: build success.

- [ ] **Step 5: Test visuel**

Run: `npm run dev`
Ouvrir : `http://localhost:3000/blog`
Vérifier :
- Hero "— Ressources / Bibliothèque d'Actualités" intact
- Search bar + filter pills fonctionnels
- 1 carte affichée (l'article existant) avec :
  - Cover XL contenant pillar tag "— CRÉATION SITE WEB", "Nº 01", et mot-clé "PRIX" géant
  - Titre + séparateur bleu + excerpt + meta `07.05.26 / 12 MIN`
- Hover : translateY -4px + glow

- [ ] **Step 6: Commit**

```bash
git add src/app/blog/BlogClient.tsx src/app/blog/Blog.module.css src/app/blog/page.tsx
git commit -m "feat(blog): refonte page liste /blog (carte au langage magazine)"
```

---

## Task 10: Refonte du composant `<BlogPreview>` (pattern featured + liste)

**Files:**
- Modify: `src/components/ui/BlogPreview.tsx` (refonte complète)
- Create: `src/components/ui/BlogPreview.module.css`

- [ ] **Step 1: Créer `src/components/ui/BlogPreview.module.css`**

```css
/* ==========================================================================
   BlogPreview — pattern "featured + liste" pour /services.
   ========================================================================== */

.wrap {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

/* ----- Featured card (premier article) ----- */
.featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(96, 165, 250, 0.18);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.125rem;
  align-items: center;
  text-decoration: none;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.featured:hover {
  border-color: rgba(96, 165, 250, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.featuredCover {
  position: relative;
  height: 180px;
  background: linear-gradient(160deg, #0f1638 0%, #0a0a0a 75%);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 0.625rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1rem 0.625rem 1rem;
}

.featuredPillar {
  position: absolute;
  top: 0.875rem;
  left: 1rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  z-index: 2;
}

.featuredNum {
  position: absolute;
  top: 0.875rem;
  right: 1rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #6B7280;
  letter-spacing: 1.5px;
  z-index: 2;
}

.featuredInfo {
  padding: 0.5rem 0;
}

.featuredTag {
  display: inline-block;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.59375rem;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
  text-transform: uppercase;
  letter-spacing: 1.4px;
  font-weight: 700;
  margin-bottom: 0.625rem;
}

.featuredTitle {
  font-family: var(--font-heading), sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--text-light);
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.featuredSep {
  width: 36px;
  height: 2px;
  background: var(--primary);
  margin: 0 0 0.75rem 0;
  border-radius: 2px;
}

.featuredExcerpt {
  font-size: 0.8125rem;
  color: rgba(229, 231, 235, 0.7);
  line-height: 1.55;
  margin: 0 0 0.875rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featuredMeta {
  display: flex;
  gap: 0.75rem;
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.65625rem;
  color: #6B7280;
  letter-spacing: 1px;
}

/* ----- Liste à plat (articles 2 à N) ----- */
.list { /* container ; les .listRow gèrent leur propre layout */ }

.listRow {
  display: flex;
  align-items: center;
  gap: 1.375rem;
  padding: 0.875rem 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: background 0.25s ease;
  border-radius: 0.625rem;
  text-decoration: none;
}
.listRow:hover { background: rgba(37, 99, 235, 0.05); }

.listNum {
  font-family: var(--font-heading), sans-serif;
  font-size: 1.875rem;
  font-weight: 900;
  color: rgba(96, 165, 250, 0.18);
  line-height: 1;
  letter-spacing: -0.04em;
  min-width: 2.5rem;
  text-align: left;
  flex-shrink: 0;
}

.listPill {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
  text-transform: uppercase;
  letter-spacing: 1.4px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.listTitle {
  flex: 1;
  font-family: var(--font-heading), sans-serif;
  font-size: 0.90625rem;
  font-weight: 700;
  color: var(--text-light);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.listMeta {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.65625rem;
  color: #6B7280;
  letter-spacing: 1px;
  flex-shrink: 0;
}

/* ----- CTA "Lire tous nos articles" ----- */
.ctaWrap {
  text-align: center;
  margin-top: 1.75rem;
}
.ctaLink {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #60A5FA;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;
}
.ctaLink:hover { gap: 0.75rem; }

/* Responsive : sous 700px, le featured passe en stack */
@media (max-width: 700px) {
  .featured { grid-template-columns: 1fr; gap: 1rem; }
  .listRow { gap: 0.875rem; padding: 0.75rem 0.5rem; }
  .listNum { font-size: 1.375rem; min-width: 1.75rem; }
  .listMeta { display: none; } /* trop encombrant en mobile */
}
```

- [ ] **Step 2: Réécrire `src/components/ui/BlogPreview.tsx` au complet**

```tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverKeyword } from "@/components/blog";
import {
  getPublishedArticles,
  getArticleNumber,
  PILLAR_LABEL,
} from "@/app/blog/_articles";
import styles from "./BlogPreview.module.css";

const formatDateMono = (iso: string): string => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
};

export function BlogPreview() {
  const articles = getPublishedArticles().slice(0, 4); // featured + 3 dans la liste

  if (articles.length === 0) {
    return (
      <div className={styles.wrap}>
        <p style={{ textAlign: "center", color: "var(--text-muted, #6B7280)", padding: "3rem 0" }}>
          Les premiers articles arrivent très bientôt.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className={styles.wrap}>
      {/* Featured card */}
      <Link href={`/blog/${featured.slug}`} className={styles.featured}>
        <div className={styles.featuredCover}>
          <div className={styles.featuredPillar}>— {PILLAR_LABEL[featured.pillar].toUpperCase()}</div>
          <div className={styles.featuredNum}>Nº {getArticleNumber(featured.slug)}</div>
          <CoverKeyword keyword={featured.keyword} size="md" />
        </div>
        <div className={styles.featuredInfo}>
          <span className={styles.featuredTag}>{PILLAR_LABEL[featured.pillar]}</span>
          <h3 className={styles.featuredTitle}>{featured.title}</h3>
          <div className={styles.featuredSep} aria-hidden="true" />
          <p className={styles.featuredExcerpt}>{featured.description}</p>
          <div className={styles.featuredMeta}>
            <span>{formatDateMono(featured.publishedAt)}</span>
            <span>·</span>
            <span>{featured.readingTime ?? 8} MIN DE LECTURE</span>
          </div>
        </div>
      </Link>

      {/* Liste à plat */}
      <div className={styles.list}>
        {rest.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.listRow}>
            <div className={styles.listNum}>{getArticleNumber(article.slug)}</div>
            <div className={styles.listPill}>{PILLAR_LABEL[article.pillar]}</div>
            <div className={styles.listTitle}>{article.title}</div>
            <div className={styles.listMeta}>
              {article.readingTime ?? 8} MIN · {formatDateMono(article.publishedAt)}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.ctaWrap}>
        <Link href="/blog" className={styles.ctaLink}>
          Lire tous nos articles
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type check + build**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

Run: `npm run build`
Expected: build success.

- [ ] **Step 4: Test visuel**

Run: `npm run dev`
Ouvrir : `http://localhost:3000/services`
Scroller jusqu'à la section "BlogPreview" (qui était une liste à plat avec numéros pâles + tags multicolores). Maintenant on doit voir :
- Une grosse carte "featured" (l'article PRIX) avec cover XL gradient sombre + mot-clé "PRIX" géant + titre + excerpt + meta
- Pas d'autre article (le projet n'en a qu'un pour l'instant) — la liste plate sera visible quand de nouveaux articles seront ajoutés
- CTA "Lire tous nos articles →" en bas

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/BlogPreview.tsx src/components/ui/BlogPreview.module.css
git commit -m "feat(blog): refonte BlogPreview en pattern featured + liste"
```

---

## Task 11: Vérification finale (lint + build + visuel)

**Files:** aucun fichier modifié — vérifications uniquement.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: aucune nouvelle erreur sur les fichiers modifiés. Les warnings préexistants peuvent rester.

- [ ] **Step 2: Type check final**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Build production**

Run: `npm run build`
Expected: build complet sans erreur. Pages générées (vérifier dans la sortie) :
- `/blog` (liste)
- `/blog/combien-coute-un-site-internet` (article)
- `/services` (avec BlogPreview)
- toutes les autres pages du site (intactes)

- [ ] **Step 4: Test visuel exhaustif sur dev server**

Run: `npm run dev`

Naviguer et vérifier les 10 acceptance criteria du spec :

1. **`/blog/combien-coute-un-site-internet`** — hero avec mot-clé "PRIX" géant entièrement visible, sidebar Takeaways sticky à gauche en desktop, body confortable (17px / line-height 1.75), composants signature (PullQuote / StatHighlight / ProcessSteps) bien espacés (~56-80px de marge), CTA finale = `<Button variant="primary">` du site (gradient bleu + texte casse normale + ribbon-glow rotatif).
2. **`/blog`** — grille de cartes au nouveau langage. Pas de référence à `/og/...png`. Hover translateY -4px + glow.
3. **`/services`** — section BlogPreview au pattern featured + liste, alimentée depuis `_articles.ts` (plus de hardcode tagColor multicolores).
4. **CTA finale d'article** : composant Button (vérifier au hover : ribbon-glow accélère, bouton remonte, animation caractère par caractère).
5. **Sur viewport < 900px** (DevTools responsive) : sidebar bascule en bloc statique en haut.
6. **`_articles.ts`** : `cover` plus présent ; `keyword`, `takeaways`, `readingTime` présents.
7. **CoverKeyword** : tester en ajoutant temporairement un 2e article au registre avec `keyword: { type: "vs", logos: ["nextjs", "wordpress"] }` pour valider le rendu logos. **Annuler la modification du registre après le test** — c'est juste une vérification visuelle.
8. **Composants jamais collés** : sur l'article test, vérifier que PullQuote → 1 H2 + 2-3 paragraphes → StatHighlight → 1 H2 + 2-3 paragraphes → InlineCTA → 1 H2 + 1 paragraphe → ProcessSteps. Aucun composant signature collé à un autre.
9. **Aucune régression** sur `/`, `/offres`, `/contact`, `/cas-clients`, `/a-propos`, etc. — passer rapidement sur chacune.
10. **`tsc --noEmit` et `npm run build`** passent (déjà vérifié aux steps 2 et 3).

- [ ] **Step 5: Commit final (si des ajustements visuels ont été nécessaires)**

Si des ajustements ont été apportés pendant le test visuel :

```bash
git add -A
git commit -m "fix(blog): ajustements visuels après test"
```

Sinon, pas de commit nécessaire — la task est terminée.

---

## Récap fichiers touchés

**Créés :**
- `src/components/blog/CoverKeyword.tsx`
- `src/components/blog/CoverKeyword.module.css`
- `src/components/blog/PullQuote.tsx`
- `src/components/blog/StatHighlight.tsx`
- `src/components/blog/ProcessSteps.tsx`
- `src/components/blog/StickyTakeaways.tsx`
- `src/components/ui/BlogPreview.module.css`

**Modifiés :**
- `src/app/blog/_articles.ts` (types + helpers + migration article)
- `src/app/blog/page.tsx` (passage des nouvelles props au BlogClient)
- `src/app/blog/BlogClient.tsx` (markup carte au nouveau langage)
- `src/app/blog/Blog.module.css` (styles carte refondus)
- `src/app/blog/combien-coute-un-site-internet/page.tsx` (refonte article)
- `src/components/blog/ArticleHeader.tsx` (refonte interne)
- `src/components/blog/Article.module.css` (nouveaux styles : header magazine + 4 composants signature + layout 2 cols + CTA finale)
- `src/components/blog/index.ts` (barrel : exports des nouveaux composants)
- `src/components/ui/BlogPreview.tsx` (refonte pattern featured + liste)

**Supprimés :** aucun (le champ `cover` est retiré du type, mais aucun fichier supprimé).
