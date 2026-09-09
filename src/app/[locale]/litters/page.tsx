import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLitters } from "@/lib/api";
import { Reveal } from "@/components/scroll/Reveal";
import { formatLitterWhen } from "@/lib/format";
import { litterStatusLabel } from "@/lib/status";
import { languageAlternates, localeUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const FALLBACK = "https://picsum.photos/seed/rathmore-litter/1200/900";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Litters" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: localeUrl("/litters", locale), languages: languageAlternates("/litters") },
  };
}

export default async function LittersPage({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const [litters, t, locale] = await Promise.all([
    getLitters(),
    getTranslations("Litters"),
    getLocale(),
  ]);
  const loc = locale as Locale;

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-ink-soft">{t("intro")}</p>
      </Reveal>

      {litters.length === 0 ? (
        <p className="mt-16 text-lg text-ink-soft">{t("empty")}</p>
      ) : (
        <div className="mt-14 space-y-16">
          {litters.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.05}>
              <Link
                href={`/litters/${l.id}`}
                className="group grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={l.photos[0] ?? FALLBACK}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 620px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <span className="inline-flex rounded-sm bg-surface-2 px-2 py-0.5 text-xs text-ink-soft">
                    {litterStatusLabel(l.status, loc)}
                  </span>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl">{l.name}</h2>
                  <p className="mt-2 text-ink-soft">
                    {l.dam?.name}
                    {l.sire ? ` ${t("and")} ${l.sire.name}` : ""}
                  </p>
                  <p className="mt-1 text-ink-soft">
                    {formatLitterWhen(l, loc)}
                    {l.availableCount > 0
                      ? ` · ${t("availableOf", { available: l.availableCount, total: l.puppyCount })}`
                      : ""}
                  </p>
                  {l.description && (
                    <p className="mt-4 line-clamp-3 text-lg leading-relaxed">{l.description}</p>
                  )}
                  <span className="mt-4 inline-block underline underline-offset-4">
                    {t("seeLitter")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
