# Plan GEO — MV Agency

> **Objectif** : rendre MV Agency **citable** par les moteurs IA (ChatGPT Search, Perplexity, Google AI Overviews, Claude, Copilot) en complément du SEO classique.
> **Principe** : le GEO s'empile **sur** le SEO. Ce document ne remplace rien — il complète.
> **Lisibilité** : pensé pour être consommé par un humain ET par un agent IA qui devra implémenter.
> **Version** : v1.0 — 2026-04-19
>
> **📎 Documents liés (à lire ensemble) :**
> - 📄 **`SEO_Plan_Semantique_MV_Agency.md`** → plan éditorial des 36 articles à produire (4 piliers + 32 spokes). La structure hybride définie ici s'applique à **tous** ces articles.
> - 📊 `SEO MV Agency.md` → document master stratégique (audit fichiers réels)
> - 📈 Rapports keywords Excel (France / Réunion / Belgique)

---

## 📖 1. RAPPEL — POURQUOI LE GEO MAINTENANT

### 1.1 Le contexte marché 2025-2026

- **Google AI Overviews** (ex-SGE) — les réponses IA au-dessus des liens bleus font chuter le CTR de **30 à 60%** sur les positions 1-3 (études Ahrefs, Semrush, Similarweb 2025).
- **60% des recherches Google** se terminent désormais sans clic ("zero-click").
- **Les moteurs IA natifs** (ChatGPT Search ~60%, Perplexity ~15%, Gemini ~10%, Claude ~8%, Copilot ~5% du trafic recherche IA) **ne renvoient pas 10 liens** mais synthétisent et citent 2-5 sources.
- **Si tu n'es pas cité → tu n'existes pas.**

### 1.2 Différence fondamentale SEO vs GEO

| Aspect | SEO classique | GEO |
|---|---|---|
| Qui lit le contenu ? | Algorithme Google (keywords, liens, autorité) | LLM avec RAG (citabilité, entités, fraîcheur, sources) |
| Unité de contenu indexée | La page entière | **Le paragraphe auto-portant** |
| Objectif final | Position dans SERP | **Être dans la réponse générée** |
| Métrique clé | Clics, positions | **Citations, brand mentions, referrals IA** |

### 1.3 La bonne nouvelle

**Un article GEO-ready est toujours meilleur qu'un article SEO pur, même pour le SEO.**
Google lui-même favorise désormais les contenus à passages extractibles (Helpful Content Update, Passage Ranking). Faire du GEO = faire du SEO amélioré.

---

## 🔍 2. AUDIT GEO — ÉTAT ACTUEL DU SITE MV AGENCY

Audit réalisé le 2026-04-19 sur l'état réel des fichiers.

### 2.1 Ce qui existe déjà et joue pour la GEO

| Élément | Fichier | État | Note GEO |
|---|---|---|---|
| `llms.txt` | `public/llms.txt` | ✅ Présent | 🟢 Bon mais **à enrichir** (voir §4) |
| `robots.ts` | `src/app/robots.ts` | ✅ `allow: /` | 🟢 Bots IA autorisés par défaut |
| Metadata + OpenGraph | `src/app/layout.tsx` | ✅ Configurés | 🟡 Pas de `metadataBase` → URLs OG relatives |
| Metadata locales | `/services`, `/offres`, `/blog`, `/cas-clients` | ✅ Présentes | 🟡 Basiques, à enrichir |
| H1 explicites par page | Toutes les pages | ✅ | 🟢 OK |

### 2.2 Ce qui manque pour la GEO

| Élément manquant | Impact GEO | Priorité |
|---|---|---|
| JSON-LD `Organization` | Identité absente dans le graphe de connaissance | 🔴 P1 |
| JSON-LD `Person` (Victor) | E-E-A-T / qui parle ? | 🔴 P1 |
| JSON-LD `LocalBusiness` | Ancrage géographique Réunion/Belgique | 🔴 P1 |
| JSON-LD `FAQPage` (home + offres) | Pas d'extraction AI Overviews | 🔴 P1 |
| JSON-LD `Article` sur blog | Articles non reconnus comme contenu autoritaire | 🔴 P1 |
| `answerBlock` en tête d'articles | Rien d'extractible par IA | 🔴 P1 |
| FAQ structurée sur articles | Pas de copie dans AI Overviews | 🔴 P1 |
| Auteur affiché (Victor) | Anonymat → rejet E-E-A-T | 🔴 P1 |
| Date publication + MAJ visibles | Pas de signal fraîcheur | 🔴 P1 |
| Mentions externes (Reddit, LinkedIn, forums) | L'IA n'a aucune corroboration | 🟡 P2 |
| Profil Google Business complet | Invisible dans AI local | 🟡 P2 |
| Présence Clutch / DesignRush / annuaires agences | Pas de source B2B citable | 🟡 P2 |
| `llms.txt` enrichi avec services + offres + FAQ | Discoverability IA limitée | 🟡 P2 |

