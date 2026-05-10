# Design — Blog v2 : bestiary élargi + sidebar TOC

**Date :** 2026-05-10
**Auteur :** Victor Marchetti + Claude
**Statut :** Validé après brainstorming visuel
**Topic :** blog-v2-bestiary-sidebar
**Branche :** `claude/blog-v2-bestiary` (forkée de `claude/charming-haibt-f45b1b` v1, PR #1)
**Spec parent :** [docs/superpowers/specs/2026-05-08-blog-redesign-design.md](../../../docs/superpowers/specs/2026-05-08-blog-redesign-design.md)

---

## 1. Contexte et objectif

La v1 (PR #1) a posé les fondations magazine du blog : registre `_articles.ts` étendu, hero d'article avec mot-clé géant, page liste refondue, BlogPreview en pattern featured + liste, sidebar Takeaways, 3 composants signature (`<PullQuote>`, `<StatHighlight>`, `<ProcessSteps>`).

Après test visuel sur le seul article publié (`combien-coute-un-site-internet`), trois limitations sont apparues :

1. **Bestiary trop pauvre** — 3 composants signature répétés mécaniquement sur l'article donnent une sensation de "toujours pareil". Le composant doit servir le texte (table comparative pour les packs, schéma pour le workflow, callout pour les pièges) — pas l'inverse.
2. **Sidebar trop minimale** — le bloc "À retenir" est utile, mais le lecteur n'a pas de moyen de naviguer rapidement entre les sections H2 d'un article long (12 min de lecture). Sur des blogs modernes (Notion, Stripe, Stratechery), le sommaire en sidebar est devenu standard.
3. **Densité trop espacée** — 1 composant signature toutes les ~400 mots laisse des passages de texte longs sans rythme visuel. Avec un bestiary plus large, on peut descendre à ~300 mots sans saturer.

**Objectif v2** : élargir le bestiary à 8 patterns (en plus des 3 v1), refactorer la sidebar en stack vertical TOC + Takeaways, retravailler ciblé l'article existant pour exploiter le nouveau bestiary, ajuster la règle de rythme.

## 2. Scope

| Surface | Action |
|---|---|
| 4 nouveaux composants signature | `<ComparisonTable>`, `<Callout>` (3 variantes), `<DefinitionBox>`, `<Diagram>` (5 variants) |
| `<StickyTakeaways>` | Renommé `<ArticleSidebar>`, refactor en stack vertical TOC + Takeaways |
| `_articles.ts` | Étendu avec `tocItems: { id, label }[]` |
| `<ArticleHeader>` | Inchangé (hero v1 reste tel quel) |
| Article `combien-coute-un-site-internet` | Refactor ciblé : injection de Callout + ComparisonTable + Diagram linear aux endroits évidents |
| Page liste blog (`/blog`) | Inchangée |
| `<BlogPreview>` sur `/services` | Inchangé |
| Règle de rythme | Mise à jour : ~300 mots/composant, pertinence d'abord |

**Hors-scope :**
- Refonte du hero d'article (déjà fait en v1)
- Refonte de la page liste ou du BlogPreview
- Ajout d'un nouvel article (ce sera fait via le futur skill blog)
- Génération automatique d'images OG (toujours hors-scope, suivi v1)
- Migration vers MDX ou CMS

## 3. Direction visuelle

**Continuité avec la v1.** Tous les nouveaux composants utilisent les mêmes tokens (palette bleue MV, Darker Grotesque + DM Sans + SF Mono, glassmorphic cards, séparateurs bleus, animations cubic-bezier). Aucun nouveau token introduit.

**Critères de craft pour les nouveaux composants** :
- Background card : `rgba(15,15,15,0.6)` ou `rgba(15,15,15,0.85)` selon contexte
- Border subtile : `rgba(96,165,250,0.18)` ou `rgba(255,255,255,0.08)`
- Border-radius : 10-14px (cohérent avec PullQuote/StatHighlight/ProcessSteps)
- Marge verticale autour de chaque composant signature : 56px (3.5rem) — mêmes valeurs que les composants v1
- Labels monospace : `'SF Mono', Menlo, monospace`, taille 0.625-0.6875rem, letter-spacing 1.5-2px, uppercase, color `#60A5FA`, weight 700
- Préfixe `— ` (tiret cadratin + espace) sur tous les labels monospace (signature MV)

## 4. Nouveaux composants

### 4.1 `<ComparisonTable>`

**Fichier :** `src/components/blog/ComparisonTable.tsx` + styles dans `Article.module.css`

**Usage :** comparer 2-4 options sur N critères. Idéal pour articles type "Pack A vs B vs C", "WordPress vs Next.js vs Webflow", "iOS vs Android".

**Props :**
```ts
type ComparisonRow = {
  feature: string;                       // libellé du critère
  values: Array<string | boolean>;       // une valeur par option ; boolean rendu en ✓ vert / — orange
  highlight?: boolean;                   // ligne en surbrillance (ex: la fonctionnalité clé)
};

interface ComparisonTableProps {
  columns: string[];                     // headers, ex: ["Vitrine", "Croissance", "Performance"]
  rows: ComparisonRow[];
  caption?: string;                      // légende sous la table (italique, monospace si court)
}
```

**Visuel :**
- `<table>` width 100%, border-collapse
- `<th>` : monospace, 0.625rem, color `#60A5FA`, letter-spacing 1.5px, uppercase, weight 700, padding 10px 12px, border-bottom `rgba(255,255,255,0.06)`
- `<td.feature>` : color `rgba(229,231,235,0.65)`, weight 500, font-size 0.78125rem
- `<td>` valeurs : font-size 0.78125rem, padding 10px 12px, border-bottom `rgba(255,255,255,0.06)`
- `<td>` boolean true → `✓` color `#4ADE80` ; boolean false → `—` color `rgba(245,158,11,0.7)`
- Ligne `highlight` : background `rgba(37,99,235,0.04)`
- Wrapper : `figure.comparisonTable` avec `caption` en `<figcaption>` italique 0.7rem `#6B7280`
- Margin-vertical 3.5rem (cohérent règle de rythme)
- Mobile (<700px) : scroll horizontal avec ombre indicateur

### 4.2 `<Callout>`

**Fichier :** `src/components/blog/Callout.tsx` + styles dans `Article.module.css`

**Usage :** encadré coloré avec icône pour mettre en garde, donner un conseil pratique, ou ajouter une précision contextuelle. 3 variantes en une seule API.

**Props :**
```ts
type CalloutVariant = "warning" | "tip" | "info";

interface CalloutProps {
  variant: CalloutVariant;
  label?: string;                        // libellé custom ; sinon défaut par variant
  children: React.ReactNode;
}
```

**Visuel par variante :**

| Variant | Icon (lucide-react) | Color | Default label |
|---|---|---|---|
| `warning` | `AlertTriangle` | `#F59E0B` | `PIÈGE À ÉVITER` |
| `tip` | `Lightbulb` | `#4ADE80` | `ASTUCE` |
| `info` | `Info` | `#60A5FA` | `À NOTER` |

**Style commun :**
- `display: flex`, gap 14px, padding 14-18px, border-radius 10px, align-items flex-start
- Background : `rgba($color, 0.06)` ; border-left 3px solid `$color`
- Icône : font-size 18px, line-height 1.2, padding-top 2px, color `$color`, flex-shrink 0
- Label monospace : 0.59375rem, letter-spacing 1.5px, uppercase, weight 700, color `$color`, préfixe `— `
- Content text : 0.78125rem, color `rgba(229,231,235,0.85)`, line-height 1.55
- Margin-vertical 3.5rem

**Exemples (article PRIX) :**
```tsx
<Callout variant="warning">
  Méfiez-vous des "licences d'utilisation" facturées chaque année par certaines agences sur leur propre code.
</Callout>

<Callout variant="tip" label="ASTUCE PRATIQUE">
  Demandez 3 devis avec des spécifications strictement identiques pour éviter les pommes vs poires.
</Callout>
```

### 4.3 `<DefinitionBox>`

**Fichier :** `src/components/blog/DefinitionBox.tsx` + styles dans `Article.module.css`

**Usage :** définir un terme technique au moment où il apparaît dans le texte. Évite l'aller-retour vers un glossaire externe.

**Props :**
```ts
interface DefinitionBoxProps {
  term: string;                          // ex: "Core Web Vitals"
  children: React.ReactNode;             // définition (1-3 phrases)
  label?: string;                        // défaut: "DÉFINITION"
}
```

**Visuel :**
- Background `rgba(15,15,15,0.6)`, border 1px `rgba(96,165,250,0.18)`, border-radius 10px, padding 14-18px
- Label monospace : `— ${label}` color `#60A5FA`, 0.59375rem, letter-spacing 1.5px, uppercase, weight 700, margin-bottom 6px
- Term : Darker Grotesque 700, 1rem, color `#E5E7EB`, margin-bottom 6px
- Children (definition) : 0.78125rem, color `rgba(229,231,235,0.75)`, line-height 1.55
- Margin-vertical 3.5rem

### 4.4 `<Diagram>`

**Fichier :** `src/components/blog/Diagram.tsx` + `src/components/blog/Diagram.module.css` (CSS dédié — composant complexe avec 5 variants)

**Usage :** schéma visuel pur HTML/CSS pour montrer un flux, un cycle, une hiérarchie, un entonnoir, ou une matrice 2×2. Aucune image, aucune lib graph (recharts, etc.) — pur DOM stylé.

**Props (discriminated union) :**
```ts
type DiagramNode = {
  label: string;                         // texte visible
  num?: string;                          // numéro/étape optionnel ("01", "02"…)
  sub?: string;                          // sous-texte optionnel ("racine", "5 pages"…)
};

type LinearDiagram = { variant: "linear"; nodes: DiagramNode[]; caption?: string };

type CircularDiagram = {
  variant: "circular";
  centerLabel: string;                   // ex: "CRO"
  nodes: DiagramNode[];                  // 4 nodes max (placés N/E/S/O)
  caption?: string;
};

type HierarchyDiagram = {
  variant: "hierarchy";
  root: DiagramNode;
  children: DiagramNode[];               // 2-4 children
  caption?: string;
};

type FunnelRow = { label: string; value: string };
type FunnelDiagram = { variant: "funnel"; rows: FunnelRow[]; caption?: string };  // 3-5 rows

type QuadrantCell = { title: string; description: string; highlight?: boolean };
type QuadrantDiagram = {
  variant: "quadrant";
  xLabels: [string, string];             // ["Faible volume", "Fort volume"]
  yLabels: [string, string];             // ["Forte conversion", "Faible conversion"]
  cells: [QuadrantCell, QuadrantCell, QuadrantCell, QuadrantCell];  // ordre : top-left, top-right, bottom-left, bottom-right
  caption?: string;
};

type DiagramProps = LinearDiagram | CircularDiagram | HierarchyDiagram | FunnelDiagram | QuadrantDiagram;
```

**Style commun à tous les variants :**
- Wrapper card : background `rgba(15,15,15,0.6)`, border 1px `rgba(255,255,255,0.08)`, border-radius 14px, padding 24px
- **`overflow: hidden`** pour empêcher tout débordement (notamment le cercle du `circular`)
- Label monospace en haut centré : `— variant: "$variant"` (peut être désactivé via une prop `showLabel: boolean = true`, défaut affiché)
- Caption en bas : font-size 0.6875rem, color `rgba(229,231,235,0.5)`, italique, text-align center, margin-top 16px
- Margin-vertical 3.5rem

**Détails par variant :**

**`linear`** : flex horizontal avec `flex-wrap`, gap 8px. Nodes en blocs `min-width: 90px`, padding 16px 14px, border-radius 10px, background alt entre `rgba(37,99,235,0.1)` et `rgba(96,165,250,0.05)`, box-shadow glow `rgba(37,99,235,0.15)`. Flèches `→` color `rgba(96,165,250,0.5)` font-size 18px. Numéro monospace 9px en haut du node, label Darker Grotesque 13px en dessous.

**`circular`** : container `position: relative; height: 280px`. Cercle pointillé via `<svg>` en `position: absolute; inset: 0` (stroke `rgba(96,165,250,0.25)`, dasharray 4 4). Nodes positionnés en absolute (top center, right middle, bottom center, left middle) avec `z-index: 2`. **Centre opaque** : `position: absolute`, top 50% / left 50%, `transform: translate(-50%, -50%)`, width 80px height 80px, border-radius 50%, **deux backgrounds layered** pour cacher le trait derrière :
```css
background-color: var(--bg-neutral, #0a0a0a);  /* solid layer first, opaque, hides dashed circle */
background-image: radial-gradient(circle, rgba(37,99,235,0.4), rgba(37,99,235,0.1));
```
Border `rgba(96,165,250,0.6)`, box-shadow glow `0 0 30px rgba(37,99,235,0.5)`, z-index 3. Texte centré : Darker Grotesque 800, 14px, color `#60A5FA`.

**`hierarchy`** : flex column, gap 24px. Root node en haut (background gradient radial bleu, border lumineuse), enfants en row gap 16px en bas avec ligne de connexion verticale puis horizontale dessinée via `::before`/`::after` sur le row enfants.

**`funnel`** : flex column gap 4px, 3-5 rows progressivement plus étroits via `clip-path: polygon(...)` pour la forme trapézoïdale. Chaque row affiche label + value en flex centered. Largeurs typiques : 100% / 80% / 60% / 40%. Dernier row plus opaque (background `rgba(37,99,235,0.25)`).

**`quadrant`** : grid 3 colonnes × 3 rangées (`auto 1fr 1fr`). Coin top-left vide, top labels en row 1 (col 2-3), left labels en col 1 (row 2-3) en `writing-mode: vertical-rl`, 4 cells data dans les 4 quadrants restants. Cell highlight = background `rgba(37,99,235,0.15)` + border `rgba(96,165,250,0.5)` + box-shadow.

## 5. Refactor de `<StickyTakeaways>` → `<ArticleSidebar>`

**Fichier :** `src/components/blog/StickyTakeaways.tsx` **renommé en** `src/components/blog/ArticleSidebar.tsx`. Le barrel `index.ts` exporte `ArticleSidebar` (et **l'ancien export `StickyTakeaways` est supprimé** — c'est un breaking change interne, mais le seul consommateur est l'article PRIX que ce spec refactor déjà).

**Layout (desktop ≥ 900px) :**
- Stack vertical : section TOC en haut + séparateur subtil + section Takeaways en bas
- `position: sticky; top: 2rem; align-self: start;`
- `border-left: 2px solid rgba(96,165,250,0.3); padding: 6px 0 6px 22px;`
- `display: flex; flex-direction: column; gap: 28px;`

**Section TOC :**
- Label monospace `— Sommaire`
- `<ul>` `list-style: none`
- Chaque item : `<li>` cliquable (lien `<a href="#${id}">`) avec scroll-spy via Intersection Observer
- Style item : font-size 0.78125rem, color `rgba(229,231,235,0.55)`, line-height 1.45, padding 6px 0 6px 14px, `border-left: 2px solid transparent`, `margin-left: -16px`, transition color/border
- Item actif (scroll-spy) : color `#E5E7EB`, `border-left-color: var(--primary)`, weight 600
- Hover item : color `rgba(229,231,235,0.9)`

**Séparateur :**
- `height: 1px; background: linear-gradient(90deg, rgba(96,165,250,0.3), transparent);`

**Section Takeaways :** identique à v1 (label monospace + bullets numérotées glow + texte avec `<strong>` pour mots-clés).

**Layout (mobile <900px) :**
- Bascule en bloc statique au-dessus de l'AnswerBlock (comme v1) MAIS dans un `<details>` natif :
```html
<details class="articleSidebarMobile">
  <summary>Sommaire & retenir</summary>
  <!-- TOC + Takeaways stacked -->
</details>
```
- `<summary>` : background `rgba(96,165,250,0.05)`, border 1px `rgba(96,165,250,0.2)`, border-radius 10px, padding 12px 16px, monospace 0.6875rem `#60A5FA`, weight 700, letter-spacing 2px, uppercase, cursor pointer
- Quand ouvert : padding et background s'étendent, contenu visible
- Fermé par défaut (`<details>` sans `open`) : zéro JS nécessaire

**Scroll-spy mécanisme :**
- Composant `'use client'`
- `useEffect` qui crée un `IntersectionObserver` au mount
- Threshold : `[0, 0.5, 1]` ; rootMargin : `"-30% 0px -50% 0px"` (active la section dès qu'elle entre dans le tiers supérieur du viewport)
- Observe tous les `<h2 id="...">` correspondant aux `tocItems`
- Met à jour le state `activeId` qui controle la classe `.active` sur les items

**Props :**
```ts
interface ArticleSidebarProps {
  tocItems: { id: string; label: string }[];   // depuis ArticleMeta
  takeaways: string[];                          // depuis ArticleMeta (inchangé)
}
```

## 6. Modèle de données — extension `_articles.ts`

Un seul changement : ajout de `tocItems` à `ArticleMeta`.

```ts
export type TocItem = {
  id: string;       // slug de l'ancre, ex: "site-vitrine"
  label: string;    // libellé affiché dans le TOC, ex: "Combien coûte un site vitrine ?"
};

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
  tocItems: TocItem[];                  // ✨ NEW (v2)
  readingTime?: number;
  primaryKeyword: string;
  status?: "published" | "draft";
};
```

**Convention pour les `id`** :
- Slug en kebab-case dérivé du H2, ex: `"site-vitrine"`, `"automatisations-ia"`, `"5-facteurs"`
- L'auteur ajoute `id="..."` directement sur le `<h2>` dans le JSX de la page article.
- Si un H2 n'est pas dans `tocItems`, il n'apparaît pas dans le sommaire (case d'usage : H2 mineurs sans intérêt nav).

**Migration de l'article existant** : `tocItems` ajouté pour les 8 H2 actuels :
```ts
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
```

## 7. Refactor ciblé de l'article `combien-coute-un-site-internet`

**Fichier :** `src/app/blog/combien-coute-un-site-internet/page.tsx`

**Changements** (en plus de l'ajout des `id` sur les H2) :

1. **Importer les nouveaux composants** depuis `@/components/blog` (Callout, ComparisonTable, DefinitionBox, Diagram).

2. **Remplacer `<StickyTakeaways>` par `<ArticleSidebar>`** avec les props `tocItems={ARTICLE.tocItems}` et `takeaways={ARTICLE.takeaways}`.

3. **Injection ciblée du nouveau bestiary** :

   **(a) Après la section "5 facteurs qui font varier le prix"** — remplacer le paragraphe d'intro par un `<Callout variant="warning">` qui prévient sur les pièges récurrents :
   ```tsx
   <Callout variant="warning" label="PIÈGE FRÉQUENT">
     Trois schémas reviennent chez les clients qui ont déjà eu une mauvaise expérience : site illisible sur mobile six mois après la livraison, refonte intégrale après deux ans faute d'optimisation, licence d'utilisation facturée chaque année sur le code de l'agence. Comparez le coût total sur 3 ans, pas le devis seul.
   </Callout>
   ```
   Cela peut **remplacer** la section "Pourquoi le « moins cher » coûte plus cher ?" (~150 mots) qui se résume essentiellement à ces 3 pièges.

   **(b) Avant la section "Comment obtenir un devis fiable"** — ajouter un `<Diagram variant="linear">` du workflow projet :
   ```tsx
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
   ```

   **(c) Dans la section "Combien coûte un site vitrine"** — remplacer le paragraphe descriptif des 3 packs par un `<ComparisonTable>` synthétique :
   ```tsx
   <ComparisonTable
     columns={["Fondation", "Croissance", "Performance IA"]}
     rows={[
       { feature: "Pages incluses", values: ["jusqu'à 5", "jusqu'à 10", "illimité"] },
       { feature: "Design sur-mesure", values: [true, true, true] },
       { feature: "SEO racine", values: [true, true, true] },
       { feature: "Chatbot IA", values: [false, true, true], highlight: true },
       { feature: "E-commerce / SaaS", values: [false, false, true] },
       { feature: "Tarif de départ", values: ["1 900 €", "4 000 €", "6 000 €"] },
     ]}
     caption="Comparatif des 3 packs MV Agency (2026)"
   />
   ```
   Cela rend la lecture beaucoup plus scanable que le paragraphe actuel.

4. **Conserver tels quels** : `<AnswerBlock>`, `<PullQuote>`, `<StatHighlight>`, `<InlineCTA>`, `<ProcessSteps>` (4 étapes du devis), `<FAQ>`, `<RelatedArticles>`, CTA finale.

**Comptage final attendu** après refactor : ~2400 mots, ~7 H2, **6-7 composants signature** (PullQuote + StatHighlight + Callout + ComparisonTable + Diagram + InlineCTA + ProcessSteps), ce qui donne **1 composant toutes les ~340 mots** — proche de la cible 300 sans être saturant.

## 8. Comportement responsive

| Surface | Desktop ≥ 900px | Tablet 700-899px | Mobile <700px |
|---|---|---|---|
| `<ArticleSidebar>` | Sticky stack (TOC + sep + Takeaways) | `<details>` repliable en haut de l'article | `<details>` repliable en haut |
| `<ComparisonTable>` | Table classique | Table classique | Scroll horizontal avec ombre |
| `<Callout>` | Inchangé | Inchangé | Padding réduit (12px) |
| `<DefinitionBox>` | Inchangé | Inchangé | Padding réduit (12px) |
| `<Diagram variant="linear">` | Flex horizontal wrap | Flex horizontal wrap | Stack vertical avec `↓` au lieu de `→` |
| `<Diagram variant="circular">` | 280px de hauteur | 240px | 240px (4 nodes restent placés N/E/S/O) |
| `<Diagram variant="hierarchy">` | Tree horizontal classique | Tree horizontal | Stack vertical (root + enfants en colonne, lignes verticales) |
| `<Diagram variant="funnel">` | Inchangé | Inchangé | Largeurs ajustées (90%/75%/60%/45%) |
| `<Diagram variant="quadrant">` | Grid 2×2 | Grid 2×2 | Stack vertical des 4 cells (perte de la lecture matricielle, acceptable) |

## 9. Règle de rythme éditorial v2

**Mise à jour de la règle v1** (qui était 1 composant / ~400 mots) :

```
Règle de rythme v2 :
- 1 composant signature toutes les ~300 mots de texte
- MAIS le composant doit être pertinent au passage du texte
  (pas de placement mécanique — si rien ne fait sens à 300 mots, on attend 400-500)
- Maximum 6-7 composants signature par article (saturation visuelle)
- JAMAIS 2 composants côte à côte (toujours ≥1 paragraphe + ≥1 H2 entre eux)
- Marge verticale autour de chaque composant : 56px (3.5rem) — inchangée v1
```

Cette règle sera reprise dans le futur skill blog.

## 10. Tokens et patterns réutilisés

Tous les tokens existent déjà depuis v1 (`globals.css` + `formatDate.ts` + `_articles.ts`). Aucun nouveau token introduit.

Couleurs additionnelles utilisées par les nouveaux composants (déjà en usage ailleurs dans le projet) :
- `#F59E0B` (amber) — variant `warning` du Callout
- `#4ADE80` (green) — variant `tip` du Callout, valeurs `true` du ComparisonTable

Ces deux couleurs sont déjà utilisées dans le composant `<BlogPreview>` v1 (sur les listes Pros/Cons). Pas de promotion en token CSS variable nécessaire pour cette v2 (à faire en suivi si dark mode toggle).

## 11. Acceptance criteria

1. ✅ 4 nouveaux composants créés dans `src/components/blog/` : `<ComparisonTable>`, `<Callout>`, `<DefinitionBox>`, `<Diagram>`. Tous exportés via le barrel.
2. ✅ `<Callout>` accepte les 3 variantes (warning/tip/info) avec les bonnes icônes (lucide-react) et couleurs.
3. ✅ `<Diagram>` rend correctement les 5 variants (linear, circular, hierarchy, funnel, quadrant). Le variant `circular` a un centre **solide** (pas de trait visible derrière) et un cercle pointillé qui ne déborde **jamais** du cadre (overflow hidden).
4. ✅ `<StickyTakeaways>` renommé en `<ArticleSidebar>`. L'export `StickyTakeaways` du barrel est supprimé.
5. ✅ `<ArticleSidebar>` rend stack vertical TOC + séparateur + Takeaways en desktop, et un `<details>` repliable en mobile.
6. ✅ Le scroll-spy met à jour la classe `.active` sur l'item TOC correspondant à la section H2 visible. Implémenté avec Intersection Observer (`'use client'`).
7. ✅ `_articles.ts` : ajout du champ `tocItems: TocItem[]` dans `ArticleMeta`. Article PRIX migré avec 8 entrées tocItems pointant sur les 8 H2.
8. ✅ Article `combien-coute-un-site-internet` refactoré : (a) remplace la section "moins cher" par un `<Callout variant="warning">`, (b) ajoute un `<Diagram variant="linear">` workflow avant "devis fiable", (c) remplace la description textuelle des packs par un `<ComparisonTable>`.
9. ✅ Tous les `<h2>` du contenu de l'article portent un `id` correspondant à un `tocItem.id`.
10. ✅ Aucune régression sur la page liste `/blog`, le BlogPreview sur `/services`, ou les pages non-blog.
11. ✅ `npx tsc --noEmit` passe avec 0 erreurs. `npm run lint` passe sans nouvelles erreurs sur les fichiers modifiés. `npm run build` succède.
12. ✅ Tests visuels manuels : sidebar sticky desktop, `<details>` mobile, tous les Diagram variants visuellement corrects, ComparisonTable scrollable horizontal en mobile.

## 12. Suite logique (hors-scope v2)

- **Skill blog réutilisable** : avec un bestiary v2 stable, le skill peut maintenant guider la rédaction d'articles en proposant le bon composant au bon endroit.
- **Génération d'images OG par slug** : `app/blog/[slug]/opengraph-image.tsx` qui rend dynamiquement le keyword + titre. Hors-scope v1 et v2, à faire avant le 5e article publié.
- **Reading progress bar** en haut de l'article : pas demandé, mais standard sur blogs longs. À évaluer en v3.
- **Token CSS `--blue-light: #60A5FA`** + tokens `--text-secondary` / `--text-muted` proprement définis dans `globals.css` : nettoyage du système de design global, à faire en suivi.
- **Mémoïsation `getArticleNumber`** via `Map` quand le blog atteindra 20+ articles. Inutile aujourd'hui (1 article).
