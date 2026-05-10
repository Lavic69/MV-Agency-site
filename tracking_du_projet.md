# Tracking & Historique : Projet MV Agency

*Ce fichier constitue le "Logbook" (journal de bord) du projet. À chaque fin de session ou grand avancement, les actions accomplies y seront tracées pour que n'importe quelle session future reprenne exactement où nous en étions.*

## Phase 1 : Brainstorming, Analyse & Préparation (Actuelle)
- **[Terminé]** Définition de la stack technologique (Next.js, Vercel, Vanilla CSS modules).
- **[Terminé]** Création de la "Bible" du projet (`Brainstorming_MV_Agency.md`) intégrant les décisions clés.
- **[Terminé]** Analyse du PDF natif `Brand Guidelines Version 1`.
- **[Terminé]** Mise au propre de l'identité : Focus sur le Noir (`#0A0A0A`), Bleu néon (`#2563EB`), et les typographies (`Darker Grotesque` + `DM Sans`).
- **[Terminé]** Définition du Sitemap : Accueil, Services, Offres & Packs, À propos, Contact + footer légal.
- **[Terminé]** Mise en place d'un `design_system.md` global.
- **[En Attente]** Réponse : Choix définitif entre lien Calendly externe OU Formulaire de contact local pour le CTA.
- **[En Attente]** Validation finale par le client du Plan d'Implémentation (`implementation_plan.md`).

## Phase 2 : Création de l'Infrastructure
- `[ ]` `npx create-next-app` pour l'amorçage.
- `[ ]` Nettoyage du code par défaut.
- `[ ]` Ajout des polices `Darker Grotesque` et `DM Sans` dans le layout.
- `[ ]` Mise en place du `globals.css` (Variables CSS du design system + Reset).

## Phase 3 : Développement des Composants Fondateurs
- `[ ]` Header (Navigation, Logo "Darker Grotesque", Bouton CTA "Neon Glow").
- `[ ]` Footer (Légal & navigation secondaire).
- `[ ]` Définition des classes utilitaires (Boutons, Containers Premium).

## Phase 4 : Assemblage des Pages & Intégration
- `[ ]` Page : Accueil.
- `[ ]` Page : Services.
- `[ ]` Page : Offres & Packs.
- `[ ]` Page : À propos.
- `[ ]` Page : Contact.

## Phase 5 : Finalisation CRO & Lancement
- `[ ]` Polissage des micro-animations (Neon glow hover).
- `[ ]` Déploiement Vercel.

---

## Session J2 — 19/04/2026 — Infra email & débogage build

### 🎯 Contexte
Reprise de session. Objectifs : (1) finaliser l'infrastructure email pro sur `mvagency.ai`, (2) résoudre le hang du build TypeScript qui bloquait toute perspective de déploiement.

### ✅ Infra email — TERMINÉ
- **Domaine `mvagency.ai`** lié Cloudflare ↔ Infomaniak kSuite Standard.
- **6 enregistrements DNS** posés dans Cloudflare (tous en DNS only / grey cloud) :
  - `MX` → `mta-gw.infomaniak.ch` priorité 5
  - `TXT @` (SPF) → `v=spf1 include:spf.infomaniak.ch -all`
  - `TXT 20260419._domainkey` (DKIM) → clé complète Infomaniak
  - `CNAME autoconfig` → `infomaniak.com`
  - `CNAME autodiscover` → `infomaniak.com`
  - `TXT _dmarc` → `v=DMARC1; p=quarantine; rua=mailto:contact@mvagency.ai; ruf=mailto:contact@mvagency.ai; adkim=s; aspf=s; pct=100; fo=1`
- **2 adresses email créées** :
  - `contact@mvagency.ai` (publique/générique)
  - `victor.marchetti@mvagency.ai` (perso/pro)
- **2 signatures HTML premium** installées (HTML avancé dans Infomaniak) :
  - Palette 100% bleu MV Agency : navy `#1A1F4B` + primaire `#2563EB`
  - Logo hébergé sur imgbb : `https://i.ibb.co/N6nFYWfr/Logo-Rond-MV-V2.png`
  - CTA Cal.com, LinkedIn, tagline "L'art du web, la puissance de l'IA"

### 🔧 Debug tsc hang — RÉSOLU
**Symptôme** : `npm run build` restait bloqué à "Running TypeScript ..." indéfiniment (0% CPU, STAT=S).

