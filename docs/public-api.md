# Public API contract (`/api/public/*`)

Read-only, unauthenticated, served by `smart-pet-backend`. Only rows with
`published = true` appear. Consumed by the site server-side with ISR
(`PUBLIC_REVALIDATE_SECONDS`, default 300) + an on-publish revalidate ping.

Types are the source of truth: [`src/lib/types.ts`](../src/lib/types.ts).
Fixtures that match this shape exactly: [`mock/`](../mock).

Base URL: `PUBLIC_API_BASE_URL` (e.g. `http://localhost:3000` in dev, the
deployed backend in prod). When unset the site runs on `mock/*.json`.

---

## `GET /api/public/kennel` → `Kennel`

```jsonc
{
  "name": "Rathmore Retrievers",
  "tagline": "Health-tested retrievers, raised in the house.",
  "about": "Two-sentence intro paragraph…",
  "breeds": ["Golden Retriever"],
  "location": "County Meath, Ireland",     // city / region only, never a street
  "email": "hello@rathmoreretrievers.example",
  "phone": "+353 …",                        // optional
  "socials": [{ "label": "Instagram", "url": "https://…" }]
}
```

Backend source: the `kennels` row (curated public fields only) + a small
`kennel_public` settings blob for tagline / about / socials.

## `GET /api/public/dogs` → `Dog[]`

Breeding dogs (`role: "sire" | "dam"`) where `published`. Sorted dam-then-sire,
then name.

```jsonc
{
  "id": "dog_willow",
  "name": "Rathmore's Willow",
  "sex": "female",
  "breed": "Golden Retriever",
  "role": "dam",
  "color": "Gold",
  "dob": "2021-05-20",
  "titles": "IKC registered",              // optional free text
  "bio": "One short paragraph.",           // optional
  "healthTests": [                          // optional
    { "name": "Hips (BVA/KC)", "result": "3:3" },
    { "name": "Elbows", "result": "0:0" },
    { "name": "prcd-PRA", "result": "Clear (DNA)" }
  ],
  "photos": ["https://…/900/600"]
}
```

Backend source: `animals` where `role in ('dam','sire')` (or a `breeding` role
+ sex) and `published`. `photos` = the new `photos[]` JSONB column.

## `GET /api/public/litters` → `Litter[]`

Published litters, newest first. Each embeds its published puppies.

```jsonc
{
  "id": "litter_willow_bruce_2026s",
  "name": "Willow × Bruce — Summer 2026",
  "breed": "Golden Retriever",
  "status": "available",   // planned | expecting | born | available | reserved | sold_out
  "sire": { "id": "dog_bruce", "name": "Rathmore's Bruce" },
  "dam":  { "id": "dog_willow", "name": "Rathmore's Willow" },
  "bornOn": "2026-07-20",         // optional
  "expectedOn": null,             // optional (planned/expecting litters)
  "description": "One short paragraph.",
  "photos": ["https://…"],
  "puppyCount": 7,
  "availableCount": 3,
  "puppies": [
    {
      "id": "pup_1",
      "name": "Green collar",
      "sex": "male",
      "status": "available",       // available | reserved | sold
      "color": "Gold",
      "photos": ["https://…"],
      "weightSeries": [            // optional, for the growth chart
        { "date": "2026-07-20", "grams": 460 },
        { "date": "2026-08-17", "grams": 3400 }
      ]
    }
  ]
}
```

Backend source: `litters` + `puppies` where `published`, `weight_readings`
projected to `{date, grams}`. `status` is derived: `planned`/`expecting` from
the litter's own status; `available` if any puppy is available; `reserved` if
all placed but not all sold; `sold_out` if every puppy is sold.

## `GET /api/public/litters/:id` → `Litter | 404`

Same shape as one array element. 404 when not found or not published.

---

## `POST /api/public/inquiries` → `{ ok: true }`

The site posts to its **own** `/api/inquiries` route, which validates + drops
bots, then forwards here.

```jsonc
// request
{ "name": "…", "email": "…", "phone": "…?", "message": "…?", "puppyId": "…?", "litterId": "…?" }
```

Backend behaviour:
- inserts a `buyers` row: `source = 'website'`, `status = 'inquiry'`,
  `puppy_id` / `wants_litter_id` set when provided
- raises a **low-priority** care-inbox item ("New website inquiry — …")
- **never** changes puppy or litter status — the owner confirms in the console
- rate-limited by IP; the honeypot field is handled site-side

---

## `POST /api/revalidate` (on the **site**, not the backend)

`{ "secret": "…" }` — the dashboard calls this after a publish toggle so the
site refreshes before the ISR window. Matches `REVALIDATE_SECRET`.
