# Code Review — Formation IA Réunion (branch `feat/formation-ia-pages`)

**Date** : 2026-05-21
**Scope** : 44 commits, 27 files, +3835 LOC
**Reviewer** : automated (senior code reviewer)
**Verdict** : ⚠️ APPROVE WITH MINOR FIXES

**Build status** : PASS (`npx tsc --noEmit` exit 0 ; `npm run build` produced 27 static routes in 1315ms with no warnings)

## Summary

This branch delivers a polished, content-rich Formation IA landing page (`/formation-ia-la-reunion`) backed by a single, factorized content module (`src/data/formation-ia-content.ts`, 828 LOC) ready to power a future Belgium page from the same source of truth. The architecture is sound: types up front, four pure helpers (`diagnosticProfile`, `computeROI`, `detectSector`, `generateMiniAuditReport`) with dev-mode invariant warnings, twelve well-scoped components (eight presentational + four interactive), and a clean SEO surface (territory-aware FAQ JSON-LD that mirrors what users actually read).

Code quality is high overall. Types are tight (no `any`, no `unknown`, no loose unions), interactive components are correctly dynamic-imported using the Next 16-compatible pattern (`dynamic(() => import(...).then(m => ({ default: m.X })))`), no `dangerouslySetInnerHTML`, no `eval`, no SSR-unsafe globals outside `useEffect`. Brand conventions are respected: no `#000`/`#fff` literals, no gradient text, no em-dashes in copy (one in a CSS comment), no decorative side-stripe borders. The FAQ sentinel pattern (`answer === ""` triggers territory substitution) is implemented both in `FormationFAQ.tsx` and mirrored in `page.tsx` JSON-LD — both must stay in sync.

The recommendation is **merge after addressing one a11y fix and the CSS DRY violation**. The remaining items are minor and can land in follow-ups. The 3 `VICTOR TO FILL` markers (Calendly URL, sector axes refinement, financement FAQ) are deliberate, well-flagged placeholders and the dev-mode warning for `CALENDLY_URL === "/contact"` is a nice safety net.

## Findings

### 🔴 Critical (must fix before merge)

None. Build, types and runtime contracts are clean.

### 🟡 Important (should fix soon)

- **A11y — broken radio semantics in two interactive quizzes.** `src/components/formation-ia/DiagnosticIA.tsx:81` and `src/components/formation-ia/MiniAuditIA.tsx:206` hard-code `aria-checked={false}` on every `role="radio"` button. WAI-ARIA requires `aria-checked` to reflect actual state; a literal `false` on all options tells screen readers "no radio is selected" even after the user has chosen, which is misleading. Two fixes are acceptable:
  - Drop the radio semantics entirely (these are "choose-and-advance" actions, closer to a menu/list of buttons than a radio group). Remove `role="radiogroup"`, `role="radio"`, `aria-checked` and let the buttons be buttons.
  - Or track the selected value and set `aria-checked={value === selected}`.
  Of the two, the first is closer to actual behavior (one click advances the quiz; there is no "submit selected radio" step).
- **A11y — incomplete tab pattern in BeforeAfterIA.** `src/components/formation-ia/BeforeAfterIA.tsx:32-94` uses `role="tablist"` + `role="tab"` but the content card carries `aria-live="polite"` instead of `role="tabpanel"`. The tabs lack `aria-controls`; the panel lacks an `id` and `role="tabpanel"`. Either wire the full pattern (add `id` to the panel, `aria-controls` on each tab, `role="tabpanel"` + `aria-labelledby` on the panel, and `onKeyDown` for left/right/home/end keys) or downgrade to a pair of toggle buttons (`aria-pressed` instead of `aria-selected`) and drop the tablist roles. The pressed-button pattern is simpler and matches the actual UX.
- **CSS DRY violation — `.eyebrow`/`.title`/`.intro` duplicated in 10 modules.** A perfectly good shared module exists (`formation-ia-sections.module.css` lines 44-72) but identical or near-identical copies live in `DifferentiationBlock.module.css:14-42`, `MethodTimeline.module.css:14-42`, `CaseStudyStory.module.css:20-46`, `ROITimeCalculator.module.css:18-44`, `DiagnosticIA.module.css:36-62`, `MiniAuditIA.module.css:44-70`, `WhyUsPillars.module.css:20-47`, `FormationFAQ.module.css:13-30`, `FormationCTA.module.css:28-…`, `FormationHero.module.css:21-28`. The differences are limited to small margin/max-width tweaks; either compose from the shared classes (`composes: eyebrow from "./formation-ia-sections.module.css"` etc.) and only override what differs, or migrate the JSX to use the shared classes directly. A future eyebrow rebrand currently requires touching 10 files.