### 2.3 Risques identifiés

- **`/a-propos` et `/contact` en `"use client"`** → pas de metadata ni JSON-LD possibles. **Refactor bloquant** (cf. `SEO MV Agency.md` section 1.4).
- **Blog en data mock** → aucun article réel indexable. Blocage architecture MDX avant tout effort GEO.
- **`metadataBase` absent** → toutes les citations OG pointeront vers des URLs relatives (casse le partage IA).

---

## 🏗️ 3. LE TEMPLATE ARTICLE HYBRIDE SEO + GEO

> Ce template est la **source de vérité rédactionnelle** pour les 36 articles du plan sémantique.

### 3.1 Structure obligatoire

```markdown
# H1 avec keyword principal                                [SEO]

> **Réponse courte** : [answerBlock 150-200 mots]          [GEO ★]
> Résumé extractible par IA. Verdict / chiffre / fourchette.
> Aucune intro type "dans un monde en évolution...".

## Première question (H2) ?                                [SEO + GEO]

[Paragraphe auto-portant 100-150 mots qui répond à CETTE   [GEO ★]
question seule. Doit tenir hors contexte.]

[Tableau / liste / exemple concret]                        [GEO ★]

## Deuxième question (H2) ?

...

[CTA inline milieu → /offres]                              [Conversion]

## N-ième question (H2) ?

...

## Questions fréquentes                                    [GEO ★★]

### Question 1 ?
Réponse 2-4 phrases, citable telle quelle.

### Question 2 ?
...

(6 à 8 questions minimum → déclenche schema FAQPage)

## Conclusion + CTA final → /offres ou /contact           [Conversion]

---
Écrit par Victor Marchetti, fondateur MV Agency            [GEO ★ E-E-A-T]
Publié le 2026-05-01 · Mis à jour le 2026-05-01

Articles liés :
- [Article frère 1]                                        [SEO maillage]
- [Article frère 2]
- [Article frère 3]
```

### 3.2 Les 5 règles d'écriture GEO

**Règle 1 — Réponse dès le premier paragraphe**
Mauvais : "L'évolution du digital a transformé la manière dont les entreprises..."
Bon : "Un site internet coûte entre 1 500 € et 25 000 €. Pour une PME avec un site vitrine pro, comptez 3 500 à 8 000 €."

**Règle 2 — H2 en questions**
Mauvais : `## Les types de sites web`
Bon : `## Quels sont les différents types de sites web ?`

**Règle 3 — Paragraphes auto-portants**
Chaque paragraphe doit être compréhensible **extrait seul, sans contexte**. Jamais "comme vu plus haut..." ou "dans la section précédente...".

**Règle 4 — Spécificité > généralité**
Mauvais : "De nombreuses entreprises utilisent l'IA"
Bon : "73% des PME européennes utilisaient au moins un outil IA en 2025 (source : Eurostat)"

**Règle 5 — Pas de keyword stuffing**
L'IA détecte et pénalise. Utilise le keyword 3-5 fois max sur un article de 2 000 mots, naturellement.

### 3.3 Longueurs par type d'article

| Type | Longueur totale | `answerBlock` | H2 attendus | FAQ |
|---|---|---|---|---|
| Article pilier (hub) | 2 500-3 500 mots | 180-200 mots | 6-8 | 6-8 Q/R |
| Article spoke | 1 500-2 000 mots | 150-180 mots | 4-6 | 5-6 Q/R |

---

## 📜 4. STRATÉGIE `llms.txt` ENRICHIE

### 4.1 Version actuelle (21 lignes)

