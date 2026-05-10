# MV Agency — Système Blog (référence pour skill génération d'articles)

> Ce document consolide tout le savoir opérationnel des refontes v1 et v2 du blog MV Agency. Il sert de **base pour créer un skill** qui permettra de générer de nouveaux articles facilement.

---

## 1. Architecture des fichiers

```
src/
├── app/
│   ├── blog/
│   │   ├── _articles.ts              # Registre central — single source of truth
│   │   ├── page.tsx                  # /blog liste (server component)
│   │   ├── BlogClient.tsx            # /blog client (search + filters + grid)
│   │   ├── Blog.module.css           # Styles page liste + carte blog
│   │   └── [slug]/page.tsx           # Chaque article = 1 fichier dédié (pas de MDX)
│   └── globals.css                   # Tokens CSS globaux
└── components/
    ├── blog/                          # Composants spécifiques blog
    │   ├── ArticleHeader.tsx          # Hero magazine cover XL
    │   ├── ArticleSidebar.tsx         # TOC + Takeaways stack (v2)
    │   ├── AnswerBlock.tsx            # Résumé GEO bleu en haut
    │   ├── BreadcrumbTrail.tsx        # Fil d'Ariane
    │   ├── CoverKeyword.tsx           # Mot-clé géant en cover (4 patterns)
    │   ├── PullQuote.tsx              # Citation magazine (v1)
    │   ├── StatHighlight.tsx          # Chiffre clé + source (v1)
    │   ├── ProcessSteps.tsx           # Étapes numérotées avec ligne (v1)
    │   ├── ComparisonTable.tsx        # Tableau comparatif (v2)
    │   ├── Callout.tsx                # warning/tip/info avec icône lucide (v2)
    │   ├── DefinitionBox.tsx          # <dfn> pour terme technique (v2)
    │   ├── Diagram.tsx                # 5 variants : linear/circular/hierarchy/funnel/quadrant (v2)
    │   ├── Diagram.module.css         # CSS dédié pour Diagram (complexe)
    │   ├── FAQ.tsx                    # Accordion radix
    │   ├── InlineCTA.tsx              # CTA mid-article border-left
    │   ├── RelatedArticles.tsx        # Grille 3 articles
    │   ├── Article.module.css         # Styles partagés des composants blog
    │   └── index.ts                   # Barrel export
    └── ui/
        ├── Button.tsx                 # CTA primary avec ribbon-glow + anim caractère
        └── BlogPreview.tsx            # Featured + liste plate (utilisé sur /services)
```

**Principe clé** : pas de MDX. Chaque article = 1 fichier `page.tsx` avec contenu hardcodé en JSX. Le **registre `_articles.ts` est la single source of truth** pour les métadonnées (titre, description, dates, keyword, takeaways, tocItems, readingTime).

---

## 2. Modèle de données — `_articles.ts`

### Types

```ts
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

export type CoverKeyword =
  | { type: "text"; value: string }                 // "PRIX", "IA × PME", "974"
  | { type: "vs"; logos: [string, string] };        // ["nextjs", "wordpress"]

export type TocItem = {
  id: string;     // kebab-case ASCII, ex: "site-vitrine"
  label: string;  // libellé affiché dans le sommaire
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;        // 155 chars max (meta + AnswerBlock)
  publishedAt: string;        // ISO YYYY-MM-DD
  updatedAt: string;          // ISO YYYY-MM-DD
  pillar: ArticlePillar;
  category: string;           // libellé affiché (souvent === PILLAR_LABEL[pillar])
  keyword: CoverKeyword;      // mot-clé géant en cover
  takeaways: string[];        // 3-5 enseignements clés (peut contenir <strong>)
  tocItems: TocItem[];        // sommaire H2 — match les <h2 id="..."> dans le JSX
  readingTime?: number;       // minutes, calculé auto si absent (200 mots/min)
  primaryKeyword: string;     // SEO mot-clé principal
  status?: "published" | "draft";
};
```

### Helpers disponibles

- `getPublishedArticles()` → ReadonlyArray<ArticleMeta>
- `getArticleBySlug(slug)` → ArticleMeta | undefined
- `getRelatedArticles(currentSlug, pillar, limit=3)` → 3 articles same-pillar
- `getArticleNumber(slug)` → "01", "02"... (basé sur l'ordre d'ajout au registre, **stable** ; ne jamais retirer un article — marquer `status: "draft"`)
- `calculateReadingTime(text)` → minutes (200 wpm, min 1)

