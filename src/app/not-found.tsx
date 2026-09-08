import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
        <p className="text-sm uppercase tracking-[0.16em] text-accent">404</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">
          That page is not here
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          The link may be old, or the litter is no longer public. The dogs and
          the current litter are still on the site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/litters">See the litters</Button>
          <Button href="/" variant="ghost">
            Home
          </Button>
        </div>
        </div>
      </Container>
    </Section>
  );
}
