# Design System : MV Agency

Source of truth : `src/app/globals.css`. Toute valeur consommée doit passer par un token CSS variable.

## 1. Identité & Vibe

- **Style global** : Dark Mode, Sober, **Premium minimalist** (mode "quiet UI" — Linear/Vercel/Stripe).
- **Lignes directrices** : Fond très sombre + glow bleu mesuré. Beaucoup d'espaces noirs. Animations subtiles (transitions 0.3s, hover translateY 2-4px).
- **Iconographie** : Icônes monochromes (blanches ou bleues), lignes fines.
- **Graphismes** : Lignes, séparateurs et barres de progression en bleu.

## 2. Palette de Couleurs

### 2.1 Bleus — gradient documenté

Le primary n'est pas une couleur unique, c'est un **gradient à 4 stops** utilisé dans les CTAs, glows, hovers et accents.

| Token | HEX | Rôle |
| :--- | :--- | :--- |
| `--primary-400` | `#60a5fa` | Hover top du gradient bouton, gradient text, accents lumineux |
| `--primary-500` | `#3b82f6` | Haut du gradient primary, glows, séparateurs colorés |
| `--primary-600` | `#2563EB` | **Primary canonique** — séparateurs, ring, focus |
| `--primary-700` | `#1e40af` | Bas du gradient (pictogrammes profonds), états pressed |
| `--primary` | alias `--primary-600` | rétro-compat |

### 2.2 Backgrounds

| Token | Valeur | Usage |
| :--- | :--- | :--- |
| `--bg-neutral` | `#0A0A0A` | Fond principal de l'application |
| `--bg-deep` | `#080e1f` | Cards à fond profond (cards confiance homepage) |
| `--secondary` | `#1A1F4B` | Backgrounds bleu-indigo (modales, sections alternées) |
| `--bg-card` | `rgba(255, 255, 255, 0.04)` | Cards transparentes glass |
| `--bg-card-hover` | `rgba(255, 255, 255, 0.06)` | État hover des cards glass |
| `--bg-overlay-subtle` | `rgba(10, 10, 10, 0.4)` | Overlay léger sur image/vidéo |
| `--bg-overlay-strong` | `rgba(10, 10, 10, 0.65)` | Overlay sur header pill, social proof |

### 2.3 Texte & neutres

| Token | Valeur | Usage |
| :--- | :--- | :--- |
| `--text-light` | `#E5E7EB` | Texte principal sur fond noir |
| `--text-muted` | `#9ca3af` | Sous-titres, descriptions, placeholders |
| `--accent` | `#6B7280` | Bordures, disabled, séparateurs neutres |

## 3. Typographie

- **Titres, Logo, Navigation, CTA** : `Darker Grotesque` via `var(--font-heading)`
- **Texte courant, paragraphes, FAQ** : `DM Sans` via `var(--font-body)`

Aucune autre famille n'est autorisée. Les déclarations directes `font-family: 'X'` sont interdites — utiliser les tokens.

## 4. Spacing — grille 4px

Tous les paddings, margins, gaps doivent passer par les tokens (ou être un multiple de 4).

| Token | Valeur | Usage typique |
| :--- | :--- | :--- |
| `--space-1` | 4px | gap fin, micro-spacing |
| `--space-2` | 8px | gap, padding inline serré |
| `--space-3` | 12px | padding chip / badge |
| `--space-4` | 16px | padding card interne, gap moyen |
| `--space-5` | 20px | — |
| `--space-6` | 24px | section interne |
| `--space-8` | 32px | gap entre cards, padding card |
| `--space-10` | 40px | — |
| `--space-12` | 48px | grid gap large |
| `--space-16` | 64px | top-spacing avatar / icon |
| `--space-20` | 80px | padding section verticale |
| `--space-24` | 96px | hero padding |
| `--space-section` | 80px | padding vertical par défaut des sections |

**Valeurs interdites** : `5px`, `6px`, `10px`, `14px`, `15px`, `30px`, `50px` (sauf radius pill, voir §5).

## 5. Radius

Le site assume une esthétique **pill + cards arrondies** (style Linear/Stripe).

| Token | Valeur | Usage |
| :--- | :--- | :--- |
| `--radius-sm` | 4px | inputs, séparateurs fins |
| `--radius-md` | 8px | avatars sociaux, micro-éléments |
| `--radius-lg` | 16px | icônes carrées avec fond, badges |
| `--radius-card` | 20px | cards offres, services, MagicBento |
| `--radius-pill` | 9999px | **Boutons + Header** — signature visuelle |