### Logos `react-icons/si` supportés (pour `keyword.type === "vs"`)

`nextjs`, `wordpress`, `shopify`, `react`, `vue`, `svelte`, `astro`, `angular`, `django`, `webflow`. Ajouts faciles dans `LOGO_MAP` du composant `<CoverKeyword>`.

---

## 3. Bestiary complet (10 composants pour articles)

### `<ArticleHeader>` — hero magazine

```tsx
<ArticleHeader
  pillarLabel={PILLAR_LABEL[ARTICLE.pillar]}
  num={getArticleNumber(SLUG)}
  keyword={ARTICLE.keyword}
  title={ARTICLE.title}
  publishedAt={ARTICLE.publishedAt}
  updatedAt={ARTICLE.updatedAt}
  readingTime={ARTICLE.readingTime ?? 12}
/>
```

Hero 320px gradient sombre avec mot-clé géant (cover XL via `<CoverKeyword size="xl">`) + pillar tag monospace + Nº + titre H1 (Darker Grotesque 800, clamp(1.75rem, 4vw, 2.25rem)) + séparateur bleu 60×2px + meta row (auteur + date + reading time).

### `<ArticleSidebar>` (v2) — TOC sticky + Takeaways stack

```tsx
<ArticleSidebar
  tocItems={ARTICLE.tocItems}
  takeaways={ARTICLE.takeaways}
/>
```

Desktop ≥ 900px : sticky `top: 7rem` (sous header fixed), border-left 2px primary, stack TOC + sep gradient + Takeaways. Scroll-spy via IntersectionObserver (`'use client'`) avec `aria-current="location"` sur item actif.

Mobile < 900px : bascule en `<details>` repliable (label "— Sommaire & retenir", flèche ▾ qui tourne au open). Zéro JS pour le toggle.

### `<AnswerBlock>` — résumé GEO en haut

```tsx
<AnswerBlock>
  Réponse synthétique de 80-120 mots avec <strong>chiffres clés</strong>...
</AnswerBlock>
```

Bloc bleu gradient avec border `rgba(96,165,250,0.22)` en tête d'article (juste après l'ArticleHeader). Pour les featured snippets Google et les LLMs (Perplexity, ChatGPT).

### `<PullQuote>` (v1) — citation magazine

```tsx
<PullQuote>
  Phrase clé reformulée pour valoriser une insight de l'article.
</PullQuote>

// Avec attribution optionnelle :
<PullQuote attribution="Victor Marchetti">...</PullQuote>
```

Guillemet géant pâle U+201C, texte Darker Grotesque 600 22px, borders top + bottom subtiles. **1-2 par article max**.

### `<StatHighlight>` (v1) — chiffre clé data-driven

```tsx
<StatHighlight
  value="94%"
  label="Première impression"
  description="des visiteurs jugent la crédibilité d'un site sur son design en moins de 50 ms."
  source="Stanford Web Credibility Project, 2024"
/>
```

Chiffre énorme `#60A5FA` 84px + border-right + texte. **0-1 par article**.

### `<ProcessSteps>` (v1) — étapes numérotées avec ligne

```tsx
<ProcessSteps
  steps={[
    { title: "Étape 1", description: "..." },
    { title: "Étape 2", description: "..." },
  ]}
/>
```

Cercles 32×32 glow bleu + ligne verticale gradient entre eux. Numérotation auto. **0-1 par article** (process / how-to).

### `<ComparisonTable>` (v2) — tableau comparatif

```tsx
<ComparisonTable
  columns={["Pack A", "Pack B", "Pack C"]}
  rows={[
    { feature: "Feature X", values: ["valeur", "valeur", "valeur"] },
    { feature: "Feature Y", values: [true, false, true], highlight: true },
  ]}
  caption="Comparatif des 3 packs"
/>
```

`<th scope="col">` + `<th scope="row">` pour a11y. Boolean → ✓ vert / — orange. Mobile : scroll horizontal avec ombre indicateur. **2-4 colonnes max**.

### `<Callout>` (v2) — warning / tip / info

```tsx
<Callout variant="warning" label="PIÈGE À ÉVITER">
  Ne signez pas un devis qui inclut une "licence d'utilisation" annuelle...
</Callout>

<Callout variant="tip">Astuce pratique...</Callout>
<Callout variant="info">Précision contextuelle...</Callout>
```

