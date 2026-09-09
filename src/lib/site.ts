import type { Kennel, Litter } from "./types";
import { routing, type Locale } from "@/i18n/routing";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL on Vercel; localhost in dev. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Rathmore Retrievers";

export function localePrefix(locale: string): string {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export function localeUrl(path: string, locale: string): string {
  const p = path === "/" ? "" : path;
  return `${SITE_URL}${localePrefix(locale)}${p}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const alts: Record<string, string> = { "x-default": localeUrl(path, "pt") };
  for (const loc of routing.locales) {
    alts[loc] = localeUrl(path, loc);
  }
  return alts;
}

/** JSON-LD for the breeding operation. Rendered once, in the root layout. */
export function orgJsonLd(kennel: Kennel, locale: string = "pt") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: kennel.name,
    description: kennel.about || kennel.tagline,
    email: kennel.email,
    ...(kennel.phone ? { telephone: kennel.phone } : {}),
    areaServed: kennel.location,
    address: { "@type": "PostalAddress", addressLocality: kennel.location },
    url: localeUrl("/", locale),
    inLanguage: locale === "pt" ? "pt-PT" : "en-IE",
    ...(kennel.socials?.length ? { sameAs: kennel.socials.map((s) => s.url) } : {}),
  };
}

/** Breadcrumb + a Product/Offer per available puppy on a litter page. */
export function litterJsonLd(litter: Litter, locale: Locale = "pt") {
  const listName = locale === "pt" ? "Ninhadas" : "Litters";
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: listName, item: localeUrl("/litters", locale) },
        { "@type": "ListItem", position: 2, name: litter.name, item: localeUrl(`/litters/${litter.id}`, locale) },
      ],
    },
  ];

  for (const p of litter.puppies) {
    if (p.status !== "available") continue;
    graph.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${p.name} (${litter.breed})`,
      category: locale === "pt" ? "Cachorro" : "Puppy",
      inLanguage: locale === "pt" ? "pt-PT" : "en-IE",
      ...(p.photos[0] ? { image: p.photos[0] } : {}),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: localeUrl(`/litters/${litter.id}`, locale),
        seller: { "@type": "Organization", name: SITE_NAME },
      },
    });
  }
  return graph;
}
