# Plan SEO Géographique — MV Agency

> **Objectif** : architecture des pages géo locales (Réunion, Belgique, France) pour capter le trafic "agence web + [ville]", "création site internet + [ville]", "agence IA + [ville]".
> **Approche** : chaque page géo est **hybride SEO + GEO** (cf. `GEO_Plan_MV_Agency.md` §3) — citable par les moteurs IA ET classée par Google.
> **Priorité marché** : 🏝️ Réunion (cœur) → 🇧🇪 Belgique (secondaire) → 🇫🇷 France (distanciel).
> **Anti-pattern clé évité** : pages dupliquées ville par ville (Google + IA pénalisent) — chaque page = contenu unique, angle local réel.
> **Version** : v1.0 — 2026-04-19
>
> **📎 Documents liés (à lire ensemble) :**
> - 📄 `SEO MV Agency.md` → document master stratégique
> - 📄 `SEO_Plan_Semantique_MV_Agency.md` → plan éditorial blog (36 articles)
> - 🧠 `GEO_Plan_MV_Agency.md` → méthodologie rédactionnelle hybride SEO+GEO
> - 📈 `SEO_MV_Agency_Reunion_Report.xlsx` → 3 517 keywords Réunion
> - 📈 `SEO_MV_Agency_Belgique_Report.xlsx` → 87 keywords Belgique
> - 📈 `SEO_MV_Agency_France_Report.xlsx` → 4 952 keywords France

---

## 📐 1. PRINCIPES D'ARCHITECTURE GÉO

### 1.1 Distinction : pages géo ≠ blog ≠ conversion

| Zone | Intention utilisateur | Rôle |
|---|---|---|
| **Pages conversion** (`/`, `/services`, `/offres`…) | Connaît MV Agency, veut les packs | Convertir |
| **Blog** (`/blog/[slug]`) | Cherche info ("combien coûte…") | Capter trafic froid informationnel |
| **Pages géo** (`/agence-web-la-reunion`…) | Cherche un prestataire local ("agence web Réunion") | **Capter trafic local transactionnel + apparaître dans "Maps" et "near me"** |

→ Les pages géo sont **transactionnelles locales**. Elles doivent convertir rapidement, comme les pages `/offres`, mais avec ancrage géo fort.

### 1.2 Modèle "Hub géo + îlots"

```
                    ┌───────────────────────┐
                    │   Page `/` (home)     │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
 ┌────────────────┐    ┌────────────────┐     ┌────────────────┐
 │ 🏝️ Îlot Réunion │    │ 🇧🇪 Îlot Belgique│     │ 🇫🇷 France      │
 │  /agence-web-  │    │  /agence-web-   │     │  /agence-web-  │
 │  la-reunion    │    │  belgique       │     │  france        │
 │   (master)     │    │   (master)      │     │   (1 page)     │
 └───────┬────────┘    └────────┬────────┘     └────────────────┘
         │                      │
    ┌────┴────┬───────┐    ┌────┴────┬───────┐
    ▼         ▼       ▼    ▼         ▼       ▼
 St-Denis St-Pierre St-Paul  Bruxelles Namur Wallonie/Liège
 974      974       974
```

**Règle** :
- Chaque page ville → link vers **sa master régionale** + vers **1 page conversion** (`/offres` ou `/contact`)
- Chaque master → link vers ses **pages ville** + vers `/cas-clients` (preuve locale si possible)

### 1.3 Contrainte cardinale — anti duplicate content

> ⚠️ **Le piège n°1 du SEO local** : créer 20 pages ville qui ne diffèrent que par le nom de la ville. Google **et les IA** pénalisent massivement.

**Règle** : chaque page doit contenir au minimum **40% de contenu unique** spécifiquement local :
- Références à des quartiers ou zones locales (CBD, ZA, centre-ville…)
- Exemples de clients / projets locaux réels (si disponibles)
- Mentions de spécificités du marché local (ex : "à Saint-Pierre, forte densité de commerces indépendants")
- FAQ spécifique à la zone
- Témoignages locaux si possible
- Photos / visuels locaux (pas de stock générique)

