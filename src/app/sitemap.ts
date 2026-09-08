import type { MetadataRoute } from "next";
import { getLitters } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const litters = await getLitters();
  const staticPaths = ["", "/dogs", "/litters", "/about", "/health-guarantee", "/faq", "/apply"];

  return [
    ...staticPaths.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...litters.map((l) => ({
      url: `${SITE_URL}/litters/${l.id}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
