# Audit Design System — MV Agency

**Référence** : `design_system.md` (palette 5 couleurs, fonts Darker Grotesque + DM Sans, glow #2563EB, "borders fines / radius fin", "espaces énormes")
**Périmètre** : 90 fichiers `.tsx`/`.css` dans `src/`
**Date** : 2026-05-10

---

## Score global : 6/10

Le site a une **identité visuelle forte et cohérente** (dark mode + glow bleu), mais souffre de :
- Drift colorimétrique systémique (254 violations, 46× `#3b82f6` au lieu de `#2563EB`)
- Spacing hors grille (364 violations, principalement 5/6/10/15/30 px)
- Pattern Button non centralisé (12/66 fichiers seulement utilisent `<Button>`)
- Shadows lourdes contradictoires avec le ton "premium minimalist"
- DS document obsolète sur 2 points (radius pill, gradient bleu)

---

## 1. PALETTE — Drift critique

### 1.1 `#3b82f6` partout au lieu de `#2563EB` (46 occurrences)

Le DS définit **un seul bleu** (`#2563EB`). Le code utilise massivement `#3b82f6` (Tailwind blue-500, plus clair) — y compris dans le composant canonique :

```
components/ui/Button.module.css:43   background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)
components/ui/Button.module.css:54   background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)
components/ui/Timeline.tsx:156       0 0 10px #fff, 0 0 20px #3b82f6, 0 0 40px #3b82f6
app/offres/Offres.module.css:78      box-shadow: 0 0 30px rgba(59, 130, 246, 0.2)
app/offres/Offres.module.css:83      box-shadow: 0 10px 40px rgba(59, 130, 246, 0.4)
```

**Verdict** : ce n'est pas un bug, c'est un **gradient légitime** (bleu clair → primary) qui n'a jamais été codifié dans le DS.

**Action** : étendre la palette dans `globals.css` :
```css
--primary-500: #3b82f6;   /* gradient haut, hover, glow */
--primary-600: #2563EB;   /* primary canonique (CTA, séparateurs) */
--primary-400: #60a5fa;   /* hover top, lueur étendue */
```
Puis remplacer tous les `#3b82f6` literals par `var(--primary-500)`.

### 1.2 Couleurs hors-palette dans pages produit / mockups

| Fichier | Couleur | Usage | Décision |
| :--- | :--- | :--- | :--- |
| `app/agence-web-france/page.tsx:224-233` | `#61dafb #d97757 #635bff #4353ff #21759b #0055ff #714b67` | Logos React/Claude/Stripe/Adobe/WordPress/etc | **Garder** (couleurs de marques) |
| `app/cas-clients/ProjectMockup.module.css:47-49` | `#ff5f56 #ffbd2e #27c93f` | Boutons macOS du mockup browser | **Garder** (chrome système) |
| `app/contact/ContactClient.tsx:132-135` | `#222` (×4) | Backgrounds inline | **À remplacer** par `var(--secondary)` ou shade neutre |
| `app/offres/page.tsx:175` | `#080e1f #0a1228` | Background gradient | **À remplacer** par `var(--bg-neutral)` ou tokeniser comme `--bg-deep` |
| `app/offres/Offres.module.css:250` | `#1e40af` | bleu plus foncé | **Tokeniser** `--primary-700` |
| `components/ui/mockups/MockupHub.tsx` | `#22c55e` ×6, `#a78bfa` ×4 | Icônes "success / IA" dans mockups | **Tokeniser** `--success`, `--accent-ia` ou marquer comme couleurs de mockup illustratif |
| Multiples | `#9ca3af` ×6, `#111827` ×9 | Greys neutres | **Aligner** sur `--accent: #6B7280` ou ajouter `--text-muted: #9ca3af` |

### 1.3 Backgrounds inline incohérents (homepage)

Sur `src/app/page.tsx` (24 violations couleur, hotspot) — les sections alternent entre :
- `rgba(255,255,255,0.05)` (7×)
- `rgba(10,10,10,0.4)` (4×)
- `rgba(255,255,255,0.1)` (4×)
- `rgba(10,10,10,0.65)` (2×)

**Action** : extraire en `var(--bg-card)`, `var(--bg-overlay-subtle)`, `var(--bg-overlay-medium)`. Aujourd'hui c'est de la copie-colle qui dérive.

---

## 2. SPACING — 364 violations off-grid

### 2.1 Top offenders

| Valeur | Occurrences | Suggestion grille 4px |
| :--- | ---: | :--- |
| `10px` | 84 | `8px` ou `12px` |
| `6px` | 51 | `4px` ou `8px` |
| `30px` | 39 | `32px` |
| `5px` | 26 | `4px` |
| `15px` | 24 | `16px` |
| `14px` | 22 | `12px` ou `16px` |
| `50px` | 20 | `48px` (ou pattern radius pill, voir §3) |
| `60px` | 14 | `64px` |
| `100px` | 12 | `96px` |
| `22px / 18px / 13px / 25px` | divers | snap à 4px |

### 2.2 Hotspots à refactorer en priorité

| Fichier | Spacing violations |
| :--- | ---: |
| `components/ui/mockups/MockupWeb.tsx` | 50 |
| `components/ui/mockups/MockupHub.tsx` | 52 |
| `components/ui/MagicBento.tsx` | 20 |
| `components/ui/mockups/MockupWorkflow.tsx` | 18 |
| `app/Home.module.css` | 14 |
| `components/ui/mockups/MockupTree.tsx` | 12 |
| `app/cas-clients/ProjectMockup.module.css` | 12 |
| `app/contact/ContactClient.tsx` | 10 |
| `app/a-propos/APropos.module.css` | 10 |

**Note** : les mockups (MockupWeb, MockupHub, MockupTree…) sont des "représentations" de sites/UIs externes — leur spacing interne est un choix artistique, mais ils mériteraient quand même une grille 2px-step pour la rigueur.

### 2.3 Action recommandée

Définir des tokens d'espacement dans `globals.css` :
```css
--space-1: 4px;    --space-2: 8px;    --space-3: 12px;
--space-4: 16px;   --space-5: 20px;   --space-6: 24px;
--space-8: 32px;   --space-10: 40px;  --space-12: 48px;
--space-16: 64px;  --space-20: 80px;  --space-24: 96px;
```

---

## 3. RADIUS — Le DS document est faux

### 3.1 Contradiction documentation ↔ code

Le DS dit "border-radius fin" mais le code applique systématiquement **des pills 50px** :

```
components/ui/Button.module.css:8     border-radius: 50px       ← canonique
components/ui/Button.module.css:43    border-radius: 50px
components/Header.module.css:12       border-radius: 50px       ← header pill
app/services/Services.module.css:108  border-radius: 50px
app/contact/Contact.module.css:34     border-radius: 9999px
app/agence-web-la-reunion/ReunionMap.module.css:170  border-radius: 999px
```

C'est un **choix esthétique fort et cohérent** (tech moderne style Stripe/Linear) — la doc est donc obsolète, pas le code.

**Action** : mettre à jour `design_system.md` et tokeniser :
```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   16px;
--radius-card: 20px;   /* services, offres : déjà utilisé 20-24px */
--radius-pill: 9999px;
```
Puis remplacer les `50px` par `var(--radius-pill)` (visuellement identique au-dessus de 24px de hauteur).

### 3.2 Cards radius incohérentes

| Fichier | Valeur | Cible |
| :--- | :--- | :--- |
| `app/contact/Contact.module.css:153` | `24px` | `--radius-card` |
| `app/offres/Offres.module.css:105` | `20px` | `--radius-card` |
| `components/ui/MagicBento.css:32` | `20px` | `--radius-card` |

---

## 4. SHADOWS — Contradiction "premium minimalist"

23 ombres lourdes (rgba(0,0,0, ≥0.4)) qui tirent vers le "lourd dramatique" plutôt que le "premium subtil".

### 4.1 Cards qui pèsent trop

```
app/cas-clients/ProjectMockup.module.css:20   0 20px 40px rgba(0,0,0,0.4)
app/contact/Contact.module.css:158             0 20px 40px rgba(0,0,0,0.2)
app/offres/Offres.module.css:70                0 10px 30px rgba(0,0,0,0.5)
app/blog/Blog.module.css:106                   0 20px 40px rgba(0,0,0,0.4)
app/a-propos/APropos.module.css:122            0 20px 40px rgba(0,0,0,0.4)
app/Home.module.css:164                        0 15px 30px rgba(0,0,0,0.5)
components/ui/circular-testimonials.tsx:274    0 10px 30px rgba(0,0,0,0.5)
components/ui/FeaturesGrid.module.css:36       0 15px 40px rgba(0,0,0,0.4)
```

Pattern qui revient **8 fois** quasi à l'identique → c'est le shadow "card" canonique non documenté.

### 4.2 Action

Tokeniser :
```css
--shadow-card:  0 12px 32px rgba(0, 0, 0, 0.35);    /* alléger un cran */
--shadow-card-hover: 0 16px 48px rgba(0, 0, 0, 0.45);
--glow-primary: 0 0 30px rgba(37, 99, 235, 0.4);
--glow-primary-strong: 0 8px 30px rgba(37, 99, 235, 0.5);
--ring-subtle: 0 0 0 1px rgba(255, 255, 255, 0.08);
```

Et dégager le double-pattern incohérent `rgba(59, 130, 246, ...)` (bleu Tailwind) au profit de `rgba(37, 99, 235, ...)` (primary brand).

---

## 5. PATTERN BUTTON — Centralisation insuffisante

### 5.1 État

- `<Button>` est importé dans **12/66 fichiers TSX** (18 %).
- 5 boutons ad-hoc avec inline-styles détectés :
  - `app/cas-clients/page.tsx:101-102`
  - `app/a-propos/AProposClient.tsx:431`
  - `components/ui/circular-testimonials.tsx:217`
  - `components/Header.tsx:75` (légitime — variant `headerButton` pour padding réduit)

### 5.2 Action

1. Ajouter au `<Button>` une variante `size: 'sm' | 'md' | 'lg'` pour absorber le `headerButton` (padding `0.8rem 1.8rem`) plutôt que d'override en CSS module.
2. Migrer les 5 boutons ad-hoc vers `<Button>`.
3. Documenter `<Button variant="primary" | "outline">` dans `design_system.md` avec snapshot visuel.

---

## 6. TYPOGRAPHIE — RAS

✅ Aucune dérive détectée. Toutes les déclarations `font-family` utilisent `var(--font-heading)` ou `var(--font-body)`. Les 47 "violations" du scan automatique étaient des faux positifs (regex coupée sur la virgule de `var(--font-body), sans-serif`).

---

## 7. PRIORISATION DES FIXES

### Quick wins (≤ 2h)
1. **Étendre la palette** dans `globals.css` (tokens `--primary-400/500/600/700`, `--bg-card`, `--shadow-card`, `--glow-primary`, `--radius-*`)
2. **Mettre à jour** `design_system.md` (radius pill assumé, gradient bleu documenté, tokens spacing 4px-grid)
3. **Migrer les 5 buttons ad-hoc** vers `<Button>` + ajouter variant `size`

### Sweep moyens (½ journée)
4. **Remplacer `#3b82f6` literals** par `var(--primary-500)` dans tous les CSS modules (46 occurrences)
5. **Remplacer les shadows dupliquées** par `var(--shadow-card)` (8 fichiers)
6. **Snap des spacings** off-grid les plus visibles (homepage, offres, contact) sur grille 4px — laisser les mockups en l'état

### Refactor profond (1 jour+)
7. **Auditer les mockups** (`MockupWeb`, `MockupHub`, `MockupTree`, `MockupWorkflow`, `MockupIA`, `MockupEcosystem`) : extraire un mini design-system "mockup" si on garde les couleurs représentatives de logos, sinon harmoniser
8. **Bootstraper `.interface-design/system.md`** via `/extract` une fois les tokens consolidés, pour que les futurs `/audit` aient une vraie référence machine-lisible

---

## 8. CE QUI EST EXCELLENT

- **Cohérence des fonts** : 100% via tokens
- **Header** : pattern fort, glow logo, blur backdrop — exemplaire
- **Button primary** : effet conic-gradient animé, glow, sweep light → c'est de la haute couture, garder absolument
- **Variables CSS** : le système de tokens est en place, il manque juste à l'étendre

---

**Suggestion suivante** : exécuter `/extract` sur `components/ui/Button.module.css` et `components/Header.module.css` pour bootstraper `.interface-design/system.md` officiel, puis re-runner `/audit` pour un baseline machine-lisible.
