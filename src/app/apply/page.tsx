import type { Metadata } from "next";
import { getLitters } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = { title: "Join the waitlist" };

type Props = { searchParams: Promise<{ puppy?: string; litter?: string }> };

export default async function Apply({ searchParams }: Props) {
  const q = await searchParams;
  const litters = await getLitters();
  const litter = q.litter ? litters.find((l) => l.id === q.litter) : undefined;
  const puppy = q.puppy
    ? litters.flatMap((l) => l.puppies).find((p) => p.id === q.puppy)
    : undefined;

  const context = puppy
    ? `You are asking about ${puppy.name}${litter ? ` in ${litter.name}` : ""}. This is a request — we confirm every reserve ourselves.`
    : litter
      ? `You are asking about ${litter.name}. We will be in touch about the waitlist.`
      : undefined;

  return (
    <Section>
      <Container as="main">
        <div className="max-w-[46ch]">
          <h1 className="font-display text-4xl md:text-5xl">
            {puppy ? `Reserve ${puppy.name}` : "Join the waitlist"}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Tell us about your home. We read every application and follow up
            personally. No deposit is taken online.
          </p>
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
