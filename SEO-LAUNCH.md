# SEO — Checklist publication

Document de suivi pour le lancement SEO du site. Met de côté tout le « gadget »
(Bing Webmaster, Microsoft Clarity, schemas avancés, blog content, backlinks…)
— à reprendre en post-launch.

---

## 1. Roadmap publication (à faire avant deploy)

### Code

- [ ] **Homepage [`src/app/page.tsx`](src/app/page.tsx)** — ajouter un `export const metadata` propre (title + description spécifiques home, pas juste l'héritage du root layout).
- [ ] **Migration `<img>` → `<Image>` Next.js** (perf / LCP / CLS = ranking direct) :
  - [src/app/page.tsx:29](src/app/page.tsx:29) (techLogos Shopify, n8n, Figma, Canva, Ollama)
  - [src/components/ui/AnimatedTestimonials.tsx:136](src/components/ui/AnimatedTestimonials.tsx:136)
  - [src/components/ui/Features.tsx:118](src/components/ui/Features.tsx:118)
  - [src/components/ui/circular-testimonials.tsx:180](src/components/ui/circular-testimonials.tsx:180)
  - [src/components/ui/LogoLoop.jsx:241](src/components/ui/LogoLoop.jsx:241)
  - [src/components/ui/testimonials-columns.tsx:84](src/components/ui/testimonials-columns.tsx:84)
  - [src/app/contact/ContactClient.tsx:132](src/app/contact/ContactClient.tsx:132)
  - [src/app/a-propos/AProposClient.tsx:143](src/app/a-propos/AProposClient.tsx:143)
- [ ] **Hotlinks Unsplash** → rapatrier dans `/public` (RGPD + perf : pas de CDN tiers) :
  - [src/app/contact/ContactClient.tsx:132-135](src/app/contact/ContactClient.tsx:132)
  - [src/app/a-propos/AProposClient.tsx](src/app/a-propos/AProposClient.tsx)
- [ ] **OG personnalisés** sur les 4 pages commerciales clés :
  - [src/app/services/page.tsx](src/app/services/page.tsx)
  - [src/app/offres/page.tsx](src/app/offres/page.tsx)
  - [src/app/cas-clients/page.tsx](src/app/cas-clients/page.tsx)
  - [src/app/blog/page.tsx](src/app/blog/page.tsx)

### Hiérarchie H (audit ci-dessous §2)

- [ ] Corriger les sauts d'ordre (h2→h4, h3 orphelin) identifiés §2
- [ ] Ajouter le `<h1>` manquant sur l'article de blog

### Après deploy (5 min, hors code)

- [ ] **Google Search Console** : créer la propriété → copier le code dans `NEXT_PUBLIC_GSC_VERIFICATION` sur Vercel → redéployer → soumettre `sitemap.xml`

### Reporté post-launch (volontairement non bloquant)

- Bing Webmaster Tools (`NEXT_PUBLIC_BING_VERIFICATION`)
- Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`)
- `sameAs` LinkedIn / Clutch / Malt dans [src/lib/seo.ts:116](src/lib/seo.ts:116)
- `@handle` Twitter dans [src/app/layout.tsx](src/app/layout.tsx)
- Articles blog supplémentaires (cornerstone, viser 6-10)
- Pages géo additionnelles (Paris, Lyon, Nice, Genève…)
- Schemas additionnels (Service, AggregateRating, hreflang)
- Setup backlinks (LinkedIn entreprise, Clutch, Malt)

---

## 2. Audit hiérarchie H1-H6

Légende : ✅ OK · ⚠️ Erreur à corriger · 🚨 Bloquant (H1 manquant)

### `/` — Homepage [`src/app/page.tsx`](src/app/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 176 | « Un site qui convertit. Une IA qui vous fait gagner du temps. » |
| ⚠️ H3 orphelin | 243 | « Partenaires techniques certifiés » — **avant le 1er H2** |
| H2 | 275 | Découvrez nos dernières collaborations |
| H2 | 304 | Notre savoir-faire, à votre service |
| H2 | 317 | Ils travaillent avec nous au quotidien |
| H2 | 341 | Pourquoi faire appel à nous ? |
| ⚠️ H4 (saut H2→H4) | 381 | Satisfait ou remanié |
| ⚠️ H4 (saut H2→H4) | 390 | Pas d'engagement |
| ⚠️ H4 (saut H2→H4) | 399 | Un seul interlocuteur |
| H2 | 414 | Comment on travaille avec vous |
| H2 | 513 | Vous avez des questions ? On y répond. |
| H2 | 526 | Prêt à allier l'excellence du web à la puissance de l'IA |

**À corriger** :
- L243 → passer en `<h2>` (ou repositionner après le 1er H2) OU descendre l'élément après le bloc h2.
- L381/390/399 → passer en `<h3>` (les 3 garanties sont enfants directs d'un H2).

### `/services` [`src/app/services/page.tsx`](src/app/services/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 51 | (Hero title) |
| ⚠️ H3 orphelin | 93 | « Partenaires techniques certifiés » — **avant le 1er H2** |
| H2 | 110, 140, 168, 194, 258, 285, 310, 336, 399, 413 | Titres de sections services |
| ⚠️ H4 (saut H2→H4) | 226, 233, 240 | Satisfait / Pas d'engagement / Un seul interlocuteur |

**À corriger** : mêmes patterns qu'homepage (composant garanties partagé ?).

### `/offres` [`src/app/offres/page.tsx`](src/app/offres/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 89 | (Hero title) |
| ⚠️ H3 (saut H1→H3) | 108 | Fondation digitale |
| ⚠️ H3 (saut H1→H3) | 130 | Croissance digitale |
| ⚠️ H3 (saut H1→H3) | 156 | Performance IA |
| ⚠️ H4 | 202, 209, 216 | Satisfait / Pas d'engagement / Un seul interlocuteur |
| H2 | 231, 268, 281, 295 | (sections suivantes) |

**À corriger** : noms de packs L108/130/156 → passer en `<h2>` (premier niveau de contenu après H1).

### `/cas-clients` [`src/app/cas-clients/page.tsx`](src/app/cas-clients/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 33 | « Ce que l'on… » |
| ✅ H2 | 95 | (nom de projet) |
| ✅ H2 | 117 | (section CTA finale) |

**OK** — structure simple, pas d'erreur.

### `/blog` (liste) [`src/app/blog/page.tsx`](src/app/blog/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 51 | (Hero blog) |

**À vérifier** : les cartes d'articles dans la liste utilisent-elles `<h2>` pour le titre de chaque article ? Aucun H2-H6 détecté dans le fichier — soit les cartes sont dans un composant externe (probable), soit elles sont en `<div>` (mauvais pour SEO). À investiguer dans le composant `BlogCard` / template de la liste.

### `/blog/combien-coute-un-site-internet` [`src/app/blog/combien-coute-un-site-internet/page.tsx`](src/app/blog/combien-coute-un-site-internet/page.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| 🚨 **H1 MANQUANT** | — | Aucun `<h1>` trouvé dans la page |
| ✅ H2 | 163 | De quoi parle-t-on quand on dit « site internet » ? |
| ✅ H2 | 201 | Combien coûte un site vitrine en 2026 ? |
| ✅ H2 | 229 | Combien coûte un site avec automatisations ou IA ? |
| ✅ H2 | 254 | Combien coûte un site e-commerce en 2026 ? |
| ✅ H2 | 277 | Quels sont les 5 facteurs qui font varier le prix ? |
| ✅ H2 | 310 | Quels sont les coûts récurrents à prévoir ? |
| ✅ H2 | 344 | Pourquoi le « moins cher » coûte souvent le plus cher ? |
| ✅ H2 | 354 | Comment obtenir un devis fiable en 4 étapes ? |
| H2 | 416 | (CTA final) |

**À corriger 🚨** : ajouter un `<h1>` reprenant le titre de l'article (« Combien coûte un site internet en 2026 ? »). Sans H1, Google n'identifie pas le sujet principal de la page.

### `/a-propos` [`src/app/a-propos/AProposClient.tsx`](src/app/a-propos/AProposClient.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 112 | (Hero) |
| ✅ H2 | 165, 212, 251, 274 | Sections principales |
| ✅ H3 | 235 | (sous valeurs/mission) |
| ✅ H3 | 347, 392, 412 | (sous bento sections) |

**OK** — vérifier rapidement que les H3 L347/392/412 sont bien chacun sous un H2 parent.

### `/contact` [`src/app/contact/ContactClient.tsx`](src/app/contact/ContactClient.tsx)

| Niveau | Ligne | Contenu |
|---|---|---|
| ✅ H1 | 77 | (Title page) |

**OK** — page essentiellement formulaire, structure minimaliste acceptable.

### `/agence-web-france` [`src/app/agence-web-france/page.tsx`](src/app/agence-web-france/page.tsx)

| Niveau | Lignes | Contenu |
|---|---|---|
| ✅ H1 | 237 | Hero |
| ✅ H2 | 272, 307, 380, 532, 565 | Sections |
| ✅ H3 | 292, 330, 410, 443, 476, 509 | Sous h2 |
| H2 | 583 | Items FAQ (accordion) |

**OK** — structure propre.

### `/agence-web-belgique` [`src/app/agence-web-belgique/page.tsx`](src/app/agence-web-belgique/page.tsx)

| Niveau | Lignes | Contenu |
|---|---|---|
| ✅ H1 | 230 | Hero |
| ✅ H2 | 265, 299, 371, 408, 441, 460 | Sections |
| ✅ H3 | 284, 322 | Sous h2 |

**OK**.

### `/agence-web-bruxelles` [`src/app/agence-web-bruxelles/page.tsx`](src/app/agence-web-bruxelles/page.tsx)

| Niveau | Lignes | Contenu |
|---|---|---|
| ✅ H1 | 235 | Hero |
| ✅ H2 | 270, 307, 381, 418, 451, 470 | Sections |
| ✅ H3 | 292, 330 | Sous h2 |

**OK** — structure identique Belgique.

### `/agence-web-la-reunion` [`src/app/agence-web-la-reunion/page.tsx`](src/app/agence-web-la-reunion/page.tsx)

| Niveau | Lignes | Contenu |
|---|---|---|
| ✅ H1 | 283 | Hero |
| ✅ H2 | 358, 391, 437, 491, 526, 546, 578, 601 | Sections |
| ✅ H3 | 376, 416, 462 | Sous h2 |

**OK** — structure la plus riche.

### Synthèse §2

| Page | Statut |
|---|---|
| `/` | ⚠️ 4 corrections (1 h3 orphelin + 3 h4) |
| `/services` | ⚠️ 4 corrections (1 h3 orphelin + 3 h4) |
| `/offres` | ⚠️ 6 corrections (3 h3 packs + 3 h4) |
| `/cas-clients` | ✅ |
| `/blog` | ⚠️ vérifier composant carte article |
| `/blog/combien-coute…` | 🚨 H1 manquant |
| `/a-propos` | ✅ |
| `/contact` | ✅ |
| `/agence-web-france` | ✅ |
| `/agence-web-belgique` | ✅ |
| `/agence-web-bruxelles` | ✅ |
| `/agence-web-la-reunion` | ✅ |

---

## 3. Titles + Meta descriptions (à valider)

Limites Google : **title ≤ 60 caractères**, **description ≤ 155-160 caractères**.

### `/` — Homepage

> ⚠️ Hérite du root layout, pas de meta dédiée.

| Champ | Valeur actuelle | Longueur | Verdict |
|---|---|---|---|
| Title | `MV Agency \| L'art du web, la puissance de l'IA` | 47 | ✅ |
| Description | `Création de sites web premium et intégration d'Intelligence Artificielle (IA) sur-mesure pour PME et startups. L'agence qui rend l'IA accessible.` (root layout) | ~145 | ✅ |

**Action** : remplacer par une meta dédiée à la home (focus mot-clé « agence web + IA »).

### `/services`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Services \| MV Agency` | 21 | ⚠️ Très court — sous-exploité |
| Description | `Découvrez comment nous propulsons les PME avec le digital et l'IA.` | 67 | ⚠️ Trop court, pas de mots-clés |

**Action** : réécrire (ex. `Services web & IA pour PME : sites, agents IA, automatisations | MV Agency` / description ~150 chars avec mots-clés ciblés).

### `/offres`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Nos Offres & Packs \| MV Agency` | 30 | ✅ |
| Description | `Découvrez nos packs sur-mesure combinant un design web high-end et toute la puissance de l'intelligence artificielle pour votre croissance.` | 139 | ✅ |

### `/cas-clients`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Nos Cas Clients \| MV Agency` | 27 | ✅ |
| Description | `Découvrez nos réalisations, sites vitrines, applications web IA et le ROI généré pour nos clients.` | 99 | ✅ |

### `/blog`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Blog & Actualités \| MV Agency` | 29 | ✅ |
| Description | `Articles approfondis sur la création de sites web, l'intelligence artificielle pour PME, le SEO et le marketing digital — par Victor Marchetti.` | 144 | ✅ |

### `/blog/combien-coute-un-site-internet`

> Titre/desc viennent de [`_articles.ts`](src/app/blog/_articles.ts) — à vérifier dans ce fichier.

### `/a-propos`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `À propos — Qui est derrière MV Agency` | 38 | ✅ |
| Description | `Victor Marchetti, fondateur de MV Agency. Agence web & IA pour TPE, PME et indépendants à La Réunion, en Belgique et en France. Approche pédagogique, sans jargon.` | 162 | ⚠️ Limite haute (peut être tronqué) |

### `/contact`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Contact — Parlons de votre projet` | 34 | ✅ |
| Description | `Prenez rendez-vous avec Victor Marchetti, fondateur de MV Agency. Échange de 30 minutes gratuit pour discuter de votre projet web ou IA. Réponse sous 24h ouvrées.` | 163 | ⚠️ Limite haute |

### `/agence-web-france`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Agence web France : sites & IA pour PME en distanciel \| MV Agency` | 66 | ⚠️ Légèrement trop long |
| Description | `Agence web française accompagnant les PME en distanciel sur tout le territoire. Création de sites internet premium et intégration d'intelligence artificielle. Tarifs ajustés vs Paris.` | 184 | ⚠️ Trop long |

### `/agence-web-belgique`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Agence web & IA en Belgique \| MV Agency` | 39 | ✅ |
| Description | `Agence web & intelligence artificielle pour les PME belges. Création de sites web premium, agents IA et automatisations. Bruxelles, Wallonie, Liège, Namur, Charleroi — collaboration 100 % asynchrone (visio, Loom, Notion).` | 222 | ⚠️ **Beaucoup trop long** |

### `/agence-web-bruxelles`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Agence web à Bruxelles : sites premium & IA pour PME \| MV Agency` | 65 | ⚠️ Limite haute |
| Description | `Agence web à Bruxelles. Création de sites internet premium et intégration d'intelligence artificielle pour les PME bruxelloises. Présence locale (Schaerbeek, Ixelles, Etterbeek, Anderlecht), méthode rapide.` | 207 | ⚠️ Trop long |

### `/agence-web-la-reunion`

| Champ | Valeur | Longueur | Verdict |
|---|---|---|---|
| Title | `Agence web & IA à La Réunion (974) \| MV Agency` | 46 | ✅ |
| Description | `Agence web & intelligence artificielle à La Réunion. Création de sites web premium, agents IA et automatisations pour TPE/PME. Intervention sur toute l'île — Saint-Denis, Saint-Pierre, Saint-Paul, Le Port, en présentiel ou en visio.` | 233 | ⚠️ **Beaucoup trop long** |

### Synthèse §3

| Page | Title | Description |
|---|---|---|
| `/` | ✅ (hérité) | ⚠️ générique — à dédier |
| `/services` | ⚠️ trop court | ⚠️ trop court + vague |
| `/offres` | ✅ | ✅ |
| `/cas-clients` | ✅ | ✅ |
| `/blog` | ✅ | ✅ |
| `/blog/combien-coute…` | — | à vérifier dans `_articles.ts` |
| `/a-propos` | ✅ | ⚠️ limite |
| `/contact` | ✅ | ⚠️ limite |
| `/agence-web-france` | ⚠️ limite | ⚠️ trop long |
| `/agence-web-belgique` | ✅ | 🚨 trop long (222) |
| `/agence-web-bruxelles` | ⚠️ limite | ⚠️ trop long (207) |
| `/agence-web-la-reunion` | ✅ | 🚨 trop long (233) |

---

## 4. Validation & GO

**À ta charge** :
- Relire §2 (hiérarchie H) → GO / NO-GO sur les corrections proposées
- Relire §3 (titles + metas) → GO / réécriture sur les pages flaggées
- Une fois validé, on attaque dans l'ordre :
  1. Fix hiérarchie H (priorité H1 manquant article blog)
  2. Réécriture titles/metas flaggés
  3. Migration `<img>` → `<Image>`
  4. Rapatriement Unsplash + OG personnalisés
  5. Homepage `metadata` dédiée
  6. Deploy + GSC
