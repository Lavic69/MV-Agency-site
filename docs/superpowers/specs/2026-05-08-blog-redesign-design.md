# Design — Refonte du blog MV Agency (langage magazine)

**Date :** 2026-05-08
**Auteur :** Victor Marchetti + Claude
**Statut :** Validé après brainstorming visuel
**Topic :** blog-redesign

---

## 1. Contexte et objectif

Le site MV Agency a aujourd'hui une seule page d'article publiée (`/blog/combien-coute-un-site-internet`) et une page liste `/blog`. Trois problèmes :

1. **Image cover manquante** : la cover déclarée (`/og/combien-coute-un-site-internet.png`) n'existe pas → trou visuel sur la liste blog et sur le hero d'article.
2. **CTA finale incohérente** : la section CTA en bas d'article utilise des inline styles (`color: #000` sur fond bleu) qui ne correspondent à aucun des composants Button du site.
3. **Pas d'identité visuelle propre au blog** : le blog reprend strictement les mêmes patterns que le reste du site, sans signature éditoriale.

**Objectif** : donner au blog une identité magazine premium, distincte du reste du site mais cohérente avec les couleurs et boutons existants. Régler définitivement le problème des covers manquantes en remplaçant les images par un système typographique scalable. Préparer le terrain pour une production régulière d'articles via un futur skill réutilisable.

## 2. Scope

Trois pages affectées :

| Surface | Fichier | Action |
|---|---|---|
| Page article | `src/app/blog/[slug]/page.tsx` (et chaque article) | Refonte hero + ajout sidebar Takeaways + CTA finale corrigée |
| Page liste blog | `src/app/blog/page.tsx` + `src/app/blog/BlogClient.tsx` + `Blog.module.css` | Nouvelle carte au langage magazine |
| BlogPreview (sur `/services`) | `src/components/ui/BlogPreview.tsx` | Refonte en pattern "featured + liste" |

**Hors-scope** :
- Header / Footer / navigation globale du site (intacts)
- LiquidEther / fond animé (intact)
- Pages autres que `/blog`, `/blog/[slug]`, `/services` (intactes)
- Migration vers MDX ou CMS — chaque article reste un fichier `page.tsx` avec contenu hardcodé en JSX (architecture actuelle préservée)
- Génération automatique d'images OG (le champ `cover` du registre est supprimé, les images OG sont une question séparée à traiter ultérieurement)

## 3. Direction visuelle

**Langage : magazine pur.** Inspiré du pattern H1 validé pendant le brainstorming.

### 3.1 Signature visuelle

Chaque cover d'article (en hero d'article + en carte de liste + en featured du BlogPreview) repose sur quatre éléments fixes :

