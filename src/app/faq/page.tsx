import type { Metadata } from "next";
import { faqs } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How applying, matching, and going home works at Rathmore.",
};

export default function Faq() {
  return (
    <Section>
      <Container as="main">
        <div className="max-w-[65ch]">
          <h1 className="font-display text-4xl md:text-5xl">Questions we are asked</h1>
          <dl className="mt-12 space-y-10">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-display text-xl">{item.q}</dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16">
            <Button href="/apply">Join the waitlist</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
