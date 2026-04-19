# SEO MV Agency — Document de travail stratégique

> Document maître pour toute la réflexion et exécution SEO + GEO du site MV Agency.
> **Dernière mise à jour : 2026-04-19** (v1.4 — Track A tâches 1-5 implémentées + domaine `mvagency.ai` acquis)
>
> **📎 Documents liés (à lire ensemble) :**
> - 📄 `SEO_Plan_Semantique_MV_Agency.md` → plan éditorial 4 piliers + 32 spokes (structure hybride SEO+GEO)
> - 🧠 `GEO_Plan_MV_Agency.md` → méthodologie GEO complète (template article, llms.txt enrichi, entités externes, bots IA, KPIs)
> - 🗺️ **`SEO_Plan_Geo_MV_Agency.md`** → plan SEO géographique (13 pages : 7 Réunion + 5 Belgique + 1 France, LocalBusiness, GBP)
> - 📈 `SEO_MV_Agency_France_Report.xlsx` / `Reunion` / `Belgique` → données keywords sources
>
> ⚠️ **Distinction importante** : `GEO_Plan` = **G**enerative **E**ngine **O**ptimization (IA) / `SEO_Plan_Geo` = **Géo**graphique (villes & régions). Deux sujets, deux docs.

---

## 📌 Principe directeur

**Séparation stricte CRO / SEO.**

- **Zone CONVERSION** (5 pages sanctuarisées) : `/`, `/services`, `/offres`, `/a-propos`, `/contact`
  → Phrases courtes, impactantes, pédagogiques. Pas de bourrage de mots-clés.
  → Optimisation SEO **uniquement** via metadata, H1/H2, alt, schema markup.

- **Zone SEO** (pages à créer ou enrichir) : `/blog/[slug]` (articles détaillés), pages géo, `/cas-clients` (déjà créée en listing simple).
  → Ce sont ces pages qui vont chercher le trafic organique.

---

## 1. ÉTAT DES LIEUX & LACUNES — AUDIT 2026-04-19 *(mis à jour après Track A tâches 1-5)*

### 1.1 Pages — état réel (après vérification fichiers)

| Page | Fichier | Statut | Statut SEO | Criticité |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | ✅ Existe | ✅ Metadata globale complète / ✅ JSON-LD Organization + LocalBusiness (via layout) | 🟢 |
| `/services` | `src/app/services/page.tsx` | ✅ Existe | ✅ Metadata locale / ❌ JSON-LD Service manquant | 🟡 |
| `/offres` | `src/app/offres/page.tsx` | ✅ Existe | ✅ Metadata locale / ❌ JSON-LD Offer/FAQPage manquant | 🟡 |
| `/a-propos` | `src/app/a-propos/page.tsx` (server) + `AProposClient.tsx` (client) | ✅ **Refactorisée** | ✅ Metadata complète + JSON-LD Person injecté | 🟢 |
| `/contact` | `src/app/contact/page.tsx` | ✅ Existe (server component) | ✅ Metadata enrichie + email `contact@mvagency.ai` | 🟢 |
| `/cas-clients` | `src/app/cas-clients/page.tsx` | ✅ Existe (listing simple) | ✅ Metadata locale | 🟡 |
| `/blog` | `src/app/blog/page.tsx` | ⚠️ Absent du worktree courant (à recréer) | ❌ Source MDX manquante | 🔴 |
| `/blog/[slug]` | — | ❌ **Absent** — route dynamique non créée | 🔴 Bloquant pour publier des articles | 🔴 |
| `/mentions-legales` | `src/app/mentions-legales/page.tsx` | ✅ **CRÉÉE** (squelette LCEN, à finaliser SIRET) | ✅ Metadata + robots noindex-follow | 🟡 |
| `/politique-de-confidentialite` | `src/app/politique-de-confidentialite/page.tsx` | ✅ **CRÉÉE** (squelette RGPD) | ✅ Metadata + robots noindex-follow | 🟡 |
| `/cgv` | `src/app/cgv/page.tsx` | ✅ **CRÉÉE** (squelette CGV B2B 12 articles) | ✅ Metadata + robots noindex-follow | 🟡 |
| Pages géo (`/agence-web-la-reunion`, etc.) | — | ❌ Absentes | Voir `SEO_Plan_Geo_MV_Agency.md` | 🟡 |

### 1.2 Fichiers SEO techniques — état réel