3 variants avec icônes `lucide-react` (AlertTriangle / Lightbulb / Info), border-left 3px coloré, label monospace. `aria-label` auto sur l'aside.

### `<DefinitionBox>` (v2) — terme technique

```tsx
<DefinitionBox term="Core Web Vitals">
  Trois métriques de performance définies par Google qui mesurent l'expérience utilisateur...
</DefinitionBox>
```

Élément sémantique `<dfn>` pour le terme. Encadré bleu subtil avec label "— DÉFINITION".

### `<Diagram>` (v2) — 5 variants visuels

```tsx
// Variant linear (workflow séquentiel)
<Diagram
  variant="linear"
  nodes={[
    { num: "01", label: "Brief" },
    { num: "02", label: "Devis" },
  ]}
  caption="Workflow d'un projet web"
/>

// Variant circular (cycle, max 4 nodes N/E/S/O)
<Diagram
  variant="circular"
  centerLabel="CRO"
  nodes={[{ num: "01", label: "Analyse" }, ...]}
  caption="..."
/>

// Variant hierarchy (root + 2-4 children)
<Diagram
  variant="hierarchy"
  root={{ label: "Site web", sub: "racine" }}
  children={[{ label: "Vitrine", sub: "5 pages" }, ...]}
/>

// Variant funnel (3-5 rows progressifs)
<Diagram
  variant="funnel"
  rows={[
    { label: "Visiteurs", value: "10 000" },
    { label: "Clients", value: "42" },
  ]}
/>

// Variant quadrant (matrice 2×2)
<Diagram
  variant="quadrant"
  xLabels={["Faible", "Fort"]}
  yLabels={["Forte", "Faible"]}
  cells={[
    { title: "Prioriser", description: "...", highlight: true },
    { title: "Maintenir", description: "..." },
    { title: "Tester", description: "..." },
    { title: "Refondre", description: "..." },
  ]}
/>
```

CSS module dédié (`Diagram.module.css`). Pur HTML/CSS, pas de chart lib. `overflow: hidden` sur wrapper. Variant `circular` : centre solide avec double background-layer (color + image gradient) pour cacher le cercle pointillé derrière.

### `<InlineCTA>` (v1) — CTA mid-article

```tsx
<InlineCTA
  title="Pas encore sûr du périmètre ?"
  text="On cadre ensemble en 30 minutes. Appel offert."
  ctaLabel="Réserver un appel offert"
  href="/contact"
/>
```

Bloc avec border-left 3px primary. **1-2 par article** (lead magnet mid-flow).

### `<FAQ>` (v1) — accordion en bas

```tsx
<FAQ items={faqItems} title="Vos questions sur le prix d'un site internet" />
```

Radix accordion. **Toujours en fin d'article** (avant RelatedArticles + CTA finale). Génère aussi `<JsonLd data={faqPageSchema}>` pour SEO.

### `<RelatedArticles>` (v1) — grille 3 articles

```tsx
<RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />
```

Auto-pull 3 articles du même pillar. Pas d'action manuelle.

---

## 4. Layout & spacing (post-polish v2)

### Wrapper article

```css
.articleWrapper {
  max-width: 1200px;          /* Élargi depuis 760px v1 (qui écrasait le contenu) */
  margin: 0 auto;
  padding: 0 2rem 4rem;
  position: relative;
  z-index: 1;
}
```

### Layout 2 cols

```css
.articleLayout {
  display: grid;
  grid-template-columns: 280px minmax(0, 800px);  /* sidebar + content */
  gap: 4rem;
  align-items: start;
  padding: 0 0 3rem;
  justify-content: center;
}

@media (max-width: 899px) {
  .articleLayout { grid-template-columns: 1fr; gap: 0; }
}
```

### Spacing breadcrumb / hero

```css
.breadcrumb { padding: 10rem 0 0; }    /* Sous le header fixed */
.header     { padding: 2rem 0 3rem; }  /* Réduit pour ne pas trop espacer breadcrumb / hero */
```

### Sidebar sticky

```css
.sidebarDesktop {
  position: sticky;
  top: 7rem;       /* Sous le header fixed (top:1.5rem + ~5rem hauteur) */
}
```

### Scroll-anchor (clic TOC)

```css
.articleContent h2 {
  scroll-margin-top: 7rem;  /* Le titre arrive sous le header au lieu d'être caché */
}
```

