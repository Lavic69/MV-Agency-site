# SEO — État & roadmap

Document de suivi SEO du site MV Agency. Trace ce qui a été fait, ce qui reste,
et ce qui est volontairement reporté en v2.

Dernière mise à jour : 2026-05-11

---

## ✅ Fait (mergé sur main)

### Hiérarchie H1-H6 (12 pages indexées + composants partagés)

- **Homepage** : « Partenaires techniques » h3→h2, garanties h4→h3
- **Services** : « 6 leviers » h3→h2, garanties h4→h3
- **Offres** : 3 packs h3→h2, garanties h4→h3
- **Blog article** « Combien coûte un site internet » : ajout de 10 h3 dans « 5 facteurs » et « coûts récurrents »
- **Contact** : ajout d'un h2 « Réservez votre appel découverte » au-dessus du widget Cal.com
- **Footer** *(cascade toutes pages)* : colonnes h4→h3
- **MagicBento** *(homepage)* : `card.title` h2→h3
- **AnimatedTestimonials** *(services)* : `testimonial.name` h4→h3
- **Timeline** *(offres + a-propos + reunion)* : `step.title` h4→h3

### Titles + Meta descriptions (8 pages)

| Page | Title | Description |
|---|---|---|
| `/` | créée (37 chars) | créée (143 chars) |
| `/services` | enrichi (46 chars) | enrichie (133 chars) |
| `/agence-web-france` | raccourci (51 chars) | raccourcie (139 chars) |
| `/agence-web-belgique` | OK | raccourcie 222→143 chars |
| `/agence-web-bruxelles` | raccourci (54 chars) | raccourcie 207→143 chars |
| `/agence-web-la-reunion` | OK | raccourcie 233→143 chars |
| `/a-propos` | OK | raccourcie 162→135 chars |
| `/contact` | OK | raccourcie 163→138 chars |

### OG dédiés (Open Graph + Twitter cards par page)

- **Homepage** : OG + Twitter dédiés *(commit `a69bd1e`)*
- **`/services`** : OG + Twitter dédiés
- **`/offres`** : OG + Twitter dédiés
- **`/cas-clients`** : OG + Twitter dédiés
- **`/blog`** : OG + Twitter dédiés

### Performance & RGPD (impact ranking direct)

- **Migration `<img>` → `<Image>` Next.js** sur tous les usages *(commit `86248c1`)* — Core Web Vitals (LCP, CLS) optimisés
- **Hotlinks Unsplash → rapatriement local** : 10 photos téléchargées dans `/public/avatars/`
- **SVG svgl.app → local** : 4 logos tech dans `/public/tech/`
- Plus aucune fuite d'IP visiteur vers tiers (RGPD)

### LinkedIn (commit `7d32b5b`)

- **Page entreprise MV Agency** créée et configurée : https://www.linkedin.com/company/mv-ai-agency
- **Cover banner** sur-mesure 1128×191 @3x retina (`cover.png` dans `Linkedin/cover-linkedin-mv-agency/`)
- **Logo carré** 400×400 @3x avec fond brand `#0A0A0A` (`logo-square.png`)
- **Footer site** : icône LinkedIn désormais cliquable vers URL réelle
- **JSON-LD `sameAs`** : URL LinkedIn ajoutée → renforce le knowledge graph Google

### Infrastructure SEO (déjà en place)

- Sitemap dynamique [src/app/sitemap.ts](src/app/sitemap.ts)
- robots.txt avec bots IA (GPTBot, ClaudeBot, PerplexityBot, etc.) [src/app/robots.ts](src/app/robots.ts)
- JSON-LD global : Organization + LocalBusiness + Person (founder)
- JSON-LD par page : Breadcrumb (toutes), FAQ (4 pages), Article (blog), OfferCatalog (offres)
- OG image dynamique [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)
- Icons file-based (Next 16)
- Canonical sur chaque page
- Vercel Analytics + Speed Insights
- **Google Search Console** : propriété vérifiée + sitemap soumis ✅

### Commits