Le fichier `public/llms.txt` actuel est **correct mais minimal**. Il manque :
- Les 3 packs tarifaires (critique pour citation commerciale)
- Les URLs canoniques des pages clés
- Une section FAQ
- Les cas clients détaillés avec résultats mesurables
- Les zones géographiques précises

### 4.2 Version enrichie recommandée

Voir `/public/llms.txt` (à mettre à jour lors du chantier Track A) selon la structure :

```txt
# MV Agency - AI Knowledge File
# Dernière mise à jour : 2026-04-19

## Identité
- Nom : MV Agency
- Fondateur : Victor Marchetti
- Localisation principale : La Réunion (974)
- Zones d'intervention : Réunion, Belgique, France
- Site : https://mv-agency.com
- Contact : https://mv-agency.com/contact

## Positionnement
Agence digitale spécialisée dans la création de sites web premium
et l'intégration d'intelligence artificielle pour PME et TPE.
Approche Dark Mode, Premium, Minimaliste.

## Services
1. Création de sites web (Next.js, React, design premium)
2. Développement d'applications SaaS
3. Intégration d'agents IA souverains
4. Stratégie digitale & UX/UI design
5. Formation & accompagnement IA pour équipes PME

## Offres (packs)
- Pack Fondation : site vitrine optimisé SEO
- Pack Croissance : site + automatisation marketing + SEO
- Pack Performance IA : site + intégration IA sur-mesure + agents
Pricing détaillé : https://mv-agency.com/offres

## Cas clients
- Stark AI : application web IA, souveraineté des données garantie
- Johnny App : application coaching sportif + vitrine web
- Pharmacie Les Lataniers : site e-santé + système RDV IA

## Zones géographiques desservies
- La Réunion : Saint-Denis, Saint-Pierre, Saint-Paul, Le Port, Saint-André
- Belgique : Bruxelles, Namur, Wallonie, Liège
- France métropolitaine : distanciel uniquement

## Questions fréquentes
Q: Combien coûte un site internet chez MV Agency ?
R: Les packs démarrent à [X €] pour un site vitrine jusqu'à [Y €] pour une intégration IA complète.

Q: MV Agency intervient-elle à La Réunion ?
R: Oui, La Réunion est le pôle principal. Interventions sur Saint-Denis, Saint-Pierre et toute l'île.

Q: Travaillez-vous avec les TPE et freelances ?
R: Oui, le Pack Fondation est dimensionné pour les TPE, professions libérales et artisans.

## Contact
Réservation d'appel découverte : https://mv-agency.com/contact
```

### 4.3 À compléter dans le llms.txt au fur et à mesure

- Chiffres résultats cas clients (ROI, gains de temps)
- Témoignages clients courts avec nom + société
- Liste articles blog majeurs (top 10 hub + spokes prioritaires)

---

## 🌐 5. STRATÉGIE ENTITÉS EXTERNES (E-E-A-T + autorité IA)

**Principe** : l'IA ne te croit que si **d'autres sources te confirment**. Il faut exister hors de ton propre site.

### 5.1 Plateformes prioritaires

| Plateforme | Type | Priorité | Action concrète |
|---|---|---|---|
| **Google Business Profile** | Fiche locale | 🔴 P1 | Créer/compléter fiche Réunion (+ Belgique) — photos, horaires, services, reviews |
| **LinkedIn (page MV Agency + profil Victor)** | Pro | 🔴 P1 | Publier 1x/sem, optimiser bio avec keywords (agence web, IA, Réunion) |
| **Clutch.co** | Annuaire B2B | 🔴 P1 | Créer profil agence + reviews clients (5 reviews min pour être visible) |
| **DesignRush** | Annuaire design | 🟡 P2 | Profil agence + portfolio (gratuit) |
| **Sortlist** | Annuaire marché FR/BE | 🟡 P2 | Profil + reviews |
| **Reddit (r/entrepreneur, r/webdev, r/PME)** | Forum | 🟡 P2 | Répondre utilement sans spam — mention naturelle MV Agency quand pertinent |
| **Wikipedia France / page Victor Marchetti** | Encyclopédie | 🟢 P3 | Si critères notoriété atteints (médias, interviews) |
| **Indie Hackers / Product Hunt** | Communautés tech | 🟢 P3 | Si lancement d'un side product |
| **G2 / Capterra** | Reviews SaaS | 🟢 P3 | Seulement si un produit SaaS lancé |