| Fichier | Emplacement | Statut | Contenu | Action |
|---|---|---|---|---|
| `robots.ts` | `src/app/robots.ts` | ✅ Existe | Basique : `allow /`, `disallow /private /api`, pointe sitemap.xml | 🔴 **À enrichir** : bots IA explicites (GPTBot, ClaudeBot, PerplexityBot...) + `BASE_URL = https://mvagency.ai` |
| `sitemap.ts` | `src/app/sitemap.ts` | ✅ Existe | **Statique** — 7 URLs hardcodées | 🔴 **Rendre dynamique** : itérer sur posts blog + pages géo quand créées |
| `llms.txt` | `public/llms.txt` | ✅ Existe | Description + services + réalisations + contact | 🟡 Enrichir (voir `GEO_Plan_MV_Agency.md` §4) |
| `manifest.ts` | — | ❌ Absent | — | 🟡 À créer (PWA) |
| `icon.png` / `apple-icon.png` | — | ❌ Absents | — | 🟡 À ajouter (Next 16 dynamic icons) |
| `opengraph-image.tsx` | `src/app/opengraph-image.tsx` | ✅ **CRÉÉE** | Image dynamique 1200×630 générée via `next/og` (gradient + brand + pills villes) | 🟢 OK |
| `twitter-image.tsx` | — | ❌ Absent | Utilise fallback OG | 🟢 Optionnel (OG suffit) |
| `favicon.ico` | `src/app/favicon.ico` | ✅ Existe | 25 KB | 🟢 OK |
| `src/components/JsonLd.tsx` | ✅ **CRÉÉ** | Helper réutilisable pour injecter Schema.org | 🟢 OK |
| `src/lib/seo.ts` | ✅ **CRÉÉ** | Constantes centralisées + 3 schémas Schema.org | 🟢 OK |

### 1.3 Metadata & structured data — état réel

| Élément | Statut | Détail | Action |
|---|---|---|---|
| `metadata` global (`layout.tsx`) | ✅ **Complet** | title (template), description, keywords, openGraph, twitter, robots, icons, authors, creator, publisher, category, formatDetection | 🟢 OK |
| `metadataBase` dans `layout.tsx` | ✅ **AJOUTÉ** | `new URL('https://mvagency.ai')` | 🟢 OK |
| `viewport` export | ✅ **AJOUTÉ** | themeColor light/dark + width/initialScale | 🟢 OK |
| Metadata locales `/services` | ✅ Présent | Basique (title + description) | 🟡 Enrichir + OG dédié |
| Metadata locales `/offres` | ✅ Présent | Basique | 🟡 Enrichir + OG dédié |
| Metadata locales `/cas-clients` | ✅ Présent | Basique | 🟢 OK |
| Metadata locales `/blog` | ⚠️ Absent du worktree | — | 🔴 À recréer |
| Metadata locales `/a-propos` | ✅ **AJOUTÉE** | title, description, canonical, OG profile, twitter | 🟢 OK |
| Metadata locales `/contact` | ✅ **AJOUTÉE** | title, description, canonical, OG, twitter | 🟢 OK |
| Canonical URLs | ✅ **AJOUTÉS** (home, a-propos, contact, legals) | `alternates.canonical` par page | 🟡 À propager sur services/offres/cas-clients |
| JSON-LD `Organization` | ✅ **INJECTÉ** | Global via `layout.tsx` | 🟢 OK |
| JSON-LD `LocalBusiness` (ProfessionalService) | ✅ **INJECTÉ** | Global via `layout.tsx` avec areaServed Réunion/Belgique/France | 🟢 OK |
| JSON-LD `Service` (x3) | ❌ Absent | — | 🟡 Sur `/services` |
| JSON-LD `Offer` / `Product` | ❌ Absent | — | 🟡 Sur `/offres` (3 packs) |
| JSON-LD `FAQPage` | ❌ Absent | — | 🔴 Sur `/offres` et `/` — rich snippets CTR |
| JSON-LD `BreadcrumbList` | ❌ Absent | — | 🟡 Fil d'Ariane SERP |
| JSON-LD `Person` (Victor) | ✅ **INJECTÉ** | Sur `/a-propos` — E-E-A-T | 🟢 OK |
| JSON-LD `Article` | ❌ Absent | — | 🔴 À prévoir sur futures pages `/blog/[slug]` |
| Hreflang (fr-FR / fr-BE / fr-RE) | ❌ Absent | — | 🟢 Monolingue FR pour l'instant → pas urgent |

### 1.4 Problèmes techniques identifiés — état réel