### Body article

```css
.articleContent {
  font-size: 1.0625rem;       /* 17px confortable lecture */
  line-height: 1.75;
  color: rgba(229, 231, 235, 0.88);
}
.articleContent h2 {
  font-size: 1.625rem;
  margin: 4rem 0 1.25rem 0;   /* 64px de respiration avant H2 */
  scroll-margin-top: 7rem;
}
.articleContent p { margin: 0 0 1.375rem 0; }   /* 22px entre paragraphes */
```

### CTA finale (post-polish)

```css
.ctaFinal {
  position: relative;
  margin-top: 4.5rem;
  padding: 3rem 2rem;
  text-align: center;
  background: rgba(10, 10, 10, 0.7);             /* Opaque pour masquer LiquidEther */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  box-shadow: 0 0 30px rgba(37, 99, 235, 0.18);  /* Effet néon */
}
.ctaFinalTitle {
  font-size: clamp(2rem, 4.5vw, 2.75rem);         /* H2 plus gros pour la finale */
  /* ... */
}
/* Force le gradient text sur le mot wrapped — spécificité supérieure */
.ctaFinalTitle :global(.globalGradientWord) {
  background: linear-gradient(90deg, #60a5fa 0%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.ctaFinal .ctaFinalText { text-align: center; /* spécificité 0,2,0 pour battre .articleContent p */ }
```

---

## 5. Tokens visuels

### Couleurs (depuis `globals.css`)

**Source of truth** : `src/app/globals.css`. Toujours référencer via `var(--token)`.

```css
/* Backgrounds */
--bg-neutral        /* #0A0A0A — fond principal */
--bg-deep           /* #080e1f — cards à fond profond */
--secondary         /* #1A1F4B — indigo sombre (cartes alt, hero) */
--bg-card           /* glass card par défaut */
--bg-card-hover     /* glass card hover */

/* Palette bleue (gradient documenté) */
--primary-400       /* #60a5fa — labels, eyebrows, glow, hover top */
--primary-500       /* #3b82f6 — gradient haut, séparateurs colorés */
--primary-600       /* #2563EB — primary canonique (CTA, focus) */
--primary-700       /* #1e40af — gradient bas, états pressed */
--primary           /* alias --primary-600 */

/* Sémantique (Callout / feedback) */
--color-warning         /* #f59e0b — Callout warning */
--color-warning-bg      /* warning background fill */
--color-warning-border  /* warning border */
--color-success         /* #4ade80 — Callout tip, ComparisonTable yes */
--color-success-bg
--color-success-border
--color-info            /* alias --primary-400 — Callout info */
--color-info-bg
--color-info-border

/* Texte / neutres */
--text-light        /* #E5E7EB — texte principal */
--text-muted        /* #9ca3af — méta, captions, descriptions */
--accent            /* #6B7280 — bordures neutres, disabled */
```

**Règle** : aucun hex literal hors `globals.css`. Si une nuance manque, ajouter le token plutôt que d'inline.

### Spacing (grille 4px)

```css
--space-1    /* 4px */     --space-8     /* 32px */
--space-2    /* 8px */     --space-10    /* 40px */
--space-3    /* 12px */    --space-12    /* 48px */
--space-4    /* 16px */    --space-16    /* 64px */
--space-5    /* 20px */    --space-20    /* 80px */
--space-6    /* 24px */    --space-24    /* 96px */
                           --space-section /* 80px par défaut */
```

Valeurs interdites : `5px`, `6px`, `10px`, `14px`, `15px`, `30px`, `50px`.

### Radius

```css
--radius-sm     /* 4px */     --radius-card  /* 20px — cards offres/services */
--radius-md     /* 8px */     --radius-pill  /* 9999px — boutons + Header */
--radius-lg     /* 16px */
```

### Shadows (mode quiet)

```css
--shadow-card        /* 0 12px 32px rgba(0,0,0,0.25) — cards repos */
--shadow-card-hover  /* 0 16px 40px rgba(0,0,0,0.32) — cards hover */
--shadow-header      /* 0 8px 32px rgba(0,0,0,0.35) — header pill */
--shadow-soft        /* 0 4px 16px rgba(0,0,0,0.2) — formulaires, chips */
--ring-subtle        /* 0 0 0 1px rgba(255,255,255,0.08) — bord intérieur */
```

### Glows

