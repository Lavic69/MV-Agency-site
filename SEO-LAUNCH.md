# SEO — État & roadmap

Document de suivi SEO du site MV Agency. Trace ce qui a été fait, ce qui reste,
et ce qui est volontairement reporté en v2.

Dernière mise à jour : 2026-05-11

---

## ✅ Fait (mergé sur main)

### Hiérarchie H1-H6 (12 pages indexées + composants partagés)

- **Homepage** : « Partenaires techniques » h3→h2, garanties (Satisfait/Pas d'engagement/Un seul interlocuteur) h4→h3
- **Services** : « 6 leviers » h3→h2, garanties h4→h3
- **Offres** : 3 packs (Fondation/Croissance/Performance) h3→h2, garanties h4→h3
- **Blog article** « Combien coûte un site internet » : ajout de 10 h3 dans « 5 facteurs » et « coûts récurrents » pour structure scannable
- **Contact** : ajout d'un h2 « Réservez votre appel découverte » au-dessus du widget Cal.com (résout le `[Missing heading]` détecté par les scanners)
- **Footer** *(cascade sur toutes pages)* : colonnes h4→h3
- **MagicBento** *(homepage)* : `card.title` h2→h3
- **AnimatedTestimonials** *(services)* : `testimonial.name` h4→h3
- **Timeline** *(offres + a-propos + agence-web-la-reunion)* : `step.title` h4→h3

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

### Infrastructure SEO (déjà en place)

- Sitemap dynamique [src/app/sitemap.ts](src/app/sitemap.ts) (routes statiques + articles blog)
- robots.txt avec bots IA (GPTBot, ClaudeBot, PerplexityBot, etc.) [src/app/robots.ts](src/app/robots.ts)
- JSON-LD global : Organization + LocalBusiness + Person (founder)
- JSON-LD par page : Breadcrumb (toutes), FAQ (4 pages), Article (blog), OfferCatalog (offres)
- OG image dynamique [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)
- Icons file-based (Next 16)
- Canonical sur chaque page
- Vercel Analytics + Speed Insights
- **Google Search Console** : propriété vérifiée + sitemap soumis ✅

### Commits

- `ed71404` — fix(seo): hiérarchie H1-H6 + metas réécrites pour publication
- `ae049dc` — fix(seo): hiérarchie H dans composants partagés
- `2b0532d` — fix(seo): ajoute h2 label sur colonne calendrier contact

---

## 🔴 Restant pour être au top (priorisé)

### Performance & UX (impact ranking direct)

1. **Migration `<img>` → `<Image>` Next.js** — Core Web Vitals (LCP/CLS) = facteur de ranking direct. Fichiers concernés :
   - [src/app/page.tsx:29](src/app/page.tsx:29) (techLogos)
   - [src/components/ui/AnimatedTestimonials.tsx:136](src/components/ui/AnimatedTestimonials.tsx:136)
   - [src/components/ui/Features.tsx:118](src/components/ui/Features.tsx:118)
   - [src/components/ui/circular-testimonials.tsx:180](src/components/ui/circular-testimonials.tsx:180)
   - [src/components/ui/LogoLoop.jsx:241](src/components/ui/LogoLoop.jsx:241)
   - [src/components/ui/testimonials-columns.tsx:84](src/components/ui/testimonials-columns.tsx:84)
   - [src/app/contact/ContactClient.tsx:132](src/app/contact/ContactClient.tsx:132)
   - [src/app/a-propos/AProposClient.tsx:143](src/app/a-propos/AProposClient.tsx:143)

2. **Hotlinks Unsplash → rapatriement local** (perf + RGPD : pas de CDN tiers qui voit l'IP visiteur)
   - [src/app/contact/ContactClient.tsx:132-135](src/app/contact/ContactClient.tsx:132) (4 images clients)
   - [src/app/a-propos/AProposClient.tsx](src/app/a-propos/AProposClient.tsx)

3. **OG dédiés** sur les 4 pages commerciales clés (héritent du layout sinon, dommage au partage social) :
   - [src/app/services/page.tsx](src/app/services/page.tsx)
   - [src/app/offres/page.tsx](src/app/offres/page.tsx)
   - [src/app/cas-clients/page.tsx](src/app/cas-clients/page.tsx)
   - [src/app/blog/page.tsx](src/app/blog/page.tsx)

### Audit headings — restants à investiguer

4. **`[Missing heading]` h2 après h1 sur homepage / services / offres** — probablement un badge / section visuelle stylée comme heading sans h-tag réel. À identifier composant par composant.

5. **`[Missing heading]` h3 avant footer (toutes pages)** — probablement le brand panel Footer (logo + texte « MV Agency ») détecté visuellement comme heading. Solution : transformer le `<span>` logo en h-tag approprié OU laisser tel quel (faux positif).

6. **Duplicates h2 mobile/desktop sur `/services`** — pattern responsive (CSS hide). Google gère, mais pour être 100 % propre : remplacer la version cachée par un `<div role="presentation">` ou conditionner le rendu côté React.

### Contenu & autorité (court-moyen terme)

7. **Articles blog** — 1 seul publié actuellement (`combien-coute-un-site-internet`). Pour bâtir l'autorité topique, viser **6-10 articles cornerstone** sur tes 4 piliers :
   - Création de site web (en cours)
   - IA pour PME
   - Automatisation (n8n / Make / Zapier)
   - SEO / acquisition

8. **`sameAs` LinkedIn / Clutch / Malt** — dès profils créés, remplir [src/lib/seo.ts:116](src/lib/seo.ts:116) (renforce le knowledge graph)

9. **Backlinks initiaux** :
    - LinkedIn entreprise MV Agency
    - Profil Clutch et/ou Malt
    - Mentions presse locale (974 + agence belge/française)

### Schemas additionnels (nice-to-have)

10. **`Service` schema** dédié sur `/services` (actuellement OfferCatalog seulement)
11. **`AggregateRating` + `Review`** une fois 5+ avis clients publics collectés
12. **`hreflang`** — non requis tant que mono-langue FR. À ajouter si tu lances une variante BE-FR / CH-FR / CA-FR ou une version EN

---

## 🟡 V2 / Post-launch (volontairement reporté)

- **Bing Webmaster Tools** (`NEXT_PUBLIC_BING_VERIFICATION`) — < 5 % du trafic search en France, faible ROI immédiat
- **Microsoft Clarity** (`NEXT_PUBLIC_CLARITY_ID`) — heatmaps, intéressant après 1000+ visites/mois
- **@handle Twitter** dans [src/app/layout.tsx](src/app/layout.tsx) — quand compte X créé
- **Pages géo additionnelles** (Paris, Lyon, Genève, etc.) — selon stratégie commerciale
- **GEO / AI search optimization** approfondi (llms.txt, citation-readiness, etc.)
- **A/B test sur titres / descriptions** une fois GSC actif et données collectées
- **Programmatic SEO** (templates de pages générées) si scaling justifie
- **Bandeau consentement RGPD** (préalable activation Clarity)

---

## Ordre conseillé pour atteindre le « top »

1. **Avant gros trafic** → migration `<Image>` + Unsplash local + OG dédiés (~2-3h dev)
2. **Mois 1 post-launch** → 3 nouveaux articles cornerstone + LinkedIn entreprise + Clutch
3. **Mois 2-3** → continuer blog (objectif 6-10 articles), collecter premiers avis (5+ pour AggregateRating)
4. **Mois 3+** → backlinks ciblés, schemas avancés, audit hreflang si international
