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