| # | Problème | Fichier / Ligne | Impact SEO | Priorité |
|---|---|---|---|---|
| 1 | `/a-propos/page.tsx` commence par `"use client"` | `src/app/a-propos/page.tsx` L1 | 🔴 Bloque export metadata | 🔴 P1 |
| 2 | `/contact/page.tsx` commence par `"use client"` (Cal.com embed React) | `src/app/contact/page.tsx` L1 | 🔴 Bloque export metadata | 🔴 P1 |
| 3 | `<img>` natifs au lieu de `next/image` | `src/app/page.tsx` (hero pill + social proof), `src/app/a-propos/page.tsx` (photo Victor) | 🔴 LCP dégradé, pas d'optimisation | 🟡 P2 |
| 4 | Images externes Unsplash (témoignages, photo Victor) | Home + À propos | 🟡 Dépendance externe, risque 404, pas de cache | 🟡 P2 |
| 5 | Alt génériques (`alt="Client 1"`, `alt="Client 2"`) | `src/app/page.tsx` hero pill | 🟡 Accessibilité + SEO image | 🟡 P2 |
| 6 | `sitemap.ts` statique — ne liste pas les articles blog ni pages légales ni pages géo | `src/app/sitemap.ts` | 🔴 Toute nouvelle page ne sera pas indexée auto | 🔴 P1 |
| 7 | `BASE_URL` hardcodé en dur dans sitemap.ts et robots.ts (`https://mv-agency.com`) | `src/app/sitemap.ts` L4, `src/app/robots.ts` L4 | 🟡 À migrer en variable d'env | 🟡 P2 |
| 8 | `metadataBase` absent dans `layout.tsx` | `src/app/layout.tsx` L20-46 | 🔴 URLs OG seront relatives | 🔴 P1 |
| 9 | Image OG fallback = `/projects/stark-nine.png` (réutilisation cas-client) | `src/app/layout.tsx` L31 | 🟡 Pas de branding OG dédié | 🟡 P2 |
| 10 | `cursorSize` dupliqué (valeurs contradictoires 100 puis 80) | `src/app/layout.tsx` L62-63 | 🟢 Bug hors-SEO | 🟢 P3 — à fixer |
| 11 | `/blog/page.tsx` utilise data mock (tableau JS inline 3 posts) | `src/app/blog/page.tsx` L15-40 | 🔴 Pas de CMS / MDX → blocage production contenu | 🔴 P1 (décision architecture) |
| 12 | Route dynamique `/blog/[slug]` absente | — | 🔴 Impossible d'ouvrir un article | 🔴 P1 |
| 13 | H1 home sans mots-clés métier | `src/app/page.tsx` | 🟢 Intentionnel (stratégie CRO) — compensé par meta/H2/schema | 🟢 |
| 14 | Liens Footer vers pages légales cassés | `src/components/Footer.tsx` L39-41 | 🔴 Lien mort + confiance + obligation légale | 🔴 P1 |

### 1.5 Quick wins conversion — optimisation légère des 5 pages

Les 5 pages restent **dédiées conversion**. Pas de réécriture. Juste :

| Page | Action SEO non-intrusive |
|---|---|
| `/` | Enrichir `metadata.description`, JSON-LD Organization + LocalBusiness + FAQPage, alt images contextuels, remplacer `<img>` par `next/image` |
| `/services` | Enrichir `metadata.description`, JSON-LD `Service` x3 (Web, IA, Formation), OG dédié |
| `/offres` | Enrichir `metadata.description`, JSON-LD `Offer` x3 ou `Service + PriceSpecification`, JSON-LD `FAQPage`, OG dédié |
| `/a-propos` | **Refactor architecture** : split server (metadata + JSON-LD Person/AboutPage) + composant client enfant (animations Timeline) |
| `/contact` | **Refactor architecture** : split server (metadata + JSON-LD ContactPage/LocalBusiness) + composant client enfant (Cal.com) |

---

## 2. STRATÉGIE SEO GLOBALE

### 2.1 Architecture 2 tracks

```
┌─────────────────────────────────────────┐
│  TRACK A — CRO + SEO TECHNIQUE          │
│  (5 pages existantes + fichiers tech)   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│  Priorité : 🔴 Pré-lancement            │
│  Effort : Moyen                          │
│  Objectif : trafic brand + conversion   │
└─────────────────────────────────────────┘
                  │
                  │ maillage interne
                  ▼
┌─────────────────────────────────────────┐
│  TRACK B — SEO ÉDITORIAL & REACH        │
│  (blog + pages géo)                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│  Priorité : 🟡 Post-lancement, continu  │
│  Effort : Gros                          │
│  Objectif : trafic organique froid      │
└─────────────────────────────────────────┘
```

