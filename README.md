# MV Agency - Site Web Officiel

## 📁 À propos du projet
MV Agency est une agence digitale fondée par Victor Marchetti, spécialisée dans la création de sites web performants, l'intégration d'intelligence artificielle et l'automatisation. Ce projet correspond au code source du site vitrine de l'agence.

Le site a pour but de mettre en avant les différentes expertises de MV Agency, son approche pédagogique ainsi que ses 3 packs évolutifs, dans un écrin graphique reprenant les codes d'un positionnement "Dark Mode, Premium, Minimaliste".

**Stack Technique Principale :**
- **Framework** : Next.js (App Router)
- **Langage** : TypeScript / React
- **Styling** : Vanilla CSS Modules (approches variables CSS globales)
- **Animations & Interactif** : Framer Motion, GSAP, Radix UI et de nombreux composants customisés (Three.js/LiquidEther)
- **Prise de rendez-vous** : Cal.com (Embed React)

## 🎨 Design System et Identité Visuelle
Afin de préserver la cohérence visuelle, le projet suit de très près les directives définies dans le fichier `design_system.md` :
- **Fond principal** : Noir Absolu (`#0A0A0A`)
- **Accentuation (Glow/Neon)** : Bleu Néon (`#2563EB`) et Bleu Indigo Sombre (`#1A1F4B`)
- **Polices Principales** : `Darker Grotesque` (pour l'impact visuel Tech de tous les titres) et `DM Sans` (pour la lisibilité du corps de texte).

## 🗺️ Arborescence des Pages (Routing)
Le projet se sert de l'App Router de Next.js (dossier `src/app`). Voici les différentes pages implémentées :

- **Accueil (`/`)** ➔ `src/app/page.tsx` : La page principale avec la mise en avant des partenaires (`LogoLoop`), les services via un système Bento (`MagicBento`) et l'ambiance globale du site animée par `LiquidEther`.
- **À propos (`/a-propos`)** ➔ `src/app/a-propos/page.tsx` : Présentation du founder, des fondations et des valeurs de l'agence.
- **Services (`/services`)** ➔ `src/app/services/page.tsx` : Exploration des expertises web et IA.
- **Offres & Packs (`/offres`)** ➔ `src/app/offres/page.tsx` : Détails tarifaires et inclusions des 3 packs (Fondation, Croissance, Performance IA).
- **Cas Clients / Réalisations (`/cas-clients`)** ➔ `src/app/cas-clients/page.tsx` : Témoignages et cas d'usage.
- **Contact (`/contact`)** ➔ `src/app/contact/page.tsx` : Formulaires et Call-To-Action pour convertir ou réserver avec l'agence.
- **Blog (`/blog`)** ➔ `src/app/blog/page.tsx` : Le centre d'informations et d'articles SEO pour le trafic inbound.

## 🧱 Architecture des Composants (`src/components/`)
La majeure partie des composants réutilisables se trouve dans `src/components/ui/` :

- **Effets premium** : `LiquidEther.jsx` (Ciel étoilé / fluide en fond), `MagicBento.tsx` (Grille interactive style Bento avec effets de hover lumineux), `TextReveal.tsx` et `glow-card.tsx`.
- **Preuve sociale & Data UX** : `LogoLoop.jsx` (carrousel infini de marques), `circular-testimonials.tsx` et `testimonials-columns.tsx`, `Timeline.tsx` (pour la roadmap du process client).
- **Basiques Ultrasignifiés** : `Button.tsx` (Boutons aux effets glow), `Features.tsx` et `FeaturesGrid.tsx` pour lister un grand nombre de bénéfices.
- Les Layouts transverses que sont `Header.tsx` (navigation principale) et `Footer.tsx` (liens en pied de page) se situent à la racine de `components`.

## 🚀 Référencement (SEO) et Performances
Le socle Next.js a été optimisé pour maximiser le rendu pour les moteurs de recherche :
- Les métadonnées de page (`title`, `description`) sont configurées via l'API interne dans le `layout.tsx` et modifiées indépendamment pour chaque route.
- **Fichiers Automatisés de Crawler** : 
  - `sitemap.ts` (`src/app/sitemap.ts`) : Conçu pour générer dynamiquement l'arborescence destinée à Google.
  - `robots.ts` (`src/app/robots.ts`) : Orientations pour l'indexation.
- Une structure de balises de contenu ultra-optimisée pour l'accessibilité via l'adoption de polices Google traitées en local (`next/font`).

## ⚙️ Contexte Développeur & Lancement
Si vous récupérez la main sur ce projet (Getting Started) :

1. **Installation des dépendances :**
   ```bash
   npm install
   ```
2. **Lancement du serveur de test en local :**
   ```bash
   npm run dev
   ```
   *Accès disponible sur [http://localhost:3000](http://localhost:3000)*

3. **Build de production :**
   ```bash
   npm run build
   ```

---
*Astuce aux contributeurs : Avant d'entamer de nouvelles pages ou une grande refonte stratégique, merci de consulter impérativement les fichiers sources `InfoMVAgency.md`, `Brainstorming_MV_Agency.md` et `tracking_du_projet.md` situés à la racine pour bien saisir l'état d'esprit et l'approche commerciale historique de ce projet.*
