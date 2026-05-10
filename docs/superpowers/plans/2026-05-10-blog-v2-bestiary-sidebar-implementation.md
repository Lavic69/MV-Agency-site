# Blog v2 — Bestiary élargi + sidebar TOC — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Étendre la v1 du blog magazine avec 4 nouveaux composants signature (`<ComparisonTable>`, `<Callout>`, `<DefinitionBox>`, `<Diagram>` à 5 variants), refactorer la sidebar en stack vertical TOC + Takeaways avec scroll-spy, et retravailler ciblé l'article PRIX existant pour exploiter le nouveau bestiary.

**Architecture:** Continuité directe de la v1 — pure CSS modules + TypeScript + framer-motion + react-icons, pas de nouvelle dépendance. Le composant `<Diagram>` accepte une discriminated union pour ses 5 variants (linear, circular, hierarchy, funnel, quadrant). `<ArticleSidebar>` (renommé de `<StickyTakeaways>`) utilise un `IntersectionObserver` côté client pour le scroll-spy du TOC, et bascule en `<details>` natif sur mobile (zéro JS pour le toggle).

**Tech Stack:** Next.js 16.2.2 (App Router), React 19.2.4, TypeScript ^5, framer-motion 12.38.0, lucide-react 1.7.0 (déjà installé pour les icônes Callout), pas de Tailwind.

**Notes d'environnement:**
- Branche : `claude/blog-v2-bestiary` (forkée de `claude/charming-haibt-f45b1b` v1).
- Worktree : `/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary`.
- Pas de framework de test → vérifications via `npx tsc --noEmit`, `npm run lint`, `npm run build`, et tests visuels manuels.
- Spec : [docs/superpowers/specs/2026-05-10-blog-v2-bestiary-sidebar-design.md](../specs/2026-05-10-blog-v2-bestiary-sidebar-design.md).

---

## Task 1 : Étendre `_articles.ts` avec `tocItems`

**Files:**
- Modify: `src/app/blog/_articles.ts`

- [ ] **Step 1: Ouvrir `src/app/blog/_articles.ts` et ajouter le type `TocItem` + le champ `tocItems` dans `ArticleMeta`**

Le fichier existe déjà (v1). On ajoute uniquement :
1. Un nouveau type `TocItem` après le type `CoverKeyword`.
2. Le champ `tocItems: TocItem[]` dans `ArticleMeta` (juste après `takeaways`).
3. Le tableau `tocItems` dans l'entrée de l'article existant (juste après `takeaways: [...]`).

Localiser le bloc `export type CoverKeyword = ...` et insérer juste après :

```ts
/**
 * Item du sommaire (TOC) affiché dans la sidebar de l'article.
 * - `id` : ancre HTML (kebab-case, ex: "site-vitrine") posée sur le <h2 id="..."> dans le JSX
 * - `label` : libellé affiché dans le sommaire
 */
export type TocItem = {
  id: string;
  label: string;
};
```

Localiser `ArticleMeta` et ajouter `tocItems` juste après `takeaways` :

```ts
export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  pillar: ArticlePillar;
  category: string;
  keyword: CoverKeyword;
  takeaways: string[];
  tocItems: TocItem[];        // ✨ NEW (v2)
  readingTime?: number;
  primaryKeyword: string;
  status?: "published" | "draft";
};
```

Localiser l'entrée de l'article `combien-coute-un-site-internet` et ajouter `tocItems` juste après `takeaways: [...]` (avant `readingTime`) :

```ts
    takeaways: [
      "Site vitrine pro = 1 900 € à 4 000 €",
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
```

- [ ] **Step 2: Type check**

Run: `cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary" && npx tsc --noEmit`

Expected: 0 errors. Si une erreur apparaît, c'est probablement parce que le champ `tocItems` est requis mais l'entrée article n'en a pas — vérifier la position de l'ajout.

- [ ] **Step 3: Commit**

```bash
cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary"
git add src/app/blog/_articles.ts
git commit -m "feat(blog-v2): étendre _articles.ts avec TocItem + tocItems"
```

---

## Task 2 : Composant `<ComparisonTable>`

**Files:**
- Create: `src/components/blog/ComparisonTable.tsx`
- Modify: `src/components/blog/Article.module.css` (append `.comparison*` styles)

- [ ] **Step 1: Créer `src/components/blog/ComparisonTable.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

export type ComparisonRow = {
  feature: string;
  values: Array<string | boolean>;
  highlight?: boolean;
};

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  caption?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ columns, rows, caption }) => {
  return (
    <figure className={styles.comparisonWrap}>
      <div className={styles.comparisonScroll}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th></th>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={row.highlight ? styles.comparisonHighlight : undefined}>
                <td className={styles.comparisonFeature}>{row.feature}</td>
                {row.values.map((value, j) => (
                  <td key={j} className={typeof value === "boolean" ? (value ? styles.comparisonYes : styles.comparisonNo) : undefined}>
                    {typeof value === "boolean" ? (value ? "✓" : "—") : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className={styles.comparisonCaption}>{caption}</figcaption>}
    </figure>
  );
};
```

- [ ] **Step 2: Append styles à la fin de `src/components/blog/Article.module.css`**

```css
/* ----- ComparisonTable (table comparative dense) ----- */
.comparisonWrap {
  margin: 3.5rem 0;
}

.comparisonScroll {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.comparisonTable {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78125rem;
}

.comparisonTable th,
.comparisonTable td {
  padding: 0.625rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.comparisonTable th {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.625rem;
  color: #60A5FA;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  background: rgba(96, 165, 250, 0.04);
}

.comparisonFeature {
  color: rgba(229, 231, 235, 0.65);
  font-weight: 500;
}

.comparisonYes { color: #4ADE80; font-weight: 700; }
.comparisonNo { color: rgba(245, 158, 11, 0.7); }

.comparisonHighlight {
  background: rgba(37, 99, 235, 0.04);
}

.comparisonCaption {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: #6B7280;
  text-align: center;
  margin-top: 0.875rem;
  font-style: italic;
}

@media (max-width: 700px) {
  .comparisonWrap { margin: 2.5rem 0; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/ComparisonTable.tsx src/components/blog/Article.module.css
git commit -m "feat(blog-v2): composant ComparisonTable (tableau comparatif)"
```

