import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { getDogs } from "@/lib/api";
import { Reveal } from "@/components/scroll/Reveal";
import { formatAge } from "@/lib/format";
import { languageAlternates, localeUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import type { Dog } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dogs" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: localeUrl("/dogs", locale), languages: languageAlternates("/dogs") },
  };
}

function DogProfile({
  dog,
  locale,
  role,
}: {
  dog: Dog;
  locale: Locale;
  role: string;
}) {
  const age = formatAge(dog.dob, locale);
  return (
    <article className="grid gap-6 border-t border-line pt-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
        {dog.photos.slice(0, 2).map((src, i) => (
          <div key={i} className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image src={src} alt={dog.name} fill sizes="(min-width: 768px) 320px, 45vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="font-display text-2xl md:text-3xl">{dog.name}</h3>
          <span className="text-ink-soft">
            {role} · {dog.breed}
            {age ? ` · ${age}` : ""}
          </span>
        </div>
        {dog.titles && <p className="mt-1 text-sm text-ink-soft">{dog.titles}</p>}
        {dog.bio && <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">{dog.bio}</p>}

        {dog.healthTests && dog.healthTests.length > 0 && (
          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {dog.healthTests.map((test) => (
              <div key={test.name} className="flex justify-between gap-4 text-sm">
                <dt className="text-ink-soft">{test.name}</dt>
                <dd className="font-display">{test.result}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default async function DogsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const [dogs, t, locale] = await Promise.all([
    getDogs(),
    getTranslations("Dogs"),
    getLocale(),
  ]);
  const loc = locale as Locale;
  const dams = dogs.filter((d) => d.role === "dam");
  const sires = dogs.filter((d) => d.role === "sire");

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-ink-soft">{t("intro")}</p>
      </Reveal>

      {dogs.length === 0 && (
        <p className="mt-16 text-lg text-ink-soft">{t("empty")}</p>
      )}

      {dams.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl text-ink-soft">{t("dams")}</h2>
          </Reveal>
          <div className="mt-4 space-y-4">
            {dams.map((d) => (
              <Reveal key={d.id}>
                <DogProfile dog={d} locale={loc} role={t("dam")} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {sires.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl text-ink-soft">{t("sires")}</h2>
          </Reveal>
          <div className="mt-4 space-y-4">
            {sires.map((d) => (
              <Reveal key={d.id}>
                <DogProfile dog={d} locale={loc} role={t("sire")} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