### 2.2 Liste des URLs cibles finales

**Zone CONVERSION (existant, 5 pages)** :
- `/`
- `/services`
- `/offres`
- `/a-propos` *(à refactorer server/client)*
- `/contact` *(à refactorer server/client)*

**Zone RÉALISATIONS (existant)** :
- `/cas-clients` *(listing simple, pas de `/cas-clients/[slug]`)*

**Zone LÉGAL (à créer)** :
- `/mentions-legales`
- `/politique-de-confidentialite`
- `/cgv`

**Zone SEO — BLOG** :
- `/blog` (listing existant, données mock à remplacer)
- `/blog/[slug]` *(route à créer — voir `SEO_Plan_Semantique_MV_Agency.md` pour les 36 pages à produire)*

**Zone SEO — PAGES GÉO (à créer, à prioriser selon volumes)** :
- Réunion (prioritaire) : `/agence-web-la-reunion`, `/agence-web-saint-denis-974`, `/agence-ia-la-reunion`
- Belgique : `/agence-web-belgique`, `/agence-web-bruxelles`
- France : `/agence-web-france` *(si pertinent)*
- *(à affiner avec données CSV — voir `SEO_MV_Agency_[Pays]_Report.xlsx`)*

---

## 3. IDÉES DE MOTS-CLÉS À RECHERCHER (seed keywords pour Google Keyword Planner) — ✅ FAIT

> Les CSV ont été analysés. Résultats disponibles dans :
> - `SEO_MV_Agency_France_Report.xlsx` (4 952 keywords)
> - `SEO_MV_Agency_Reunion_Report.xlsx` (3 517 keywords)
> - `SEO_MV_Agency_Belgique_Report.xlsx` (87 keywords)

### 3.1 Cluster — CRÉATION DE SITE WEB (transactionnel)

**Requêtes génériques :** création site web · création site internet · agence création site web · agence web · créer un site internet · création site vitrine · refonte site web · agence web design · web design agence · développeur site web

**Requêtes PME/TPE spécifiques :** création site web PME · création site web TPE · site internet pour indépendant · site web pour profession libérale · création site internet artisan · site vitrine entreprise · site web pour commerce local

**Requêtes stack / tech :** création site Next.js · agence Webflow · agence WordPress · création site e-commerce · site web Shopify

### 3.2 Cluster — IA & AUTOMATISATION (différenciateur clé)

**Requêtes IA :** agence IA · agence intelligence artificielle · consultant IA PME · intégration IA entreprise · chatbot IA entreprise · agent IA personnalisé · IA pour PME · IA pour TPE · solutions IA pour entreprise · automatisation IA

**Requêtes automatisation / no-code :** automatisation entreprise · automatisation no-code · agence automatisation · automatisation CRM · automatisation email marketing · n8n / Make / Zapier expert · automatisation PME

### 3.3 Cluster — AGENCE DIGITALE (géo / mixte)

**La Réunion (cible principale) :** agence web La Réunion · agence web 974 · agence digitale La Réunion · création site web Saint-Denis Réunion · création site internet Saint-Pierre Réunion · agence marketing La Réunion · développeur web Réunion · agence IA La Réunion

**France métropolitaine :** agence web France · agence digitale France · agence web freelance France

**Belgique :** agence web Belgique · agence digitale Bruxelles · création site internet Belgique · agence IA Belgique

### 3.4 Cluster — FORMATION & PÉDAGOGIE (mid-funnel)

formation IA entreprise · formation IA PME · formation no-code · formation création site web · apprendre l'IA en entreprise · accompagnement digital PME

### 3.5 Cluster — INFORMATIONNEL / BLOG (top-of-funnel)

> Ces mots-clés ne se placent **PAS** sur les 5 pages conversion. Ils alimentent `/blog`.

**Angle IA :** comment utiliser l'IA · exemples IA PME · qu'est-ce qu'un agent IA · différence chatbot vs agent IA · intégrer ChatGPT en entreprise · automatiser sa PME avec l'IA

**Angle web :** quel CMS choisir · WordPress vs Webflow vs Next.js · combien coûte un site internet · refonte ou nouveau site · SEO pour PME · landing page · site vitrine vs e-commerce

**Angle métier :** site internet pour pharmacie / coach sportif / avocat / dentiste / kiné · digital pour professions libérales

### 3.6 Cluster — NAVIGATIONNELLES / BRAND (à monitorer)

