import type { Kennel, Litter } from "./types";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL on Vercel; localhost in dev. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Rathmore Retrievers";

/** JSON-LD for the breeding operation. Rendered once, in the root layout. */
export function orgJsonLd(kennel: Kennel) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: kennel.name,
    description: kennel.about || kennel.tagline,
    email: kennel.email,
    ...(kennel.phone ? { telephone: kennel.phone } : {}),
    areaServed: kennel.location,
    address: { "@type": "PostalAddress", addressLocality: kennel.location },
    url: SITE_URL,
    ...(kennel.socials?.length ? { sameAs: kennel.socials.map((s) => s.url) } : {}),
  };
}

/** Breadcrumb + a Product/Offer per available puppy on a litter page. */
export function litterJsonLd(litter: Litter) {
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Litters", item: `${SITE_URL}/litters` },
        { "@type": "ListItem", position: 2, name: litter.name, item: `${SITE_URL}/litters/${litter.id}` },
      ],
    },
  ];

  for (const p of litter.puppies) {
    if (p.status !== "available") continue;
    graph.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${p.name} (${litter.breed})`,
      category: "Puppy",
      ...(p.photos[0] ? { image: p.photos[0] } : {}),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/litters/${litter.id}`,
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    });
  }
  return graph;
}