⚠ Le DS antérieur disait "border-radius fin". C'est obsolète : le pill 50px / 9999px est intentionnel et constitue une signature.

## 6. Shadows — mode quiet

Toutes les ombres passent par tokens. Les valeurs sont **calibrées en mode Doux** : opacité réduite vs un look "dramatique".

| Token | Valeur | Usage |
| :--- | :--- | :--- |
| `--shadow-card` | `0 12px 32px rgba(0, 0, 0, 0.25)` | Cards par défaut |
| `--shadow-card-hover` | `0 16px 40px rgba(0, 0, 0, 0.32)` | Cards en hover |
| `--shadow-header` | `0 8px 32px rgba(0, 0, 0, 0.35)` | Header pill flottant |
| `--shadow-soft` | `0 4px 16px rgba(0, 0, 0, 0.2)` | Éléments légers (formulaires, chips) |
| `--ring-subtle` | `0 0 0 1px rgba(255, 255, 255, 0.08)` | Bord intérieur subtil sur card sombre |

## 7. Glows

| Token | Valeur | Usage |
| :--- | :--- | :--- |
| `--glow-primary` | `0 0 30px rgba(37, 99, 235, 0.4)` | Glow principal (logo, CTA hover) |
| `--glow-primary-soft` | `0 4px 15px rgba(37, 99, 235, 0.3)` | Glow léger (Button primary repos) |
| `--glow-primary-strong` | `0 8px 30px rgba(37, 99, 235, 0.5)` | Glow étendu (Button primary hover) |

## 8. UI Patterns

### 8.1 Boutons

Composant canonique : `<Button>` (`src/components/ui/Button.tsx`).

#### Variantes (`variant`)

- **Primary** : pill (`--radius-pill`), gradient `--primary-500 → --primary-600`, sweep conic-gradient blanc en arrière-plan animé, glow `--glow-primary-soft` au repos / `--glow-primary-strong` au hover, lift 2px en hover.
- **Outline** : pill, fond glass (linear-gradient sombre 80% opacity + backdrop-blur 12px), border 1px white/15%, hover border white/50%.
- **Magic** : variante primary avec animations sweep renforcées (utilisée notamment dans le Header).

#### Tailles (`size`)

| Prop | Valeurs | Usage typique |
| :--- | :--- | :--- |
| `size="sm"` | padding `0.8rem 1.8rem` / font `1rem` | Header, boutons secondaires dans carrousels, CTA compacts |
| `size="md"` *(défaut)* | padding `1.1rem 2.5rem` / font `1.25rem` | CTA hero, sections principales, contexte par défaut |
| `size="lg"` | padding `1.3rem 3rem` / font `1.4rem` | CTA proéminents (landing pages, sections "Réserver un appel" majeures) |

```tsx
<Button variant="primary" size="md" href="/contact">Réserver un appel</Button>
<Button variant="magic" size="sm">Header CTA</Button>
<Button variant="outline" size="sm">Voir le projet</Button>
```

⚠ Tout bouton ad-hoc en inline style `padding`/`font-size` est **non conforme**. Si une variante manque (taille intermédiaire, contexte spécifique), enrichir le composant `<Button>` avec une prop, ne pas dupliquer le style.
⚠ `!important` interdit dans les CSS modules pour override un `<Button>` — utiliser la prop `size` ou ajouter une variante.

### 8.2 Header

Pill flottant (`--radius-pill`), backdrop-blur 15px, fond `rgba(10, 10, 10, 0.75)`, border white/10%, shadow `--shadow-header`. Logo avec drop-shadow `--glow-primary`.

### 8.3 Cards

Pattern par défaut : `--bg-card` + border 1px white/8% + `--radius-card` + `--shadow-card`. Hover : `--bg-card-hover` + translateY(-4px) + `--shadow-card-hover`.

### 8.4 Pictogrammes / Icon containers

Carré 36-48px, `--radius-md`/`--radius-lg`, fond `var(--bg-deep)` ou `${color}22` selon contexte, border 1px `${color}44`.

## 9. Motion

- Transitions par défaut : `0.3s ease` (`all`, `transform`, `box-shadow`, `border-color`).
- Hover lift : `translateY(-2px)` (boutons) ou `translateY(-4px)` (cards).
- Animations longues : utiliser Framer Motion / GSAP via les composants existants (`FadeIn`, `StaggerItem`, `TiltCard`).

## 10. Audit & validation

- Audit complet : `AUDIT_IMPECCABLE.md`.
- Preview de calibration : `preview/quiet-comparison.html` (3 modes Actuel/Doux/Marqué).
- Mode actuel du site : **Doux** (validé 2026-05-10).