### 🟢 Minor (nice to fix)

- **Touch-target floor inconsistent.** `MiniAuditIA.module.css:103` enforces `min-height: 2.75rem` (44px) on `.choice` but the equivalent `.choice` in `DiagnosticIA.module.css:86-101` and `.reset` in both modules have no `min-height`. The DiagnosticIA `.reset` (line 164) has `padding: 0.5rem 0.75rem` only → on a single-line label it lands well under 44px. The MiniAudit `.reset` (line 309) at least sets `min-height: 2.5rem` (40px), but neither matches WCAG 2.5.5 enhanced AAA 44×44px floor.
- **`BeforeAfterIA` `aria-live` semantics.** `src/components/formation-ia/BeforeAfterIA.tsx:62` sets `aria-live="polite"` on the card. When `AnimatePresence mode="wait"` swaps motion children, the live region may announce twice (exit content cleared, enter content inserted). Move the live region to a dedicated invisible status span, or remove it and rely on the tablist/tabpanel semantics (once those are fixed).
- **`detectSector` is dead code on this page.** `src/data/formation-ia-content.ts:594-600` exports `detectSector`, but the MiniAudit V2 quiz now uses a `<select>` (Q1, `MiniAuditIA.tsx:116-130`) and never calls `detectSector`. The helper is harmless but should either be removed or have a JSDoc note that it's kept for the Belgium page / future free-text inputs. Its first-match-wins behavior also needs documenting if it stays (e.g. "santé" string would match before "btp" if both keywords appear, since `sectors` array order is the priority).
- **`computeROI` recomputes on every keystroke without `useMemo`.** `src/components/formation-ia/ROITimeCalculator.tsx:28` calls `computeROI(values)` in the render body. It's cheap (4-element reduce + 2 multiplications), so this is fine, but consistency with React idioms would prefer `const { mensuelLabel, mensuelH } = useMemo(() => computeROI(values), [values]);`. Not a bug, just a style note.
- **Diagnostic radio button `aria-checked` (see Important).** Even if the radio role stays, the `aria-checked` always being `false` is the clearer issue. The selection state is also not visually rendered — there is no "selected" style. The current UX is "tap = advance immediately", which is fine, but justifies removing the radio role rather than fixing aria-checked.
- **Dev-mode invariant block runs every import in production build too.** The `if (process.env.NODE_ENV !== "production")` guard at `src/data/formation-ia-content.ts:784` is correct, but the const `cannedReport` is constructed even in dev on every module import; that's only ~6 µs but adds to module-eval cost. Wrap in a function that runs once if you want zero cost in dev too — not worth changing.

### 🔵 Notes / suggestions (not blockers)