### 5.2 Cohérence NAP (Nom / Adresse / Phone)

Vérifier que **sur toutes les plateformes** :
- Nom : "MV Agency" (toujours écrit pareil)
- Adresse : même format partout
- Téléphone : même numéro
- URL : https://mv-agency.com (toujours avec www ou sans www de manière cohérente)

Toute incohérence NAP affaiblit la confiance entités côté Google ET côté IA.

### 5.3 Stratégie contenu externe

**Publications à faire sur 6 mois :**
- 3 posts LinkedIn/semaine (Victor) sur IA, web design, cas clients
- 2 réponses/semaine sur Reddit/forums en mode expertise
- 1 article invité/mois sur un média tech francophone (BDM, Les Numériques, Frandroid section pro, BFM Business tech...)
- Interview podcast 1x/trimestre (La French Tech Réunion, startup locale)

---

## 🤖 6. ACCÈS DES BOTS IA — CONFIGURATION

### 6.1 Bots à autoriser explicitement

Dans `robots.ts`, ajouter des règles dédiées pour les bots IA majeurs :

```ts
// src/app/robots.ts — version recommandée
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/private/', '/api/'] },
      { userAgent: 'GPTBot', allow: '/' },              // OpenAI training
      { userAgent: 'OAI-SearchBot', allow: '/' },       // ChatGPT Search
      { userAgent: 'PerplexityBot', allow: '/' },       // Perplexity
      { userAgent: 'ClaudeBot', allow: '/' },           // Claude
      { userAgent: 'Google-Extended', allow: '/' },     // Google AI Overviews
      { userAgent: 'CCBot', allow: '/' },               // Common Crawl
      { userAgent: 'Applebot-Extended', allow: '/' },   // Apple Intelligence
      { userAgent: 'cohere-ai', allow: '/' },           // Cohere
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

### 6.2 Vérification accès

Commande de test (après déploiement) :
```bash
curl -A "GPTBot" https://mv-agency.com/robots.txt
curl -A "PerplexityBot" https://mv-agency.com/
```

Les bots doivent recevoir un 200 OK + le contenu complet.

---

## 🧱 7. JSON-LD SPÉCIFIQUES GEO

### 7.1 Priorité de déploiement

| Schema | Où | Priorité | Impact GEO |
|---|---|---|---|
| `Organization` | `layout.tsx` (global) | 🔴 P1 | Fait exister MV Agency comme entité |
| `LocalBusiness` | `layout.tsx` + `/contact` | 🔴 P1 | Ancrage géo Réunion/Belgique |
| `Person` | `/a-propos` (après refactor) | 🔴 P1 | E-E-A-T Victor |
| `FAQPage` | `/` + `/offres` + chaque article blog | 🔴 P1 | Citations directes AI Overviews |
| `Article` + `author` | `/blog/[slug]` | 🔴 P1 | Reconnaissance contenu autoritaire |
| `Service` × 3 | `/services` | 🟡 P2 | Rich results |
| `Offer` × 3 (ou `Product`) | `/offres` | 🟡 P2 | Citation commerciale |
| `BreadcrumbList` | Pages enfants | 🟡 P2 | Contexte hiérarchique |
| `HowTo` | Certains articles blog (tutos) | 🟡 P2 | Citation Perplexity |
| `Review` + `AggregateRating` | `/cas-clients` | 🟢 P3 | Preuve sociale structurée |

### 7.2 Exemple JSON-LD Organization (à injecter dans layout.tsx)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MV Agency",
  "url": "https://mv-agency.com",
  "logo": "https://mv-agency.com/logo.svg",
  "description": "Agence digitale spécialisée dans la création de sites web premium et l'intégration d'IA pour PME.",
  "founder": {
    "@type": "Person",
    "name": "Victor Marchetti"
  },
  "areaServed": ["La Réunion", "Belgique", "France"],
  "sameAs": [
    "https://linkedin.com/company/mv-agency",
    "https://www.instagram.com/mv.agency/",
    "https://clutch.co/profile/mv-agency"
  ]
}
```

### 7.3 Composants React à créer

Listés dans `SEO_Plan_Semantique_MV_Agency.md` section 7.3. Les spécifiques GEO :