MV Agency · MV Agency avis · Victor Marchetti agence · MV Agency Réunion

---

## 4. ANALYSE DES CSV KEYWORD PLANNER — ✅ FAIT

Voir rapports Excel :

| Marché | Fichier | Volume notable |
|---|---|---|
| 🇫🇷 France | `SEO_MV_Agency_France_Report.xlsx` | 4 952 keywords — top : `agence web` (12 100/mois, Faible) · `création site internet` (9 900) · `agence IA` (2 400) |
| 🏝️ Réunion | `SEO_MV_Agency_Reunion_Report.xlsx` | 3 517 keywords — top : `création site internet la réunion` (110) · `agence web la réunion` (90) · `agence web 974` (30) |
| 🇧🇪 Belgique | `SEO_MV_Agency_Belgique_Report.xlsx` | 87 keywords — top : `agence web bruxelles` (480) · `agence web namur` (320) · `agence web belgique` (260) · `agence web wallonie` (140) |

Scoring opportunité : `log10(volume) * 100 - (competition/100)*120 + intent_bonus + geo_bonus`

---

## 5. PLAN ÉDITORIAL FINAL — ✅ FAIT (partie sémantique)

> Document dédié : `SEO_Plan_Semantique_MV_Agency.md` + version Excel 10 onglets.
>
> **Résumé** : 4 piliers hub-and-spoke + 32 articles spokes = 36 pages à produire sur 6 mois
>
> - **Pilier 1** : Création & refonte de site web (hub + 8 spokes)
> - **Pilier 2** : IA & Automatisation PME (hub + 9 spokes)
> - **Pilier 3** : SEO & Marketing digital PME (hub + 6 spokes)
> - **Pilier 4** : Site web par métier (hub + 9 spokes — aligné `/cas-clients` MV Agency)

> **À faire** : plan géo dédié (Réunion + Belgique) → document séparé à produire.

---

## 6. ROADMAP D'EXÉCUTION — mise à jour 2026-04-19

### Phase 1 — Track A / Pré-lancement (bloquant) 🔴

**Fichiers techniques :**
1. ☐ Ajouter `metadataBase` dans `src/app/layout.tsx`
2. ☐ Corriger bug `cursorSize` dupliqué L62-63 dans `layout.tsx`
3. ☐ Rendre `sitemap.ts` dynamique (intégrer futurs articles blog + pages géo)
4. ☐ Migrer `BASE_URL` hardcodé en variable d'environnement (`NEXT_PUBLIC_SITE_URL`)
5. ☐ Créer `src/app/opengraph-image.tsx` (1200x630 dédié MV Agency)
6. ☐ Créer `src/app/manifest.ts` + `icon.png` / `apple-icon.png`

**Refactors critiques :**
7. ☐ **Refactor `/a-propos`** : split server (page.tsx + metadata + JSON-LD) + client child (animations)
8. ☐ **Refactor `/contact`** : split server (page.tsx + metadata + JSON-LD) + client child (Cal.com embed)

**JSON-LD :**
9. ☐ Injecter JSON-LD `Organization` + `LocalBusiness` dans `layout.tsx`
10. ☐ Ajouter JSON-LD `Service` x3 sur `/services`
11. ☐ Ajouter JSON-LD `Offer` x3 + `FAQPage` sur `/offres`
12. ☐ Ajouter JSON-LD `Person` (Victor) + `AboutPage` sur `/a-propos`
13. ☐ Ajouter JSON-LD `ContactPage` + `LocalBusiness` sur `/contact`
14. ☐ Ajouter JSON-LD `FAQPage` sur `/` (home)
15. ☐ Ajouter `BreadcrumbList` sur pages enfants

**Pages légales (obligations légales + liens footer cassés) :**
16. ☐ Créer `/mentions-legales`
17. ☐ Créer `/politique-de-confidentialite`
18. ☐ Créer `/cgv`

**Qualité images :**
19. ☐ Remplacer `<img>` natifs par `next/image` (home + a-propos)
20. ☐ Héberger localement les images Unsplash actuelles (ou utiliser visuels propriétaires)
21. ☐ Corriger alt génériques `"Client 1"` → alt contextuels

### Phase 2 — Keyword research ✅ FAIT

✅ Victor a exporté les CSV → rapports Excel analysés (France / Réunion / Belgique).

### Phase 3 — Track B / Post-lancement (continu) 🟡