---

## Task 3 : Composant `<Callout>` (3 variantes)

**Files:**
- Create: `src/components/blog/Callout.tsx`
- Modify: `src/components/blog/Article.module.css` (append `.callout*` styles)

- [ ] **Step 1: Créer `src/components/blog/Callout.tsx`**

```tsx
import React from "react";
import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import styles from "./Article.module.css";

export type CalloutVariant = "warning" | "tip" | "info";

interface CalloutProps {
  variant: CalloutVariant;
  label?: string;
  children: React.ReactNode;
}

const VARIANT_CONFIG: Record<CalloutVariant, { Icon: React.ComponentType<{ size?: number }>; defaultLabel: string; className: string; labelClassName: string }> = {
  warning: {
    Icon: AlertTriangle,
    defaultLabel: "PIÈGE À ÉVITER",
    className: "calloutWarn",
    labelClassName: "calloutLabelWarn",
  },
  tip: {
    Icon: Lightbulb,
    defaultLabel: "ASTUCE",
    className: "calloutTip",
    labelClassName: "calloutLabelTip",
  },
  info: {
    Icon: Info,
    defaultLabel: "À NOTER",
    className: "calloutInfo",
    labelClassName: "calloutLabelInfo",
  },
};

export const Callout: React.FC<CalloutProps> = ({ variant, label, children }) => {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;
  return (
    <aside className={`${styles.callout} ${styles[config.className]}`}>
      <Icon size={18} className={styles.calloutIcon} aria-hidden="true" />
      <div className={styles.calloutContent}>
        <div className={`${styles.calloutLabel} ${styles[config.labelClassName]}`}>— {label ?? config.defaultLabel}</div>
        <div className={styles.calloutText}>{children}</div>
      </div>
    </aside>
  );
};
```

- [ ] **Step 2: Append styles à la fin de `src/components/blog/Article.module.css`**

```css
/* ----- Callout (warning / tip / info) ----- */
.callout {
  display: flex;
  gap: 0.875rem;
  padding: 0.875rem 1.125rem;
  border-radius: 0.625rem;
  align-items: flex-start;
  margin: 3.5rem 0;
}

.calloutIcon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.calloutContent {
  flex: 1;
}

.calloutLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.59375rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.calloutText {
  font-size: 0.84375rem;
  color: rgba(229, 231, 235, 0.85);
  line-height: 1.55;
}

.calloutText p { margin: 0 0 0.5rem 0; }
.calloutText p:last-child { margin-bottom: 0; }

/* Variant warning */
.calloutWarn {
  background: rgba(245, 158, 11, 0.06);
  border-left: 3px solid #F59E0B;
}
.calloutWarn .calloutIcon { color: #F59E0B; }
.calloutLabelWarn { color: #F59E0B; }

/* Variant tip */
.calloutTip {
  background: rgba(34, 197, 94, 0.06);
  border-left: 3px solid #4ADE80;
}
.calloutTip .calloutIcon { color: #4ADE80; }
.calloutLabelTip { color: #4ADE80; }

/* Variant info */
.calloutInfo {
  background: rgba(96, 165, 250, 0.06);
  border-left: 3px solid #60A5FA;
}
.calloutInfo .calloutIcon { color: #60A5FA; }
.calloutLabelInfo { color: #60A5FA; }

@media (max-width: 700px) {
  .callout { padding: 0.75rem 1rem; margin: 2.5rem 0; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/Callout.tsx src/components/blog/Article.module.css
git commit -m "feat(blog-v2): composant Callout (warning/tip/info)"
```

---

## Task 4 : Composant `<DefinitionBox>`

**Files:**
- Create: `src/components/blog/DefinitionBox.tsx`
- Modify: `src/components/blog/Article.module.css` (append `.defbox*` styles)

- [ ] **Step 1: Créer `src/components/blog/DefinitionBox.tsx`**

```tsx
import React from "react";
import styles from "./Article.module.css";

interface DefinitionBoxProps {
  term: string;
  children: React.ReactNode;
  label?: string;
}

export const DefinitionBox: React.FC<DefinitionBoxProps> = ({ term, children, label = "DÉFINITION" }) => {
  return (
    <aside className={styles.defbox}>
      <div className={styles.defboxLabel}>— {label}</div>
      <div className={styles.defboxTerm}>{term}</div>
      <div className={styles.defboxDesc}>{children}</div>
    </aside>
  );
};
```

- [ ] **Step 2: Append styles à la fin de `src/components/blog/Article.module.css`**

```css
/* ----- DefinitionBox (encadré pédagogique pour terme technique) ----- */
.defbox {
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(96, 165, 250, 0.18);
  border-radius: 0.625rem;
  padding: 0.875rem 1.125rem;
  margin: 3.5rem 0;
}

.defboxLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.59375rem;
  color: #60A5FA;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.375rem;
}

.defboxTerm {
  font-family: var(--font-heading), sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 0.375rem;
}

.defboxDesc {
  font-size: 0.78125rem;
  color: rgba(229, 231, 235, 0.75);
  line-height: 1.55;
}

.defboxDesc p { margin: 0 0 0.5rem 0; }
.defboxDesc p:last-child { margin-bottom: 0; }

@media (max-width: 700px) {
  .defbox { padding: 0.75rem 1rem; margin: 2.5rem 0; }
}
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/DefinitionBox.tsx src/components/blog/Article.module.css
git commit -m "feat(blog-v2): composant DefinitionBox (encadré pédagogique)"
```

---

## Task 5 : Composant `<Diagram>` (5 variants)

**Files:**
- Create: `src/components/blog/Diagram.tsx`
- Create: `src/components/blog/Diagram.module.css` (CSS dédié — composant complexe)

- [ ] **Step 1: Créer `src/components/blog/Diagram.module.css`**

