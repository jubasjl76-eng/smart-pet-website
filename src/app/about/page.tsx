import type { Metadata } from "next";
import { getKennel } from "@/lib/api";
import { about } from "@/content/about";
import { programValues } from "@/content/program";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

export default async function About() {
  const kennel = await getKennel();

  return (
    <>
      <Section>
        <Container as="main">
          <div className="max-w-[65ch]">
            <h1 className="font-display text-4xl md:text-5xl">{about.headline}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{about.lede}</p>
            <p className="mt-6 text-lg leading-relaxed">{kennel.about}</p>
            {about.story.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">How we work</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {programValues.map((v) => (
              <div key={v.title}>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-[46ch]">
          <Divider className="mb-10" />
          <h2 className="font-display text-3xl">Visit or write</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {kennel.location}. Visits are by arrangement once we have spoken.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/apply">Join the waitlist</Button>
            <Button href={`mailto:${kennel.email}`} variant="ghost">
              Email us
            </Button>
          </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