```css
--glow-primary         /* 0 0 30px rgba(37,99,235,0.4) — logo, CTA hover */
--glow-primary-soft    /* 0 4px 15px rgba(37,99,235,0.3) — Button repos */
--glow-primary-strong  /* 0 8px 30px rgba(37,99,235,0.5) — Button hover */
```

### Typographies

- **Titres / Hero / Logo / Nav** : `var(--font-heading)` = Darker Grotesque
- **Body / paragraphes / FAQ** : `var(--font-body)` = DM Sans
- **Labels / méta / monospace** : `'SF Mono', Menlo, monospace`

### Conventions monospace (signature magazine)

- Eyebrow / pillar tag / labels : `0.5625-0.6875rem`, `letter-spacing: 1.5-2px`, `text-transform: uppercase`, `font-weight: 700`, `color: #60A5FA`
- **Toujours préfixer par `— `** (tiret cadratin + espace) pour la signature MV
- Format date : `JJ.MM.AA` (ex: `07.05.26`) — via `formatDateMono()` dans `src/lib/formatDate.ts`

### Class globale `globalGradientWord`

```css
.globalGradientWord {
  background: linear-gradient(90deg, #60a5fa 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  background-attachment: fixed;
  background-size: 100vw 100vh;
}
```

À appliquer sur 1 mot-clé d'un titre H1/H2 (jamais tout le titre). Si dans un CSS Module, prévoir une règle `:global(.globalGradientWord)` enfant du parent local pour gagner en spécificité.

---

## 6. Règle de rythme éditorial

```
RÈGLE DE RYTHME (v2) :
- 1 composant signature toutes les ~300 mots de texte
- MAIS le composant doit être pertinent au passage du texte
  (pas de placement mécanique — si rien ne fait sens à 300 mots, on attend 400-500)
- Maximum 6-7 composants signature par article
- JAMAIS 2 composants côte à côte (toujours ≥1 paragraphe + ≥1 H2 entre eux)
- Marge verticale autour de chaque composant : 56px (3.5rem)
```

**Composants signature** (ceux soumis à la règle) :
- `<PullQuote>`, `<StatHighlight>`, `<ProcessSteps>`, `<ComparisonTable>`, `<Callout>`, `<DefinitionBox>`, `<Diagram>`, `<InlineCTA>`

**Pas comptés dans la règle** (structurels) :
- `<ArticleHeader>`, `<ArticleSidebar>`, `<AnswerBlock>` (un seul, en haut), `<FAQ>`, `<RelatedArticles>`, CTA finale

### Pattern type d'un article 2 000-2 500 mots

```
[ArticleHeader hero]
[AnswerBlock résumé GEO]
H2 + 2-3 paragraphes intro
H2 + 2 paragraphes
[Composant signature 1 — type adapté au sujet]
H2 + 2-3 paragraphes
[Composant signature 2]
H2 + 2-3 paragraphes
[InlineCTA — lead magnet]
H2 + 2-3 paragraphes
[Composant signature 3]
[Composant signature 4 si pertinent — toujours séparé par H2 + paragraphes]
H2 conclusion + 2 paragraphes
[FAQ]
[RelatedArticles]
[CTA finale glassmorphic + gradient sur 1 mot du titre]
```

---

## 7. Workflow pour écrire un nouvel article

### Étape 1 — Préparer la fiche article

- Choisir le `slug` (kebab-case, ex: `comment-faire-x-en-y-etapes`)
- Choisir le `pillar` parmi les 4
- Choisir le `keyword` (4 patterns possibles) :
  - `{ type: "text", value: "PRIX" }` — 1 mot-totem
  - `{ type: "text", value: "IA × PME" }` — composite avec opérateur (× / + / vs / —)
  - `{ type: "text", value: "974" }` — chiffre / code
  - `{ type: "vs", logos: ["nextjs", "wordpress"] }` — versus avec logos
- Lister les 3-5 `takeaways` (clés à retenir, peuvent contenir `<strong>` pour highlight)
- Lister les `tocItems` correspondant aux H2 prévus (id kebab-case + label)
- Estimer `readingTime` (200 mots/min)

### Étape 2 — Ajouter au registre `_articles.ts`

Ajouter une nouvelle entrée dans le tableau `articles`, AVANT les articles existants si on veut Nº 01, ou après pour suivre l'ordre chronologique. Le `Nº` est calculé depuis l'ordre d'ajout — **stable**, ne jamais retirer un article (mettre `status: "draft"` à la place).