- `<OrganizationSchema>` — injecté global
- `<PersonSchema author={...}>` — injecté sur articles blog + a-propos
- `<FAQSchema items={faqQuestions}>` — injecté si frontmatter contient `faqQuestions`
- `<ArticleSchema>` — avec `author`, `datePublished`, `dateModified`

---

## 🧪 8. TESTS DE CITABILITÉ

### 8.1 Protocole de test manuel (à faire après chaque vague d'articles)

Pour chaque keyword cible d'article publié, tester **5 prompts** sur **3 moteurs** :

**Moteurs testés** : ChatGPT (avec Search), Perplexity, Google (SERP + AI Overview)

**Template de prompts** (à adapter au keyword) :
1. "Quelle est la meilleure agence web à La Réunion ?"
2. "Combien coûte un site internet en 2026 ?"
3. "Comment intégrer l'IA dans une PME ?"
4. "Qui est Victor Marchetti ?"
5. "Cite-moi des agences spécialisées IA en France"

**Métriques à noter** dans un tableau :

| Prompt | Moteur | MV Agency cité ? | Position | Source citée | Date |
|---|---|---|---|---|---|
| ... | ChatGPT | Oui / Non | 1/2/3/... | URL source | 2026-XX-XX |

### 8.2 Cadence de monitoring

- **M+1 (1er mois après publication)** : test baseline (normal que MV ne soit pas encore cité)
- **M+3** : premier test sérieux, objectif 3+ citations sur 20 prompts
- **M+6** : objectif 5+ citations régulières
- **M+12** : objectif présence stable dans 15+ prompts liés à la niche

### 8.3 Outils automatisés (optionnel, à envisager M+6)

- **Otterly.ai** — suivi citations IA (payant)
- **AthenaHQ** — GEO analytics (payant)
- **Peec AI** — monitoring brand mentions IA (en beta)

---

## 📊 9. KPIs GEO

### 9.1 Dashboard à maintenir (Google Sheets ou Notion)

| KPI | Source | Cadence | Cible M+6 |
|---|---|---|---|
| Citations MV Agency dans ChatGPT (tests manuels) | Tests manuels (§8) | Mensuel | 5+ / 20 prompts |
| Apparitions Google AI Overviews | GSC + tests manuels | Hebdo | 5+ mots-clés |
| Citations Perplexity | Tests manuels | Mensuel | 10+ |
| Referrals `chatgpt.com` | GA4 → Traffic → Source | Hebdo | 50+ visites/mois |
| Referrals `perplexity.ai` | GA4 | Hebdo | 20+ visites/mois |
| Referrals `gemini.google.com` | GA4 | Hebdo | 10+ visites/mois |
| Brand mentions (Google Alerts) | Google Alerts sur "MV Agency" | Mensuel | 30+ |
| Reviews Google Business | Dashboard GBP | Mensuel | 10+ |
| Reviews Clutch | Dashboard Clutch | Trimestriel | 5+ |

### 9.2 KPI qualitatifs

- Le fondateur Victor est-il cité nominativement dans les réponses IA quand on cherche "Victor Marchetti" ? (objectif : oui à M+6)
- Les cas clients (Les Lataniers, Johnny, Stark AI) apparaissent-ils quand on cherche des exemples d'IA en PME ? (objectif : oui à M+9)

---

## 🎯 10. ROADMAP D'IMPLÉMENTATION GEO

### Phase 1 — Bases techniques GEO (🔴 à faire AVANT de publier des articles)

Ces points sont dans `SEO MV Agency.md` section 6 Phase 1 — rappel ici car **critiques pour la GEO** :

1. ☐ Refactor `/a-propos` (split server/client) → permet metadata + JSON-LD Person
2. ☐ Refactor `/contact` (split server/client) → permet metadata + JSON-LD ContactPage
3. ☐ Ajouter `metadataBase` dans `layout.tsx`
4. ☐ Créer composants `<OrganizationSchema>`, `<PersonSchema>`, `<FAQSchema>`, `<ArticleSchema>`
5. ☐ Injecter `<OrganizationSchema>` + `<LocalBusiness>` dans `layout.tsx`
6. ☐ Enrichir `robots.ts` avec règles bots IA explicites (§6)
7. ☐ Enrichir `public/llms.txt` selon structure §4
8. ☐ Décider stack blog (MDX recommandé) + créer route dynamique `/blog/[slug]/page.tsx`
9. ☐ Créer composants `<InlineCTA>`, `<RelatedArticles>`, `<AuthorCard>`