- **`FormationFAQ` answer rendering loses newlines/markdown.** `src/components/ui/accordion.tsx:51-54` renders `{answer}` as plain text. The content (`formation-ia-content.ts:494-516`) only uses single-paragraph answers, so this works today. If you ever paste a multi-paragraph answer with `\n\n`, it will render as a single run. Worth noting in the type's JSDoc.
- **`renderBold` regex duplicated.** Identical helper `text.split(/\*\*(.+?)\*\*/g).map(...)` exists in `DifferentiationBlock.tsx:5-11`, `CaseStudyStory.tsx:23-29`, and `ROITimeCalculator.tsx:36-37`. Three sites is borderline; if the count grows, hoist to `src/lib/text.ts` or a `<RichText>` component.
- **`page.tsx:62-65` module-level mutable bindings.** `const TERRITOIRE = "reunion" as const; const t = territoires[TERRITOIRE]; const c = formationIACommon;` work fine as module constants, but `c` is unused outside `faqItems` (line 102) — the rest of the page passes props or imports `formationIACommon` directly inside components. Minor cleanliness; the binding is harmless.
- **JSON-LD FAQ mirror is duplicated logic** (`page.tsx:102-108` ≈ `FormationFAQ.tsx:25-34`). If a third territory or override mechanic is added, factor a single `resolveFaqItems(items, territoire)` helper into `formation-ia-content.ts`. Both consumers would then call the same function and the FAQ schema can't drift from the rendered text.
- **`formation-ia-sections.module.css:34-37` `.sectionExtraWide` is declared but never used** in the diff. Leave it if you plan to use it on Belgium, otherwise prune.
- **`MiniAuditIA.tsx:93` cast** `answers as MiniAuditAnswers` is justified (guarded by `isComplete` at line 49-54), but a type guard function (`function isComplete(a: PartialAnswers): a is MiniAuditAnswers`) would let TS narrow without the cast. Style only.
- **`FormationHero.tsx:32-39` GSAP usage is correct but the GSAP import is "heavy" for a single 1.1s animation.** Consider whether the animated strikethrough warrants pulling GSAP into the hero bundle vs a 12-line `requestAnimationFrame` loop or framer-motion (already in the bundle). Not a fix for this branch.
- **`computeROI` rounding edge case.** `src/data/formation-ia-content.ts:587-589` computes `jours = Math.round((mensuelH / 7) * 10) / 10`. When `mensuelH = 0` (all sliders at zero, which is impossible with defaults but reachable by dragging), the label becomes `"0 h/mois, soit ~0 jours de travail"`. That reads OK but the projection card on the right then shows a giant `0 h/mois` — consider showing a friendly empty state below some threshold.
- **CSS variable naming.** `globals.css:14` adds `--primary-500-rgb: 59, 130, 246;` as a triplet for `rgba(var(--primary-500-rgb), x)`. This is the idiomatic workaround pre-`color-mix`. If the project bumps a CSS baseline, `color-mix(in srgb, var(--primary-500) 10%, transparent)` removes the need for the separate triplet variable. Not a blocker.

## Strengths

- **Single source of truth.** `formation-ia-content.ts` cleanly factorises content + types + helpers. The Belgium page can ship with virtually zero copy duplication, only `territoires.belgique` and a new page.tsx.
- **Dev-mode invariants** at lines 784-827 are excellent: they cover the diagnostic score band (exhaustive 0-16 cover, no overlap), the ROI helper sanity, the Calendly placeholder reminder, and the MiniAudit report shape. This is the right pattern for a no-test-framework codebase.
- **Next 16-correct dynamic import pattern.** `page.tsx:34-56` correctly avoids `ssr: false` (forbidden from server components in Next 16) and uses the named-export-via-`.then` pattern. Comment at line 27-32 calls out the constraint for future maintainers.
- **Crossfade swap of BeforeAfterIA** (replaces a fragile drag-slider) is a UX win and the `useReducedMotion` short-circuit at `BeforeAfterIA.tsx:20,67-70` correctly disables the animation for the relevant user setting.
- **GSAP strike animation respects reduced-motion** at `FormationHero.tsx:26-29` and has a CSS fallback at `FormationHero.module.css:98-107` that swaps SVG for plain `text-decoration: line-through`. Belt and braces.
- **Touch targets** were retroactively raised on MiniAudit (commit `d54eef7`). The 44px floor on `.choice` and the explicit `pointer: coarse` thumb size boost on the ROI slider are deliberate, documented choices.
- **No `#000`/`#fff` literals** in the new code (a project convention). All colors funnel through CSS vars or tinted rgba/rgb constants.
- **Type safety is tight.** No `any`, no `unknown`, narrow string-literal union types for `MiniAuditTeamSize`/`MiniAuditPain`/`MiniAuditLevel`/`MiniAuditGoal`, and the generic `QuizOption<T>` + generic `ChoiceQuestion<T>` shared component is a clean reuse.
- **Naming collision avoided.** `FormationFaqItem` was renamed to avoid colliding with `src/lib/seo.ts FaqItem`; no stale references remain (grep confirms only the two intentional sites).
- **JSON-LD on this page mirrors what users read.** `page.tsx:100-108` recomputes territory-aware FAQ items the same way `FormationFAQ.tsx` does. Schema integrity matters for SEO and this avoids a common drift bug.