**Architecture blog (bloquant avant publication) :**
1. ☐ Décider stack contenu : **MDX local** (recommandé) ou CMS headless (Sanity, Contentlayer…)
2. ☐ Créer structure `content/blog/piliers/*.mdx` + `content/blog/articles/*.mdx`
3. ☐ Créer route dynamique `src/app/blog/[slug]/page.tsx` + `generateStaticParams`
4. ☐ Remplacer data mock dans `src/app/blog/page.tsx` par lecture dynamique MDX
5. ☐ Créer composants `<ArticleSchema>`, `<FAQSchema>`, `<PillarNav>`, `<RelatedArticles>`, `<InlineCTA>`, `<TableOfContents>`, `<BreadcrumbTrail>`
6. ☐ Mettre à jour `sitemap.ts` pour itérer sur les posts MDX

**Production contenu (plan sémantique) :**
7. ☐ Vague 1 (mois 1-2) : 4 piliers hub + 5 articles P1 stratégiques
8. ☐ Vague 2 (mois 3-4) : 10 articles P1 restants
9. ☐ Vague 3 (mois 5-6) : 17 articles P2/P3 longue traîne
10. ☐ Voir détail : `SEO_Plan_Semantique_MV_Agency.md` sections 8.1 & 8.2

**Pages géo (à planifier dans doc dédié) :**
11. ☐ Créer plan géo Réunion + Belgique (document séparé à produire)
12. ☐ Implémenter pages géo prioritaires

**Monitoring :**
13. ☐ Connecter Google Search Console
14. ☐ Connecter Google Analytics 4
15. ☐ Itération continue sur keywords performants

---

## 7. LIVRABLES ASSOCIÉS

| Document | Statut | Rôle |
|---|---|---|
| `SEO MV Agency.md` (ce fichier) | ✅ v1.3 — 2026-04-19 | Document master stratégique + audit fichiers réels |
| `SEO_Plan_Semantique_MV_Agency.md` | ✅ v1.1 hybride SEO+GEO | Plan éditorial 4 piliers + 32 spokes (MDX-ready, structure hybride) |
| `SEO_Plan_Semantique_MV_Agency.xlsx` | ✅ | Plan éditorial Excel 10 onglets |
| `GEO_Plan_MV_Agency.md` | ✅ v1.0 — 2026-04-19 | Méthodologie GEO : template hybride + llms.txt + entités externes + bots IA + tests citabilité + KPIs |
| **`SEO_Plan_Geo_MV_Agency.md`** | ✅ **v1.0 — 2026-04-19** | **Plan SEO géographique : 13 pages (7 Réunion + 5 Belgique + 1 France), LocalBusiness JSON-LD, stratégie GBP, roadmap 3 vagues** |
| `SEO_MV_Agency_France_Report.xlsx` | ✅ | 4 952 keywords France analysés |
| `SEO_MV_Agency_Reunion_Report.xlsx` | ✅ | 3 517 keywords Réunion analysés |
| `SEO_MV_Agency_Belgique_Report.xlsx` | ✅ | 87 keywords Belgique analysés |
| *Checklist Track A technique* | ⏳ À produire | Pas-à-pas implémentation fichiers tech + JSON-LD |
| *Plan éditorial Excel géo* | ⏳ Optionnel | Export XLSX du plan géo (si besoin) |

### 7.1 Comment lire les documents ensemble

```
              ┌─────────────────────────┐
              │   SEO MV Agency.md      │  ← TU ES ICI
              │   (master stratégique)  │
              └───────────┬─────────────┘
                          │ référence
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ SEO_Plan_    │  │ GEO_Plan_    │  │ SEO_Plan_    │
│ Semantique   │◄─┤ MV_Agency.md │  │ Geo          │
│ _MV_Agency   │─►│              │  │ _MV_Agency   │
│ (QUOI blog)  │  │ (COMMENT IA) │  │ (OÙ villes)  │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────┬───────┴─────────┬───────┘
                 ▼                 ▼
        ┌─────────────────────────────────┐
        │  Rapports Excel                 │
        │  France / Réunion / Belgique    │
        │  (données keywords sources)     │
        └─────────────────────────────────┘
```

**Les 3 plans sont complémentaires — pas redondants :**
- **Plan Sémantique** = QUOI produire (32 articles blog hub-and-spoke)
- **Plan GEO** = COMMENT le rendre citable par les IA (méthodo transverse)
- **Plan Geo** = OÙ se positionner géographiquement (13 pages villes/régions)