```css
/* ==========================================================================
   <Diagram> — schéma visuel pur HTML/CSS (5 variants).
   ========================================================================== */

/* Wrapper card commun à tous les variants */
.wrap {
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.875rem;
  padding: 1.5rem;
  margin: 3.5rem 0;
  overflow: hidden; /* empêche tout débordement (notamment cercle pointillé du circular) */
}

.label {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.625rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.875rem;
  text-align: center;
}

.caption {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: rgba(229, 231, 235, 0.5);
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
}

/* === LINEAR (flux séquentiel) === */
.linear {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.linNode {
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 0.625rem;
  padding: 1rem 0.875rem;
  text-align: center;
  min-width: 5.625rem;
  box-shadow: 0 0 1rem rgba(37, 99, 235, 0.15);
}

.linNodeAlt { background: rgba(96, 165, 250, 0.05); }

.linNodeNum {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #60A5FA;
  letter-spacing: 1px;
  margin-bottom: 0.375rem;
}

.linNodeLabel {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-light);
}

.linArrow {
  color: rgba(96, 165, 250, 0.5);
  font-size: 1.125rem;
}

/* === CIRCULAR (cycle / boucle) === */
.circular {
  position: relative;
  height: 17.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circSvg {
  position: absolute;
  inset: 0;
}

.circNode {
  position: absolute;
  background: rgba(15, 15, 15, 0.95);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: center;
  min-width: 5.625rem;
  box-shadow: 0 0 1rem rgba(37, 99, 235, 0.2);
  z-index: 2;
}

.circNodeNum {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: #60A5FA;
  letter-spacing: 1px;
  margin-bottom: 0.25rem;
}

.circNodeLabel {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-light);
}

.circNodeTop { top: 0.625rem; left: 50%; transform: translateX(-50%); }
.circNodeRight { top: 50%; right: 1.875rem; transform: translateY(-50%); }
.circNodeBottom { bottom: 0.625rem; left: 50%; transform: translateX(-50%); }
.circNodeLeft { top: 50%; left: 1.875rem; transform: translateY(-50%); }

.circCenter {
  /* Deux backgrounds layered : solid color + radial gradient.
     Le solid masque le cercle pointillé qui passe DERRIÈRE. */
  background-color: var(--bg-neutral, #0a0a0a);
  background-image: radial-gradient(circle, rgba(37, 99, 235, 0.4), rgba(37, 99, 235, 0.1));
  border: 1px solid rgba(96, 165, 250, 0.6);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 0 1.875rem rgba(37, 99, 235, 0.5);
}

.circCenterText {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  color: #60A5FA;
}

/* === HIERARCHY (arbre / branches) === */
.hierarchy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hierRow {
  display: flex;
  gap: 1rem;
  justify-content: center;
  position: relative;
}

.hierRowChildren::before {
  content: '';
  position: absolute;
  top: -1.375rem;
  left: 50%;
  width: 1px;
  height: 1.375rem;
  background: rgba(96, 165, 250, 0.4);
}

.hierRowChildren::after {
  content: '';
  position: absolute;
  top: -1.375rem;
  left: 25%;
  right: 25%;
  height: 1px;
  background: rgba(96, 165, 250, 0.4);
}

.hierNode {
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.4);
  border-radius: 0.625rem;
  padding: 0.75rem 1.125rem;
  text-align: center;
  min-width: 6.875rem;
  box-shadow: 0 0 0.75rem rgba(37, 99, 235, 0.15);
}

.hierNodeRoot {
  background: radial-gradient(circle, rgba(37, 99, 235, 0.25), rgba(37, 99, 235, 0.05));
  border-color: rgba(96, 165, 250, 0.7);
  box-shadow: 0 0 1.5rem rgba(37, 99, 235, 0.3);
}

.hierNodeLabel {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-light);
}

.hierNodeSub {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.5625rem;
  color: rgba(96, 165, 250, 0.7);
  letter-spacing: 1px;
  margin-top: 0.25rem;
}

/* === FUNNEL (entonnoir) === */
.funnel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.funRow {
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.4);
  text-align: center;
  padding: 0.75rem 0;
  box-shadow: 0 0 0.75rem rgba(37, 99, 235, 0.15);
}

/* 5 paliers possibles avec clip-path trapézoïdal progressif */
.funRow1 { width: 100%; clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%); }
.funRow2 { width: 80%; clip-path: polygon(11% 0, 89% 0, 79% 100%, 21% 100%); }
.funRow3 { width: 60%; clip-path: polygon(15% 0, 85% 0, 70% 100%, 30% 100%); }
.funRow4 { width: 40%; clip-path: polygon(20% 0, 80% 0, 60% 100%, 40% 100%); background: rgba(37, 99, 235, 0.2); }
.funRow5 { width: 25%; clip-path: polygon(25% 0, 75% 0, 50% 100%, 50% 100%); background: rgba(37, 99, 235, 0.25); }

.funContent {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0 1.5rem;
}

.funLabel {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-light);
}

.funValue {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: #60A5FA;
  font-weight: 700;
}

/* === QUADRANT (matrice 2×2) === */
.quadrant {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
  gap: 0.5rem;
  aspect-ratio: 1.4 / 1;
  max-width: 30rem;
  margin: 0 auto;
}

.quadCorner { /* empty top-left */ }

.quadXLabel,
.quadYLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.625rem;
  color: rgba(96, 165, 250, 0.7);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
}

.quadXLabel { text-align: center; padding: 0.25rem; }
.quadYLabel { writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; padding: 0.25rem; }

.quadCell {
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 0.5rem;
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quadCellHighlight {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 0.875rem rgba(37, 99, 235, 0.2);
}

.quadTitle {
  font-family: var(--font-heading), sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--text-light);
  margin-bottom: 0.375rem;
}

.quadDesc {
  font-size: 0.6875rem;
  color: rgba(229, 231, 235, 0.6);
  line-height: 1.4;
}

/* === RESPONSIVE === */
@media (max-width: 700px) {
  .wrap { padding: 1.25rem; margin: 2.5rem 0; }

  .circular { height: 15rem; }
  .circNodeRight { right: 0.625rem; }
  .circNodeLeft { left: 0.625rem; }

  /* funnel : largeurs ajustées pour mobile */
  .funRow1 { width: 100%; }
  .funRow2 { width: 90%; }
  .funRow3 { width: 75%; }
  .funRow4 { width: 60%; }
  .funRow5 { width: 45%; }

  /* quadrant : stack vertical (perte lecture matricielle, acceptable) */
  .quadrant {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    aspect-ratio: auto;
  }
  .quadCorner, .quadXLabel, .quadYLabel { display: none; }
}
```

