# Brief article blog MV Agency

> Template à dupliquer puis remplir pour chaque nouvel article. Le résultat est destiné
> à être collé dans une IA de génération (Antigravity, Claude, etc.) qui produira directement
> le fichier `src/app/blog/<slug>/page.tsx` prêt à push.
>
> Une fois l'article généré : ajouter une entrée dans `src/app/blog/_articles.ts`
> (le sitemap, la liste /blog et les RelatedArticles s'auto-mettent à jour).

---

## 1. Métadonnées

| Champ | Valeur |
|---|---|
| **slug** (URL finale `/blog/<slug>`) | `combien-coute-un-site-internet` |
| **title** (H1, ≤60 chars idéal) | `"Combien coûte un site internet en 2026 ?"` |
| **description** (meta, ≤155 chars) | `"Fourchette de prix d'un site internet en 2026 et les 3 facteurs qui influencent le coût final."` |
| **pillar** | `creation-site-web` \| `ia-pme` \| `seo-marketing` \| `site-par-metier` |
| **category** (libellé carte /blog) | `"Création de site web"` |
| **primaryKeyword** | `"prix site internet"` |
| **keywords secondaires** | `"tarif site vitrine, coût site web 2026"` |
| **publishedAt** (YYYY-MM-DD) | `"2026-05-15"` |
| **updatedAt** (= publishedAt sauf refresh) | `"2026-05-15"` |
| **cover** (image OG, dans `/public/og/<slug>.png`) | `"/og/combien-coute-un-site-internet.png"` |

---

## 2. Angle éditorial (TON CONTENU)

**Idée centrale :**
> [Une phrase qui résume la thèse de l'article — l'angle qui le différencie d'autres papiers sur le sujet]

**Plan H2 (en forme de questions, cf. GEO_Plan §3.1) :**

1. ## [Question 1 ?]
2. ## [Question 2 ?]
3. ## [Question 3 ?]
4. ## [Question 4 ?] *(optionnel)*

**Points à couvrir / chiffres-clés / exemples concrets :**
- [Bullet 1 — ex : "Fourchette de prix : 1500-8000€"]
- [Bullet 2 — ex : "Le coût d'un site WordPress vs Next.js est X% plus cher"]
- [Bullet 3 — ex : "Cas client Pharmacie Lataniers : N pages, M€"]

---

## 3. AnswerBlock (résumé GEO 150-200 mots)

> Contenu extractible par les IA (ChatGPT, Perplexity, AI Overviews). 100% unique vs autres articles.
> Verdict + chiffre + fourchette.

```
[Rédige ici un résumé de 150-200 mots qui répond directement à la question principale,
avec un chiffre / une fourchette / un verdict net dès la première phrase.]
```

---

## 4. FAQ (6-8 Q/R)

```ts
const faqItems = [
  { question: "?", answer: "..." },
  { question: "?", answer: "..." },
  // etc.
];
```

---

## 5. CTA inline (milieu d'article)

| Champ | Valeur |
|---|---|
| **title** | `"Discutons de votre projet"` |
| **text** | `"30 minutes offertes pour cadrer le périmètre et le budget."` |
| **ctaLabel** | `"Réserver un appel"` |
| **href** | `/contact` ou `/offres` |

---

## 6. Articles liés (slugs des frères du même pilier)

> Liste des slugs déjà publiés dans `_articles.ts` pour le même pilier. Le composant
> RelatedArticles les filtre auto, mais autant savoir lesquels existent.

- [slug-frere-1]
- [slug-frere-2]

---

## 7. Prompt à coller dans l'IA générative

```
Tu vas générer un fichier Next.js 16 App Router prêt à coller dans
`src/app/blog/<slug>/page.tsx`.

CONTRAINTES TECHNIQUES STRICTES :

1. Server Component obligatoire (pas de "use client").
2. Pas de framer-motion / pas de TextReveal / pas de FadeIn — utiliser uniquement
   les composants de @/components/blog. Le visuel est porté par leur CSS.
3. Imports requis :
   ```ts
   import type { Metadata } from "next";
   import { JsonLd } from "@/components/JsonLd";
   import {
     ArticleHeader, BreadcrumbTrail, AnswerBlock,
     InlineCTA, FAQ, RelatedArticles,
   } from "@/components/blog";
   import {
     SITE_URL,
     buildArticleSchema, buildFaqPageSchema, buildBreadcrumbSchema,
   } from "@/lib/seo";
   ```
4. Structure obligatoire (cf. GEO_Plan §3) :
   - export const metadata: Metadata = { title, description, alternates: { canonical }, openGraph, twitter }
   - 4 schemas JSON-LD calculés côté server (Article, FAQPage, BreadcrumbList) puis injectés
     via <JsonLd data={...} />
   - <BreadcrumbTrail items={[Accueil, Blog, <title>]} />
   - <ArticleHeader eyebrow={pillar} title={title} publishedAt updatedAt coverImage coverAlt />
   - <AnswerBlock>{résumé 150-200 mots}</AnswerBlock>
   - Article : H2 sous forme de questions, paragraphes auto-portants, 3+ chiffres concrets
   - <InlineCTA /> placé après le 2ᵉ ou 3ᵉ H2 (jamais en tête)
   - <FAQ items={faqItems} />
   - <RelatedArticles currentSlug={slug} pillar={pillar} />
5. Pas de className inventé — utilise les balises HTML standards (h2, h3, p, ul, li,
   strong, em). Les styles globaux sont déjà en place.
6. Wrapper le contenu dans :
   <article className="articleWrapper" /* en réutilisant le module CSS */>...</article>
   ou un simple <main style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>.

DONNÉES DE L'ARTICLE :
[Coller ici les sections 1-6 ci-dessus, remplies]

Renvoie UNIQUEMENT le contenu du fichier `src/app/blog/<slug>/page.tsx`,
prêt à coller, sans explication.
```

---

## 8. Checklist post-génération (30 secondes)

Avant de push :

- [ ] Fichier généré dans `src/app/blog/<slug>/page.tsx`
- [ ] Entrée ajoutée dans `src/app/blog/_articles.ts` (objet `ArticleMeta`)
- [ ] `metadata.alternates.canonical = "/blog/<slug>"` présent
- [ ] 3 schemas JSON-LD injectés : `Article`, `FAQPage`, `BreadcrumbList`
- [ ] `<AnswerBlock>` placé en premier (avant le 1er H2)
- [ ] Tous les H2 sont des questions
- [ ] Min 3 chiffres / dates / exemples concrets dans le corps
- [ ] 1 `<InlineCTA>` en milieu + lien CTA final dans le texte
- [ ] Image OG existe dans `/public/og/<slug>.png` (1200×630) ou champ `cover` pointe vers existant
- [ ] `npm run build` passe en local
