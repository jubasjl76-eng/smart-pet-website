import type { Metadata } from "next";
import { health } from "@/content/health";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Health & guarantee",
  description: health.lede,
};

export default function Health() {
  return (
    <Section>
      <Container as="main">
        <div className="max-w-[65ch]">
        <h1 className="font-display text-4xl md:text-5xl">{health.headline}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{health.lede}</p>

        <h2 className="mt-16 font-display text-3xl">What we test</h2>
        <div className="mt-8 space-y-8">
          {health.testing.map((t) => (
            <div key={t.title}>
              <h3 className="font-display text-xl">{t.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ink-soft">{t.body}</p>
            </div>
          ))}
        </div>

        <Divider className="my-16" />

        <h2 className="font-display text-3xl">What goes home</h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-lg leading-relaxed">
          {health.goesHomeWith.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Divider className="my-16" />

        <h2 className="font-display text-3xl">Guarantee</h2>
        {health.guarantee.map((p) => (
          <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed">
            {p}
          </p>
        ))}

        <div className="mt-10">
          <Button href="/apply">Join the waitlist</Button>
        </div>
        </div>
      </Container>
    </Section>
  );
}
