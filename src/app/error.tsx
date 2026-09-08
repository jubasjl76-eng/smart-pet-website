"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
        <h1 className="font-display text-4xl md:text-5xl">Something went wrong</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          The page failed to load. Try again, or go back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" onClick={() => retry()}>
            Try again
          </Button>
          <Button href="/" variant="ghost">
            Home
          </Button>
        </div>
        </div>
      </Container>
    </Section>
  );
}