### Étape 3 — Créer le fichier page article

Path : `src/app/blog/<slug>/page.tsx`

Pattern : copier `combien-coute-un-site-internet/page.tsx` comme template. Modifier :
- `SLUG`, `URL`
- `metadata` (puise dans `ARTICLE`)
- `breadcrumbSchema`, `faqItems`, `articleSchema`
- Le contenu de `<article>` : H2 avec `id="..."` matchant les `tocItems`, paragraphes, composants signature insérés au bon rythme
- `<ArticleSidebar tocItems={ARTICLE.tocItems} takeaways={ARTICLE.takeaways}>`
- CTA finale avec 1 mot en `<span className="globalGradientWord">`

### Étape 4 — Écrire le contenu

- **Apostrophes** : utiliser `&apos;` (HTML entity) pour éviter `react/no-unescaped-entities` lint error
- **H2** : tous portent un `id` matchant un `tocItem.id` → indispensable pour le scroll-spy de la sidebar
- **Composants signature** : insérer à des moments où c'est pertinent (cf. règle de rythme)
- **AnswerBlock** : 80-120 mots, condense les 3 chiffres / faits clés de l'article. Les LLMs (Perplexity, ChatGPT) lisent ce bloc en priorité.
- **PullQuote** : si on insiste sur une insight contre-intuitive, c'est ici qu'on l'isole

### Étape 5 — Vérifier

```bash
npx tsc --noEmit                     # 0 errors attendu
npm run lint                         # 0 errors sur le nouvel article
npm run build                        # build clean
npm run dev                          # test visuel
```

Tests visuels :
- Hero : keyword géant entièrement visible (pas coupé)
- Sidebar TOC sticky, scroll-spy actif
- Click TOC item → saute au bon endroit (titre visible, pas caché par header)
- Mobile (<900px) : sidebar bascule en `<details>` repliable
- Aucune régression sur autres pages

---

## 8. Décisions clés & raison

### Pourquoi pas de MDX

Décision v1. Les articles sont rares (~1 par mois) et complexes (composants imbriqués). MDX ajouterait une compilation step et une perte de typage TypeScript. Garder du JSX pur permet : auto-completion, refactor safe, pas de runtime overhead.

### Pourquoi pas d'images cover

Le champ `cover: string` v0 pointait vers `/og/<slug>.png` qui n'existait pas. Solution : remplacer par un système typographique (`<CoverKeyword>`) qui ne demande aucune image. 4 patterns supportés couvrent ~95% des cas. Bonus : zéro charge réseau, zéro 404, parfait pour le LiquidEther en arrière-plan.

### Pourquoi `<dfn>` sur DefinitionBox

HTML5 `<dfn>` est l'élément sémantique pour "defining instance of a term". Browsers + screen readers le reconnaissent comme tel. Override `font-style: normal` car browsers le rendent en italique par défaut.

### Pourquoi un `Diagram` avec 5 variants vs 5 composants distincts

Discriminated union TypeScript = un seul import, autocomplete sur `variant`, narrowing automatique des props. Plus simple à mémoriser pour l'auteur d'article. Coût : CSS module unique avec ~250 lignes (acceptable).

### Pourquoi `'use client'` sur `ArticleSidebar`

IntersectionObserver pour le scroll-spy nécessite le DOM. Le composant est petit (~110 lignes) donc le coût d'hydratation est minime.

### Pourquoi `<details>` natif en mobile

Pattern accessible par défaut, zéro JS, fonctionne sans hydratation. Better than custom collapse pour un bloc qu'on veut juste cacher/montrer.

### Pourquoi le wrapper article fait 1200px (pas 760)

Bug v1 caché : avec sidebar 240px, le wrapper 760px laissait ~416px de contenu. Polish v2 : wrapper 1200px + grid 280 + 64 + 800 = ~1144px utilisé, marge centrée si écran plus large.

### Pourquoi `scroll-margin-top: 7rem` sur les H2

Le header est `position: fixed`. Quand un user clique un item TOC `<a href="#site-vitrine">`, le browser scroll exactement à l'élément, mais le header masque le titre. `scroll-margin-top: 7rem` = offset de 112px (= header height + marge), le titre arrive juste sous le header.

---

## 9. Polish v2 (cette session, post-implémentation)

Tous les ajustements faits en HMR live à valider après test visuel :

