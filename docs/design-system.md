# Design system (Phase 3 · F2)

Built with `taste-skill` + `brandkit`. Tokens live in
[`src/app/globals.css`](../src/app/globals.css); preview at `/dev/tokens`.

## Design read

> A puppy-sales / breeder-programme site for prospective owners, with a warm
> editorial + nature language, leaning on Tailwind v4 tokens, a grotesque
> display face, and restrained scroll motion.

Audience: families choosing a breeder for a 12-year commitment. The page has to
feel **trustworthy first**, then warm and aspirational — never slick or salesy.

## Dials

| | value | meaning |
|---|---|---|
| `DESIGN_VARIANCE` | **7** | asymmetric splits, generous negative space — not chaotic |
| `MOTION_INTENSITY` | **6** | Lenis smooth scroll, scroll-reveals, one pinned hero, one horizontal litters pan, growth chart draws on entry. All collapse under `prefers-reduced-motion`. |
| `VISUAL_DENSITY` | **3** | airy. Section padding `py-24 md:py-32`, container `1200px` |

## Colour

One accent, locked page-wide. Deep **forest** brand + a **green-tinted
off-white** base + a single muted **russet** accent. This deliberately avoids the
beige + brass + espresso "premium consumer" default — and the cool interface lets
the gold/cream of the dogs carry all the warmth in the photography.

| token | light | dark | use |
|---|---|---|---|
| `bg` | `#f2f4f0` | `#141815` | page |
| `surface` / `surface-2` | `#e8ebe3` / `#dde1d6` | `#1c221d` / `#232a24` | cards, insets |
| `ink` / `ink-soft` | `#1a1d19` / `#4a5049` | `#e9ece6` / `#a7b0a6` | text |
| `brand` / `brand-strong` | `#1f3a2e` / `#16281f` | `#8fb89e` / `#b6d4c0` | brand fills, secondary buttons |
| `accent` | `#a8432a` | `#d26a4e` | **CTAs and emphasis only** — "Reserve", "Join the waitlist" |
| `line` | `#c9cec0` | `#333b34` | hairlines, borders |

Tailwind utilities: `bg-bg`, `bg-surface`, `text-ink`, `text-ink-soft`,
`bg-brand`, `bg-accent text-accent-ink`, `border-line`. Theme is **auto**
(`prefers-color-scheme`), locked page-wide — no section inverts, no toggle.

## Type

`next/font/google`, wired as CSS vars in `layout.tsx`.

- **Display / headings — Bricolage Grotesque** (`font-display`, or any `h1`–`h4`).
  Tracking `-0.02em`. A grotesque with warmth; avoids the breeder-site serif‑headline cliché.
- **Body + quotes — Newsreader** (default `body` font). A reading serif for long
  trust copy (About, health guarantee) and testimonials (`italic`). Body width `max-w-[65ch]`.
- Emphasis inside a headline stays in Bricolage (weight or italic) — never a second family.

Scale: hero `text-6xl md:text-7xl` (headline 3–5 words), section headings
`text-3xl md:text-4xl`, body `text-lg leading-relaxed`.

## Shape

Single radius token `--radius: 0.25rem` (`rounded-sm` = `rounded-md` = `rounded-lg`).
Photos and surfaces square-ish; full-round only for genuinely circular elements
(status dots, avatars).

## Motion

CSS vars: `--dur-1/2/3` = 200 / 400 / 700ms, `--ease-out` =
`cubic-bezier(.16,1,.3,1)`. Tactile press: `active:translate-y-px`.
Every animation above "fade/slide on scroll" must be justifiable in one sentence
(hierarchy / storytelling / feedback). Reduced-motion is handled globally in
`globals.css` **and** must be honoured per-component (`useReducedMotion`).

## Brand board

Generated with `brandkit` during the F2 session — a 3×3 art-direction board
(logo idea: a monogram **R** fused with a retriever profile, negative-space
chest; forest / bone / russet in context; site header, collar tag, duotone field
photography). Drop the export into `public/brand/brandkit.png`. It is a reference,
not a spec — the tokens above are the spec.

## For Cursor (B column)

Build primitives (`Button`, `Badge`, `Card`, `Section`, `Container`, `Field`,
`Media`) against these utilities and the `src/lib/types.ts` shapes. No new
colours, no second font, no second radius. `Button` variants: `accent` (primary
CTA), `brand` (secondary), `ghost` (bordered). Container = `mx-auto max-w-[1200px] px-6`.