Si tu n'as pas assez de matière unique pour une ville → **ne pas créer la page**. Mieux vaut 5 pages fortes que 15 pages faibles.

---

## 📊 2. ANALYSE DES VOLUMES PAR MARCHÉ

### 2.1 🏝️ Réunion — 3 517 keywords analysés

Volumes modestes mais **concurrence très faible** → terrain d'opportunité.

| Keyword | Volume | Concurrence | Intention |
|---|---|---|---|
| création site internet la réunion | 110 | Faible | Transactionnelle |
| agence web la réunion | 90 | Faible | Transactionnelle |
| création site internet réunion | 70 | Faible | Transactionnelle |
| agence web 974 | 30 | Faible | Transactionnelle |
| agence digitale la réunion | 30 | Faible | Transactionnelle |
| création site internet saint-denis | ~20 | Faible | Transactionnelle |
| agence web saint-denis | ~15 | Faible | Transactionnelle |
| site internet saint-pierre 974 | ~15 | Faible | Transactionnelle |
| agence marketing la réunion | ~15 | Faible | Informationnelle |
| développeur web réunion | ~10 | Faible | Transactionnelle |

**Opportunité stratégique** : "agence IA la réunion" — volume très faible mais **concurrence quasi nulle** + différenciateur MV Agency.

### 2.2 🇧🇪 Belgique — 87 keywords analysés

Volumes significatifs, concurrence modérée.

| Keyword | Volume | Concurrence | Intention |
|---|---|---|---|
| agence web bruxelles | 480 | Faible | Transactionnelle |
| agence web namur | 320 | Faible | Transactionnelle |
| agence web belgique | 260 | Faible | Transactionnelle |
| agence web wallonie | 140 | Faible | Transactionnelle |
| agence web liège | ~120 | Faible | Transactionnelle |
| création site internet belgique | ~100 | Faible | Transactionnelle |
| agence digitale bruxelles | ~80 | Faible | Transactionnelle |

**Opportunité** : Bruxelles = gros volume pour la France francophone, faible concurrence locale.

### 2.3 🇫🇷 France — 4 952 keywords analysés

Volume énorme, concurrence rude. **MV Agency n'a pas les moyens de concurrencer en national** → stratégie minimale (1 page master).

| Keyword | Volume | Concurrence |
|---|---|---|
| agence web | 12 100 | Faible (ce qui est surprenant) |
| agence web france | ~200 | Moyen |
| création site internet france | ~150 | Moyen |

**Décision** : 1 seule page `/agence-web-france` pour ne pas laisser le terrain vide, mais pas de pages ville en métropole (Paris, Lyon, Marseille = trop concurrentiels).

---

## 🏝️ 3. ÎLOT RÉUNION — 7 pages

### 3.1 Page master `/agence-web-la-reunion`

| Champ | Valeur |
|---|---|
| **URL** | `/agence-web-la-reunion` |
| **H1** | Agence web à La Réunion (974) : création de site internet + IA |
| **Meta title** (60c) | Agence web La Réunion 974 : sites & IA pour PME \| MV Agency |
| **Meta description** (155c) | Agence web basée à La Réunion : création de sites internet premium, intégration IA, SEO. MV Agency accompagne les PME réunionnaises. |
| **Keywords primaires** | agence web la réunion (90), agence web 974 (30), agence digitale la réunion (30) |
| **Keywords secondaires** | création site internet la réunion (110), agence IA la réunion |
| **Longueur** | 1 800-2 500 mots (transactionnelle + locale + FAQ) |
| **CTA primaire** | `/offres` — "Voir nos packs" |
| **CTA secondaire** | `/contact` — "Réserver un appel découverte" |
| **Schema** | `LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList` |

