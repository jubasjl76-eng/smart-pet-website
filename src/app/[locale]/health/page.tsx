import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { languageAlternates, localeUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Health" });
  return {
    title: t("title"),
    description: t("lede"),
    alternates: { canonical: localeUrl("/health", locale), languages: languageAlternates("/health") },
  };
}

export default async function Health({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, nav] = await Promise.all([
    getTranslations("Health"),
    getTranslations("Nav"),
  ]);

  const tests = [
    { title: t("hipsTitle"), body: t("hipsBody") },
    { title: t("eyesTitle"), body: t("eyesBody") },
    { title: t("dnaTitle"), body: t("dnaBody") },
  ];
  const goesHome = [t("goes1"), t("goes2"), t("goes3"), t("goes4")];
  const guarantee = [t("g1"), t("g2"), t("g3")];

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[65ch]">
          <h1 className="font-display text-4xl md:text-5xl">{t("headline")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("lede")}</p>

          <h2 className="mt-16 font-display text-3xl">{t("testingTitle")}</h2>
          <div className="mt-8 space-y-8">
            {tests.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>

          <Divider className="my-16" />

          <h2 className="font-display text-3xl">{t("goesTitle")}</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-lg leading-relaxed">
            {goesHome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Divider className="my-16" />

          <h2 className="font-display text-3xl">{t("guaranteeTitle")}</h2>
          {guarantee.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed">
              {p}
            </p>
          ))}

          <div className="mt-10">
            <Button href="/apply">{nav("waitlist")}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