### Phase 2 — Contenu hybride (production des 36 articles)

Produire les articles selon :
- Plan éditorial : `SEO_Plan_Semantique_MV_Agency.md` (quoi produire)
- Template hybride : §3 de ce document (comment l'écrire)
- Checklist : `SEO_Plan_Semantique_MV_Agency.md` section 11 (v1.1 hybride)

### Phase 3 — Autorité externe (continu, à démarrer dès Phase 1 finie)

1. ☐ Créer/compléter fiche Google Business Profile (Réunion + Belgique)
2. ☐ Optimiser page LinkedIn MV Agency + profil Victor
3. ☐ Créer profil Clutch.co + solliciter 3-5 reviews clients
4. ☐ Créer profils DesignRush + Sortlist
5. ☐ Démarrer routine publication LinkedIn (3 posts/sem)
6. ☐ Démarrer routine Reddit/forums (2 réponses/sem en mode expert)
7. ☐ Viser 1 article invité/mois sur média tech francophone
8. ☐ Lancer Google Alerts sur "MV Agency", "Victor Marchetti", "agence IA Réunion"

### Phase 4 — Monitoring & itération (M+3 et continu)

1. ☐ Mettre en place dashboard KPIs GEO (§9.1)
2. ☐ Faire tests manuels de citabilité tous les mois (§8.1)
3. ☐ Suivre referrals IA dans GA4 (chatgpt.com, perplexity.ai, etc.)
4. ☐ Itérer sur les articles sous-performants (augmenter densité entités, améliorer answerBlock, enrichir FAQ)

---

## 🚫 11. PIÈGES À ÉVITER

| Piège | Conséquence | À faire à la place |
|---|---|---|
| Bloquer GPTBot/PerplexityBot "pour protéger le contenu" | Invisible dans IA search | Les autoriser explicitement |
| Keyword stuffing "au cas où" | L'IA pénalise, CTR baisse | Max 3-5 fois le keyword par article |
| Copier des formulations de concurrents | L'IA a déjà leur version, pas la tienne | Spécificité Victor / cas clients / chiffres |
| Publier sans nom d'auteur | Rejet E-E-A-T | Victor Marchetti + bio courte + lien LinkedIn |
| Content farm automatisé | Pénalisation Google + IA | Qualité > quantité, 1 article bien > 10 génériques |
| Oublier la date de MAJ | Signal fraîcheur absent | `dateModified` dans frontmatter + affichage visible |
| NAP incohérent entre plateformes | Confusion entités | Vérif régulière Google / LinkedIn / Clutch / llms.txt |
| Négliger `/a-propos` | Pas de source E-E-A-T | C'est LA page qui fait autorité pour Victor |

---

## 📎 12. ANNEXES

### A. Glossaire

- **GEO** (Generative Engine Optimization) : optimisation pour les moteurs génératifs (IA)
- **LLM** (Large Language Model) : modèle IA (GPT-4, Claude, Gemini, Llama, Mistral...)
- **RAG** (Retrieval-Augmented Generation) : mécanisme permettant à un LLM de chercher des sources web pour répondre
- **AI Overview** : réponse IA en haut de SERP Google (ex-SGE)
- **E-E-A-T** : Experience / Expertise / Authoritativeness / Trustworthiness — critères Google
- **answerBlock** : bloc de 150-200 mots en tête d'article, extractible par IA
- **Brand mention** : mention de la marque sur un autre site (sans forcément de backlink)
- **NAP** : Name / Address / Phone — triplet local SEO

### B. Liens utiles pour aller plus loin

- OpenAI — guide GPTBot : https://platform.openai.com/docs/gptbot
- Google — Search documentation structured data : https://developers.google.com/search/docs/appearance/structured-data
- Schema.org — référence complète : https://schema.org
- llms.txt — spécification : https://llmstxt.org

### C. Version et mise à jour

Ce document est la **source de vérité GEO** pour MV Agency. À mettre à jour :
- À chaque évolution majeure des moteurs IA (nouveau bot, nouvelle API)
- À chaque palier de maturité franchi (M+3, M+6, M+12)
- À chaque changement de stratégie éditoriale