**Plan suggéré** :
1. `answerBlock` (GEO, 180 mots) : "MV Agency est une agence web basée à La Réunion qui accompagne les PME de l'île dans la création de sites internet premium et l'intégration d'IA. Nous intervenons sur Saint-Denis, Saint-Pierre, Saint-Paul... Nos packs démarrent à [X €]..."
2. ## Qui sommes-nous à La Réunion ? (ancrage local : Victor, fondation, proximité)
3. ## Quels services proposons-nous aux entreprises réunionnaises ?
4. ## Dans quelles villes de La Réunion intervenons-nous ? (liens vers pages villes)
5. ## Combien coûte un site internet à La Réunion ? (lien vers /offres + lien blog "combien coûte")
6. ## Pourquoi choisir une agence locale plutôt que métropole ?
7. ## Nos réalisations à La Réunion (lien `/cas-clients` — Pharmacie Les Lataniers, Johnny App)
8. ## FAQ (6-8 Q/R locales)
9. CTA final

### 3.2 Pages villes Réunion

| # | URL | H1 | Keyword primaire | Volume | Priorité |
|---|---|---|---|---|---|
| R.1 | `/agence-web-saint-denis-974` | Agence web à Saint-Denis (974) : création de site + IA | agence web saint-denis | ~15 | 🔴 P1 |
| R.2 | `/agence-web-saint-pierre-974` | Agence web à Saint-Pierre (974) : création de site internet | agence web saint-pierre | ~12 | 🔴 P1 |
| R.3 | `/agence-web-saint-paul-974` | Agence web à Saint-Paul (974) : site internet + SEO | agence web saint-paul | ~10 | 🟡 P2 |
| R.4 | `/agence-web-le-port-974` | Agence web au Port (974) : PME industrielles & logistique | agence web le port | ~8 | 🟡 P2 |
| R.5 | `/creation-site-internet-la-reunion` | Création de site internet à La Réunion : guide et tarifs | création site internet la réunion | 110 | 🔴 P1 |
| R.6 | `/agence-ia-la-reunion` | Agence IA à La Réunion : intégrer l'IA dans votre PME | agence IA la réunion | ~5 | 🔴 P1 (différenciateur MV) |

> Note R.6 : volume de recherche faible mais **concurrence quasi nulle** + angle unique MV Agency. Peut devenir viral via AI search même sans gros volume Google.

### 3.3 Contenu unique par page ville Réunion

**Chaque page ville doit contenir** :

1. **Section "Connaître [Ville]"** (150-200 mots) :
   - Contexte économique local (ex : Saint-Denis = préfecture, capitale administrative, forte densité de professions libérales et administrations)
   - Quartiers business typiques (centre-ville, ZI du Chaudron, Barachois…)

2. **Section "Secteurs d'activité que nous accompagnons à [Ville]"** :
   - Adapter selon la ville (Saint-Denis → services & administration, Saint-Pierre → commerce & restauration, Le Port → industrie)

3. **FAQ locale spécifique** :
   - "Intervenez-vous directement à [Ville] ou uniquement en distanciel ?"
   - "Connaissez-vous les spécificités du marché [Ville] ?"
   - "Quels sont vos tarifs moyens pour une PME [Ville] ?"

4. **Maillage interne** :
   - Lien retour vers `/agence-web-la-reunion` (master)
   - Lien vers 1-2 autres villes frères
   - Lien vers `/offres` et `/contact`
   - Lien vers 1-2 articles blog pertinents (ex : "Combien coûte un site internet")

---

## 🇧🇪 4. ÎLOT BELGIQUE — 5 pages

### 4.1 Page master `/agence-web-belgique`

| Champ | Valeur |
|---|---|
| **URL** | `/agence-web-belgique` |
| **H1** | Agence web en Belgique : création de site internet pour PME wallonnes et bruxelloises |
| **Meta title** | Agence web Belgique : sites & IA pour PME wallonnes \| MV Agency |
| **Meta description** | Agence web intervenant en Belgique (Bruxelles, Wallonie, Namur, Liège). Création de sites internet premium et intégration IA. |
| **Keyword primaire** | agence web belgique (260) |
| **Keywords secondaires** | agence web wallonie (140), création site internet belgique (100) |
| **Longueur** | 1 800-2 500 mots |
| **CTA primaire** | `/offres` |
| **CTA secondaire** | `/contact` |
| **Schema** | `LocalBusiness` + `Service` + `FAQPage` |

