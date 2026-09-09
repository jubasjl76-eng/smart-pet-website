import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLitters, getLitter } from "@/lib/api";
import { litterJsonLd, languageAlternates, localeUrl } from "@/lib/site";
import { Reveal } from "@/components/scroll/Reveal";
import { GrowthChart } from "@/components/litter/GrowthChart";
import { formatLongDate, formatMonthYear } from "@/lib/format";
import { puppyStatusLabel } from "@/lib/status";
import type { Locale } from "@/i18n/routing";
import type { Litter } from "@/lib/types";

type Params = { params: Promise<{ locale: string; id: string }> };

export async function generateStaticParams() {
  const litters = await getLitters();
  return litters.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, id } = await params;
  const litter = await getLitter(id);
  if (!litter) return {};
  const description = litter.description?.slice(0, 155);
  const path = `/litters/${litter.id}`;
  return {
    title: litter.name,
    description,
    alternates: { canonical: localeUrl(path, locale), languages: languageAlternates(path) },
    openGraph: {
      title: litter.name,
      description,
      ...(litter.photos[0] ? { images: [litter.photos[0]] } : {}),
    },
  };
}

function timing(
  l: Litter,
  locale: Locale,
  t: Awaited<ReturnType<typeof getTranslations>>,
) {
  if (l.bornOn) {
    const date = formatLongDate(l.bornOn, locale);
    return l.availableCount > 0
      ? t("bornAvailable", { date, available: l.availableCount, total: l.puppyCount })
      : t("bornPlaced", { date });
  }
  if (l.expectedOn) return t("expectedWaitlist", { date: formatMonthYear(l.expectedOn, locale) });
  return t("waitlistOpen");
}

export default async function LitterDetail({ params }: Params) {
  const { locale: localeParam, id } = await params;
  setRequestLocale(localeParam);
  const [litter, t, nav, littersT, locale] = await Promise.all([
    getLitter(id),
    getTranslations("Litter"),
    getTranslations("Nav"),
    getTranslations("Litters"),
    getLocale(),
  ]);
  if (!litter) notFound();

  const loc = locale as Locale;
  const hasPuppies = litter.puppies.length > 0;

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(litterJsonLd(litter, loc)) }}
      />
      <Reveal>
        <Link href="/litters" className="text-sm text-ink-soft underline underline-offset-4">
          {nav("litters")}
        </Link>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{litter.name}</h1>
        <p className="mt-3 text-lg text-ink-soft">
          {litter.dam?.id ? (
            <Link href="/dogs" className="underline underline-offset-4">
              {litter.dam.name}
            </Link>
          ) : (
            litter.dam?.name
          )}{" "}
          {littersT("and")}{" "}
          {litter.sire?.id ? (
            <Link href="/dogs" className="underline underline-offset-4">
              {litter.sire.name}
            </Link>
          ) : (
            litter.sire?.name
          )}
        </p>
        <p className="mt-1 text-ink-soft">{timing(litter, loc, t)}</p>
        {litter.description && (
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{litter.description}</p>
        )}
      </Reveal>

      {litter.photos.length > 0 && (
        <Reveal className="mt-12 grid gap-3 sm:grid-cols-3">
          {litter.photos.slice(0, 3).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 380px, 90vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      )}

      {hasPuppies ? (
        <>
          <Reveal className="mt-20">
            <h2 className="font-display text-2xl md:text-3xl">{t("puppies")}</h2>
          </Reveal>

          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {litter.puppies.map((p, i) => {
              const tone = p.status === "available" ? "bg-accent/15 text-accent" : "bg-surface-2 text-ink-soft";
              return (
                <Reveal key={p.id} delay={(i % 3) * 0.06}>
                  <article>
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      <Image
                        src={p.photos[0]}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg">{p.name}</h3>
                      <span className={`rounded-sm px-2 py-0.5 text-xs ${tone}`}>
                        {puppyStatusLabel(p.status, loc)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">
                      {p.sex === "male" ? t("male") : t("female")}
                      {p.color ? ` · ${p.color}` : ""}
                    </p>
                    {p.status === "available" && (
                      <Link
                        href={`/apply?puppy=${p.id}&litter=${litter.id}`}
                        className="mt-3 inline-block rounded-sm bg-accent px-4 py-2 text-sm text-accent-ink transition-transform active:translate-y-px"
                      >
                        {t("reserve", { name: p.name })}
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-20">
            <GrowthChart puppies={litter.puppies} />
          </Reveal>
        </>
      ) : (
        <Reveal className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl">{t("notYetTitle")}</h2>
          <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-ink-soft">{t("notYetBody")}</p>
          <Link
            href={`/apply?litter=${litter.id}`}
            className="mt-6 inline-block rounded-sm bg-accent px-6 py-3 text-sm text-accent-ink transition-transform active:translate-y-px"
          >
            {nav("waitlist")}
          </Link>
        </Reveal>
      )}
    </main>
  );
}
