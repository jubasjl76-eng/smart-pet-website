"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
          <h1 className="font-display text-4xl md:text-5xl">Algo correu mal</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A página não carregou. Tente de novo, ou volte ao início.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" onClick={() => reset()}>
              Tentar de novo
            </Button>
            <Button href="/" variant="ghost">
              Início
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
