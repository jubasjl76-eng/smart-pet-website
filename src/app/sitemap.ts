import type { MetadataRoute } from "next";
import { getLitters } from "@/lib/api";
import { languageAlternates, localeUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = ["/", "/dogs", "/litters", "/about", "/health", "/faq", "/apply"];

function entriesFor(path: string, extra: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">) {
  return routing.locales.map((locale) => ({
    url: localeUrl(path, locale),
    alternates: { languages: languageAlternates(path) },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const litters = await getLitters();

  return [
    ...STATIC_PATHS.flatMap((p) =>
      entriesFor(p, {
        changeFrequency: "weekly",
        priority: p === "/" ? 1 : 0.7,
      }),
    ),
    ...litters.flatMap((l) =>
      entriesFor(`/litters/${l.id}`, {
        changeFrequency: "daily",
        priority: 0.8,
      }),
    ),
  ];
}
