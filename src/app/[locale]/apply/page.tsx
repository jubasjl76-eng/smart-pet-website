import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLitters } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { languageAlternates, localeUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ puppy?: string; litter?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Apply" });
  return {
    title: t("title"),
    alternates: { canonical: localeUrl("/apply", locale), languages: languageAlternates("/apply") },
  };
}

export default async function Apply({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [q, litters, t] = await Promise.all([
    searchParams,
    getLitters(),
    getTranslations("Apply"),
  ]);
  const litter = q.litter ? litters.find((l) => l.id === q.litter) : undefined;
  const puppy = q.puppy
    ? litters.flatMap((l) => l.puppies).find((p) => p.id === q.puppy)
    : undefined;

  const context = puppy
    ? t("contextPuppy", {
        puppy: puppy.name,
        litter: litter ? t("inLitter", { name: litter.name }) : "",
      })
    : litter
      ? t("contextLitter", { litter: litter.name })
      : undefined;

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
          <h1 className="font-display text-4xl md:text-5xl">
            {puppy ? t("reserveTitle", { name: puppy.name }) : t("title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("lede")}</p>
          <div className="mt-10">
            <InquiryForm
              puppyId={puppy?.id ?? q.puppy}
              litterId={litter?.id ?? q.litter}
              context={context}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