1. **Mot-clé géant semi-transparent** en bas-gauche, font Darker Grotesque 900, line-height 0.85, letter-spacing -0.04em, `color: rgba(96,165,250,0.22)`. Le mot-clé reste **entièrement visible** dans le cadre (pas de débordement).
2. **Pillar tag monospace** en haut-gauche : `'SF Mono'`, 11px (12px sur hero d'article), `letter-spacing: 3px`, uppercase, color `#60A5FA`, préfixé d'un tiret cadratin (`— CRÉATION SITE WEB`).
3. **Numéro d'article monospace** en haut-droite : `'SF Mono'`, 11px, `letter-spacing: 2px`, color `#6B7280`, format `Nº 01`.
4. **Fond gradient sombre** : `linear-gradient(160deg, #0f1638 0%, #0a0a0a 75%)`, border 1px `rgba(96,165,250,0.18)`, border-radius 14-16px.

Sous la cover, dans le body de l'article ou de la carte : titre Darker Grotesque 700-800, séparateur bleu primary 36-60×2px, excerpt en DM Sans, méta en monospace.

### 3.2 Patterns acceptés pour le mot-clé géant

Le champ `keyword` du registre `_articles.ts` est typé en union pour supporter quatre patterns visuels :

| Pattern | Exemple `keyword` | Cas d'usage |
|---|---|---|
| **A — Mot simple** | `{ type: "text", value: "PRIX" }` | Sujet avec un mot-totem (PRIX, SEO, RGPD, PERF) |
| **B — Composite avec opérateur** | `{ type: "text", value: "IA × PME" }` | Deux concepts liés (IA × PME, SEO + GEO, UX / UI). L'opérateur (`×` `+` `/` `vs` `—`) est détecté par le composant et stylé automatiquement (italique, opacité réduite à `rgba(96,165,250,0.4)`) sans intervention manuelle dans le contenu. |
| **C — Versus avec logos** | `{ type: "vs", logos: ["nextjs", "wordpress"] }` | Articles comparatifs entre marques. Le composant rend les deux logos via `react-icons/si` (déjà compatible avec le projet) avec un `vs` italique entre eux. |
| **D — Chiffre / code** | `{ type: "text", value: "974" }` | Codes postaux, années, métriques, abréviations |

Contraintes typographiques :
- Le `font-size` du mot-clé est calculé via `clamp()` selon la longueur du texte. Sur cover XL d'article (320px), valeurs typiques : 200-320px pour 2-4 chars, 100-160px pour 5-9 chars, 60-90px pour 10-14 chars.
- Sur carte de liste (cover 160px) : 78-132px selon longueur.
- Sur featured BlogPreview (cover 180px) : 110px par défaut.

## 4. Nouveaux composants

Quatre nouveaux composants à créer dans `src/components/blog/`. Chacun suit le langage magazine ci-dessus et réutilise les tokens CSS du site (`--primary`, `--text-light`, `--font-heading`).

### 4.1 `<CoverKeyword>` (utilitaire interne)

Composant de bas niveau qui rend le mot-clé géant pour les 4 patterns. Utilisé par `<ArticleHeader>` (hero article), la carte de liste blog (markup dans `BlogClient.tsx`) et la carte featured du `<BlogPreview>`.

**Props** : `{ keyword: CoverKeyword; size: 'xl' | 'md' | 'sm'; }`

**Comportement** :
- `type: "text"` → parse le texte pour détecter les opérateurs (`×`, `+`, `/`, `vs`, `—`) et les wrap dans un `<span class="kw-op">`.
- `type: "vs"` → rend deux SVG de `react-icons/si` côte à côte avec un `<span class="kw-vs">vs</span>` entre eux.
- `font-size` calculé via `clamp()` en fonction de `size` et de la longueur du contenu.

### 4.2 `<PullQuote>`

Citation isolée en grande typographie magazine.

**Props** : `{ children: ReactNode; attribution?: string }`

**Visuel** : guillemet géant pâle en haut-gauche (`rgba(96,165,250,0.25)`, 96px, line-height 0.5), texte en Darker Grotesque 600, 22px, line-height 1.4, attribution en monospace 11px `#60A5FA` avec `—` en préfixe. Borders top + bottom subtiles `rgba(96,165,250,0.2)`. Padding vertical 32px, padding-left 64px.

**Règle d'usage** : 1 à 2 par article max. Toujours séparé des autres composants signature par au moins 2-4 paragraphes substantiels et 1 H2.

### 4.3 `<StatHighlight>`

Bloc data-driven : chiffre énorme + contexte + source.

**Props** : `{ value: string; label: string; description: string; source?: string }`

**Visuel** : flex horizontal. Chiffre à gauche en Darker Grotesque 900, 84px, color `#60A5FA`, line-height 0.85, séparé de la zone texte par un border-right vertical. Zone texte : label monospace 10px uppercase `#60A5FA`, description 15px DM Sans, source italique 12px `#6B7280`. Background `rgba(255,255,255,0.02)`, border `rgba(96,165,250,0.18)`, border-radius 12px, padding 28px.

**Règle d'usage** : 1 par article max. Optionnel selon la pertinence du sujet.

### 4.4 `<ProcessSteps>`

Liste numérotée façon process visualisé : cercles glow + ligne de connexion verticale.

**Props** : `{ steps: { title: string; description: string }[] }`

**Visuel** :
- Chaque step : cercle 32x32px, border 2px `rgba(96,165,250,0.5)`, background `#0a0a0a`, contenu numéro monospace 11px bold `#60A5FA`, box-shadow glow `rgba(37,99,235,0.2)`.
- Ligne de connexion verticale entre cercles : positionnée à `left: 15px` (centre exact du cercle), `top: 32px` (bas du cercle), `bottom: 0` (jusqu'au cercle suivant), width 2px, gradient vertical `rgba(96,165,250,0.5)` → `rgba(96,165,250,0.15)`.
- Zone titre/description à droite de chaque cercle : titre Darker Grotesque 700, 16px, description DM Sans 14px `rgba(229,231,235,0.7)`.
- Pas plus de 5-6 steps par instance.

**Règle d'usage** : 0 ou 1 par article. Pertinent surtout pour les articles "comment faire X en N étapes".

### 4.5 `<StickyTakeaways>`

Sidebar latérale avec 3-5 enseignements clés de l'article, sticky pendant la lecture sur desktop.

**Props** : `{ takeaways: string[] }`

**Visuel desktop** :
- Largeur 220-240px, position sticky avec `top: 0` (ou la valeur d'offset du header sticky du site).
- Border-left 2px `rgba(96,165,250,0.3)`, padding-left 18-22px.
- Label monospace 10-11px uppercase `#60A5FA` : `— À retenir`.
- Liste : chaque takeaway = puce ronde glow 22x22px (numéro à l'intérieur en monospace 9-10px) + texte 13.5px en DM Sans, color `rgba(229,231,235,0.85)`, line-height 1.5.
- Les noms / chiffres clés peuvent être mis en `<strong>` pour ressortir en `#E5E7EB`.

**Visuel mobile (`< 900px`)** :
- Bloc statique en haut de l'article (juste après le hero, avant l'AnswerBlock).
- Background `rgba(96,165,250,0.05)`, border 1px `rgba(96,165,250,0.2)`, border-radius 12px, padding 16px 20px.
- Pas de sticky, pas de drawer JS — bloc encart classique. Lisible, accessible, simple.

**Règle d'usage** : présent sur tous les articles. Les `takeaways` viennent du registre `_articles.ts`.

## 5. Composants à modifier

### 5.1 `<ArticleHeader>` — refonte interne (nom et fichier conservés)

Fichier : `src/components/blog/ArticleHeader.tsx` + `Article.module.css`

Le composant garde son nom et son chemin pour ne rien casser dans les imports existants. Seuls le markup interne et les props changent.

**Avant** : eyebrow + titre + meta + image cover (1200×630).

**Après** :
- Conteneur `.hero` : 320px de haut sur desktop, fond gradient `linear-gradient(160deg, #0f1638 0%, #0a0a0a 75%)`, border 1px `rgba(96,165,250,0.18)`, border-radius 16px, margin auto avec respect du wrapper article.
- Pillar tag monospace en haut-gauche.
- Numéro article monospace en haut-droite.
- Mot-clé géant via `<CoverKeyword size="xl">` en bottom-left, aligné dans le flux (pas de débordement, padding-bottom 4-12px).
- Bottom-stack : titre H1 Darker Grotesque 800, 36px, max-width 78%, color `#E5E7EB`, letter-spacing -0.02em ; séparateur bleu 60×2px ; meta row (auteur en `#E5E7EB` 13px, date en monospace `#6B7280`, reading time en monospace `#6B7280`).
- **Plus d'image cover.** Le champ `coverImage` disparaît des props.

**Props après refonte** :
```ts
type ArticleHeroProps = {
  pillar: ArticlePillar;
  pillarLabel: string;          // libellé affiché ("CRÉATION SITE WEB")
  num: string;                  // "01", "02"… (calculé depuis l'index dans le registre)
  keyword: CoverKeyword;
  title: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;          // en minutes (calculé si absent du registre)
};
```

### 5.2 Carte de la page liste blog

Fichier : `src/app/blog/Blog.module.css` (styles) + `src/app/blog/BlogClient.tsx` (markup).

**Avant** : `<img>` cover 16:10 + titre + séparateur + excerpt + datePill.

**Après** :
- `.bc-cover` : 160px de haut sur desktop, gradient sombre, border-bottom `rgba(96,165,250,0.18)`, padding bottom-aligned via flex.
- Pillar tag monospace top-left, Nº top-right, mot-clé géant via `<CoverKeyword size="md">`.
- Body : titre Darker Grotesque 700, 17px, line-clamp 2 lignes ; séparateur 36×2px ; excerpt 12.5px line-clamp 2 ; meta row monospace (date + reading time).

**Comportement responsive** :
- ≥ 1100px → grille 3 colonnes (`repeat(3, 1fr)`)
- 700–1099px → grille 2 colonnes
- < 700px → grille 1 colonne pleine largeur
- La hauteur de cover passe de 160px à 140px en dessous de 700px.

**Hover** : `transform: translateY(-4px)`, `border-color: rgba(96,165,250,0.3)`, `box-shadow: 0 16px 36px rgba(0,0,0,0.4)`.

### 5.3 `<BlogPreview>` → pattern "featured + liste"

Fichier : `src/components/ui/BlogPreview.tsx`

**Avant** : liste à plat de 4 articles avec numéros pâles, tag couleur (vert / orange / violet — incohérent avec les couleurs du site), titres en gradient text au hover. Données hardcodées dans le composant.

**Après** :
- Le composant lit la liste via `getPublishedArticles()` depuis `_articles.ts` (single source of truth, plus de hardcode).
- **1er article = featured** : carte large (grid 2 cols), cover XL gauche (180px) avec `<CoverKeyword size="md">`, droite = pillar pill + titre Darker Grotesque 800 22px + séparateur bleu 36×2px + excerpt 13px + meta monospace.
- **Articles 2 à 4 = liste plate compacte** : numéro pâle Darker Grotesque 900 30px `rgba(96,165,250,0.18)` + pillar pill + titre Darker Grotesque 700 14.5px + meta monospace (`8 MIN · 04.05.26`). Hover : background `rgba(37,99,235,0.05)`.
- CTA "Lire tous nos articles →" en monospace `#60A5FA`, centré, 28px de margin-top.

**Conservation** : le composant reste utilisé sur `/services` (pas de déplacement vers la home).

### 5.4 CTA finale d'article

Dans chaque page d'article (`src/app/blog/[slug]/page.tsx`), la section CTA finale actuelle :

```tsx
// AVANT — inline, incohérent
<a href="/contact" style={{
  background: "var(--primary)",
  color: "#000",
  padding: "0.85rem 1.75rem",
  borderRadius: "999px",
  ...
}}>Réserver un appel offert</a>
```

est remplacée par :

```tsx
// APRÈS — composant Button du site
import { Button } from "@/components/ui/Button";
import Link from "next/link";

<Link href="/contact">
  <Button variant="primary">Réserver un appel offert</Button>
</Link>
```

Le composant `Button` (déjà existant dans `src/components/ui/Button.tsx`) apporte automatiquement le fond gradient bleu `#3b82f6 → #2563eb`, le ribbon-glow rotatif (`spinLight 3s`), l'animation caractère par caractère au hover, et la cohérence avec tous les autres CTA du site.

## 6. Modèle de données

Fichier : `src/app/blog/_articles.ts`

### 6.1 Types

```ts
export type CoverKeyword =
  | { type: "text"; value: string }                 // "PRIX", "IA × PME", "974"
  | { type: "vs"; logos: [string, string] };        // ["nextjs", "wordpress"]

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  pillar: ArticlePillar;
  category: string;

  // ✨ NEW
  keyword: CoverKeyword;          // mot-clé géant en cover
  takeaways: string[];            // 3-5 enseignements clés pour la sidebar
  readingTime?: number;           // en minutes ; calculé auto si absent

  // 🗑 SUPPRIMÉ
  // cover: string;               // plus d'image cover

  primaryKeyword: string;         // inchangé (SEO)
  status?: "published" | "draft";
};
```

### 6.2 Helpers

- `getPublishedArticles()` : inchangé.
- `getArticleBySlug(slug)` : inchangé.
- `getRelatedArticles(currentSlug, pillar, limit)` : inchangé.
- **Nouveau** `getArticleNumber(slug)` : retourne le `Nº` à afficher (1-indexed, basé sur l'ordre d'ajout au registre — pas sur la date de publication). Stable dans le temps : un nouvel article ajouté reçoit `Nº N+1`, les articles existants gardent leur numéro.
- **Nouveau** `calculateReadingTime(text: string)` : 200 mots/min, retourne un nombre de minutes arrondi. Utilisé en fallback quand `readingTime` est absent du registre.

### 6.3 Migration de l'article existant

L'article `combien-coute-un-site-internet` doit être mis à jour dans le registre :

```ts
{
  slug: "combien-coute-un-site-internet",
  title: "Combien coûte un site internet en 2026 ?",
  description: "...",
  publishedAt: "2026-05-07",
  updatedAt: "2026-05-07",
  pillar: "creation-site-web",
  category: "Création de site web",
  keyword: { type: "text", value: "PRIX" },           // NEW
  takeaways: [                                        // NEW
    "Site vitrine pro = 1 900 € à 4 000 €",
    "E-commerce sur-mesure démarre à 6 000 €",
    "5 facteurs principaux font varier le prix",
    "Coûts récurrents = 1/3 du devis sur 3 ans",
  ],
  readingTime: 12,                                    // NEW
  primaryKeyword: "prix site web",
  status: "published",
  // cover supprimé
},
```

## 7. Comportement responsive

| Surface | Desktop ≥ 900px | Tablet 700-899px | Mobile < 700px |
|---|---|---|---|
| **Hero article** | Cover 320px, mot-clé via clamp() | Cover 280px | Cover 240px, titre 28px |
| **Sidebar Takeaways** | Sticky 240px à gauche | Bloc statique en haut de l'article | Bloc statique en haut |
| **Wrapper article** | Grid 240px + 760px (≈1050px max-width) | Single column 760px | Single column padding 1rem |
| **Composants signature** | Marge 56-80px verticale | Marge 48px | Marge 40px, padding intérieur réduit |
| **Body article** | font-size 17px, line-height 1.75 | 16px, 1.7 | 16px, 1.7 |
| **Page liste — grille** | 3 colonnes | 2 colonnes (≥ 700px) | 1 colonne |
| **Page liste — cover carte** | 160px de haut | 160px | 140px |
| **BlogPreview featured** | Grid 2 cols (cover + info) | Stack vertical (cover puis info) | Stack vertical |
| **BlogPreview liste** | Liste flat | Liste flat | Liste flat (réduction des paddings) |

## 8. Tokens et patterns réutilisés

Tous ces tokens existent déjà dans `src/app/globals.css` :

- `--bg-neutral: #0A0A0A`
- `--primary: #2563EB`
- `--secondary: #1A1F4B`
- `--accent: #6B7280`
- `--text-light: #E5E7EB`
- `--font-heading: var(--font-darker-grotesque)`
- `--font-body: var(--font-dm-sans)`

Patterns réutilisés depuis le reste du site :
- Glassmorphic card : `background: rgba(15,15,15,0.85)`, border `rgba(255,255,255,0.05-0.15)`, backdrop-filter.
- Hover translateY -4 à -8px + box-shadow étendu + border-color `rgba(96,165,250,0.3)`.
- Eyebrow uppercase letter-spacing 2-3px (mais en monospace pour le blog au lieu de Darker Grotesque, pour la signature magazine).
- Séparateur bleu primary 36-60×2px (déjà utilisé sur les cartes existantes).
- AnswerBlock conservé tel quel (déjà bon).
- InlineCTA conservé tel quel (déjà bon).
- FAQ accordion conservé tel quel.
- RelatedArticles conservé tel quel.
- BreadcrumbTrail conservé tel quel.

## 9. Règle de rythme éditorial

Pour qu'un article donne envie de lire :

1. **Body** : 17px, line-height 1.75, paragraphes séparés de 22px de margin-bottom.
2. **Composants signature** : 1 toutes les ~400 mots, max 3-4 par article.
3. **Espacement** : entre deux composants signature, toujours **2-4 paragraphes substantiels et au moins 1 H2** intercalés.
4. **Marge verticale autour des composants signature** : 56-80px.
5. **Marge avant un H2** : 64px (l'H2 sert de respiration).

Cette règle est définie dans le futur skill blog (à créer après cette refonte) pour guider la production d'articles.

## 10. Acceptance criteria

Le redesign est considéré "réussi" quand :

1. ✅ La page `/blog/combien-coute-un-site-internet` rend correctement avec le nouveau langage magazine : hero cover XL avec mot-clé "PRIX", sidebar Takeaways sticky à gauche, body 17px line-height 1.75, composants signature insérés à des moments choisis (1 toutes les ~400 mots).
2. ✅ La page `/blog` affiche la liste de cartes au nouveau langage : pillar tag monospace, mot-clé géant, séparateur bleu, meta monospace. Plus aucune référence à `/og/...png` ou autre image cover.
3. ✅ Le `BlogPreview` sur `/services` affiche le pattern "featured + liste" avec le 1er article en grand et 3 articles en liste plate dessous, alimenté depuis `_articles.ts` (plus de données hardcodées).
4. ✅ La CTA finale d'article utilise le composant `<Button variant="primary">` du site, identique aux autres CTA.
5. ✅ Sur mobile (< 900px), la sidebar Takeaways devient un bloc statique en haut de l'article (juste après le hero, avant l'AnswerBlock).
6. ✅ Le registre `_articles.ts` n'a plus de champ `cover` ; il a les nouveaux champs `keyword: CoverKeyword`, `takeaways: string[]`, `readingTime?: number`.
7. ✅ Le composant `<CoverKeyword>` rend correctement les 4 patterns (text simple, composite avec opérateur stylé, vs avec logos via `react-icons/si`, chiffre).
8. ✅ Aucun composant signature n'est jamais collé à un autre — toujours séparé par 2-4 paragraphes + 1 H2.
9. ✅ Aucune régression visuelle sur les pages non concernées (`/`, `/offres`, `/services` autre que la section BlogPreview, `/contact`, etc.).
10. ✅ Le projet compile et passe le `tsc --noEmit` sans erreurs.

## 11. Dépendances externes

- **`react-icons`** est déjà installé en dépendance (`5.6.0` dans `package.json`). La sous-bibliothèque utilisée est `react-icons/si` (Simple Icons), qui contient `SiNextdotjs`, `SiWordpress`, `SiShopify`, `SiReact`, etc. Aucune nouvelle install requise.

## 12. Suite logique

Une fois cette refonte livrée et validée en production :

1. **Skill blog** à créer (hors-scope ici) : un skill réutilisable qui, à partir d'un brief court (sujet, pillar, keyword visuel, takeaways), génère le squelette d'un nouvel article respectant les règles de rythme et de structure définies ici.
2. **Génération d'images OG** (séparée) : le champ `cover: string` du registre a été supprimé, mais le tag `<meta property="og:image">` doit toujours pointer vers une image valide pour le partage social. À traiter dans une phase ultérieure (génération automatique côté `/og/[slug]/route.ts` à partir du `keyword` et du titre).
