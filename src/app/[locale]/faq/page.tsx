import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { languageAlternates, localeUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: localeUrl("/faq", locale), languages: languageAlternates("/faq") },
  };
}

export default async function Faq({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, nav] = await Promise.all([
    getTranslations("Faq"),
    getTranslations("Nav"),
  ]);
  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    q: t(`q${i}`),
    a: t(`a${i}`),
  }));

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[65ch]">
          <h1 className="font-display text-4xl md:text-5xl">{t("headline")}</h1>
          <dl className="mt-12 space-y-10">
            {items.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-xl">{item.q}</dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16">
            <Button href="/apply">{nav("waitlist")}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