## Specific per-file observations

- **`src/data/formation-ia-content.ts`** — Excellent module. Helpers are pure, deterministic, dev-instrumented. Tiny nit: `diagnosticProfile` returns `profiles[0]` for out-of-range inputs (line 568), which is a reasonable resilience choice but worth a JSDoc line. The "first-match-wins" semantics of `detectSector` should also be documented (lines 594-600). The `formationIACommon` constant is fully typed via `FormationIACommon`, which makes content edits safe.
- **`src/components/formation-ia/MiniAuditIA.tsx`** — At 289 lines this is the largest component; the inline `ChoiceQuestion` and `MiniAuditReport` sub-components are appropriately scoped to this file (single-use). Step-state-machine via `StepIndex = 0|1|2|3|4` is type-safe. The `isComplete` boolean guard before the `answers as MiniAuditAnswers` cast at line 93 is the right pattern, though a user-defined type guard would be cleaner.
- **`src/components/formation-ia/BeforeAfterIA.tsx`** — Clean implementation of the crossfade pattern. Address the tab-pattern and `aria-live` notes above.
- **`src/components/formation-ia/CaseStudyStory.tsx`** — Faux Claude mockup is decorative and `aria-label`-ed appropriately at line 36. The `role="img"` wrapping is a fine choice for purely decorative-but-meaningful content.
- **`src/components/formation-ia/WhyUsPillars.tsx`** — Stacks ForWhom + WhyUs in one section component. Icon resolution via `iconMap[item.icon as IconKey] ?? Wrench` (lines 47, 73) gracefully falls back if a content author writes an unknown icon name; this is good defensive design. The `as IconKey` cast is acceptable because the fallback is in place.
- **`src/app/formation-ia-la-reunion/page.tsx`** — Tidy orchestration; metadata is complete; canonical, OG, Twitter all wired. The wrapper `<FadeIn>` around every section gives a consistent scroll-in feel but adds ~12 `<motion.div>` to the tree; performance impact is negligible but worth noting.
- **`src/app/globals.css`** — One-line `--primary-500-rgb: 59, 130, 246;` addition with a clear comment. Correct triplet for `#3b82f6`.
- **`.gitignore`** — `Image Responsive/` entry matches an untracked working-tree directory; the `git status` output confirms it's excluded.

## Recommendation

**Merge after addressing the two 🟡 important items** (a11y of the radio role in DiagnosticIA/MiniAuditIA and the tab pattern in BeforeAfterIA — either complete or downgrade to button + `aria-pressed`). The CSS DRY violation is also 🟡 but can land as a follow-up cleanup since it's a code-health issue rather than user-visible. The 🔴 critical column is empty.

For Victor: look first at the two a11y items (radio + tab roles) — they're a 10-minute fix and the fastest path to "merge with no regrets". The CSS dedup is a separate, larger refactor that pays back when Belgium ships.