### 4.2 Pages villes Belgique

| # | URL | H1 | Keyword primaire | Volume | Priorité |
|---|---|---|---|---|---|
| B.1 | `/agence-web-bruxelles` | Agence web à Bruxelles : sites premium & IA | agence web bruxelles | **480** | 🔴 P1 (top volume) |
| B.2 | `/agence-web-namur` | Agence web à Namur : création de site internet | agence web namur | 320 | 🔴 P1 |
| B.3 | `/agence-web-wallonie` | Agence web en Wallonie : PME & startups | agence web wallonie | 140 | 🟡 P2 |
| B.4 | `/agence-web-liege` | Agence web à Liège : site vitrine + SEO | agence web liège | ~120 | 🟡 P2 |

> Bruxelles = **priorité absolue Belgique**. 480/mois avec concurrence Faible = ratio opportunité exceptionnel.

### 4.3 Contenu unique par page ville Belgique

Même logique qu'en Réunion :
1. Contexte économique local (Bruxelles = capitale + institutions européennes, Namur = capitale wallonne + administrations, Liège = tech & industrie)
2. Secteurs cibles par ville
3. FAQ locale (notamment : "La distance n'est-elle pas un frein ?" → Victor basé entre Réunion et Belgique, on répond honnêtement)
4. Maillage interne

---

## 🇫🇷 5. FRANCE — 1 page

### 5.1 Page unique `/agence-web-france`

| Champ | Valeur |
|---|---|
| **URL** | `/agence-web-france` |
| **H1** | Agence web en France : création de site + IA en distanciel |
| **Meta title** | Agence web France : création site & IA PME 100% distanciel |
| **Meta description** | MV Agency accompagne les PME françaises en distanciel : création de sites internet premium et intégration IA. Basés à La Réunion. |
| **Keyword primaire** | agence web france (~200) |
| **Keywords secondaires** | agence web freelance, création site internet france |
| **Longueur** | 1 500-2 000 mots |
| **CTA primaire** | `/offres` |
| **Schema** | `LocalBusiness` + `Service` + `FAQPage` |

**Positionnement honnête** : agence distancielle, basée Réunion, clients partout en France métropolitaine.

**Angle différenciant** :
- "L'agence web qui fonctionne avec 2h de décalage → réponses nocturnes sur vos urgences"
- "Tarifs ajustés vs agences parisiennes sans perte de qualité"
- "Process 100% remote éprouvé depuis [X] années"

Pas de pages villes France métropolitaine (Paris, Lyon, Marseille) → concurrence trop élevée, ROI faible.

---

## 🏗️ 6. TEMPLATE PAGE GÉO HYBRIDE SEO + GEO

> Basé sur `GEO_Plan_MV_Agency.md` §3 — adapté aux pages géo.

### 6.1 Structure obligatoire