- [ ] **Step 2: Créer `src/components/blog/Diagram.tsx`**

```tsx
import React from "react";
import styles from "./Diagram.module.css";

export type DiagramNode = {
  label: string;
  num?: string;
  sub?: string;
};

type LinearDiagram = {
  variant: "linear";
  nodes: DiagramNode[];
  caption?: string;
};

type CircularDiagram = {
  variant: "circular";
  centerLabel: string;
  nodes: DiagramNode[]; // 4 max — placés N/E/S/O
  caption?: string;
};

type HierarchyDiagram = {
  variant: "hierarchy";
  root: DiagramNode;
  children: DiagramNode[];
  caption?: string;
};

export type FunnelRow = { label: string; value: string };

type FunnelDiagram = {
  variant: "funnel";
  rows: FunnelRow[]; // 3-5 max
  caption?: string;
};

export type QuadrantCell = { title: string; description: string; highlight?: boolean };

type QuadrantDiagram = {
  variant: "quadrant";
  xLabels: [string, string];
  yLabels: [string, string];
  cells: [QuadrantCell, QuadrantCell, QuadrantCell, QuadrantCell]; // top-left, top-right, bottom-left, bottom-right
  caption?: string;
};

type DiagramProps = (LinearDiagram | CircularDiagram | HierarchyDiagram | FunnelDiagram | QuadrantDiagram) & {
  showLabel?: boolean; // défaut: true
};

const FUNNEL_ROW_CLASSES = [
  styles.funRow1,
  styles.funRow2,
  styles.funRow3,
  styles.funRow4,
  styles.funRow5,
];

const CIRCULAR_POSITION_CLASSES = [
  styles.circNodeTop,
  styles.circNodeRight,
  styles.circNodeBottom,
  styles.circNodeLeft,
];

export const Diagram: React.FC<DiagramProps> = (props) => {
  const showLabel = props.showLabel !== false;

  return (
    <figure className={styles.wrap}>
      {showLabel && <div className={styles.label}>— variant: &quot;{props.variant}&quot;</div>}

      {props.variant === "linear" && (
        <div className={styles.linear}>
          {props.nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className={`${styles.linNode} ${i % 2 === 1 ? styles.linNodeAlt : ""}`}>
                {node.num && <div className={styles.linNodeNum}>{node.num}</div>}
                <div className={styles.linNodeLabel}>{node.label}</div>
              </div>
              {i < props.nodes.length - 1 && <div className={styles.linArrow} aria-hidden="true">→</div>}
            </React.Fragment>
          ))}
        </div>
      )}

      {props.variant === "circular" && (
        <div className={styles.circular}>
          <svg className={styles.circSvg} viewBox="0 0 400 280" aria-hidden="true">
            <circle cx="200" cy="140" r="100" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          {props.nodes.slice(0, 4).map((node, i) => (
            <div key={i} className={`${styles.circNode} ${CIRCULAR_POSITION_CLASSES[i]}`}>
              {node.num && <div className={styles.circNodeNum}>{node.num}</div>}
              <div className={styles.circNodeLabel}>{node.label}</div>
            </div>
          ))}
          <div className={styles.circCenter}>
            <div className={styles.circCenterText}>{props.centerLabel}</div>
          </div>
        </div>
      )}

      {props.variant === "hierarchy" && (
        <div className={styles.hierarchy}>
          <div className={styles.hierRow}>
            <div className={`${styles.hierNode} ${styles.hierNodeRoot}`}>
              <div className={styles.hierNodeLabel}>{props.root.label}</div>
              {props.root.sub && <div className={styles.hierNodeSub}>{props.root.sub}</div>}
            </div>
          </div>
          <div className={`${styles.hierRow} ${styles.hierRowChildren}`}>
            {props.children.map((child, i) => (
              <div key={i} className={styles.hierNode}>
                <div className={styles.hierNodeLabel}>{child.label}</div>
                {child.sub && <div className={styles.hierNodeSub}>{child.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {props.variant === "funnel" && (
        <div className={styles.funnel}>
          {props.rows.slice(0, 5).map((row, i) => (
            <div key={i} className={`${styles.funRow} ${FUNNEL_ROW_CLASSES[i]}`}>
              <div className={styles.funContent}>
                <div className={styles.funLabel}>{row.label}</div>
                <div className={styles.funValue}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {props.variant === "quadrant" && (
        <div className={styles.quadrant}>
          <div className={styles.quadCorner}></div>
          <div className={styles.quadXLabel}>{props.xLabels[0]}</div>
          <div className={styles.quadXLabel}>{props.xLabels[1]}</div>

          <div className={styles.quadYLabel}>{props.yLabels[0]}</div>
          <div className={`${styles.quadCell} ${props.cells[0].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[0].title}</div>
            <div className={styles.quadDesc}>{props.cells[0].description}</div>
          </div>
          <div className={`${styles.quadCell} ${props.cells[1].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[1].title}</div>
            <div className={styles.quadDesc}>{props.cells[1].description}</div>
          </div>

          <div className={styles.quadYLabel}>{props.yLabels[1]}</div>
          <div className={`${styles.quadCell} ${props.cells[2].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[2].title}</div>
            <div className={styles.quadDesc}>{props.cells[2].description}</div>
          </div>
          <div className={`${styles.quadCell} ${props.cells[3].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[3].title}</div>
            <div className={styles.quadDesc}>{props.cells[3].description}</div>
          </div>
        </div>
      )}

      {props.caption && <figcaption className={styles.caption}>{props.caption}</figcaption>}
    </figure>
  );
};
```

- [ ] **Step 3: Type check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/blog/Diagram.tsx src/components/blog/Diagram.module.css
git commit -m "feat(blog-v2): composant Diagram (5 variants : linear/circular/hierarchy/funnel/quadrant)"
```

---

## Task 6 : Refactor `<StickyTakeaways>` → `<ArticleSidebar>`

**Files:**
- Delete: `src/components/blog/StickyTakeaways.tsx` (renommé via `git mv` puis réécrit)
- Create: `src/components/blog/ArticleSidebar.tsx`
- Modify: `src/components/blog/Article.module.css` (remplace les styles `.takeaways*` existants par les nouveaux `.sidebar*`)

- [ ] **Step 1: Renommer le fichier via git pour préserver l'historique**

```bash
cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary"
git mv src/components/blog/StickyTakeaways.tsx src/components/blog/ArticleSidebar.tsx
```

- [ ] **Step 2: Réécrire le contenu complet de `src/components/blog/ArticleSidebar.tsx`**

```tsx
"use client";

import React, { useEffect, useState } from "react";
import type { TocItem } from "@/app/blog/_articles";
import styles from "./Article.module.css";

interface ArticleSidebarProps {
  tocItems: TocItem[];
  takeaways: string[];
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ tocItems, takeaways }) => {
  const [activeId, setActiveId] = useState<string | null>(tocItems[0]?.id ?? null);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // On garde la dernière section qui passe en "intersecting" — la plus haute visible.
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Trier par position verticale et prendre la première (la plus haute dans le viewport).
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-30% 0px -50% 0px",
      }
    );

    const targets: HTMLElement[] = [];
    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        targets.push(el);
      }
    }

    return () => {
      for (const el of targets) observer.unobserve(el);
      observer.disconnect();
    };
  }, [tocItems]);

  if (tocItems.length === 0 && takeaways.length === 0) return null;

  const tocSection = tocItems.length > 0 && (
    <div>
      <div className={styles.sidebarLabel}>— Sommaire</div>
      <ul className={styles.tocList}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.tocItem} ${activeId === item.id ? styles.tocItemActive : ""}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const takeawaysSection = takeaways.length > 0 && (
    <div>
      <div className={styles.sidebarLabel}>— À retenir</div>
      <ul className={styles.takeawaysList}>
        {takeaways.map((item, i) => (
          <li className={styles.takeawayItem} key={i}>
            <span className={styles.takeawayBullet} aria-hidden="true">{i + 1}</span>
            {/* Safe: takeaways come from the trusted internal registry _articles.ts (no user input). */}
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );

  const desktopAside = (
    <aside className={`${styles.sidebar} ${styles.sidebarDesktop}`} aria-label="Sommaire et points à retenir">
      {tocSection}
      {tocSection && takeawaysSection && <div className={styles.sidebarSep} aria-hidden="true" />}
      {takeawaysSection}
    </aside>
  );

  const mobileDetails = (
    <details className={styles.sidebarMobile}>
      <summary className={styles.sidebarMobileSummary}>— Sommaire & retenir</summary>
      <div className={styles.sidebarMobileContent}>
        {tocSection}
        {tocSection && takeawaysSection && <div className={styles.sidebarSep} aria-hidden="true" />}
        {takeawaysSection}
      </div>
    </details>
  );

  return (
    <>
      {desktopAside}
      {mobileDetails}
    </>
  );
};
```

- [ ] **Step 3: Remplacer dans `src/components/blog/Article.module.css` les styles `.takeawaysSticky` / `.takeawaysStatic` / `.takeawaysLabel` / `.takeawaysList` / `.takeawayItem` / `.takeawayBullet` + leur `@media`**

Localiser le bloc commenté `/* ----- StickyTakeaways — sidebar sticky desktop ----- */` (introduit en v1) et **remplacer ce bloc complet** (du commentaire jusqu'à la fin du `@media (max-width: 899px)` qui le suit) par les nouvelles règles ci-dessous.

```css
/* ----- ArticleSidebar (TOC + Takeaways stack vertical) ----- */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Variante desktop : sticky avec border-left */
.sidebarDesktop {
  border-left: 2px solid rgba(96, 165, 250, 0.3);
  padding: 0.375rem 0 0.375rem 1.375rem;
  position: sticky;
  top: 2rem;
  align-self: start;
}

/* Variante mobile : <details> repliable */
.sidebarMobile {
  display: none; /* caché par défaut, override en media query */
  background: rgba(96, 165, 250, 0.05);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 0.625rem;
  margin-bottom: 1.5rem;
}

.sidebarMobileSummary {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.75rem 1rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Cache la flèche par défaut du <details> et utilise notre propre indicateur */
.sidebarMobileSummary::-webkit-details-marker { display: none; }
.sidebarMobileSummary::after {
  content: "▾";
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}
.sidebarMobile[open] .sidebarMobileSummary::after { transform: rotate(180deg); }

.sidebarMobileContent {
  padding: 0.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Label commun aux deux sections (TOC + Takeaways) */
.sidebarLabel {
  font-family: "SF Mono", Menlo, monospace;
  font-size: 0.6875rem;
  color: #60A5FA;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.875rem;
}

/* Séparateur entre TOC et Takeaways */
.sidebarSep {
  height: 1px;
  background: linear-gradient(90deg, rgba(96, 165, 250, 0.3), transparent);
}

/* === TOC === */
.tocList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.tocItem {
  display: block;
  font-size: 0.78125rem;
  color: rgba(229, 231, 235, 0.55);
  line-height: 1.45;
  padding: 0.375rem 0 0.375rem 0.875rem;
  border-left: 2px solid transparent;
  margin-left: -1rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s, border-color 0.15s;
}

.tocItem:hover { color: rgba(229, 231, 235, 0.9); }

.tocItemActive {
  color: var(--text-light);
  border-left-color: var(--primary);
  font-weight: 600;
}

/* === Takeaways === */
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
  width: 1.375rem;
  height: 1.375rem;
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

/* === Responsive : <900px = mobile <details>, hide desktop sidebar === */
@media (max-width: 899px) {
  .sidebarDesktop { display: none; }
  .sidebarMobile { display: block; }
}
```

- [ ] **Step 4: Type check**

Run: `npx tsc --noEmit`
Expected: 1 erreur attendue dans `src/app/blog/combien-coute-un-site-internet/page.tsx` qui importe encore `StickyTakeaways` (sera fixée en Task 7 + 8). Toute autre erreur doit être corrigée.

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/ArticleSidebar.tsx src/components/blog/Article.module.css
# Note: le `git mv` initial est déjà staged si pas encore commité
git commit -m "feat(blog-v2): refactor StickyTakeaways → ArticleSidebar (TOC + scroll-spy + <details> mobile)"
```

---

## Task 7 : Mettre à jour le barrel export `src/components/blog/index.ts`

**Files:**
- Modify: `src/components/blog/index.ts`

- [ ] **Step 1: Réécrire `src/components/blog/index.ts` au complet**

```ts
export { ArticleHeader } from "./ArticleHeader";
export { AnswerBlock } from "./AnswerBlock";
export { InlineCTA } from "./InlineCTA";
export { FAQ } from "./FAQ";
export { RelatedArticles } from "./RelatedArticles";
export { BreadcrumbTrail } from "./BreadcrumbTrail";

// Composants signature v1
export { CoverKeyword } from "./CoverKeyword";
export { PullQuote } from "./PullQuote";
export { StatHighlight } from "./StatHighlight";
export { ProcessSteps } from "./ProcessSteps";

// v2 — Sidebar refactorée (TOC + Takeaways)
// Note: `StickyTakeaways` (v1) a été renommé en `ArticleSidebar` — aucun re-export legacy.
export { ArticleSidebar } from "./ArticleSidebar";

// v2 — Bestiary élargi
export { ComparisonTable } from "./ComparisonTable";
export { Callout } from "./Callout";
export { DefinitionBox } from "./DefinitionBox";
export { Diagram } from "./Diagram";
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: l'erreur sur l'import de `StickyTakeaways` dans la page article reste (sera corrigée en Task 8). Pas de nouvelle erreur sur le barrel.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/index.ts
git commit -m "feat(blog-v2): mise à jour barrel — ArticleSidebar + 4 nouveaux composants"
```

---

## Task 8 : Refactor de l'article PRIX

**Files:**
- Modify: `src/app/blog/combien-coute-un-site-internet/page.tsx`

- [ ] **Step 1: Réécrire le fichier `src/app/blog/combien-coute-un-site-internet/page.tsx` au complet**

Les changements vs v1 :
- Imports : `StickyTakeaways` → `ArticleSidebar`, ajout de `ComparisonTable`, `Callout`, `Diagram`.
- Passage des props `tocItems={ARTICLE.tocItems}` au lieu de juste `takeaways`.
- Ajout d'`id="..."` sur les 8 `<h2>` du contenu.
- Remplacement de la description textuelle des 3 packs (sous-section vitrine) par `<ComparisonTable>`.
- Suppression de la section `"Pourquoi le « moins cher » coûte plus cher ?"` (~150 mots) remplacée par un `<Callout variant="warning">` plus concis.
- Ajout d'un `<Diagram variant="linear">` du workflow projet juste avant la section "Comment obtenir un devis fiable en 4 étapes".
- Le reste (AnswerBlock, PullQuote, StatHighlight, InlineCTA, ProcessSteps, FAQ, RelatedArticles, CTA finale) reste tel quel.

```tsx
import type { Metadata } from "next";
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
  ArticleSidebar,
  ComparisonTable,
  Callout,
  Diagram,
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
const _ARTICLE = getArticleBySlug(SLUG);
if (!_ARTICLE) {
  throw new Error(`[blog] No article found for slug "${SLUG}". Check src/app/blog/_articles.ts.`);
}
const ARTICLE = _ARTICLE;
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
  imageUrl: `${SITE_URL}/opengraph-image`,
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
        <ArticleSidebar tocItems={ARTICLE.tocItems} takeaways={ARTICLE.takeaways} />

        <div className={styles.articleContent}>
          <AnswerBlock>
            Un site internet professionnel coûte entre <strong>1 500 € et 8 000 €</strong> en
            2026 selon trois facteurs principaux : le <strong>type de site</strong>{" "}
            (vitrine, automatisé, e-commerce), le <strong>degré de personnalisation</strong>{" "}
            (template vs design sur-mesure) et la <strong>stack technique</strong>{" "}
            (WordPress vs Next.js). Une vitrine premium démarre à 1 900 €, un site avec
            automatisations à 4 000 €, un e-commerce sur-mesure à 6 000 €. Au-delà de
            l&apos;investissement initial, le vrai coût se mesure sur 3 ans : un site mal conçu
            coûte le double en maintenance et refonte. Cet article détaille les fourchettes
            par type de projet, les cinq variables qui font bouger le prix, et la fourchette
            de coûts récurrents (domaine, hébergement, maintenance) à anticiper.
          </AnswerBlock>

          <article>
            <h2 id="de-quoi-parle-t-on">De quoi parle-t-on quand on dit « site internet » ?</h2>
            <p>
              Le mot « site » couvre des réalités très différentes, et c&apos;est précisément
              pour ça qu&apos;il est difficile d&apos;annoncer un prix unique. Un site vitrine de cinq
              pages pour un cabinet dentaire, une boutique e-commerce avec deux mille
              références, et une plateforme SaaS B2B sur-mesure n&apos;ont rien à voir techniquement
              — ni en délai, ni en prix.
            </p>
            <p>
              Avant toute estimation, il faut classer le projet dans une de ces grandes
              familles :
            </p>
            <ul>
              <li>
                <strong>Site vitrine premium</strong> : 5 à 10 pages, présentation de
                l&apos;entreprise et des services, formulaire de contact, optimisation SEO de
                base. Pas d&apos;espace client, pas de paiement.
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
                d&apos;utilisateurs, base de données complexe, fonctionnalités métier
                spécifiques (réservation, marketplace, SaaS).
              </li>
            </ul>
            <p>
              Chaque famille a son propre intervalle de prix, qu&apos;on détaille section après
              section.
            </p>

            <h2 id="site-vitrine">Combien coûte un site vitrine en 2026 ?</h2>
            <p>
              Pour un site vitrine professionnel, la fourchette réaliste en 2026 est de{" "}
              <strong>1 900 € à 4 000 €</strong>. En dessous de 1 500 €, on entre dans les
              territoires des templates pré-faits avec personnalisation très limitée — c&apos;est
              parfois suffisant pour démarrer mais ça vieillit vite et la cohérence visuelle
              n&apos;est pas toujours au rendez-vous.
            </p>
            <p>
              Chez MV Agency, on propose trois packs avec des périmètres clairement définis.
              Voici comment ils se comparent :
            </p>

            <ComparisonTable
              columns={["Fondation", "Croissance", "Performance IA"]}
              rows={[
                { feature: "Pages incluses", values: ["jusqu'à 5", "jusqu'à 10", "illimité"] },
                { feature: "Design responsive sur-mesure", values: [true, true, true] },
                { feature: "SEO racine + Analytics", values: [true, true, true] },
                { feature: "Chatbot IA intelligent", values: [false, true, true], highlight: true },
                { feature: "Génération contenu IA", values: [false, true, true] },
                { feature: "E-commerce ou SaaS", values: [false, false, true] },
                { feature: "Tarif de départ", values: ["1 900 €", "4 000 €", "6 000 €"] },
              ]}
              caption="Comparatif des 3 packs MV Agency (2026)"
            />

            <PullQuote>
              Sur 3 ans, les coûts récurrents totalisent souvent l&apos;équivalent d&apos;un tiers à
              la moitié du devis initial — un détail que les comparaisons rapides oublient.
            </PullQuote>

            <h2 id="automatisations-ia">Combien coûte un site avec automatisations ou IA ?</h2>
            <p>
              Quand on ajoute des automatisations sérieuses (CRM, emailing déclenché,
              chatbot IA, contenu assisté par intelligence artificielle), la fourchette
              monte naturellement. Le pack <strong>Croissance digitale</strong> de MV Agency
              démarre à 4 000 € et structure votre acquisition de A à Z : site avancé
              jusqu&apos;à 10 pages, SEO profond, landing page de conversion, automatisations
              clés en main, chatbot IA intelligent, génération de contenu assistée et
              formation marketing.
            </p>
            <p>
              La différence avec une vitrine simple n&apos;est pas seulement esthétique. Une
              automatisation bien conçue peut représenter <strong>4 à 8 heures gagnées
              chaque semaine</strong> sur des tâches répétitives — saisie de leads,
              relances, qualification. Sur 12 mois, ce gain rentabilise l&apos;investissement
              plus rapidement qu&apos;un site purement décoratif.
            </p>

            <StatHighlight
              value="94%"
              label="Première impression"
              description="des visiteurs jugent la crédibilité d'un site sur son design en moins de 50 ms."
              source="Stanford Web Credibility Project, 2024"
            />

            <h2 id="e-commerce">Combien coûte un site e-commerce en 2026 ?</h2>
            <p>
              Pour un e-commerce sur-mesure, la fourchette de départ est de <strong>6 000 €
              à 15 000 €</strong>, voire au-delà selon la complexité du catalogue, les
              intégrations CRM/ERP, les passerelles de paiement multiples ou les
              fonctionnalités d&apos;abonnement. Le pack <strong>Performance IA</strong> de
              MV Agency, qui démarre à 6 000 €, couvre l&apos;e-commerce ou la plateforme
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

            <h2 id="5-facteurs">Quels sont les 5 facteurs qui font varier le prix ?</h2>
            <p>
              À périmètre fonctionnel équivalent, cinq variables expliquent l&apos;essentiel des
              écarts de prix entre devis :
            </p>
            <ol>
              <li>
                <strong>Le nombre de pages</strong> — chaque page rédigée et designée prend
                du temps. Passer de 5 à 15 pages double souvent l&apos;effort sans doubler
                forcément la valeur.
              </li>
              <li>
                <strong>Le degré de personnalisation visuelle</strong> — un design 100 %
                sur-mesure (illustrations, micro-interactions, mockups) coûte
                significativement plus qu&apos;un thème adapté.
              </li>
              <li>
                <strong>La stack technique choisie</strong> — Next.js demande plus de
                compétences que WordPress, mais offre des performances et une sécurité
                supérieures. Le bon choix dépend du contexte.
              </li>
              <li>
                <strong>Les intégrations tierces</strong> — connecter un CRM, un outil
                d&apos;emailing, un système de paiement, une API IA, chacune de ces
                intégrations ajoute du temps de développement et de tests.
              </li>
              <li>
                <strong>La rédaction et la production de contenu</strong> — fournir vos
                textes et images réduit le coût. Si l&apos;agence doit les produire (copywriting,
                shooting photo, vidéo), comptez 500 à 3 000 € additionnels.
              </li>
            </ol>

            <h2 id="couts-recurrents">Quels sont les coûts récurrents à prévoir ?</h2>
            <p>
              Au-delà du devis initial, votre site génère des frais récurrents annuels qu&apos;il
              faut intégrer dans votre plan financier :
            </p>
            <ul>
              <li>
                <strong>Nom de domaine</strong> — entre 10 € et 50 € par an selon
                l&apos;extension et le registrar.
              </li>
              <li>
                <strong>Hébergement</strong> — 60 à 300 € par an pour un site vitrine
                (Vercel, Netlify, OVH), bien plus pour de l&apos;e-commerce avec trafic.
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
              Sur trois ans, ces coûts récurrents totalisent souvent l&apos;équivalent d&apos;un tiers
              à la moitié du devis initial. Un détail que les comparaisons rapides
              oublient.
            </p>

            <h2 id="moins-cher">Pourquoi le « moins cher » coûte souvent le plus cher ?</h2>
            <p>
              Le piège classique : choisir le devis le plus bas et payer la différence en
              maintenance, refonte ou perte d&apos;opportunité.
            </p>

            <Callout variant="warning" label="PIÈGE FRÉQUENT">
              Trois schémas reviennent chez les clients qui ont déjà eu une mauvaise expérience : <strong>site illisible sur mobile</strong> six mois après la livraison, <strong>refonte intégrale après deux ans</strong> faute d&apos;optimisation, <strong>licence d&apos;utilisation</strong> facturée chaque année sur le code de l&apos;agence. Comparez le coût total sur 3 ans, pas le devis seul, et vérifiez qui détient la propriété du code à la livraison.
            </Callout>

            <h2 id="devis-fiable">Comment obtenir un devis fiable en 4 étapes ?</h2>
            <p>
              La méthode qui fonctionne, peu importe l&apos;agence, tient en quatre étapes.
              Avant de les détailler, voici le workflow type d&apos;un projet web bien cadré :
            </p>

            <Diagram
              variant="linear"
              nodes={[
                { num: "01", label: "Brief" },
                { num: "02", label: "Devis" },
                { num: "03", label: "Design" },
                { num: "04", label: "Dev" },
                { num: "05", label: "Live" },
              ]}
              caption="Workflow d'un projet web type"
            />

            <p>
              Aucune des 4 étapes ne demande d&apos;expertise technique, mais toutes sont
              indispensables pour comparer des devis qui veulent dire la même chose.
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
              Chez MV Agency, l&apos;appel découverte de 30 minutes sert exactement à ça : on
              cadre ensemble le périmètre, on identifie ce qui apporte de la valeur, on
              écarte ce qui n&apos;en apporte pas. Vous repartez avec une fourchette de prix
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
            <Button variant="primary" href="/contact">Réserver un appel offert</Button>
          </section>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Type check + build**

```bash
cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary"
npx tsc --noEmit
```
Expected: 0 errors.

```bash
npm run build
```
Expected: clean build, all static pages generated.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/combien-coute-un-site-internet/page.tsx
git commit -m "feat(blog-v2): refactor article PRIX (ArticleSidebar + ComparisonTable + Callout + Diagram)"
```

---

## Task 9 : Vérification finale (lint + build + acceptance)

**Files:** aucun fichier modifié — vérifications uniquement.

- [ ] **Step 1: Lint**

```bash
cd "/Users/lavic/Desktop/MV Agency site/.claude/worktrees/blog-v2-bestiary"
npm run lint 2>&1 | tail -20
```

Attendu : 0 nouvelle erreur sur les fichiers modifiés (`_articles.ts`, `ComparisonTable.tsx`, `Callout.tsx`, `DefinitionBox.tsx`, `Diagram.tsx`, `Diagram.module.css`, `ArticleSidebar.tsx`, `Article.module.css`, `index.ts`, `combien-coute-un-site-internet/page.tsx`). Les apostrophes dans le contenu JSX sont déjà échappées via `&apos;` dans le code de Task 8 (préventif vs `react/no-unescaped-entities`). Pre-existing errors sur d'autres fichiers (glow-card.tsx, etc.) restent non concernées.

- [ ] **Step 2: Type check final**

```bash
npx tsc --noEmit
```
Attendu : aucune erreur.

- [ ] **Step 3: Build production**

```bash
npm run build
```
Attendu : build complet sans erreur. Pages générées (vérifier dans la sortie) :
- `/blog`
- `/blog/combien-coute-un-site-internet`
- `/services` (avec BlogPreview)
- toutes les autres pages du site (intactes)

- [ ] **Step 4: Test visuel exhaustif sur dev server**

```bash
npm run dev
```

Naviguer sur `http://localhost:3000/blog/combien-coute-un-site-internet` et vérifier les 12 acceptance criteria du spec :

1. Sidebar desktop affiche **TOC en haut + séparateur subtil + Takeaways en bas**, avec scroll-spy qui highlight la section H2 visible (faire défiler la page lentement et observer la classe active changer dans la sidebar).
2. Sidebar mobile (resize < 900px) bascule en `<details>` repliable au-dessus de l'AnswerBlock, libellé "Sommaire & retenir", flèche ▾ qui pivote au open.
3. Le `<ComparisonTable>` (sous-section vitrine) rend correctement avec 7 lignes, 3 colonnes, ligne "Chatbot IA intelligent" en surbrillance, légende italique en bas. Sur viewport < 700px, le tableau scroll horizontalement.
4. Le `<Callout variant="warning">` (section "moins cher") rend avec icône ⚠ AlertTriangle ambre, label monospace ambre, texte clair, bordure-gauche ambre 3px.
5. Le `<Diagram variant="linear">` (juste avant ProcessSteps) rend avec 5 nodes (Brief → Devis → Design → Dev → Live) alternant les backgrounds, flèches `→` bleu transparent, légende italique.
6. La section "Pourquoi le moins cher" tient maintenant en ~50 mots + Callout (vs ~150 mots avant) — vérifier visuellement que c'est plus court.
7. Cliquer sur un item du TOC fait sauter à la section H2 correspondante (les `id` posés sur les `<h2>` doivent fonctionner comme ancres).
8. Sur la page liste `/blog`, aucune régression : carte avec mot-clé "PRIX" géant, hover OK, search/filters OK.
9. Sur `/services`, le BlogPreview en featured + liste fonctionne toujours.
10. Sur le hero d'article, animations LiquidEther toujours fluides, CTA Button avec ribbon-glow toujours OK.
11. Aucune erreur dans la console du navigateur (DevTools).
12. Aucune régression sur `/`, `/offres`, `/contact`, `/cas-clients`, `/a-propos`, `/agence-web-la-reunion`.

- [ ] **Step 5: Commit final si ajustements visuels nécessaires**

Si des ajustements ont été faits durant le test visuel :

```bash
git add -A
git commit -m "fix(blog-v2): ajustements visuels après test"
```

Sinon, pas de commit nécessaire — la task est terminée.

---

## Récap des fichiers touchés

**Créés :**
- `src/components/blog/ComparisonTable.tsx`
- `src/components/blog/Callout.tsx`
- `src/components/blog/DefinitionBox.tsx`
- `src/components/blog/Diagram.tsx`
- `src/components/blog/Diagram.module.css`

**Modifiés :**
- `src/app/blog/_articles.ts` (ajout `TocItem` + `tocItems` dans `ArticleMeta` + migration article)
- `src/components/blog/Article.module.css` (append : comparison*, callout*, defbox*, sidebar*, toc*, takeaways*-refactor)
- `src/components/blog/index.ts` (barrel : add 4 nouveaux composants + ArticleSidebar, drop StickyTakeaways)
- `src/app/blog/combien-coute-un-site-internet/page.tsx` (refactor ciblé : ArticleSidebar, ComparisonTable, Callout, Diagram, ids sur H2)

**Renommés (via `git mv`) :**
- `src/components/blog/StickyTakeaways.tsx` → `src/components/blog/ArticleSidebar.tsx` (puis réécrit complet)

**Supprimés :** aucun (le rename via git mv préserve l'historique).