**Causes identifiées** (par couches) :
1. **Lockfile parasite** `/Users/lavic/package.json` + `/Users/lavic/package-lock.json` (résidu d'un `npm install n8n` dans le home directory). → **Supprimés**.
2. **Cause principale** : `@calcom/embed-react@1.5.3` est buildé avec `@types/react@18.0.26` pinné. Le projet utilise **React 19** → conflit de types qui met tsc en état zombie (pas d'erreur, pas de CPU, stuck indéfini).
3. **État incohérent du `node_modules`** après `npm uninstall @calcom/embed-react` (le `tsconfig.tsbuildinfo` gardait des références fantômes).

**Fix appliqué** :
1. `src/app/contact/ContactClient.tsx` : remplacé `import Cal, { getCalApi } from "@calcom/embed-react"` par un `<iframe>` natif pointant sur `https://cal.com/victor-marchetti/30min/embed` avec tes params (theme=dark, brandColor=2563EB, darkBrandColor=60A5FA, layout=month_view).
2. `npm uninstall @calcom/embed-react`.
3. **Nuclear reset** : `rm -rf node_modules package-lock.json .next tsconfig.tsbuildinfo` + `npm install`.
4. Corrigé les erreurs TS révélées après le déblocage :
   - `src/components/ui/FadeIn.tsx` : ajout de la prop optionnelle `style?: React.CSSProperties` (+ merge avec le style interne).
   - `src/components/ui/MagicBento.tsx` ligne 18 : typo `backgroundcolor` → `backgroundColor`.
   - `src/components/ui/mockups/MockupWeb.tsx` lignes 48 & 55 : même typo × 2.

### 📊 Résultat build final
```
✓ Compiled successfully in 3.1s
  Finished TypeScript in 2.9s
  Generating static pages (16/16) in 1894ms
```
**De hang infini → 8 secondes total.** 16 routes statiques générées, dont `/robots.txt` et `/sitemap.xml` (déjà en place, à auditer).

### ⚠️ Règle opérationnelle pour la suite
**Ne jamais lancer `npm run build` en parallèle d'un `next dev` dans le même projet** — file-lock deadlock sur `.next/` qui imite un hang. Tuer le dev avant un build.

### 🔜 Reste à faire (priorisé)
- `[ ]` Fixer le rendu visuel du nouveau `<iframe>` Cal.com sur `/contact` (actuellement carré blanc).
- `[ ]` Audit du contenu de `sitemap.ts` + `robots.ts` existants.
- `[ ]` Pages légales (mentions, CGV, politique de confidentialité) : compléter les trous.
- `[ ]` Déploiement Vercel + branchement DNS `mvagency.ai` sur le site.
- `[ ]` Investiguer la "1 high severity vulnerability" signalée par `npm audit`.
- `[ ]` Pages GEO (La Réunion / Belgique / France) pour SEO local.

---

## Session J3 — 08/05/2026 — Audit SEO/GEO + infra mesure & analytics

### 🎯 Contexte
Audit SEO/GEO complet du repo (état des lieux vs. plans `SEO MV Agency.md` + `GEO_Plan_MV_Agency.md`). Constat : socle technique excellent (schemas, robots IA, sitemap dynamique, llms.txt, page géo Réunion, 1 article blog), mais **trou critique côté mesure** : aucune analytics, aucune verification GSC/Bing, aucun event tracking. Décision user : pas de Google Analytics + bandeau cookies pour démarrer (friction UX). On part sur du **gratuit, sans cookies, sans bandeau**.

### ✅ Wave 1 — Tracking foundation (sans cookies, sans bandeau RGPD)
- `[x]` `npm install @vercel/analytics @vercel/speed-insights` — packages installés.
- `[x]` `<Analytics />` + `<SpeedInsights />` injectés dans `src/app/layout.tsx` (chargés sur tous les routes).
- `[x]` `metadata.verification` ajouté dans `layout.tsx` : lit `NEXT_PUBLIC_GSC_VERIFICATION` + `NEXT_PUBLIC_BING_VERIFICATION` depuis l'env. Tant que vide, aucune meta tag injectée.
- `[x]` Helper `src/lib/analytics.ts` : `trackEvent(name, props)` qui pousse vers Vercel Analytics + Clarity (si dispo). Constantes `EVENTS` listées pour autocomplete (`cal_booking_opened`, `pack_selected`, `contact_cta_clicked`, etc.).
- `[x]` `.env.example` créé avec instructions pas-à-pas pour GSC + Bing + Clarity.

### ✅ Wave 2 — Microsoft Clarity (dormant)
- `[x]` Composant `src/components/analytics/Clarity.tsx` — chargé uniquement si `NEXT_PUBLIC_CLARITY_ID` est défini ET si `localStorage["mv-analytics-consent"] === "granted"`. Tant qu'aucune des deux conditions n'est remplie : `return null;` → snippet Clarity jamais injecté.
- `[x]` Wired dans `layout.tsx`, prêt à activer en 5 min via env var (et un futur ConsentBanner).

### ✅ Wave 3a — Icônes PWA dynamiques
- `[x]` `src/app/icon.tsx` : génère 3 PNG via `next/og` + `generateImageMetadata` → `/icon/favicon` (32×32), `/icon/android-192`, `/icon/android-512`. Design : monogramme "MV" sur dégradé navy → bleu primaire.
- `[x]` `src/app/apple-icon.tsx` : 180×180 même style pour iOS Add to Home Screen.
- `[x]` `manifest.ts` mis à jour : référence les routes `/icon/android-192` et `/icon/android-512` (purpose any + maskable).
- `[x]` Plus de dépendance au gros `Logo_Rond_MV_V2.svg` (362 KB) pour les icônes système.

### ✅ Wave 3b — Page géo Belgique
- `[x]` `src/app/agence-web-belgique/page.tsx` créée — mirror structurel de la page Réunion adapté au contexte belge :
  - Métadonnées dédiées (title, description, OG, canonical)
  - JSON-LD `BreadcrumbList` + `ProfessionalService` (parentOrganization → MV Agency, areaServed Bruxelles/Wallonie/Liège/Namur/Charleroi/Mons/Tournai/Louvain-la-Neuve)
  - JSON-LD `FAQPage` avec 8 Q/R Belgique-spécifiques (TVA autoliquidation, RGPD, méthode async, fuseau horaire, types d'entreprises)
  - Sections : Hero / Différenciateurs / Services / AnswerBlock GEO / Zones / Stack / FAQ / CTA
  - Réutilise `AgenceReunion.module.css` via import relatif (même charte visuelle, scoping CSS modules respecté)
- `[x]` `sitemap.ts` : ajout entrée `/agence-web-belgique` priority 0.9.
- `[x]` `plan-du-site/page.tsx` : ajout du lien dans la section "Zones d'intervention".

### ✅ Wave 3c — Migration `<img>` → `next/image` (LCP-critique)
- `[x]` `next.config.ts` : ajout `images.remotePatterns` pour `images.unsplash.com` + `svgl.app`.
- `[x]` `src/app/cas-clients/ProjectMockup.tsx` : 3 `<img>` → `<Image fill>` avec `sizes` adaptés. Impact massif (les screenshots projet font 4-12 MB chacun avant optim Next).
- `[x]` `src/app/a-propos/AProposClient.tsx` ligne 189 : photo Victor en `<Image fill priority>` (LCP candidate sur /a-propos).
- `[x]` `src/app/blog/BlogClient.tsx` : cover blog en `<Image fill>` avec `priority` sur la première carte.
- `[x]` Restent en `<img>` natif (impact LCP négligeable) : avatars Unsplash dans /contact (28×28, décoration), logos svgl.app dans LogoLoop /home (déjà tiny SVGs).

### ✅ Wave 4 — Documentation
- `[x]` `tracking_du_projet.md` (ce fichier) : section J3 ajoutée.
- `[ ]` `SEO MV Agency/SEO MV Agency.md` : update §1.4 (problèmes résolus) + §6 (Track A restant) + §9 (journal).
- `[ ]` `politique-de-confidentialite/page.tsx` : mention Vercel Analytics (cookieless, conforme).

### 📊 Résultat build final
```
✓ Compiled successfully in 1.5s
  Finished TypeScript in 2.1s
  Generating static pages (24/24) in 630ms
```
**De 16 → 24 routes statiques** : ajout `/agence-web-belgique`, `/apple-icon`, `/icon/[favicon|android-192|android-512]`, `/manifest.webmanifest`. Toutes les routes existantes restent statiques.

### 🔜 À faire post-déploiement Vercel (par Victor, gratuit)
1. **Google Search Console** → ajouter propriété `https://mvagency.ai` → méthode "Balise HTML" → copier la valeur dans Vercel env var `NEXT_PUBLIC_GSC_VERIFICATION`.
2. **Bing Webmaster Tools** → import depuis GSC en 1 clic → copier la valeur dans `NEXT_PUBLIC_BING_VERIFICATION`.
3. **Vercel Analytics** → activer dans Vercel Dashboard → Project → Analytics → Enable (Web Analytics + Speed Insights). Aucune env var nécessaire.
4. **(Plus tard, optionnel)** Microsoft Clarity → créer projet → coller ID dans `NEXT_PUBLIC_CLARITY_ID` → poser un ConsentBanner RGPD pour activer le chargement (sinon le composant reste dormant).

### 🚫 Décisions actées (à ne pas reprocher dans 6 mois)
- **Pas de GA4 + bandeau cookies pour l'instant** : friction UX > valeur data au stade actuel (0 trafic). On reviendra dessus si besoin de retargeting Google Ads ou si Vercel Analytics atteint sa limite (50k events/mois sur plan Hobby).
- **Pas de Plausible** : payant (€9/mois). Vercel Analytics couvre les besoins.
- **Pas de pixel Meta / LinkedIn Insight** : pas de comptes ads créés, pas de campagnes prévues court terme.
- **`sameAs` Organization vide** : LinkedIn entreprise + Clutch pas encore créés. À injecter dans `src/lib/seo.ts` quand les profils existent.
