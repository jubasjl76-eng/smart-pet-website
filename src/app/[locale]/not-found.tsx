import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
          <p className="text-sm uppercase tracking-[0.16em] text-accent">{t("kicker")}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/litters">{t("litters")}</Button>
            <Button href="/" variant="ghost">
              {t("home")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
