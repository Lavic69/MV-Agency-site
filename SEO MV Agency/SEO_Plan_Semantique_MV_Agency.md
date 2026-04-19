# Plan Sémantique SEO + GEO — MV Agency

> **Objectif du document** : architecture de contenu complète pour la zone SEO du site MV Agency (blog).
> **Approche** : **articles hybrides SEO + GEO** — chaque article est pensé pour performer à la fois sur Google classique ET dans les moteurs IA (ChatGPT Search, Perplexity, Google AI Overviews, Claude, Copilot).
> **Lisibilité** : pensé pour être consommé par un humain ET par un agent IA qui devra implémenter les pages.
> **Scope** : sémantique + structure rédactionnelle hybride. Le géo (Réunion / Belgique / villes) sera traité dans un document dédié.
> **Source de données** : Google Keyword Planner France (4 952 mots-clés analysés).
>
> **📎 Documents liés (à lire ensemble) :**
> - 🧠 **`GEO_Plan_MV_Agency.md`** → méthodologie GEO complète (llms.txt, entités externes, bots IA, KPIs, template article hybride détaillé). **À consulter obligatoirement avant de rédiger tout article de ce plan.**
> - 📊 `SEO MV Agency.md` → document master stratégique + audit fichiers réels
> - 📈 `SEO_MV_Agency_France_Report.xlsx` / `Reunion` / `Belgique` → données keywords sources
>
> **Version** : v1.1 — 2026-04-19 (ajout approche hybride GEO)

---

## 📐 1. PRINCIPES D'ARCHITECTURE

### 1.1 Rappel de la stratégie globale

| Zone | URL | Rôle | Action SEO |
|---|---|---|---|
| **Conversion** (sanctuaire) | `/`, `/services`, `/offres`, `/a-propos`, `/contact` | Convertir visiteurs → clients | Optimisation light (metadata, schema) — **ne pas réécrire pour SEO** |
| **Réalisations** | `/cas-clients` | Preuve sociale | Listing simple — pas de page dédiée par projet |
| **SEO éditorial** | `/blog` + enfants | Capter trafic organique | Cœur du SEO — 4 piliers thématiques |
| **SEO géo** | *(à définir)* | Local SEO | **Hors scope de ce document** |

### 1.2 Modèle Hub-and-Spoke (pilier & satellites)

```
                    ┌────────────────────────┐
                    │      /blog (listing)    │
                    └────────────────────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        ▼          ▼           ▼           ▼          ▼
   [Pilier 1] [Pilier 2]  [Pilier 3]  [Pilier 4]   (futurs)
      │           │           │           │
   ┌──┴──┐    ┌──┴──┐     ┌──┴──┐    ┌──┴──┐
   Articles Articles   Articles   Articles
   spokes   spokes     spokes     spokes
```

