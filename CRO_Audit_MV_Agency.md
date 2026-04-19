# Audit CRO — MV Agency

**Date de création :** 19/04/2026
**Dernière mise à jour :** 19/04/2026 (v2 — décisions actées après 3 itérations de brainstorming)
**Périmètre :** 5 pages principales (`/`, `/services`, `/offres`, `/a-propos`, `/contact`)
**Méthodologie :** Framework CRO classique (Florent Dubourg — *Clarté > Créativité*) : Value Proposition → Preuve → CTA → Friction → Urgence/Relevance. Complété par AIDA & PAS sur les sections de vente.

---

## Table des matières

1. [TL;DR](#1-tldr)
2. [Scorecard par page](#2-scorecard-par-page)
3. [Plan d'action validé — 3 vagues](#3-plan-daction-validé--3-vagues)
4. [Recommandations détaillées — statut décisionnel](#4-recommandations-détaillées--statut-décisionnel)
5. [Copy & visuels finalisés](#5-copy--visuels-finalisés)
6. [Ce qu'on garde (points forts à ne pas toucher)](#6-ce-quon-garde-points-forts)
7. [Framework Florent — rappel](#7-framework-florent--rappel)
8. [Historique des décisions](#8-historique-des-décisions)
9. [Post-implémentation — Audit v3 + Plan V4 (validé)](#9-post-implémentation--audit-v3--plan-v4-validé)
10. [Re-audit v3 (post-Gemini) + Plan V5 (validé)](#10-re-audit-v3-post-gemini--plan-v5-validé)

---

## 1. TL;DR

Le site a une **identité visuelle premium** et un **tone of voice fort** (pédagogique, anti-jargon, founder-driven).

Après 3 itérations de brainstorming avec Victor, les **grands arbitrages stratégiques** sont :

- ❌ **Pas de prix affichés** (même en fourchette) → positionnement premium / devis sur-mesure.
- ❌ **Pas de positionnement "founding client / studio en lancement"** → positionnement agence installée pour crédibilité.
- ❌ **Pas d'ancrage géo sur la home** → home 100% CRO, pages géo dédiées pour le SEO local.
- ❌ **Pas de sidebar "parcours Victor"** sur /a-propos → éviter l'effet "freelance solo".
- ✅ **Remplacer les avatars stock "+50 entrepreneurs"** → photos humaines discrètes en background + claim *"10+ projets digitaux livrés"*.
- ✅ **Restructurer /services en 4 piliers** (Web + Automatisation + IA + Formation) au lieu de 3.
- ✅ **Ajouter 3 badges de garantie** sur home ET /offres (satisfait ou remanié / pas d'engagement / un seul interlocuteur).
- ✅ **Réécrire headline home + hero /services + hero /offres** avec de vraies promesses.
- ✅ **Bénéfices clients à la place des pills technos** : *"Rapide · SEO-ready · Évolutif · 100% propriétaire"*.
- ✅ **Pivoter la FAQ "pourquoi pas de prix"** en argument proactif (pas excuse défensive).

---

## 2. Scorecard par page

| Page | Clarté | VP | Preuve | CTA | Friction | Urgence | Note /30 |
|---|---|---|---|---|---|---|---|
| `/` Accueil | 3/5 | 2/5 | 3/5 | 3/5 | 2/5 | 0/5 | **13/30** |
| `/services` | 4/5 | 3/5 | 2/5 | 3/5 | 2/5 | 0/5 | **14/30** |
| `/offres` | 3/5 | 3/5 | 2/5 | 2/5 | 1/5 | 1/5 | **12/30** |
| `/a-propos` | 4/5 | 4/5 | 2/5 | 1/5 | 3/5 | 0/5 | **14/30** |
| `/contact` | 4/5 | 3/5 | 2/5 | 3/5 | 2/5 | 0/5 | **14/30** |

> Moyenne : **13.4/30** avant corrections.
> Objectif post-3 vagues : **20+/30** (+50 % conversions visées à 3 mois).

---

## 3. Plan d'action validé — 3 vagues

### 🌊 Vague 1 — Quick wins (≈1h15)

| # | Action | Fichier | Status |
|---|---|---|---|
| V1.1 | Changer texte *"+50 entrepreneurs"* → ***"10+ projets digitaux livrés · Web · IA · Automatisation"*** | `src/app/page.tsx` + `src/app/contact/ContactClient.tsx` | 🔲 À faire |
| V1.2 | Remplacer/adoucir les photos Unsplash (photos humaines **discrètes/background/blur léger**) | idem | 🔲 À faire |
| V1.3 | Ajouter label **"Partenaires techniques certifiés"** sur la row de logos technos | `src/app/page.tsx` (section S2 - Technos) | 🔲 À faire |
| V1.4 | Réécrire **headline home** (vraie promesse — voir §6) | `src/app/page.tsx` (hero) | 🔲 À faire |
| V1.5 | Ajouter ligne footer *"Basé à La Réunion · Intervention France & Belgique"* | `src/components/Footer.tsx` (ou équivalent) | 🔲 À faire |

### 🌊 Vague 2 — Restructuration (≈1h30)

| # | Action | Fichier | Status |
|---|---|---|---|
| V2.1 | Retravailler **hero /services** : H1 impactant + 2 CTA (*"Voir nos packs"* + *"Réserver un appel"*) | `src/app/services/page.tsx` | 🔲 À faire |
| V2.2 | Restructurer **/services en 4 piliers** : renommer bloc IA actuel → **Automatisation** (contenu colle déjà) + ajouter **nouveau bloc IA** dédié (agents IA sur-mesure, LLM métier, génération contenu) | `src/app/services/page.tsx` | 🔲 À faire |
| V2.3 | Remplacer pills technos par **bénéfices clients** : *"Rapide · SEO-ready · Évolutif · 100% propriétaire"* | `src/app/services/page.tsx` (section Création Web) | 🔲 À faire |
| V2.4 | Glisser **1 témoignage** entre Automatisation et Formation sur /services | `src/app/services/page.tsx` | 🔲 À faire |
| V2.5 | Retravailler **hero /offres** : H1 impactant + CTA | `src/app/offres/page.tsx` | 🔲 À faire |

### 🌊 Vague 3 — Finition & conversion (≈1h30)

| # | Action | Fichier | Status |
|---|---|---|---|
| V3.1 | Booster visuel **Pack 2 "Le plus choisi"** (scale 1.05, bordure bleu néon épaisse, ombre marquée, badge cocarde, CTA rempli bleu vs outline pour les 2 autres) | `src/app/offres/page.tsx` + CSS modules | 🔲 À faire |
| V3.2 | Réduire **tableau comparatif** à 6 lignes clés différenciatrices | `src/app/offres/page.tsx` | 🔲 À faire |
| V3.3 | Ajouter **3 badges garantie** sur **home** (juste avant CTA final) ET **/offres** (sous les packs) | `src/app/page.tsx` + `src/app/offres/page.tsx` | 🔲 À faire |
| V3.4 | **Enrichir FAQ /offres** (+4 questions) + pivoter réponse *"pourquoi pas de prix"* (voir §6) | `src/app/offres/page.tsx` | 🔲 À faire |
| V3.5 | Reformuler **4 valeurs /a-propos** en promesses opérables | `src/app/a-propos/AProposClient.tsx` | 🔲 À faire |
| V3.6 | Changer stat *"98% Taux de satisfaction"* → ***"100% des clients repartent formés et autonomes"*** | `src/app/a-propos/AProposClient.tsx` | 🔲 À faire |
| V3.7 | Simplifier **timeline /offres** en 4 étapes grosses mailles (Audit → Design → Dev → Lancement) — garder /a-propos à 8 étapes détaillées | `src/app/offres/page.tsx` | 🔲 À faire |
| V3.8 | Corriger **CTA flèche bento /a-propos** → vrai bouton *"Prendre rendez-vous →"* | `src/app/a-propos/AProposClient.tsx` | 🔲 À faire |

---

## 4. Recommandations détaillées — statut décisionnel

Liste complète des 22 recommandations identifiées sur les 3 itérations. Chacune a maintenant un statut clair.

### Recommandations v1 (1-12)

| # | Reco | Priorité initiale | Statut |
|---|---|---|---|
| 1 | Supprimer avatars Unsplash "faux clients" | 🔴 Critique | 🟡 **Adapté** — garder photos humaines mais plus discrètes (blur/opacity/background), changer le texte |
| 2 | Afficher prix "à partir de" | 🔴 Critique | ❌ **Refusé** — arbitrage Victor |
| 3 | Réécrire value proposition home | 🔴 Critique | ✅ **Acté** — copy à écrire (voir §6) |
| 4 | Créer CTA secondaire "faible friction" (lead magnet) | 🟠 Important | 🔲 **Reporté à Vague 4** (post-lancement) |
| 5 | Remplacer "+50 entrepreneurs" par preuve chiffrée spécifique | 🟠 Important | ✅ **Acté** → *"10+ projets digitaux livrés"* |
| 6 | CTA bento /a-propos (flèche sans label) | 🟠 Important | ✅ **Acté** — V3.8 |
| 7 | Formulaire contact court en fallback de Cal.com | 🟠 Important | 🔲 **Reporté à Vague 4** |
| 8 | Urgence/rareté justifiée | 🟡 Moyen | ❌ **Refusé** — incompatible avec refus "founding client" |
| 9 | Tableau "Pourquoi nous vs alternatives" | 🟡 Moyen | 🔲 **Reporté à Vague 4** |
| 10 | Harmoniser libellés CTA | 🟡 Moyen | 🔲 **À intégrer** dans V3 |
| 11 | Réordonner FAQ home (tarifs en #1) | 🟢 Faible | 🔲 **À faire** dans V3 |
| 12 | Sticky CTA mobile /services /offres | 🟢 Faible | 🔲 **Reporté à Vague 4** |

### Recommandations v2 (13-22)

| # | Reco | Priorité | Statut |
|---|---|---|---|
| 13 | Fold home : headline animé trop long (> 600ms) | 🔴 Critique | 🔲 **À faire** dans V1.4 (figer anim ou raccourcir) |
| 14 | Ancrage géo sur home | 🔴 Critique | 🟡 **Adapté** — mention footer uniquement (V1.5) |
| 15 | Cartes expertise cliquables vers sections /services | 🟠 Important | 🔲 **À vérifier** dans V2 |
| 16 | Carrousel témoignages circulaires enrichi (noms/photos/dates) | 🟠 Important | 🔲 **À auditer** Vague 4 |
| 17 | Tracking GA4/Plausible sur clics FAQ | 🟠 Important | 🔲 **Reporté Vague 4** |
| 18 | Animations mockups /services en boucle (attention-grab) | 🟠 Important | ❌ **Refusé** — OK selon Victor |
| 19 | Responsive /contact split mobile | 🟠 Important | 🔲 **À tester** Vague 4 |
| 20 | Audit meta titles / descriptions CRO-oriented | 🟠 Important | 🔲 **Reporté** — à coupler avec audit SEO |
| 21 | Open Graph image (dark social CTR) | 🟡 Moyen | 🔲 **Reporté Vague 4** |
| 22 | Footer CRO (mini-CTA + newsletter) | 🟡 Moyen | 🔲 **Reporté Vague 4** |

### Recommandations deep-dive par page

#### /services

| # | Reco | Statut |
|---|---|---|
| S1 | Hero sans CTA | ✅ **Acté** — V2.1 |
| S2 | Incohérence Service Grid (4) vs Sections (3) | ✅ **Acté** — V2.2 (4 piliers Web/Auto/IA/Formation) |
| S3 | Micro-CTA entre sections services | 🔲 **À faire** dans V2 |
| S4 | Pills technos → bénéfices clients | ✅ **Acté** — V2.3 (*"Rapide · SEO-ready · Évolutif · 100% propriétaire"*) |
| S5 | Preuves sociales intermédiaires | 🟡 **Adapté** — 1 seul témoignage (V2.4) |

#### /offres

| # | Reco | Statut |
|---|---|---|
| O1 | Pack 2 visuellement dominant | ✅ **Acté** — V3.1 |
| O2 | Pivoter FAQ "pourquoi pas de prix" | ✅ **Acté** — V3.4 (copy §6) |
| O3 | Tableau comparatif 6 lignes max | ✅ **Acté** — V3.2 |
| O4 | Badges garantie | ✅ **Acté** — V3.3 (+ sur home) |
| O5 | FAQ enrichie (+4 questions) | ✅ **Acté** — V3.4 |
| O6 | Simplifier timeline /offres (garder /a-propos détaillée) | ✅ **Acté** — V3.7 |

#### /a-propos

| # | Reco | Statut |
|---|---|---|
| A1 | CTA dans hero | 🔲 **À intégrer** dans V3 |
| A2 | Stat 98% non sourçable | ✅ **Acté** — V3.6 (*"100% clients formés et autonomes"*) |
| A3 | 4 valeurs génériques → promesses opérables | ✅ **Acté** — V3.5 |
| A4 | Photo founder (vraie photo Victor) | 🔲 **Reporté** — Victor prendra photo pro plus tard |
| A5 | Mini-sidebar Parcours | ❌ **Refusé** — arbitrage Victor (report post-EPHEC) |
| A6 | CTA flèche → vrai bouton | ✅ **Acté** — V3.8 |

---

## 5. Copy & visuels finalisés

### 6.1 Badge social proof (remplace "+50 entrepreneurs")

**Location** : home + page contact.

**Nouveau texte** :
> ***10+ projets digitaux livrés · Web · IA · Automatisation***

**Visuels** : **garder des photos humaines** (choix Victor pour rassurer) mais :
- Chercher des photos **moins "souriantes stock évidentes"** (préférer *lifestyle / bureau / mains / ambiance* à *portrait frontal radieux*)
- Appliquer un **filter CSS subtil** pour les rendre moins reconnaissables et plus cohérentes design system :
  ```css
  filter: grayscale(0.15) brightness(0.9);
  opacity: 0.85;
  ```
- Garder la composition actuelle (4 avatars superposés en cascade).

**Texte à côté des avatars** :
> *"Ils nous ont confié leur présence digitale."* (remplace *"Ils nous ont rejoint"*)

---

### 6.2 Row logos technos — nouveau label

Ajouter au-dessus ou en-dessous de la row des 17 logos :

> ***Partenaires techniques certifiés***

Typo : petite, majuscules espacées, couleur `var(--text-muted)`.

---

### 6.3 Headline home — vraies promesses à A/B tester

**Garder 3 lignes animées possible, MAIS anim < 600ms pour lisibilité rapide.**

**Option A (résultat orienté)** :
> *"Un site web qui convertit vraiment."*
> *"Livré en 30 jours, propulsé à l'IA."*
> *"Pensé pour les TPE/PME qui n'ont pas de temps à perdre."*

**Option B (transformation)** :
> *"Votre vitrine digitale, prête en 30 jours."*
> *"Avec l'IA intégrée pour attirer des clients pendant que vous dormez."*

**Option C (problème + promesse)** :
> *"Marre d'un site qui ne rapporte rien ?"*
> *"On construit des sites qui génèrent des rendez-vous —"*
> *"boostés à l'IA, livrés en 30 jours, sans jargon."*

**Sub-headline recommandée** :
> *"Pour TPE, PME et indépendants qui veulent un site qui travaille pour eux, pas un site qui dort."*

---

### 6.4 Hero /services — nouveau H1 + CTA

**H1 actuel** : *"Comment nous vous accompagnons"* → trop descriptif.

**Nouveau H1 proposé** :
> *"Web, IA, Automatisation, Formation —"*
> *"les 4 piliers qui feront passer votre activité à la vitesse supérieure."*

**Sub** :
> *"Une agence qui conçoit, explique et propulse. Pour les professionnels qui veulent des résultats mesurables, pas des slides."*

**CTA** : 2 boutons
- Primaire : *"Voir nos packs"* → `/offres`
- Secondaire : *"Réserver un appel offert"* → `/contact`

---

### 6.5 Structure /services — 4 piliers

| # | Pilier | Contenu | Visuel |
|---|---|---|---|
| 1 | 🌐 **Création Web** | Sites Next.js / WordPress / Webflow, SEO, branding, UX conversion | `MockupWeb` (existant) |
| 2 | ⚙️ **Automatisation** *(renommé depuis "IA")* | Workflows, CRM, emailing auto, chatbots, intégrations métier | `MockupWorkflow` (existant — correspond parfaitement) |
| 3 | 🤖 **Intelligence Artificielle** *(nouveau bloc)* | Agents IA sur-mesure, LLM métier, génération contenu, analyse prédictive, intégration Claude/GPT | **Nouveau mockup à créer** (ou détourner existant) |
| 4 | 🎓 **Formation** | Autonomie client, vidéos Loom, Notion privée | `MockupTree` (existant) |

---

### 6.6 Bénéfices clients (remplace pills technos section Création Web)

Row de 4 badges sous le bloc Création Web :

> ***Rapide · SEO-ready · Évolutif · 100% propriétaire***

---

### 6.7 FAQ /offres — pivot "pourquoi pas de prix"

**Réponse actuelle** : *"chaque activité est unique, un dentiste ≠ un e-commerce"* → défensive.

**Nouvelle réponse** :
> *"Parce qu'un site pour un dentiste n'a pas le même périmètre qu'un site e-commerce — et qu'on refuse de vous vendre un pack sur catalogue qui ne correspond pas à votre réalité. En 30 minutes d'appel offert, on cadre ensemble le périmètre et le budget. Pas de devis surprise, pas de coûts cachés, pas d'engagement."*

---

### 6.8 Badges garantie (home + /offres)

**3 badges horizontaux**, placement :
- **Home** : juste au-dessus du CTA final (section 8)
- **/offres** : juste sous les 3 packs, avant la comparaison

**Copy** :
| Icône | Titre | Sous-texte |
|---|---|---|
| 🛡️ | **Satisfait ou remanié** | *Rendu initial pas conforme ? On itère gratuitement.* |
| ⚖️ | **Pas d'engagement** | *Aucun abonnement caché. Vous êtes libres.* |
| 🧑‍💻 | **Un seul interlocuteur** | *Du premier appel à la livraison finale.* |

**Style** : minimaliste, 3 colonnes, icônes en bleu néon `#60A5FA`, titres en `Darker Grotesque`, sous-texte en `DM Sans`.

---

### 6.9 4 valeurs /a-propos — promesses opérables

**Actuelles** : Clarté / Innovation / Proximité / Excellence → trop génériques.

**Nouvelles formulations** :

| Valeur | Sous-texte |
|---|---|
| **Clarté** | *Pas de jargon. Si on parle technique, on explique d'abord.* |
| **Innovation** | *On teste chaque nouvelle IA avant de vous la proposer.* |
| **Proximité** | *Un seul interlocuteur, du kick-off au lancement. Réponse sous 24h.* |
| **Excellence** | *Code propre et design sur-mesure. Zéro site 'template'.* |

---

### 6.10 Stat /a-propos bento

**Ancienne** : *"98% Taux de satisfaction"* → non sourçable.

**Nouvelle** :
> ***100% des clients repartent formés et autonomes***

Cohérent avec la promesse MV (formation incluse = différenciateur clé). Vrai. Facile à maintenir.

---

### 6.11 Footer — ligne ancrage géo

À ajouter dans le footer, section discrète :

> *"Basé à La Réunion · Intervention France & Belgique"*

Typo petite, couleur `var(--text-muted)`.

---

## 6. Ce qu'on garde (points forts)

À **ne pas toucher** lors des 3 vagues :

- ✅ **Tone of voice** pédagogique, anti-jargon, founder-driven → authentique et différenciant.
- ✅ **Design system** cohérent, premium, reconnaissable (noir + bleu néon).
- ✅ **9 témoignages nommés** en 3 colonnes sur la home → excellente densité de preuve sociale.
- ✅ **Timeline J0 → J30** sur /a-propos (angle *making-of interne*) → désamorce l'objection *"ça va prendre 6 mois"*.
- ✅ **FAQ "Propriété du site"** → traite une objection classique agence.
- ✅ **Badge "Le plus choisi"** sur Pack 2 (à booster visuellement mais concept OK).
- ✅ **Page À propos avec founder story** → humanise et différencie.
- ✅ **Animations mockups /services en boucle** → choix Victor, on respecte.
- ✅ **Embed Cal.com /contact** → fonctionne bien après fix v2.

---

## 7. Framework Florent — rappel

> *"Un site qui convertit, c'est un site qui répond en < 5 secondes à ces 4 questions :*
> *1. Qu'est-ce que tu vends ?*
> *2. Pour qui ?*
> *3. Pourquoi toi plutôt qu'un autre ?*
> *4. Qu'est-ce que je dois faire maintenant ?"*

**État actuel MV Agency** :
- Q1 → 🟡 compris mais flou (site web + IA sans résultat)
- Q2 → ✅ explicite (TPE/PME/indépendants)
- Q3 → 🟡 faible (pas de différenciateur vs alternatives)
- Q4 → ✅ clair (Réserver un appel) **mais** trop high-commit

**État projeté post-3 vagues** :
- Q1 → ✅ (headline à promesse claire)
- Q2 → ✅
- Q3 → ✅ (4 piliers + badges garantie + bénéfices clients)
- Q4 → ✅ (CTA clair partout, libellés harmonisés)

---

## 8. Historique des décisions

### Session 19/04/2026 — Itération 1 (rapport v1, 12 recommandations)
- Extraction du contenu marketing des 5 pages par agent Explore
- Rédaction rapport v1 avec 12 recos priorisées (critique → faible)
- Proposition 3 fautes structurelles : prix / value prop / CTA unique

### Session 19/04/2026 — Itération 2 (approfondissement, +10 recos)
- Victor refuse prix affichés (argument : exclut budgets upgradables)
- Victor refuse "founding client" (veut positionnement agence installée)
- Victor refuse ancrage géo home (stratégie SEO séparée)
- Ajout de 10 recos supplémentaires (#13-22) : fold animation, géo, cartes expertise, carrousel, tracking FAQ, mockups animation, responsive contact, meta titles, Open Graph, footer CRO
- Deep-dive page par page : /services (S1-S5), /offres (O1-O6), /a-propos (A1-A6)

### Session 19/04/2026 — Itération 3 (décisions finales)
- Analyse Gains vs Pertes sur les 5 arbitrages majeurs
- Victor refuse définitivement les 4 badges pictogrammes secteurs → **préfère garder photos humaines, mais plus discrètes (blur/background)**
- Victor refuse sidebar "Parcours Victor" → éviter révéler le côté solo + pas encore diplômé
- Victor valide : *"10+ projets digitaux livrés"*, *"100% propriétaire"*, 4 piliers /services, badges garantie sur home aussi, pivot FAQ prix
- Report de certaines recos à **Vague 4** (post-lancement) : lead magnet, formulaire contact, urgence, tableau vs alternatives, sticky mobile, tracking FAQ, meta audit, OG image, footer CRO

### À venir
- **Vague 1** : quick wins (badges social proof, photos discrètes, label partenaires, headline, footer géo)
- **Vague 2** : restructuration /services 4 piliers + hero /offres
- **Vague 3** : boost Pack 2, tableau réduit, badges garantie, FAQ enrichie, valeurs /a-propos, stat, timeline, CTA bento

---

## 9. Post-implémentation — Audit v3 + Plan V4 (validé)

**Contexte** : après l'exécution des Vagues 1 à 3 par Gemini (front-end executor) sur la base des specs du document v2, ré-audit complet du site pour identifier les écarts restants, puis consolidation d'un **Plan V4** de finalisation validé point par point avec Victor.

> **Rôles** : Claude = stratège CRO (ce document) · Gemini = exécution front-end (copy + CSS + composants).
> **Cible moyenne** : 25/30 après V4 (≈ +87 % vs baseline).

---

### 9.1 Scorecard v3 (état actuel post-Vagues 1-3)

| Page | Clarté | VP | Preuve | CTA | Friction | Urgence | Note /30 | Δ vs baseline |
|---|---|---|---|---|---|---|---|---|
| `/` Accueil | 4/5 | 3/5 | 4/5 | 4/5 | 3/5 | 1/5 | **19/30** | +6 |
| `/services` | 4/5 | 3/5 | 3/5 | 4/5 | 3/5 | 1/5 | **18/30** | +4 |
| `/offres` | 4/5 | 4/5 | 3/5 | 3/5 | 2/5 | 2/5 | **18/30** | +6 |
| `/a-propos` | 4/5 | 4/5 | 3/5 | 2/5 | 4/5 | 1/5 | **18/30** | +4 |
| `/contact` | 5/5 | 4/5 | 3/5 | 4/5 | 3/5 | 1/5 | **20/30** | +6 |

> **Moyenne v3 : 18.6/30** (+5.2 vs baseline 13.4).
> **Moyenne projetée V4 : 25/30**.

**Écarts résiduels** :
1. Home H1 générique ("*Une présence digitale conçue pour convertir.*") → ne répond pas à *Q1 Florent : qu'est-ce que tu vends ?*
2. /services : 3 témoignages encore fictifs (TechFlow / DesignHub / InnovateLabs) + grid 6 cards contient "Écosystèmes E-commerce" (hors périmètre)
3. /a-propos : H1 passif ("*Derrière MV Agency*") + hero sans CTA
4. /offres : pas de titre de transition entre hero et packs → rupture narrative
5. CTA hétérogènes ("Demander un devis" vs "Réserver un appel offert" vs "Parler avec Victor")
6. Contact : mention nominale "Victor" dans sidebar + email `victormarchetti08@gmail.com` → pas aligné domaine pro

---

### 9.2 Copy final validé (à passer à Gemini)

#### 9.2.1 Home — H1 + Sub

**H1 (Option α validée)** :
> ***Un site qui convertit. Une IA qui vous fait gagner du temps.***

**Sub** :
> *Agence web + IA pour les TPE, PME et indépendants qui veulent comprendre, pas juste déléguer. On conçoit, on explique, on propulse.*

**Pourquoi** : répond aux 4 questions Florent en < 5 sec (Q1 = web + IA / Q2 = TPE-PME-indépendants / Q3 = "comprendre pas déléguer" = différenciateur pédagogique / Q4 = CTA dans le hero).

---

#### 9.2.2 /a-propos — H1 (version adoucie)

**H1 validé** :
> ***Une agence qui vous rend autonome, pas dépendant.***

**Sub (inchangé ou léger lissage)** :
> *Web, IA, automatisation — on livre, on explique, et on vous laisse les clés.*

**CTA hero (à AJOUTER)** :
> *"Discuter de mon projet"* → `/contact` *(NE PAS mettre "avec Victor" — positionnement agence, pas freelance)*

---

#### 9.2.3 /offres — titre de transition

À insérer **entre** le hero et la section des 3 packs :

**Titre** :
> ***3 packs pour 3 ambitions***

**Sub** :
> *Du site vitrine au business propulsé par l'IA. On cadre le périmètre et le budget ensemble.*

---

#### 9.2.4 /services — FeaturesGrid (6 cards)

**Suppression** : ❌ *"Écosystèmes E-commerce"* (hors périmètre actuel MV, risque d'attirer leads non qualifiés).

**Ajout** : ✅ ***"Intégrations IA"*** — *"Connecter Claude, GPT et vos outils métier dans un workflow cohérent. Agents IA, LLM sur-mesure, automatisation intelligente."*

Icône : 🤖 (cohérent avec la typo bleu néon existante).

**Grid final (6 cards)** :
1. Création Web
2. Automatisation
3. Intégrations IA *(remplace E-commerce)*
4. Formation
5. SEO / Performance
6. Conseil stratégique

---

#### 9.2.5 /services — 3 témoignages réels (remplace TechFlow/DesignHub/InnovateLabs)

Tirés de `src/data/projects.ts` et `/cas-clients` :

| # | Nom | Rôle | Projet | Citation (template à affiner) |
|---|---|---|---|---|
| 1 | **Alexandre L.** | Fondateur | Johnny App | *"MV a transformé notre idée en app qui convertit. On a pigé chaque ligne de code livrée."* |
| 2 | **Christophe Marchetti** | Gérant | Pharmacie Les Lataniers | *"Un site refondu en 4 semaines. Aujourd'hui, on pilote notre visibilité locale sans dépendre de personne."* |
| 3 | **Nicolas D.** | CTO | Stark AI | *"Intégration IA propre et documentée. L'équipe MV explique au lieu de jargonner."* |

> ⚠️ **Note** : le client Pharmacie Les Lataniers (**Christophe Marchetti**) est le seul client réel publiquement citable pour l'instant. Les deux autres sont des projets réels du portfolio mais les noms/citations doivent être validés par Victor avant mise en ligne.

---

#### 9.2.6 CTA — harmonisation par intention

| Emplacement | Libellé validé | Pourquoi |
|---|---|---|
| Hero home (primaire) | *"Réserver un appel offert"* | Engagement clair + gratuit (réduit friction) |
| Hero home (secondaire) | *"Voir nos packs"* | Alternative faible friction pour les hésitants |
| CTA final home | *"Réserver un appel offert"* | Cohérence avec hero |
| Hero /services | *"Voir nos packs"* + *"Réserver un appel offert"* | Double CTA |
| Packs /offres | *"Choisir ce pack"* (primaire par pack) | Action-oriented, pas générique |
| Hero /a-propos | *"Discuter de mon projet"* | Ton consultatif aligné ton pédagogique |
| CTA bento /a-propos | *"Prendre rendez-vous →"* | Remplace flèche sans label |
| Contact (fallback) | *"Envoyer un message"* | Différencié de la réservation Cal.com |

> **Règle** : le libellé *"Demander un devis"* est **supprimé** du site (friction SaaS, pas cohérent avec positionnement consultatif).

---

#### 9.2.7 Contact — nettoyage

- **Email affiché** : `contact@mvagency.ai` *(retirer toute mention de `victormarchetti08@gmail.com`)*
- **Sidebar contact** : aucune mention nominale "Victor" *(conserver le positionnement agence)*
- **Fallback formulaire** (reporté Vague 4 → à confirmer V4) : formulaire court 3 champs (nom / email / message) en repli si l'utilisateur ne veut pas Cal.com.

---

#### 9.2.8 MagicBento /a-propos — reformulation "Transparence"

**Ancien (trop vague)** : *"Pas de mauvaise surprise."*

**Nouveau validé** :
> ***Pas de surprise. On cadre le périmètre et le budget ensemble, par écrit, avant tout engagement.***

Cohérent avec la FAQ /offres réécrite (§5.7). Martèle la promesse anti-devis surprise.

---

### 9.3 Plan V4 — Table des actions (prêt pour Gemini)

#### 🔴 Critique (C1-C4) — bloquants CRO

| # | Action | Fichier | Contenu exact |
|---|---|---|---|
| **C1** | Remplacer H1 + Sub home | `src/app/page.tsx` | H1 §9.2.1 + Sub §9.2.1 |
| **C2** | Remplacer H1 + ajouter CTA hero /a-propos | `src/app/a-propos/AProposClient.tsx` | H1 §9.2.2 + CTA "Discuter de mon projet" |
| **C3** | Nettoyer contact (email pro + retirer "Victor") | `src/app/contact/ContactClient.tsx` + `src/lib/seo.ts` | `CONTACT_EMAIL = 'contact@mvagency.ai'` + revue sidebar |
| **C4** | Remplacer 3 témoignages fictifs /services par projets réels | `src/app/services/page.tsx` | Tableau §9.2.5 (Alexandre L. / Christophe Marchetti / Nicolas D.) |

#### 🟠 Important (I1-I8) — gains conversion directs

| # | Action | Fichier |
|---|---|---|
| **I1** | Ajouter titre de transition *"3 packs pour 3 ambitions"* /offres | `src/app/offres/page.tsx` |
| **I2** | Supprimer card "Écosystèmes E-commerce" de la FeaturesGrid /services | `src/app/services/page.tsx` |
| **I3** | Ajouter card "Intégrations IA" en 6ème position | `src/app/services/page.tsx` |
| **I4** | Harmoniser tous les CTA selon le tableau §9.2.6 | toutes pages |
| **I5** | Supprimer définitivement le libellé *"Demander un devis"* | global |
| **I6** | Reformuler MagicBento Transparence /a-propos | `src/app/a-propos/AProposClient.tsx` |
| **I7** | Vérifier que le badge social proof *"10+ projets digitaux livrés · Web · IA · Automatisation"* est cohérent sur home + /contact | `src/app/page.tsx` + `src/app/contact/ContactClient.tsx` |
| **I8** | Vérifier que les 3 badges garantie (§5.8) sont bien présents sur **home** ET **/offres** | `src/app/page.tsx` + `src/app/offres/page.tsx` |

#### 🟡 Mineur (M1-M3) — polish final

| # | Action | Fichier |
|---|---|---|
| **M1** | Vérifier libellé "Partenaires techniques certifiés" au-dessus/dessous de la row logos | `src/app/page.tsx` |
| **M2** | Confirmer `filter: grayscale(0.15) brightness(0.9); opacity: 0.85;` sur les photos humaines du badge social proof | `src/app/page.tsx` + `src/app/contact/ContactClient.tsx` |
| **M3** | Vérifier footer : *"Basé à La Réunion · Intervention France & Belgique"* bien présent | `src/components/Footer.tsx` |

---

### 9.4 Points **non** inclus dans V4 (reportés Vague 4 ou après)

- Formulaire fallback /contact (à confirmer selon usage Cal.com)
- Sticky CTA mobile /services & /offres
- Tracking GA4/Plausible sur clics FAQ
- Audit meta titles / descriptions (à coupler avec audit SEO)
- Open Graph image (dark social CTR)
- Footer CRO enrichi (mini-CTA + newsletter)
- Photo pro Victor sur /a-propos (quand session photo réalisée)
- Pages GEO (La Réunion / Belgique / France) pour SEO local

---

### 9.5 Checklist exécution Gemini

1. ☐ Appliquer C1 → C4 (critiques)
2. ☐ Appliquer I1 → I8 (importants)
3. ☐ Appliquer M1 → M3 (mineurs)
4. ☐ `npm run build` doit passer sans erreur TS
5. ☐ Screenshots des 5 pages avant/après pour validation Victor
6. ☐ Remonter toute ambiguïté de copy à Victor avant d'improviser

---

## 10. Re-audit v3 (post-Gemini) + Plan V5 (validé)

**Contexte** : après l'exécution V4 par Gemini, lecture directe des fichiers source pour identifier les écarts résiduels + nouveaux besoins exprimés par Victor. 8 points tranchés → Plan V5 prêt pour Gemini.

> **Rôles** : Claude = audit code + arbitrage stratégique · Gemini = exécution front-end.

---

### 10.1 Écarts & nouveaux besoins (8 points tranchés)

| # | Sujet | État v3 (code réel) | Décision V5 |
|---|---|---|---|
| 1 | Badge social proof | `"10+ projets digitaux livrés · Web · IA · Automatisation"` (trop dense) | Raccourcir à **`"10+ projets livrés · Web & IA"`** |
| 2 | Urgence/rareté | Absent | **Ajouter pill** *"🟢 2 places restantes · Onboarding [mois]"* + config auto-rotation mois |
| 3 | MagicBento "Transparence" home | ❌ Ancienne version encore en place (`MagicBento.tsx` L89-92 : *"Des forfaits clairs..."*) | **Reformuler** avec la version /a-propos |
| 4 | CTAs /services | Primaire=*"Voir nos packs"* / Outline=*"Réserver un appel offert"* (illogique) | **Inverser** : Primaire=*"Réserver un appel offert"* / Outline=*"Voir nos packs"* (hero + CTA final) |
| 5 | Icône "Intégrations IA" FeaturesGrid | Emoji 🤖 brut (casse le style) | Remplacer par **`FaRobot`** (react-icons/fa) |
| 6 | Bénéfices Création Web | ✅ Déjà en place (*Rapide · SEO-ready · Évolutif · 100% propriétaire*) | RAS |
| 7 | Héros génériques (4 pages même template) | Même structure titre+sub+CTAs partout | **Varier** : home intouché / services split / offres direct packs / a-propos éditorial |
| 8 | Italique H1 /a-propos coupé | CSS `padding-right` manquant sur span italique | **Fix** `padding-right: 0.1em` sur le span gradient italique |

---

### 10.2 Spec détaillée — Annonce disponibilités (point 2)

**Nouveau fichier** : `src/config/availability.ts`

```ts
// Override manuelle : ajuster quand Victor signe un client
// 0 = pill masquée (complet) · 1-3 = nombre de créneaux affiché
export const AVAILABLE_SLOTS = 2;

// Mois courant auto (après le 25, afficher le mois suivant)
export const getCurrentMonthLabel = (): string => {
  const months = ['janvier','février','mars','avril','mai','juin',
                  'juillet','août','septembre','octobre','novembre','décembre'];
  const now = new Date();
  const monthIndex = now.getDate() > 25
    ? (now.getMonth() + 1) % 12
    : now.getMonth();
  return months[monthIndex];
};
```

**Composant pill** (à créer en tant que composant réutilisable `src/components/ui/AvailabilityPill.tsx`) :

```tsx
import { AVAILABLE_SLOTS, getCurrentMonthLabel } from '@/config/availability';

export const AvailabilityPill = () => {
  if (AVAILABLE_SLOTS <= 0) return null;
  const plural = AVAILABLE_SLOTS > 1;
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      borderRadius: '999px',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      backgroundColor: 'rgba(34, 197, 94, 0.08)',
      fontSize: '0.85rem',
      color: 'var(--text-light)',
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%',
        backgroundColor: '#22c55e',
        boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
      }} />
      <span>
        <strong>{AVAILABLE_SLOTS} place{plural ? 's' : ''} restante{plural ? 's' : ''}</strong>
        {' · Onboarding '}{getCurrentMonthLabel()}
      </span>
    </div>
  );
};
```

**Placement** : au-dessus du H1, dans le hero de `/` et `/contact`. `marginBottom: 1.5rem` pour respirer avec le titre.

---

### 10.3 Spec détaillée — Héros variés (point 7)

#### 10.3.1 Home `/` → intouché ✅

Le hero home actuel (H1 animé `TextReveal` + sub + 2 CTAs + social proof pill) est **verrouillé**. Ajouter uniquement la `AvailabilityPill` juste au-dessus du H1.

#### 10.3.2 `/services` → split 60/40 avec animation écosystème

**Layout** :
- Colonne gauche (60%) : H1 + sub + 2 CTAs (même copy qu'actuel)
- Colonne droite (40%) : **animation "écosystème"** — Victor fournira le prompt/concept exact plus tard

**Direction créative validée par Victor** :
> *Montrer que MV n'est pas 3 services séparés mais un écosystème connecté. 3 nœuds (IA · Automatisation · Interface Web) reliés par des flux animés (lignes qui pulsent, data qui circule). Peut aussi prendre la forme d'un cercle avec les 4 piliers qui orbitent autour d'un noyau central "MV".*

**Note Gemini** : ne rien construire tant que Victor n'a pas fourni le prompt final. Réserver un placeholder `<div className={styles.heroVisualSlot} />` avec aspect-ratio 1/1 pour que l'intégration future soit propre.

**Adaptation responsive** : en dessous de 900px, bascule en une seule colonne (visuel en-dessous du texte).

#### 10.3.3 `/offres` → virer le hero générique, packs directement

**Suppression** : le hero actuel (titre *"Des solutions web sur-mesure propulsées par l'intelligence artificielle"* + sub + CTA *"Voir les packs"*) → **supprimé intégralement**.

**Nouveau début de page** :
- H1 de page minimal et court (hors structure hero) : ***"3 packs pour 3 ambitions."***
- Sub court sous le H1 : *"Du site vitrine au business propulsé par l'IA. On cadre le périmètre et le budget ensemble."*
- Directement **les 3 packs** (section S2 actuelle, promue en S1)

L'utilisateur voit immédiatement la matière commerciale. Plus de scroll inutile sur un hero générique qui répète ce que dit la home.

#### 10.3.4 `/a-propos` → éditorial asymétrique flottant

**Remplacer** le hero actuel (H1 centré + sub + CTA centré) par un **layout éditorial magazine** :

**Structure** :
- **Citation en haut à gauche** (position légèrement descendue du top, ~40% de l'écran hauteur)
  - Texte : ***"On ne vend pas du code. On vend l'autonomie."***
  - Typo : `Darker Grotesque`, très gros (`clamp(2.5rem, 6vw, 5rem)`), line-height serré (1.05), poids 600-700
  - Largeur max ~55% du viewport
  - Alignement : `text-align: left`
  
- **Signature en bas à droite** (position ancrée bas-droite avec légère marge)
  - Texte : *"— Victor, fondateur"*
  - Typo : plus petit (`1.1rem`), poids 400, couleur `var(--text-muted)`, italique
  - **Animation float** : oscillation douce vertical/horizontal, infinie, 6-8s, ease-in-out
  
- **Aucun CTA dans ce hero** — le CTA *"Discuter de mon projet"* remigre dans le bento bottom (S5).

**Animation float signature** (CSS) :
```css
@keyframes floatSignature {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-4px, -6px); }
  50% { transform: translate(3px, -3px); }
  75% { transform: translate(-2px, 4px); }
}
.signature {
  animation: floatSignature 7s ease-in-out infinite;
}
```

**Responsive** : en dessous de 768px, la signature se déplace en-dessous de la citation (empilement vertical), toujours alignée à droite, animation conservée.

---

### 10.4 Specs petites modifs (points 1, 3, 4, 5, 8)

#### 10.4.1 Badge social proof — raccourcir (point 1)

Remplacer le texte dans **`page.tsx` L219** ET **`ContactClient.tsx` L137** :

```diff
- <strong>10+ projets digitaux livrés</strong> · Web · IA · Automatisation
+ <strong>10+ projets livrés</strong> · Web & IA
```

Le reste (photos + pill) inchangé.

#### 10.4.2 MagicBento Transparence home (point 3)

Dans `src/components/ui/MagicBento.tsx` L89-92 :

```diff
{
  color: 'rgba(10, 10, 10, 0.65)',
  title: 'Transparence',
- description: 'Des forfaits clairs. Pas de ligne cachée dans les devis, vous savez exactement ce que vous payez.',
+ description: 'Pas de surprise. On cadre le périmètre et le budget ensemble, par écrit, avant tout engagement.',
  label: 'Confiance',
  icon: <ShieldCheck size={18} color="#60A5FA" />
}
```

#### 10.4.3 CTAs /services inversés (point 4)

Dans `src/app/services/page.tsx` **L37-44** (hero) :

```diff
- <Link href="/offres" tabIndex={-1}>
-   <Button variant="primary">Voir nos packs</Button>
- </Link>
- <Link href="/contact" tabIndex={-1}>
-   <Button variant="outline">Réserver un appel offert</Button>
- </Link>
+ <Link href="/contact" tabIndex={-1}>
+   <Button variant="primary">Réserver un appel offert</Button>
+ </Link>
+ <Link href="/offres" tabIndex={-1}>
+   <Button variant="outline">Voir nos packs</Button>
+ </Link>
```

**Idem CTA final** L217-224 : inverser primary/outline.

#### 10.4.4 Icône Intégrations IA (point 5)

Dans `src/components/ui/FeaturesGrid.tsx` :

```diff
+ import { FaDesktop, FaPenNib, FaChartLine, FaBolt, FaSitemap, FaShieldAlt, FaCheckCircle, FaRobot } from 'react-icons/fa';

...

- icon: <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🤖</span>,
+ icon: <FaRobot />,
  title: "Intégrations IA",
```

#### 10.4.5 Fix italique H1 /a-propos coupé (point 8)

*(Applicable uniquement si le hero /a-propos garde un H1 avec span gradient italique. Dans le nouveau layout éditorial (10.3.4), la citation n'a pas d'italique → non applicable directement.)*

**Règle globale à appliquer** sur tous les spans gradient-italique du site (home, services, offres, a-propos bento) : ajouter `paddingRight: '0.1em'` inline pour éviter le clip de la dernière lettre italique.

Grep pour repérer les occurrences :
```bash
grep -rn "WebkitTextFillColor.*transparent" src/app --include="*.tsx"
```

---

### 10.5 Plan V5 — Table d'exécution Gemini

#### 🔴 Critique (C1-C3) — bloquants

| # | Action | Fichier |
|---|---|---|
| **C1** | Refondre hero `/offres` (virer le hero générique, H1 direct packs §10.3.3) | `src/app/offres/page.tsx` |
| **C2** | Refondre hero `/a-propos` en layout éditorial flottant (§10.3.4) | `src/app/a-propos/AProposClient.tsx` + `APropos.module.css` |
| **C3** | Transformer hero `/services` en split 60/40 + placeholder visuel (§10.3.2) | `src/app/services/page.tsx` + `Services.module.css` |

#### 🟠 Important (I1-I5)

| # | Action | Fichier |
|---|---|---|
| **I1** | Créer `src/config/availability.ts` + `src/components/ui/AvailabilityPill.tsx` (§10.2) | 2 nouveaux fichiers |
| **I2** | Intégrer `<AvailabilityPill />` au-dessus du H1 home + contact | `src/app/page.tsx` + `src/app/contact/ContactClient.tsx` |
| **I3** | Inverser CTAs hero + final `/services` (§10.4.3) | `src/app/services/page.tsx` |
| **I4** | Reformuler Transparence MagicBento home (§10.4.2) | `src/components/ui/MagicBento.tsx` |
| **I5** | Raccourcir badge social proof (§10.4.1) | `src/app/page.tsx` + `src/app/contact/ContactClient.tsx` |

#### 🟡 Mineur (M1-M2)

| # | Action | Fichier |
|---|---|---|
| **M1** | Remplacer emoji 🤖 par `FaRobot` dans FeaturesGrid (§10.4.4) | `src/components/ui/FeaturesGrid.tsx` |
| **M2** | Audit `paddingRight: '0.1em'` sur tous les spans gradient-italique (§10.4.5) | global (grep) |

---

### 10.6 Hors V5 — en attente (input Victor requis)

- **Prompt animation écosystème `/services`** : Victor doit fournir le prompt Claude/AI pour l'animation à droite du hero split. En attendant, Gemini réserve juste le placeholder.
- **Photo pro Victor** : quand la session photo sera faite, décider si on l'injecte dans le bloc historyGrid `/a-propos` (remplacer le stock Unsplash actuel).

---

### 10.7 Checklist exécution Gemini V5

1. ☐ Appliquer C1 → C3 (refonte héros)
2. ☐ Appliquer I1 → I5 (urgence + CTAs + copy)
3. ☐ Appliquer M1 → M2 (polish)
4. ☐ `npm run build` doit passer sans erreur TS
5. ☐ Vérifier responsive sur les 3 nouveaux héros (mobile 375px + tablet 768px)
6. ☐ Screenshots before/after des 4 pages pour validation Victor
7. ☐ **NE PAS** construire l'animation écosystème `/services` — juste le placeholder

---

*Fin du document v4 — Plan V5 prêt pour exécution Gemini.*