**Ordre de lecture recommandé pour implémenter un article blog :**
1. `GEO_Plan_MV_Agency.md` → lire §3 "Template article hybride" + §11 "Pièges"
2. `SEO_Plan_Semantique_MV_Agency.md` → identifier l'article à produire (quoi + brief + frontmatter)
3. Rédiger l'article en appliquant la structure hybride
4. Valider via la checklist section 11 du plan sémantique (v1.1 hybride)

**Ordre de lecture recommandé pour créer une page géo (ville) :**
1. `SEO_Plan_Geo_MV_Agency.md` → §3/§4/§5 selon l'île (Réunion/Belgique/France)
2. `SEO_Plan_Geo_MV_Agency.md` §6 → template page géo hybride + §7 LocalBusiness JSON-LD
3. `GEO_Plan_MV_Agency.md` §3 → appliquer structure citable IA aussi sur pages géo
4. Valider via checklist §12 du plan geo (28 items)

---

## 8. DOMAINE & INFRASTRUCTURE — ÉTAT 2026-04-19

### 8.1 Domaine acquis

| Info | Valeur |
|---|---|
| **Domaine** | `mvagency.ai` |
| **Registrar** | Cloudflare Inc. |
| **Acheté le** | 2026-04-18 |
| **Expiration** | 2028-04-18 (2 ans) |
| **Nameservers** | `dax.ns.cloudflare.com` + `thea.ns.cloudflare.com` |
| **WHOIS Privacy** | ✅ Activée par défaut |
| **Transfer Lock** | ✅ `clientTransferProhibited` actif |

### 8.2 Stack infrastructure cible

```
    Utilisateur final
          │
          ▼
  ┌───────────────────┐
  │  Cloudflare DNS   │  (DNSSEC ON, DNS-only — PAS de proxy)
  │  mvagency.ai      │
  └─────────┬─────────┘
            │ résolution → IP Vercel
            ▼
  ┌───────────────────┐
  │  Vercel Edge      │  SSL, CDN, DDoS, cache ISR
  │  Next.js 16.2.2   │
  └───────────────────┘

  Email : Infomaniak kSuite Standard (50 Go, 2 adresses)
    → MX/SPF/DKIM/DMARC configurés côté Cloudflare DNS (DNS-only)
    → Boîtes : contact@mvagency.ai + victor@mvagency.ai (à confirmer)
```

### 8.3 Configuration Cloudflare — checklist

