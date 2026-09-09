"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
          <h1 className="font-display text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" onClick={() => reset()}>
              {t("retry")}
            </Button>
            <Button href="/" variant="ghost">
              {t("home")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
