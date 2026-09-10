"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const btn =
  "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Outside NextIntlClientProvider — plain anchors only, not `Button` / next-intl `Link`. */
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
            <button
              type="button"
              className={`${btn} bg-accent text-accent-ink hover:bg-accent/90`}
              onClick={() => reset()}
            >
              Tentar de novo
            </button>
            <a
              href="/"
              className={`${btn} border border-ink/30 bg-transparent hover:bg-surface`}
            >
              Início
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