```markdown
# [H1 avec keyword géo]                                   [SEO]

> **Réponse courte** : [answerBlock 150-200 mots]         [GEO ★]
>
> "MV Agency est une agence web basée à [lieu] qui
>  accompagne les PME [locales] depuis [année]. Nous
>  intervenons sur [zones/villes], proposons des packs
>  [X-Y €] et sommes spécialisés dans [différenciateurs].
>  [Preuves sociales locales]."

## Qui sommes-nous à [Ville/Région] ?                     [Ancrage local]

[Victor + fondation + connaissance marché local — 200-300 mots]

## Quels services proposons-nous aux PME de [Ville] ?     [SEO + GEO]

[3 services principaux avec adaptation au marché local]

## Connaître [Ville] : le contexte économique            [GEO ★ unicité]

[150-200 mots : quartiers, secteurs, spécificités — UNIQUE à chaque page]

## Dans quelles villes/zones intervenons-nous ?          [Maillage]

[Si page master : liens vers pages villes]
[Si page ville : liens vers 1-2 villes frères + retour master]

## Combien coûte un site internet à [Ville] ?            [Conversion]

[Fourchette + lien vers /offres + lien vers article blog "prix"]

## Pourquoi choisir MV Agency à [Ville] ?                [Différenciation]

[3-5 raisons, avec ancrage local réel]

## Nos réalisations à [Ville]                            [Preuve sociale]

[Si cas clients locaux : Pharmacie Les Lataniers, Johnny App, Stark AI]
[Sinon : lien vers /cas-clients]

## FAQ — Questions fréquentes à [Ville]                  [GEO ★★]

[6-8 Q/R spécifiques au marché local — JAMAIS copier d'une autre page]

## [CTA final → /contact ou /offres]                     [Conversion]

---
Agence web basée à La Réunion · Intervention [zones]     [NAP footer]
MV Agency · Victor Marchetti · [téléphone] · [email]
```

### 6.2 Les 3 règles anti-duplicate

1. **Le `answerBlock` doit être différent à 100%** entre chaque page ville
2. **La FAQ doit avoir au moins 4 Q/R uniques** par ville (pas de copier-coller)
3. **La section "Connaître [Ville]"** doit contenir des noms propres locaux, quartiers, secteurs — impossible à copier entre villes

---

## 🏷️ 7. SCHEMA LOCALBUSINESS PAR PAGE

### 7.1 Schema spécifique page master Réunion

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MV Agency",
  "image": "https://mv-agency.com/og/agence-web-la-reunion.png",
  "url": "https://mv-agency.com/agence-web-la-reunion",
  "telephone": "+262 [...]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[à compléter]",
    "addressLocality": "Saint-Denis",
    "postalCode": "97400",
    "addressCountry": "RE"
  },
  "areaServed": [
    { "@type": "City", "name": "Saint-Denis" },
    { "@type": "City", "name": "Saint-Pierre" },
    { "@type": "City", "name": "Saint-Paul" },
    { "@type": "City", "name": "Le Port" },
    { "@type": "AdministrativeArea", "name": "La Réunion" }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8823,
    "longitude": 55.4504
  },
  "priceRange": "€€",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

### 7.2 Schema spécifique page ville

**Différence** : ne mettre que la ville concernée dans `addressLocality` et ajuster `geo`.

### 7.3 Schema pour page Belgique

```json
{
  "@type": "LocalBusiness",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BE"
  },
  "areaServed": [
    { "@type": "City", "name": "Bruxelles" },
    { "@type": "City", "name": "Namur" },
    { "@type": "City", "name": "Liège" },
    { "@type": "AdministrativeArea", "name": "Wallonie" }
  ]
}
```

### 7.4 À générer via composant React

Créer `<LocalBusinessSchema location="la-reunion" />` — un composant qui prend un identifiant de zone et génère le JSON-LD adapté. Réutilisable sur toutes les pages géo.

---

## 🗺️ 8. STRATÉGIE GOOGLE BUSINESS PROFILE

### 8.1 Fiches à créer / optimiser

