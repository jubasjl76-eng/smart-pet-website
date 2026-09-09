import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getKennel } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { languageAlternates, localeUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("title"),
    description: t("lede"),
    alternates: { canonical: localeUrl("/about", locale), languages: languageAlternates("/about") },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [kennel, t, pv, nav, home] = await Promise.all([
    getKennel(),
    getTranslations("About"),
    getTranslations("ProgramValues"),
    getTranslations("Nav"),
    getTranslations("Home"),
  ]);

  const values = [
    { title: pv("healthTitle"), body: pv("healthBody") },
    { title: pv("kitchenTitle"), body: pv("kitchenBody") },
    { title: pv("matchTitle"), body: pv("matchBody") },
    { title: pv("lifeTitle"), body: pv("lifeBody") },
  ];

  return (
    <>
      <Section>
        <Container as="main">
          <div className="max-w-[65ch]">
            <h1 className="font-display text-4xl md:text-5xl">{t("headline")}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("lede")}</p>
            <p className="mt-6 text-lg leading-relaxed">{kennel.about}</p>
            <p className="mt-5 text-lg leading-relaxed">{t("story1")}</p>
            <p className="mt-5 text-lg leading-relaxed">{t("story2")}</p>
            <p className="mt-5 text-lg leading-relaxed">{t("story3")}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">{t("howTitle")}</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-[46ch]">
            <Divider className="mb-10" />
            <h2 className="font-display text-3xl">{t("visitTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {t("visitBody", { location: kennel.location })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/apply">{nav("waitlist")}</Button>
              <Button href={`mailto:${kennel.email}`} variant="ghost">
                {home("emailUs")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