**Règle d'or** : chaque article **spoke** link vers :
1. **Son pilier** (article hub parent)
2. **2-3 articles frères** (même pilier, contexte proche)
3. **1-2 pages conversion** (CTA en fin d'article et au milieu)

### 1.3 Les 4 piliers retenus

| # | Pilier | Keyword cœur | Volume | Page conversion cible |
|---|---|---|---|---|
| **1** | Création & refonte de site web | `agence web` (12 100/mois, Faible) | Massif | `/offres` (Pack Fondation / Croissance) |
| **2** | IA & Automatisation pour PME | `agence IA` (2 400/mois, Faible) | Moyen, concurrence faible | `/offres` (Pack Performance IA) |
| **3** | SEO & Marketing digital pour PME | `agence référencement naturel` (2 400/mois, Faible) | Moyen | `/offres` (Pack Croissance) |
| **4** | Site web par métier | `site internet pour [métier]` | Longue traîne | `/cas-clients` + `/offres` |

### 1.4 Question ouverte : de nouvelles pages conversion ?

**Recommandation : NON, ne pas créer de sous-pages /services/xxx.**

Raisons :
- Décision actée : rester sur 5 pages conversion nettes
- Le pilier blog fait déjà office de "service explicatif" pour le SEO
- Multiplier les pages dilue l'autorité et complexifie la navigation

**Seule page conversion à AJOUTER** : `/cas-clients` (déjà actée, listing simple).

### 1.5 Structure hybride SEO + GEO — obligatoire pour TOUS les articles

> 📖 **Méthodologie complète détaillée dans** `GEO_Plan_MV_Agency.md`.
> Ce résumé sert de garde-fou rédactionnel pour les 36 articles ci-dessous.

**Règle non-négociable** : chaque article de ce plan doit respecter la structure hybride suivante. Un article SEO "classique" long-format sans bloc GEO est désormais rejeté.

```
┌────────────────────────────────────────────────────┐
│ 1. H1 avec keyword principal                       │  ← SEO
├────────────────────────────────────────────────────┤
│ 2. BLOC RÉPONSE COURTE (answerBlock — 150-200 mots)│  ← GEO ★
│    - Résumé extractible par l'IA                    │
│    - Chiffre-clé / verdict / fourchette             │
│    - Aucun intro long type "dans un monde en..."    │
├────────────────────────────────────────────────────┤
│ 3. H2 en FORME DE QUESTION (x 4 à 8)                │  ← SEO + GEO
│    Paragraphes auto-portants 100-150 mots           │  ← GEO ★
│    Tableaux / listes / données chiffrées            │
│    CTA inline au milieu                             │  ← Conversion
├────────────────────────────────────────────────────┤
│ 4. FAQ (6-8 Q/R) + schema FAQPage                   │  ← GEO ★★
│    (gold pour AI Overviews et Perplexity)           │
├────────────────────────────────────────────────────┤
│ 5. Conclusion + CTA final vers page conversion      │  ← Conversion
├────────────────────────────────────────────────────┤
│ 6. Auteur (Victor Marchetti) + date pub + date MAJ  │  ← GEO ★ (E-E-A-T)
├────────────────────────────────────────────────────┤
│ 7. Articles liés (3) — maillage pilier/frères       │  ← SEO
└────────────────────────────────────────────────────┘
```

**Les 5 règles d'écriture GEO** à appliquer systématiquement :

1. **Réponse dès le premier paragraphe** — jamais d'intro "blabla".
2. **H2 en questions** — `"Quels sont les types de sites ?"` et non `"Les types de sites"`.
3. **Paragraphes auto-portants** — chaque paragraphe doit pouvoir être extrait tel quel et rester compréhensible hors contexte.
4. **Données chiffrées, exemples, noms propres** — l'IA préfère la spécificité à la généralité.
5. **Pas de keyword stuffing** — l'IA déteste, ça casse la citabilité.

---

## 🧱 2. PILIER 1 — CRÉATION & REFONTE DE SITE WEB

### 2.1 Page pilier (hub)

| Champ | Valeur |
|---|---|
| **URL** | `/blog/creation-site-web-guide-complet` |
| **H1** | Création de site web : le guide complet 2026 pour TPE et PME |
| **Meta title** (60c) | Création de site web 2026 : guide complet pour TPE/PME |
| **Meta description** (155c) | Tout savoir avant de créer un site internet : choix du CMS, budget, délais, SEO. Le guide MV Agency dédié aux TPE et PME. |
| **Keyword primaire** | création site web (1 600/mois, Moyen) |
| **Keywords secondaires** | agence web (12 100), création site internet (9 900), agence digitale (2 400), freelance site web (3 600), site vitrine (1 000) |
| **Longueur recommandée** | 2 500 - 3 500 mots |
| **CTA principal** | `/offres` — bouton "Voir nos packs" |
| **CTA secondaire** | `/contact` — "Parler à un expert" |
| **Schema** | `Article` + `BreadcrumbList` + `FAQPage` (section FAQ intégrée) |

**Plan suggéré :**
1. Introduction : pourquoi un site web en 2026
2. Les types de sites (vitrine, e-commerce, landing page, sur-mesure)
3. Choix du CMS/stack (WordPress, Webflow, Next.js, Wix)
4. Budget : combien coûte un site internet ?
5. Délais de création
6. SEO dès la conception
7. Critères de choix d'une agence / freelance
8. FAQ (6-8 questions)
9. CTA fin : découvrir les packs MV Agency

### 2.2 Articles spokes (par priorité)

| # | URL | H1 / Titre article | Keyword primaire | Volume | Concurrence | Priorité |
|---|---|---|---|---|---|---|
| 1.1 | `/blog/combien-coute-un-site-internet` | Combien coûte un site internet en 2026 ? Guide des prix | prix site internet | 1 300 | Moyen | 🔴 P1 |
| 1.2 | `/blog/wordpress-vs-webflow-vs-nextjs` | WordPress vs Webflow vs Next.js : lequel choisir en 2026 ? | wordpress vs webflow | 390 | Faible | 🔴 P1 |
| 1.3 | `/blog/site-vitrine-vs-ecommerce` | Site vitrine ou e-commerce : faire le bon choix en 2026 | site vitrine vs e-commerce | ~250 | Faible | 🟡 P2 |
| 1.4 | `/blog/refonte-site-web-ou-nouveau-site` | Refonte ou nouveau site : comment décider ? | refonte site web | 590 | Faible | 🟡 P2 |
| 1.5 | `/blog/freelance-vs-agence-digitale` | Freelance vs agence digitale : quel prestataire choisir ? | freelance vs agence | ~200 | Faible | 🟡 P2 |
| 1.6 | `/blog/meilleure-agence-web-criteres` | Meilleure agence web : les 7 critères à vérifier | meilleure agence web | 110 | Faible | 🟢 P3 |
| 1.7 | `/blog/prix-site-vitrine` | Prix d'un site vitrine : fourchette 2026 et ce qui influence le coût | prix site vitrine | 720 | Faible | 🔴 P1 |
| 1.8 | `/blog/qu-est-ce-qu-une-landing-page` | Qu'est-ce qu'une landing page ? Définition, exemples, ROI | qu'est-ce qu'une landing page | 210 | Faible | 🟡 P2 |

**Total pilier 1 :** 1 hub + 8 articles = **9 pages**. Volume cumulé ≈ 3 600/mois en transactionnel-info.

---

## 🧱 3. PILIER 2 — IA & AUTOMATISATION POUR PME

### 3.1 Page pilier (hub)

| Champ | Valeur |
|---|---|
| **URL** | `/blog/ia-automatisation-pme-guide` |
| **H1** | IA et automatisation pour PME : le guide pour commencer sans jargon |
| **Meta title** | IA pour PME 2026 : guide complet automatisation & chatbot |
| **Meta description** | Découvrez comment l'IA et l'automatisation transforment les PME. Chatbots, agents IA, CRM automatisés : guide pédagogique MV Agency. |
| **Keyword primaire** | IA pour PME |
| **Keywords secondaires** | agence IA (2 400), agence intelligence artificielle (2 400), automatisation IA (880), automatisation entreprise (90) |
| **Longueur** | 2 500 - 3 500 mots |
| **CTA principal** | `/offres` — Pack Performance IA mis en avant |
| **CTA secondaire** | `/contact` — Audit IA gratuit |
| **Schema** | `Article` + `FAQPage` + `HowTo` (si tutos inclus) |

**Plan suggéré :**
1. IA pour PME : pourquoi maintenant ?
2. Différence entre IA, automatisation et no-code
3. Les cas d'usage concrets (CRM, emailing, contenu, chatbot)
4. Panorama des outils (ChatGPT, Claude, n8n, Make, Zapier)
5. Budget à prévoir
6. Les écueils à éviter
7. Par où commencer (méthode pas à pas)
8. FAQ
9. CTA : audit IA gratuit

### 3.2 Articles spokes

| # | URL | H1 / Titre | Keyword primaire | Volume | Concurrence | Priorité |
|---|---|---|---|---|---|---|
| 2.1 | `/blog/qu-est-ce-qu-un-agent-ia` | Qu'est-ce qu'un agent IA et comment le déployer dans son entreprise ? | qu'est-ce qu'un agent IA | 390 | Moyen | 🔴 P1 |
| 2.2 | `/blog/chatbot-vs-agent-ia-difference` | Chatbot vs agent IA : différence, cas d'usage, lequel choisir | différence chatbot agent IA | ~150 | Faible | 🟡 P2 |
| 2.3 | `/blog/exemples-ia-pme` | 10 exemples concrets d'IA pour PME (avec ROI mesurable) | exemples IA PME | ~200 | Faible | 🔴 P1 |
| 2.4 | `/blog/automatiser-sa-pme-avec-ia` | Automatiser sa PME avec l'IA : par où commencer | automatiser PME IA | ~150 | Faible | 🟡 P2 |
| 2.5 | `/blog/integrer-chatgpt-dans-son-entreprise` | Intégrer ChatGPT dans son entreprise : le guide pas à pas | intégrer ChatGPT entreprise | ~120 | Moyen | 🟡 P2 |
| 2.6 | `/blog/automatisation-crm` | Automatisation CRM : gagner 10h/semaine en automatisant ses ventes | automatisation CRM | 260 | Faible | 🔴 P1 |
| 2.7 | `/blog/automatisation-email-marketing` | Automatisation email marketing pour PME : le guide 2026 | automatisation email | 320 | Faible | 🔴 P1 |
| 2.8 | `/blog/no-code-vs-code-entreprise` | No-code vs code : quelle solution pour votre entreprise ? | formation no code | 880 | Faible | 🟡 P2 |
| 2.9 | `/blog/formation-ia-entreprise` | Formation IA pour entreprise : former ses équipes en 2026 | formation IA entreprise | 480 | Moyen | 🟡 P2 |

**Total pilier 2 :** 1 hub + 9 articles = **10 pages**. Volume cumulé ≈ 3 000/mois, **concurrence majoritairement faible** → terrain vierge pour MV Agency.

---

## 🧱 4. PILIER 3 — SEO & MARKETING DIGITAL POUR PME

### 4.1 Page pilier (hub)

| Champ | Valeur |
|---|---|
| **URL** | `/blog/seo-marketing-digital-pme-guide` |
| **H1** | SEO et marketing digital pour PME : le guide pour être visible en 2026 |
| **Meta title** | SEO PME 2026 : guide complet marketing digital TPE & PME |
| **Meta description** | Comment faire venir des clients via Google et les réseaux sans budget agence premium. Guide SEO et marketing digital pour PME. |
| **Keyword primaire** | SEO pour PME |
| **Keywords secondaires** | agence référencement naturel (2 400), référencement naturel (1 600), meilleur agence SEO (1 600), marketing digital TPE |
| **Longueur** | 2 500 - 3 500 mots |
| **CTA principal** | `/offres` — Pack Croissance |
| **CTA secondaire** | `/contact` — Audit SEO gratuit |
| **Schema** | `Article` + `FAQPage` + `HowTo` |

**Plan :**
1. SEO vs SEA vs social : c'est quoi la différence
2. Les 3 piliers du SEO (technique, contenu, netlinking)
3. SEO local vs SEO national
4. Quels outils utiliser (GSC, GA4, Ahrefs…)
5. Combien de temps pour voir des résultats
6. Les erreurs classiques des PME
7. Faire appel à une agence ou en interne ?
8. FAQ
9. CTA : audit SEO offert

### 4.2 Articles spokes

| # | URL | H1 / Titre | Keyword primaire | Volume | Concurrence | Priorité |
|---|---|---|---|---|---|---|
| 3.1 | `/blog/referencement-naturel-debutant` | Référencement naturel pour débutants : les bases en 10 minutes | référencement naturel | 1 600 | Faible | 🔴 P1 |
| 3.2 | `/blog/google-ads-vs-seo` | Google Ads ou SEO : quelle stratégie pour débuter ? | Google Ads vs SEO | ~200 | Faible | 🟡 P2 |
| 3.3 | `/blog/agence-seo-criteres-choix` | Choisir son agence SEO : les 7 critères qui comptent | meilleure agence SEO | 1 600 | Faible | 🔴 P1 |
| 3.4 | `/blog/landing-page-qui-convertit` | Comment faire une landing page qui convertit | créer une landing page | 210 | Moyen | 🟡 P2 |
| 3.5 | `/blog/refonte-seo` | Refonte SEO : garder son référencement lors d'une refonte | refonte SEO | 720 | Faible | 🔴 P1 |
| 3.6 | `/blog/seo-ecommerce` | SEO e-commerce : optimiser sa boutique en ligne en 2026 | agence SEO e-commerce | 720 | Faible | 🟡 P2 |

**Total pilier 3 :** 1 hub + 6 articles = **7 pages**. Volume cumulé ≈ 5 050/mois.

---

## 🧱 5. PILIER 4 — SITE WEB PAR MÉTIER (PROFESSIONS & ARTISANS)

### 5.1 Page pilier (hub)

| Champ | Valeur |
|---|---|
| **URL** | `/blog/site-internet-metiers-professionnels` |
| **H1** | Site internet par métier : guide pour professions libérales & artisans |
| **Meta title** | Site internet professionnels 2026 : guide par métier |
| **Meta description** | Un site web adapté à votre métier. Pharmacie, restaurant, artisan, avocat : les bonnes pratiques et exemples MV Agency. |
| **Keyword primaire** | site internet pour profession libérale |
| **Longueur** | 2 000 - 2 500 mots (plus court, hub d'aiguillage) |
| **CTA principal** | `/cas-clients` — voir nos réalisations |
| **CTA secondaire** | `/offres` (Pack Fondation) |
| **Schema** | `Article` + `BreadcrumbList` |

**Plan :** introduction + liste des métiers traités (chaque métier renvoie vers son article dédié) + pourquoi un site métier-spécifique + CTA.

### 5.2 Articles spokes (1 article = 1 métier)

| # | URL | H1 / Titre | Keyword primaire | Volume | Concurrence | Priorité |
|---|---|---|---|---|---|---|
| 4.1 | `/blog/site-internet-restaurant` | Site internet pour restaurant : les bonnes pratiques 2026 | création site internet restaurant | 320 | Faible | 🔴 P1 |
| 4.2 | `/blog/site-internet-artisan` | Site internet pour artisan : modèles et conseils | création site internet artisan | 320 | Faible | 🔴 P1 |
| 4.3 | `/blog/site-internet-plombier` | Site internet pour plombier : attirer des clients locaux | création site internet plombier | 110 | Faible | 🟡 P2 |
| 4.4 | `/blog/site-internet-electricien` | Site internet pour électricien : exemples et modèles | création site internet électricien | 70 | Faible | 🟡 P2 |
| 4.5 | `/blog/site-internet-immobilier` | Site internet agent immobilier : captation & visibilité | création site internet immobilier | 140 | Faible | 🔴 P1 |
| 4.6 | `/blog/site-internet-avocat` | Site internet pour avocat : credibilité & acquisition | création site internet avocat | 720 | Moyen | 🔴 P1 |
| 4.7 | `/blog/site-internet-dentiste` | Site internet pour dentiste : prise de RDV et référencement | création site internet dentiste | 260 | Faible | 🔴 P1 |
| 4.8 | `/blog/site-internet-pharmacie` | Site internet pour pharmacie : guide complet | site internet pour pharmacie | 140 | Élevé ⚠️ | 🟡 P2 |
| 4.9 | `/blog/site-internet-coach-sportif` | Site internet pour coach sportif : réservation & branding | site internet coach sportif | ~80 | Faible | 🟢 P3 |

**Total pilier 4 :** 1 hub + 9 articles = **10 pages**. Volume cumulé ≈ 2 050/mois + bonus : **cas-clients MV Agency alignés** (pharmacie Les Lataniers, Johnny App coach).

⚠️ **Note pour pharmacie** : concurrence Élevée sur le mot-clé → angler côté "partenariat agence" plutôt que keyword bidding.

---

## 🔗 6. MATRICE DE MAILLAGE INTERNE

### 6.1 Règle générale par article

Chaque article spoke doit contenir au minimum :
- **1 lien vers son pilier** (remonter au hub)
- **2-3 liens vers articles frères** (même pilier)
- **1-2 liens vers pages conversion** (CTA inline + CTA final)
- **0-1 lien vers un autre pilier** si pertinent (cross-silo)

### 6.2 Mapping article → page conversion

| Pilier / Type d'article | Page conversion primaire | Page conversion secondaire | Contexte CTA |
|---|---|---|---|
| Pilier 1 — Création web | `/offres` | `/services` | "Voir nos packs de création web" |
| Pilier 1 — Prix (article 1.1, 1.7) | `/offres` | `/contact` | "Devis transparent en 24h" |
| Pilier 1 — Comparatif (1.2, 1.5, 1.6) | `/services` | `/a-propos` | "Découvrir notre approche" |
| Pilier 2 — IA/Auto | `/offres` (Pack Performance IA) | `/contact` | "Audit IA gratuit" |
| Pilier 2 — Automatisation (2.6, 2.7) | `/offres` | `/services` | "Automatiser mon CRM" |
| Pilier 3 — SEO | `/offres` (Pack Croissance) | `/contact` | "Audit SEO offert" |
| Pilier 3 — Landing (3.4) | `/services` | `/offres` | "Landing page sur-mesure" |
| Pilier 4 — Métiers | `/cas-clients` | `/offres` (Fondation) | "Voir nos réalisations métiers" |

### 6.3 Mapping inverse : page conversion → articles à linker en footer/sidebar

| Page conversion | Articles à mettre en avant (sidebar "Ressources") |
|---|---|
| `/` | Hubs des 4 piliers + 3 articles les plus lus |
| `/services` | Piliers 1, 2, 3 + articles "comparatif stack" et "prix" |
| `/offres` | Articles "prix site internet", "combien coûte un site", "quel pack choisir" |
| `/a-propos` | Aucun lien blog (page focalisée trust) |
| `/contact` | Aucun lien blog (page focalisée action) |
| `/cas-clients` | Pilier 4 (site web par métier) + Pilier 1 (hub) |

---

## 🗂️ 7. ARCHITECTURE TECHNIQUE SUGGÉRÉE (Next.js 16)

### 7.1 Structure de fichiers recommandée

```
src/app/
├── blog/
│   ├── page.tsx                           → /blog (listing de tous les articles)
│   ├── [slug]/
│   │   └── page.tsx                       → /blog/[slug] (article générique)
│   └── _components/
│       ├── ArticleCard.tsx
│       ├── PillarHero.tsx
│       └── InlineCTA.tsx
├── cas-clients/
│   └── page.tsx                           → /cas-clients (listing simple)
└── ... (pages conversion existantes)
```

### 7.2 Source de données

**Option recommandée** : MDX local dans `content/blog/*.mdx` + frontmatter typé.

```
content/blog/
├── piliers/
│   ├── creation-site-web-guide-complet.mdx
│   ├── ia-automatisation-pme-guide.mdx
│   ├── seo-marketing-digital-pme-guide.mdx
│   └── site-internet-metiers-professionnels.mdx
└── articles/
    ├── combien-coute-un-site-internet.mdx
    ├── wordpress-vs-webflow-vs-nextjs.mdx
    └── ...
```

**Frontmatter standardisé hybride SEO + GEO** (à respecter pour chaque article) :

```yaml
---
# === IDENTITÉ ===
title: "Titre de l'article (H1)"
slug: "url-slug"
metaTitle: "Meta title (60c max)"
metaDescription: "Meta description (155c max)"
publishedAt: "2026-05-01"
updatedAt: "2026-05-01"

# === AUTEUR (E-E-A-T — critique pour GEO) ===
author:
  name: "Victor Marchetti"
  role: "Fondateur MV Agency"
  bio: "Expert digital + IA, fondateur MV Agency (La Réunion / Belgique)"
  linkedin: "https://linkedin.com/in/victormarchetti"

# === CLASSIFICATION ===
pillar: "creation-web" | "ia-automatisation" | "seo-marketing" | "metiers"
type: "pillar" | "spoke"
primaryKeyword: "mot-clé principal"
secondaryKeywords: ["mot-clé 2", "mot-clé 3"]
searchVolume: 1300
competition: "Faible" | "Moyen" | "Élevé"
priority: "P1" | "P2" | "P3"
readingTime: 10

# === STRUCTURE GEO (NOUVEAU — obligatoire) ===
answerBlock: |
  Résumé extractible par IA — 150 à 200 mots MAX.
  Doit contenir le verdict / chiffre / fourchette clé.
  Aucune intro décorative. Tout se joue ici pour la citabilité.
faqQuestions:  # minimum 6, maximum 8 — déclenche schema FAQPage
  - q: "Question courte formulée comme la chercherait un utilisateur ?"
    a: "Réponse de 2-4 phrases, auto-portante, citable telle quelle."
  - q: "..."
    a: "..."

# === CONVERSION ===
ctaPrimary: "/offres"
ctaSecondary: "/contact"
relatedArticles: ["slug-frère-1", "slug-frère-2", "slug-frère-3"]
parentPillar: "slug-du-pilier"

# === MEDIA ===
ogImage: "/og/slug.png"

# === SCHEMA ===
schemaType: "Article"  # + FAQPage auto si faqQuestions présent
---
```

> ⚠️ **Les champs `author`, `answerBlock` et `faqQuestions` sont NON-NÉGOCIABLES**.
> Ils sont la base de la citabilité GEO. Sans eux, l'article ne sera pas cité par ChatGPT / Perplexity / AI Overviews.

### 7.3 Composants SEO à coder

Liste des composants requis pour l'implémentation :

| Composant | Rôle | Où |
|---|---|---|
| `<ArticleSchema>` | JSON-LD `Article` + `BreadcrumbList` | Dans le layout article |
| `<FAQSchema>` | JSON-LD `FAQPage` | Si article contient FAQ |
| `<PillarNav>` | Aside "Dans ce pilier" avec liens frères | Sidebar article spoke |
| `<RelatedArticles>` | Grille 3 articles liés (filtrage par pilier) | Fin d'article |
| `<InlineCTA>` | Bloc CTA custom (variant="primary" ou "secondary") | Inséré dans le contenu MDX |
| `<TableOfContents>` | Sommaire auto depuis les H2/H3 | Sidebar article pilier |
| `<BreadcrumbTrail>` | Fil d'Ariane `/blog > Pilier > Article` | Top d'article |
| `<ReadingProgress>` | Barre de progression lecture | Header article |

---

## 🎯 8. ROADMAP DE PRODUCTION DE CONTENU

### 8.1 Priorités par vague

**Vague 1 — Fondations (mois 1-2) : 4 piliers + top P1**
- [ ] Pilier 1 — Création site web (hub)
- [ ] Pilier 2 — IA & automatisation (hub)
- [ ] Pilier 3 — SEO marketing (hub)
- [ ] Pilier 4 — Site web par métier (hub)
- [ ] Article 1.1 — Combien coûte un site internet (vol 1 300)
- [ ] Article 1.7 — Prix d'un site vitrine (vol 720)
- [ ] Article 3.1 — Référencement naturel pour débutants (vol 1 600)
- [ ] Article 3.3 — Choisir son agence SEO (vol 1 600)
- [ ] Article 2.3 — 10 exemples d'IA pour PME (vol ~200)

**Vague 2 — Expansion (mois 3-4) : articles P1 restants**
- [ ] Article 1.2 — WordPress vs Webflow vs Next.js
- [ ] Article 2.1 — Qu'est-ce qu'un agent IA (vol 390)
- [ ] Article 2.6 — Automatisation CRM (vol 260)
- [ ] Article 2.7 — Automatisation email (vol 320)
- [ ] Article 3.5 — Refonte SEO (vol 720)
- [ ] Article 4.1 — Site internet restaurant (vol 320)
- [ ] Article 4.2 — Site internet artisan (vol 320)
- [ ] Article 4.5 — Site internet immobilier (vol 140)
- [ ] Article 4.6 — Site internet avocat (vol 720)
- [ ] Article 4.7 — Site internet dentiste (vol 260)

**Vague 3 — Longue traîne (mois 5-6) : articles P2/P3**
- [ ] Tous les articles restants (1.3, 1.4, 1.5, 1.6, 1.8, 2.2, 2.4, 2.5, 2.8, 2.9, 3.2, 3.4, 3.6, 4.3, 4.4, 4.8, 4.9)

### 8.2 Cadence recommandée

- **Vague 1** : 9 pages en 8 semaines = ~1 par semaine (rythme soutenable + qualité)
- **Vague 2** : 10 articles en 8 semaines = ~1.25 par semaine
- **Vague 3** : 17 articles en 8 semaines = ~2 par semaine (rythme accéléré longue traîne)

**Total cible à 6 mois : 36 pages SEO indexables.**

---

## 📊 9. OBJECTIFS MESURABLES (KPI hybrides SEO + GEO)

**KPIs SEO classiques** :

| Horizon | Métrique | Cible |
|---|---|---|
| M+3 | Pages indexées Google | 15+ |
| M+3 | Impressions GSC | 1 000+ |
| M+6 | Pages indexées | 36+ |
| M+6 | Impressions GSC | 10 000+ |
| M+6 | Clics GSC | 300+ |
| M+6 | Positions top 10 | 5+ mots-clés |
| M+12 | Positions top 3 | 3+ mots-clés transactionnels |
| M+12 | Leads SEO/mois | 5-10 |

**KPIs GEO** (détail + protocole de test dans `GEO_Plan_MV_Agency.md`) :

| Horizon | Métrique | Cible |
|---|---|---|
| M+3 | Citations MV Agency dans ChatGPT (tests manuels sur 20 requêtes) | 3+ |
| M+3 | Apparitions dans Google AI Overviews | 5+ |
| M+6 | Citations Perplexity (sources) | 10+ |
| M+6 | Referrals `chatgpt.com`, `perplexity.ai` dans GA4 | 50+ visites/mois |
| M+12 | Brand mentions totales dans moteurs IA | 30+ |

---

## 🚫 10. CE QUE CE PLAN N'INCLUT PAS (à traiter séparément)

- **Pages géo** (Réunion / Bruxelles / Namur / Wallonie / Belgique) → document dédié ultérieurement
- **Optimisation des 5 pages conversion existantes** (metadata, schema JSON-LD) → chantier Track A parallèle
- **Création des pages légales** (/mentions-legales, /cgv, /politique-de-confidentialite) → chantier Track A parallèle
- **Fichiers techniques** (robots.ts, sitemap.ts, llms.txt) → Track A parallèle
- **Stratégie de netlinking externe** → phase ultérieure (après 3 mois de contenu)

---

## ✅ 11. CHECKLIST D'IMPLÉMENTATION HYBRIDE SEO + GEO (pour agent IA)

> 📖 **À lire avant exécution** : `GEO_Plan_MV_Agency.md` pour la méthodologie détaillée de chaque point.

Quand un article doit être créé, l'agent doit :

**📦 SEO classique :**
1. ☐ Créer le fichier MDX dans `content/blog/articles/[slug].mdx` avec le **frontmatter hybride complet** (section 7.2)
2. ☐ Rédiger le contenu en respectant la longueur : pilier 2 500-3 500 mots / spoke 1 500-2 000 mots
3. ☐ Inclure 1 H1 + 4-8 H2 (**en forme de questions**) + H3 si besoin
4. ☐ Insérer le keyword primaire dans : title, meta description, H1, 1er paragraphe, 1 H2, URL
5. ☐ Intégrer keywords secondaires naturellement, **sans bourrage**
6. ☐ Ajouter 1 CTA inline (milieu) + 1 CTA final (fin)
7. ☐ Ajouter 1 lien vers pilier parent + 2-3 liens vers articles frères
8. ☐ Ajouter 1 lien vers page conversion primaire (cf. section 6.2)
9. ☐ Minimum 1 image avec alt descriptif (contenant idéalement le keyword)
10. ☐ Ajouter à la liste dans `/blog/page.tsx` + mettre à jour `sitemap.ts`
11. ☐ Créer image OG dédiée `/public/og/[slug].png` (1200x630)

**🧠 GEO — obligatoire :**
12. ☐ **Rédiger le `answerBlock`** (150-200 mots) comme PREMIER paragraphe visible — verdict / chiffre / fourchette
13. ☐ **Formuler les H2 en questions** directes (ex : "Combien coûte X ?" et non "Prix de X")
14. ☐ **Paragraphes auto-portants** : chaque paragraphe extractible hors contexte doit rester compréhensible
15. ☐ **FAQ obligatoire** : 6-8 questions/réponses ajoutées via champ `faqQuestions` du frontmatter
16. ☐ **Renseigner l'auteur** (Victor Marchetti) dans frontmatter — pas d'article anonyme
17. ☐ **Date publication + date mise à jour** affichées visuellement dans la page
18. ☐ **Données chiffrées minimum** : 3+ chiffres / exemples / noms propres concrets
19. ☐ **JSON-LD auto via composants** : `<ArticleSchema>` + `<FAQSchema>` + `<PersonSchema>` (auteur)
20. ☐ **Test de citabilité** post-publication : requêter ChatGPT/Perplexity sur le keyword cible (cf. `GEO_Plan_MV_Agency.md` § Tests)

---

## 📎 ANNEXES

### A. Glossaire des notations

- **P1 / P2 / P3** : priorité d'exécution (P1 = urgent, P3 = long terme)
- **Hub / Pilier** : article cornerstone long format qui chapeaute un thème
- **Spoke / Satellite** : article enfant qui traite d'un sous-sujet
- **Concurrence Faible / Moyen / Élevé** : valeur Google Keyword Planner
- **Volume** : moyenne mensuelle de recherches Google (location France)

### B. Sources de données

- Rapport principal : [SEO_MV_Agency_France_Report.xlsx](SEO_MV_Agency_France_Report.xlsx)
- Rapport Réunion : [SEO_MV_Agency_Reunion_Report.xlsx](SEO_MV_Agency_Reunion_Report.xlsx)
- Rapport Belgique : [SEO_MV_Agency_Belgique_Report.xlsx](SEO_MV_Agency_Belgique_Report.xlsx)
- Document master : [SEO MV Agency.md](SEO%20MV%20Agency.md)

### C. Version et mise à jour

Ce document est la **source de vérité** pour la production de contenu SEO. Il doit être mis à jour à chaque ajout d'article, pivot de stratégie, ou ajustement de priorité.
