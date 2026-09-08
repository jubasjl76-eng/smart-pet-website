# Pre-launch checklist (Phase 3 · A9)

## Wiring

- [ ] Backend deployed with migration `002_public_website.sql` applied.
- [ ] Backend has content published (dashboard → **Website**): kennel identity filled, at least the current litter + its available puppies + both parents toggled on. `SEED_DEMO=true` does this automatically for a fresh DB.
- [ ] `GET ${PUBLIC_API_BASE_URL}/api/public/kennel` returns the kennel; `/api/public/litters` returns the published litters.
- [ ] Site env set on Vercel: `NEXT_PUBLIC_SITE_URL`, `PUBLIC_API_BASE_URL`, `REVALIDATE_SECRET`.
- [ ] Backend env set: `WEBSITE_REVALIDATE_URL = ${NEXT_PUBLIC_SITE_URL}/api/revalidate`, `WEBSITE_REVALIDATE_SECRET` = the same value as the site's `REVALIDATE_SECRET`.
- [ ] Toggle a publish flag in the dashboard → the change shows on the site within a few seconds (revalidate ping) or within `PUBLIC_REVALIDATE_SECONDS` otherwise.
- [ ] Real photo host added to `next.config.ts` `images.remotePatterns` if not picsum/unsplash.

## Content

- [ ] Real hero image at `public/home/hero.jpg` (1600×1000+), and `src/app/opengraph-image.jpg` / `twitter-image.jpg` (1200×630).
- [ ] `src/content/{about,faq,health,program}.ts` reviewed with the breeder's real words.
- [ ] `src/content/testimonials.ts` replaced with real, attributed quotes (or the section removed for launch).
- [ ] Kennel name / email / socials in the dashboard match the real business.
- [ ] No `example.com` / placeholder text anywhere: `grep -rn "example\.\|Rathmore\|placeholder\|TODO" src`.
- [ ] `favicon` + `apple-icon` in `src/app/` (currently the Next default).

## Empty / edge states (verified by design; confirm on the live data)

- [ ] No published litters → `/litters` shows the "nothing planned is public yet" copy; home omits the current-litter section.
- [ ] Litter with a `planned` / `expecting` status and no puppies → detail page shows the waitlist state, not an empty grid.
- [ ] Litter fully placed (`availableCount === 0`) → no "Reserve" buttons, waitlist CTA still present.
- [ ] No published dogs → home "Parents" strip and `/dogs` render empty gracefully.
- [ ] Inquiry submit with the backend down → the form shows its error state (does not silently succeed).

## Accessibility

- [x] `Skip to content` link; single `<main>` landmark; `<html lang>`.
- [x] Header mobile menu: `aria-expanded` / `aria-controls`, `Esc` closes and restores focus, focus moves into the menu on open, body scroll locked.
- [x] Lightbox: `role="dialog"` + `aria-modal`, `Esc` / arrow keys, focus-visible rings, scroll lock.
- [x] `prefers-reduced-motion`: global CSS kills animation duration; Lenis / hero pin / `Reveal` / `HorizontalPan` / lightbox all no-op or go static.
- [x] Cards use `motion-reduce:transition-none`.
- [ ] Manual keyboard pass of every page (Tab order, visible focus, no traps).
- [ ] Contrast spot-check of `text-ink-soft` on `bg-surface` and the accent button in **both** light and dark.
- [ ] `axe` / Lighthouse a11y run — target 100.

## Performance

- [x] All images via `next/image` with `sizes`; hero is `priority`; `<Media>` blurs up.
- [x] Fonts via `next/font` (self-hosted, `display: swap`).
- [x] Recharts is only on the litter detail route (client island).
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1, INP < 200ms on the deployed site.
- [ ] `next build` output reviewed — no unexpectedly large route bundles.

## SEO

- [x] `metadataBase`, per-page `<title>` + description, default OG/Twitter image.
- [x] `sitemap.xml` (static pages + one entry per litter), `robots.txt` (disallows `/dev/`, `/api/`), JSON-LD (`LocalBusiness`; `BreadcrumbList` + `Product`/`Offer` per available puppy).
- [ ] Submit `sitemap.xml` in Google Search Console once the domain is live.
- [ ] Confirm the OG card renders (share the URL into Slack / iMessage, or use a card validator).