| # | Action | Statut |
|---|---|---|
| 1 | DNSSEC activé | ⏳ À confirmer |
| 2 | Records DNS mail Infomaniak (MX, SPF, DKIM, DMARC) | ⏳ En attente validation kSuite |
| 3 | Records autoconfig + autodiscover CNAME | ⏳ À ajouter |
| 4 | Records CAA (Let's Encrypt, Sectigo, DigiCert) | 🟡 Optionnel mais recommandé |
| 5 | Proxy "orange cloud" | ❌ **NE PAS activer** (conflit Vercel) |
| 6 | Bot Fight Mode | ❌ **NE PAS activer** (bloque Googlebot, GPTBot, outils SEO) |
| 7 | Always Use HTTPS / Minify / Rocket Loader | ❌ **NE PAS activer** (Vercel gère déjà + casse Next.js) |

### 8.4 Configuration Vercel (au moment du déploiement)

| # | Action | Statut |
|---|---|---|
| 1 | Lier `mvagency.ai` dans Settings → Domains | ⏳ Au déploiement |
| 2 | Lier `www.mvagency.ai` (redirection apex) | ⏳ Idem |
| 3 | Ajouter record A `@` → IP Vercel (DNS-only côté CF) | ⏳ Idem |
| 4 | Ajouter record CNAME `www` → `cname.vercel-dns.com` | ⏳ Idem |
| 5 | Vérifier SSL Let's Encrypt auto-provisionné | ⏳ Idem |

---

## 9. JOURNAL D'IMPLÉMENTATION

### 2026-04-19 — Track A, vague 1 (tâches 1 à 5)

**Contexte** : première vague d'implémentation technique après acquisition du domaine `mvagency.ai` (registrar Cloudflare) et souscription kSuite Standard chez Infomaniak pour l'email pro.

**Fichiers créés**
| Fichier | Rôle |
|---|---|
| `src/components/JsonLd.tsx` | Helper réutilisable pour injecter Schema.org (`<script type="application/ld+json">`) |
| `src/lib/seo.ts` | Source unique de vérité : `SITE_URL`, `CONTACT_EMAIL`, `FOUNDER_NAME`, 3 schémas Schema.org (Organization, ProfessionalService/LocalBusiness, Person) |
| `src/app/opengraph-image.tsx` | OG image 1200×630 générée dynamiquement via `next/og` (gradient + brand + pills Réunion/Belgique/France) |
| `src/app/mentions-legales/page.tsx` | Squelette LCEN (éditeur, hébergeur, PI, responsabilité) avec marqueurs `[À COMPLÉTER]` |
| `src/app/politique-de-confidentialite/page.tsx` | Squelette RGPD (responsable, finalités, durée, sous-traitants, droits utilisateur) |
| `src/app/cgv/page.tsx` | Squelette CGV B2B 12 articles (devis, paiement, livrables, responsabilité, résiliation) |
| `src/app/a-propos/AProposClient.tsx` | Client component extrait de l'ancien `page.tsx` (contient tous les `onMouseMove` interactifs) |

**Fichiers modifiés**
| Fichier | Changements |
|---|---|
| `src/app/layout.tsx` | Ajout `metadataBase`, title template, OG/Twitter complets, robots, icons, authors, creator, publisher, category, formatDetection, viewport (themeColor light/dark), injection JSON-LD Organization + LocalBusiness |
| `src/app/a-propos/page.tsx` | Transformé en Server Component : exports `metadata` + injecte JSON-LD `Person` + rend `<AProposClient />` |
| `src/app/contact/page.tsx` | Metadata enrichie (canonical, OG, twitter), email mis à jour `contact@mvagency.fr` → `contact@mvagency.ai` (centralisé via `seo.ts`), téléphone commenté en TODO |

**Validation**
- `npx tsc --noEmit` → ✅ clean
- `npm run build` → ✅ compile en 3,0 s, 12 pages statiques, **0 warning**
- Dev server (`npm run dev`) → ✅ Ready in 519 ms, home rend correctement

**Problèmes résolus en parallèle**
- Audit initial incorrect sur `/contact` : le fichier N'était PAS en `"use client"` (contrairement à ce qui était noté v1.2) — c'était déjà un Server Component. Refactor non nécessaire, juste enrichissement metadata.
- `cursorSize` L62-63 dupliqué → vérifié : présent une seule fois dans le fichier actuel (L39). Non-issue.
- `/blog` et `/cas-clients` absents du worktree courant → à recréer.

**Points à finaliser manuellement avant passage prod**
1. `src/lib/seo.ts` → renseigner `sameAs` (LinkedIn, Clutch quand créés) + adresse exacte
2. 3 pages légales → renseigner tous les `[À COMPLÉTER]` (SIRET, forme juridique, adresse, téléphone, dates, % acompte, durée validité devis, cookies effectifs)
3. `layout.tsx` → remplacer ou supprimer `twitter.creator: '@mv_agency'` si pas de compte X
4. Ajouter `public/apple-icon.png` (180×180) ou supprimer la ligne `icons.apple`

### Track A restant — 15 tâches suivantes (priorité décroissante)

1. 🔴 Rendre `sitemap.ts` dynamique (itérer sur posts MDX blog + pages géo)
2. 🔴 Enrichir `robots.ts` (bots IA explicites : GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, cohere-ai) + `BASE_URL = https://mvagency.ai`
3. 🔴 Recréer `/blog` + créer `/blog/[slug]` (route dynamique MDX) avec `Article` JSON-LD + `BreadcrumbList`
4. 🟡 JSON-LD `Service` (×3) sur `/services`
5. 🟡 JSON-LD `Offer` + `FAQPage` sur `/offres`
6. 🟡 Enrichir `public/llms.txt` (voir `GEO_Plan_MV_Agency.md` §4)
7. 🟡 Créer pages géo (Réunion priorité — voir `SEO_Plan_Geo_MV_Agency.md`)
8. 🟢 Créer `manifest.ts` (PWA)
9. 🟢 Ajouter `public/apple-icon.png` (180×180)
10. 🟢 Optionnel : `twitter-image.tsx` dédié (ou laisser fallback OG)
11. 🟢 Remplacer `<img>` natifs par `next/image` sur `/` (hero) et `/a-propos` (photo Victor)
12. 🟢 Ajouter GSC + Bing Webmaster Tools verification (quand déployé)
13. 🟢 Ajouter `alternates.canonical` sur `/services`, `/offres`, `/cas-clients`
14. 🟢 Créer `<CalEmbed />` client-component quand Cal.com sera configuré
15. 🟢 Audit Lighthouse post-déploiement (CWV, accessibilité, SEO)