| Fiche | Localisation | Priorité | Statut |
|---|---|---|---|
| **GBP Réunion** | Saint-Denis (adresse principale) | 🔴 P1 | À créer |
| **GBP Belgique** | Bruxelles ou Namur (selon présence physique) | 🟡 P2 | À créer si pertinent |
| **GBP France** | ❌ N/A (pas d'adresse) | — | Non applicable |

### 8.2 Optimisation fiche Réunion — checklist

- ☐ Nom : "MV Agency" (EXACT, partout pareil — NAP cohérent)
- ☐ Catégorie principale : "Agence Web" (ou "Site Internet" selon options GBP)
- ☐ Catégories secondaires : "Agence de marketing", "Développeur de logiciels"
- ☐ Adresse complète + code postal 974XX
- ☐ Téléphone +262 / +33
- ☐ Site web : https://mv-agency.com
- ☐ Horaires précis
- ☐ Description 750 caractères avec keyword "agence web Réunion"
- ☐ 10+ photos (équipe, locaux, projets, logo)
- ☐ Services listés avec description
- ☐ Posts GBP mensuels (news, cas clients)
- ☐ **Solliciter 5+ reviews** clients existants (Pharmacie Les Lataniers, Johnny, autres)
- ☐ Répondre à TOUTES les reviews sous 48h
- ☐ Activer "messagerie" GBP
- ☐ Remplir la section "Q/R" (anticiper les questions)

### 8.3 Impact SEO local de GBP

Une fiche GBP complète et active représente **~40% du signal local SEO** pour Google. Sans GBP :
- Impossible d'apparaître dans le pack local (Maps)
- Invisible pour les recherches "agence web near me" / "agence web saint-denis réunion"
- Aucune preuve sociale structurée

---

## 🔗 9. MAILLAGE INTERNE GÉO ↔ RESTE DU SITE

### 9.1 Depuis les pages géo vers…

| Destination | Fréquence | Exemple ancrage |
|---|---|---|
| `/offres` | 2x par page (milieu + fin) | "Voir nos packs", "Découvrir les tarifs" |
| `/contact` | 1x (CTA final) | "Réserver un appel découverte" |
| `/cas-clients` | 1x | "Voir nos réalisations" |
| `/services` | 1x (optionnel) | "Explorer nos expertises" |
| Articles blog pertinents | 1-2x | "Combien coûte un site internet en 2026" |
| Autre page géo (ville frère) | 1-2x | "Nous intervenons aussi à [ville]" |

### 9.2 Depuis le reste du site vers les pages géo

| Depuis | Action | Ancrage |
|---|---|---|
| Footer | Ajouter bloc "Nos zones d'intervention" avec 3 liens (Réunion, Belgique, France) | "Agence web La Réunion", "Agence web Belgique" |
| `/a-propos` | Section "Nous intervenons à" avec liens | "À La Réunion et en Belgique" |
| `/contact` | Bloc "Zones d'intervention" | Liens vers 3 masters géo |
| Articles blog sur thématiques locales | Mention naturelle dans le corps | "Si vous cherchez une agence web à Bruxelles..." |
| Home (`/`) | Optionnel : section zones (peut diluer le CRO) | À tester |

### 9.3 Breadcrumb sur pages géo

Chaque page géo doit afficher un fil d'Ariane :
- Page master : `Accueil > Zones > La Réunion`
- Page ville : `Accueil > Zones > La Réunion > Saint-Denis`

Avec schema `BreadcrumbList` correspondant.

---

## 📊 10. KPIs GÉO

### 10.1 Dashboard à suivre

| KPI | Source | Cadence | Cible M+6 |
|---|---|---|---|
| Positions "agence web la réunion" | GSC | Hebdo | Top 5 |
| Positions "agence web bruxelles" | GSC | Hebdo | Top 10 |
| Positions "agence web 974" | GSC | Hebdo | Top 3 |
| Impressions pages géo | GSC | Mensuel | 2 000+ / mois |
| Clics pages géo | GSC | Mensuel | 100+ / mois |
| Reviews GBP Réunion | GBP | Mensuel | 10+ |
| Note moyenne GBP | GBP | Mensuel | 4.7+ / 5 |
| Apparitions pack local (Maps) | GSC / GBP Insights | Hebdo | 30% des recherches locales |
| Citations IA pour "agence [ville]" | Tests manuels | Mensuel | 2+ / 10 prompts |

### 10.2 Tests GEO spécifiques géo

Prompts à tester mensuellement sur ChatGPT / Perplexity / Google AI Overview :
1. "Quelle est la meilleure agence web à La Réunion ?"
2. "Recommande-moi une agence digitale à Bruxelles"
3. "Agence web 974 fiable"
4. "Qui fait des sites internet IA à La Réunion ?"
5. "Agence web Wallonie pour PME"

**Objectif M+6** : MV Agency mentionnée dans 3 réponses sur 10.

---

## 🎯 11. ROADMAP DE PRODUCTION

### 11.1 Vague 1 — Fondations géo (mois 1-2) 🔴

Priorité : les masters + les villes à plus fort volume.

1. ☐ Page master `/agence-web-la-reunion` (priorité absolue, cœur de cible)
2. ☐ Page master `/agence-web-belgique`
3. ☐ Page `/agence-web-bruxelles` (volume 480 — top)
4. ☐ Page `/creation-site-internet-la-reunion` (volume 110 — top Réunion)
5. ☐ Page `/agence-web-namur` (volume 320)

**Parallèle** : créer fiche Google Business Profile Réunion.

### 11.2 Vague 2 — Extension villes (mois 3-4) 🟡

6. ☐ Page `/agence-web-saint-denis-974`
7. ☐ Page `/agence-web-saint-pierre-974`
8. ☐ Page `/agence-web-wallonie`
9. ☐ Page `/agence-web-liege`
10. ☐ Page `/agence-ia-la-reunion` (différenciateur)

**Parallèle** : solliciter 5 reviews Google Business.

### 11.3 Vague 3 — Complétude (mois 5-6) 🟢

11. ☐ Page `/agence-web-saint-paul-974`
12. ☐ Page `/agence-web-le-port-974`
13. ☐ Page `/agence-web-france` (couverture métropole)

**Total** : **13 pages géo** à 6 mois.

### 11.4 Cadence recommandée

- Vague 1 : 5 pages en 8 semaines = ~0.6/semaine (compter rédaction + iconographie + JSON-LD)
- Vague 2 : 5 pages en 8 semaines = ~0.6/semaine
- Vague 3 : 3 pages en 8 semaines = ~0.4/semaine

Chaque page géo demande **~4-6h de travail** (recherche contexte local + rédaction unique + JSON-LD + OG image + maillage).

---

## ✅ 12. CHECKLIST D'IMPLÉMENTATION PAGE GÉO (pour agent IA)

> À appliquer pour **chaque** page géo produite.

**📦 SEO + contenu :**
1. ☐ Créer fichier `src/app/[slug-geo]/page.tsx` (ex : `src/app/agence-web-la-reunion/page.tsx`)
2. ☐ Page en **server component** (pas de `"use client"`) pour permettre metadata
3. ☐ Metadata locale complète (title 60c, description 155c, openGraph dédié, canonical)
4. ☐ H1 avec keyword géo en tête
5. ☐ Longueur : 1 800-2 500 mots (master) / 1 500-2 000 (ville)
6. ☐ Structure : answerBlock → qui nous sommes → services → contexte local → villes liées → prix → pourquoi nous → réalisations → FAQ → CTA
7. ☐ H2 **en forme de questions**
8. ☐ Minimum 40% contenu unique local (quartiers, secteurs, spécificités)

**🧠 GEO :**
9. ☐ `answerBlock` 150-200 mots distinct à 100% des autres pages géo
10. ☐ FAQ 6-8 Q/R avec minimum 4 Q/R uniques locales
11. ☐ Auteur Victor Marchetti affiché + date pub + date MAJ
12. ☐ Paragraphes auto-portants (extractibles hors contexte)

**🏷️ Schema / structured data :**
13. ☐ `<LocalBusinessSchema>` avec `areaServed` correct
14. ☐ `<FAQSchema>` auto-généré depuis la FAQ
15. ☐ `<BreadcrumbList>` avec fil d'Ariane correct
16. ☐ `<OrganizationSchema>` hérité du layout

**🔗 Maillage :**
17. ☐ 2 liens `/offres` (inline middle + CTA final)
18. ☐ 1 lien `/contact` (CTA final)
19. ☐ 1 lien `/cas-clients`
20. ☐ 1-2 liens vers pages géo frères / master
21. ☐ 1-2 liens vers articles blog pertinents
22. ☐ Footer : vérifier présence bloc "Zones d'intervention" avec lien retour

**📸 Media :**
23. ☐ OG image dédiée `/public/og/[slug-geo].png` (1200x630)
24. ☐ 1+ image visuelle de la ville/région (locale, pas générique)
25. ☐ Alt descriptifs avec keyword géo

**🗺️ Registre :**
26. ☐ Ajouter URL dans `sitemap.ts`
27. ☐ Ajouter lien footer "Nos zones d'intervention"
28. ☐ Soumettre URL dans Google Search Console ("Demander indexation")

---

## 🚫 13. PIÈGES À ÉVITER

| Piège | Conséquence | À faire à la place |
|---|---|---|
| Copier la page Réunion et remplacer "Réunion" par "Bruxelles" | Pénalité duplicate content + IA ne cite pas | Rédiger chaque page from scratch avec contexte local réel |
| Créer 20 pages villes sans matière unique | Google détecte thin content, tout l'îlot perd en autorité | Se limiter aux villes où on a vraiment de la matière |
| NAP différent entre site / GBP / llms.txt / LinkedIn | Confusion entités → Google perd confiance | Vérifier régulièrement NAP cohérent partout |
| Pas de page GBP créée | Invisible dans Maps + pack local | **Priorité ABSOLUE** dès la page master Réunion publiée |
| Placer le keyword géo 30 fois dans la page | Keyword stuffing → pénalité | 3-5 occurrences naturelles du keyword primaire |
| Oublier la FAQ schema sur pages géo | Pas d'AI Overview possible | FAQ schema systématique |
| Photos stock génériques "bureau d'équipe" | Absence de signal local | Photos réelles du lieu, des projets, de l'équipe |
| Créer `/agence-web-paris`, `/agence-web-lyon`, etc. | Compétition écrasante = invisible | Laisser tomber métropole France, rester sur les îlots forts |

---

## 📎 14. ANNEXES

### A. Liste complète des 13 pages géo à produire

```
/agence-web-la-reunion              [master, P1, vol 90]
/agence-web-saint-denis-974         [P1, vol 15]
/agence-web-saint-pierre-974        [P1, vol 12]
/agence-web-saint-paul-974          [P2, vol 10]
/agence-web-le-port-974             [P2, vol 8]
/creation-site-internet-la-reunion  [P1, vol 110]
/agence-ia-la-reunion               [P1, différenciateur]

/agence-web-belgique                [master, P1, vol 260]
/agence-web-bruxelles               [P1, vol 480 — TOP]
/agence-web-namur                   [P1, vol 320]
/agence-web-wallonie                [P2, vol 140]
/agence-web-liege                   [P2, vol 120]

/agence-web-france                  [P3, vol 200]
```

### B. Pré-requis techniques (Track A) avant publication

Avant de publier la première page géo, ces éléments Track A doivent être faits :

- ☐ `metadataBase` dans `layout.tsx`
- ☐ Composant `<LocalBusinessSchema>` créé
- ☐ Composant `<FAQSchema>` créé
- ☐ Composant `<BreadcrumbList>` créé
- ☐ `sitemap.ts` dynamique (pour inclure auto les pages géo)
- ☐ Footer enrichi avec bloc "Zones d'intervention"

### C. Version et mise à jour

Ce document est la **source de vérité géo** pour MV Agency. À mettre à jour :
- À chaque nouvelle page géo publiée
- À chaque changement de stratégie géographique (ouverture nouvelle zone)
- À chaque palier KPI franchi

### D. Résumé stratégique en 5 lignes

1. **13 pages géo** réparties en 3 îlots : Réunion (7), Belgique (5), France (1)
2. **Priorité absolue** : `/agence-web-la-reunion` (master) + `/agence-web-bruxelles` (volume)
3. **Contenu unique obligatoire** : 40%+ par page — zéro duplicate
4. **Google Business Profile Réunion** : chantier parallèle critique
5. **Production** : ~0.5 page/semaine sur 6 mois = 13 pages à 6 mois