- `ed71404` — fix(seo): hiérarchie H1-H6 + metas réécrites
- `ae049dc` — fix(seo): hiérarchie H dans composants partagés
- `2b0532d` — fix(seo): h2 label colonne calendrier contact
- `86248c1` — fix(seo,perf): rapatriement Unsplash + Image + OG dédiés
- `a69bd1e` — fix(seo): OG dédiés homepage
- `7d32b5b` — feat(seo): LinkedIn URL footer + sameAs

---

## 🟠 Côté utilisateur — à fournir / créer

Items qui débloquent du code côté site :

- **Compte Twitter / X** : créer `@mv_agency` (ou similaire) → ajoutera le `@handle` dans Twitter cards + URL dans `sameAs`
- **Compte Instagram** : créer la page → ajoutera l'URL dans `sameAs` + icône Instagram dans Footer (actuellement icône inerte)
- **Photo perso Victor pour `/a-propos`** : remplacer la photo Unsplash actuelle (`/public/avatars/victor.jpg`) par une vraie photo de toi. Idéalement portrait carré ~800×800, fond sobre cohérent avec le brand
- **Profils Clutch / Malt** : si tu en crées → ajout dans `sameAs` aussi

---

## 🔴 Restant pour être au top (priorisé)

### Contenu & autorité (court-moyen terme — gros levier search)

1. **Articles blog cornerstone** — 1 seul publié actuellement (`combien-coute-un-site-internet`). Objectif **6-10 articles** sur tes piliers :
   - Création de site web *(1/X)*
   - IA pour PME *(0/X)*
   - Automatisation n8n / Make / Zapier *(0/X)*
   - SEO / acquisition *(0/X)*

2. **Premiers avis clients publics** — viser 5+ avis collectés pour pouvoir activer le schema `AggregateRating` + `Review` (étoiles dans les SERPs)

3. **Backlinks initiaux** :
   - Clutch et/ou Malt (profil agence)
   - Mentions presse locale (974 + Belgique)
   - Posts LinkedIn invitant à visiter le site

### Audit headings — restants à investiguer

4. **`[Missing heading]` h2 après h1 sur homepage / services / offres** — probablement un badge / section visuelle stylée comme heading sans h-tag réel
5. **`[Missing heading]` h3 avant footer (toutes pages)** — probablement le brand panel Footer (logo + texte « MV Agency ») détecté comme heading visuel
6. **Duplicates h2 mobile/desktop sur `/services`** — pattern responsive Next.js (CSS hide). Google gère mais pas pristine

### Schemas additionnels (nice-to-have)

7. **`Service` schema** dédié sur `/services` (actuellement OfferCatalog seulement)
8. **`hreflang`** — non requis tant que mono-langue FR. À ajouter si version EN ou variantes BE-FR / CH-FR / CA-FR

---

## 🟡 V2 / Post-launch (volontairement reporté)

- **Bing Webmaster Tools** (`NEXT_PUBLIC_BING_VERIFICATION`) — < 5 % du trafic search FR, faible ROI immédiat
- **Microsoft Clarity** (`NEXT_PUBLIC_CLARITY_ID`) — heatmaps, intéressant après 1000+ visites/mois
- **Pages géo additionnelles** (Paris, Lyon, Genève…) — selon stratégie commerciale
- **GEO / AI search optimization** approfondi (llms.txt, citation-readiness)
- **A/B test sur titres / descriptions** une fois GSC actif et données collectées
- **Programmatic SEO** (templates de pages générées) si scaling justifie
- **Bandeau consentement RGPD** (préalable activation Clarity)

---

## Ordre conseillé pour atteindre le « top »

1. **Cette semaine** → Twitter + Instagram créés + photo perso fournie → je wire tout côté code
2. **Mois 1** → 3 articles blog cornerstone + profils Clutch/Malt
3. **Mois 2-3** → continuer blog (6-10 articles), collecter premiers avis (5+ pour AggregateRating), Service schema dédié /services
4. **Mois 3+** → audit headings résiduels, backlinks ciblés presse locale, hreflang si international
