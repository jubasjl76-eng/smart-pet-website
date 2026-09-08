# smart-pet-website

Public marketing / puppy-sales site for the kennel. Scroll-driven, high-end,
**auto-fed from the breeder dashboard** — only rows the breeder marks
"Publish to website" appear here.

Part of the Smart Pet platform · **DEV-PLAN Phase 3**.

## Stack

- **Next.js 16** (App Router) · TypeScript · **Tailwind v4** (CSS-first tokens)
- **GSAP ScrollTrigger + Lenis** — scroll choreography
- **Recharts** — puppy growth curves
- Data: server-side fetch of `smart-pet-backend` `/api/public/*` with ISR
  (`mock/*.json` when no backend URL is set)
- Deploy: **Vercel** (not the Docker / Terraform stack)

## Run

```bash
npm install
npm run dev            # http://localhost:3000 — runs on mock/*.json
```

Against a live backend:

```bash
PUBLIC_API_BASE_URL=http://localhost:3000 npm run dev
```

(the backend's own dev port is 3000; run the site on another with `-p`.)

## Environment

| var | purpose |
|---|---|
| `PUBLIC_API_BASE_URL` | backend origin for `/api/public/*`. Unset → mock mode. |
| `PUBLIC_REVALIDATE_SECONDS` | ISR window, default `300`. |
| `REVALIDATE_SECRET` | shared secret for `POST /api/revalidate` (dashboard pings it on publish). |

## Layout

- `src/lib/` — `types.ts` (public data shapes), `api.ts` (server data layer)
- `docs/public-api.md` — the backend contract this site consumes
- `mock/` — fixtures matching that contract exactly
- `src/app/api/` — `inquiries` (validate + forward), `revalidate` (on-publish hook)

## Who builds what (Phase 3)

- **Claude (A tasks):** scroll engine, page choreography, litter/puppy detail,
  Our Dogs, SEO, the backend `/api/public/*` route + migration, dashboard toggle,
  a11y/perf, integration.
- **Cursor (B tasks):** UI primitives, `<Media>` component, header/footer,
  inquiry/reserve form, static content, card components, skeletons/404, utils +
  tests, polish, `/dev/components` preview route.

Both work against `src/lib/types.ts` + `mock/*.json`. See `SMART-PET-DEV-PLAN.md`
Phase 3 for the task tables.