1. **Wrapper article** : `max-width 760px → 1200px`, `padding 1.5rem → 2rem`. `articleLayout` : `240px + 1fr → 280px minmax(0, 800px)`, `gap 3.5rem → 4rem`. Bug v1 caché corrigé.
2. **Breadcrumb spacing** : `padding 6rem → 10rem` top du breadcrumb. `header padding-top 5rem → 2rem` pour réduire l'espace breadcrumb/hero.
3. **Sidebar sticky** : `top: 2rem → 7rem`. Plus cachée derrière le header fixed.
4. **Scroll-anchor** : ajout de `scroll-margin-top: 7rem` sur `.articleContent h2`.
5. **CTA finale** : glassmorphic (`rgba(10,10,10,0.7)` + `backdrop-filter: blur(10px)` + border + radius 1rem + `box-shadow: 0 0 30px rgba(37,99,235,0.18)` néon).
6. **CTA texte centré** : sélecteur `.ctaFinal .ctaFinalText` (spécificité 0,2,0) pour battre cascade.
7. **CTA H2 plus gros** : `clamp(1.625rem, 3vw, 2rem) → clamp(2rem, 4.5vw, 2.75rem)`.
8. **CTA gradient sur "projet"** : `<span className="globalGradientWord">projet</span>` + règle CSS `:global(.globalGradientWord)` dans `.ctaFinalTitle` pour garantir la spécificité.

### Encore à faire avant push (non commités)

- **Fix prix** : modifier le AnswerBlock + paragraphes vitrine + takeaways pour mentionner "à partir de 500 €" (landing pages templates) au lieu de "1 500 €". MV Agency reste à partir de 1 900 € pour ses propres prestations.
- **Animation titre `/blog`** : appliquer `<TextReveal>` sur "Bibliothèque d'Actualités" (effet cloud word-by-word, signature du site).

---

## 10. Pour le futur skill blog

Ce que le skill devra faire (pour qu'écrire un article devienne trivial) :

### Inputs minimaux à demander

- Sujet de l'article (titre)
- Pillar (parmi 4)
- Cible de mots-clés SEO
- 3-5 idées de takeaways
- Optionnel : composants signature suggérés (table comparative ? diagram ? callout ?)

### Outputs

1. Fiche article structurée (titre, description, slug, keyword, tocItems, takeaways, faqItems)
2. Fichier `_articles.ts` mis à jour
3. Fichier `src/app/blog/<slug>/page.tsx` complet avec :
   - Metadata et JSON-LD schemas
   - Hero avec ArticleHeader
   - ArticleSidebar
   - AnswerBlock (résumé GEO 80-120 mots)
   - Body (H2 + paragraphes + composants signature au bon rythme)
   - FAQ + RelatedArticles + CTA finale
4. Vérifications automatiques :
   - Tous les H2 ont des `id` matchant les tocItems
   - Apostrophes échappées en `&apos;`
   - Aucun composant signature adjacent
   - tsc + lint + build OK

### Patterns spécifiques à embarquer dans le skill

- **Convention `id` H2** : kebab-case ASCII, dérivé du label en retirant accents, articles, ponctuation
- **Convention keyword** : 1 mot-totem si possible (PRIX, IA, SEO, RGPD), composite avec opérateur sinon, vs+logos si comparatif de marques
- **Le AnswerBlock** : doit contenir les **3 chiffres / faits clés** de l'article condensés. Format optimal pour Perplexity / ChatGPT / AI Overviews
- **PullQuote** : utiliser pour les insights contre-intuitives, pas pour les faits banals
- **InlineCTA** : toujours après une section qui crée du désir (e.g., après description du pack le plus cher)
- **CTA finale** : titre toujours en 2-3 mots avec 1 mot en gradient (ex: "Prêt à cadrer votre **projet** ?", "Envie d'**aller plus loin** ?")

### Lib des keywords par pillar (référence)

- **creation-site-web** : PRIX, NEXT vs WP, HEBERGEMENT, REFONTE, MAINTENANCE, PERF, RGPD
- **ia-pme** : IA, IA × PME, AUTOMATISATION, CHATBOT, COPILOT, CRM × IA
- **seo-marketing** : SEO, GEO, AI OVERVIEW, BACKLINKS, EEAT, TRAFIC, INTENT
- **site-par-metier** : DENTISTE, AVOCAT, RESTAURATEUR, COIFFEUR, 974 (Réunion), B2B
