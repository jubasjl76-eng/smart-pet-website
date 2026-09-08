import { getDogs, getKennel, getLitters } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Field, TextAreaField } from "@/components/ui/Field";
import { Media, MediaGallery } from "@/components/media/Media";
import { Breadcrumb } from "@/components/chrome/Breadcrumb";
import { DogCard } from "@/components/cards/DogCard";
import { LitterCard } from "@/components/cards/LitterCard";
import { PuppyCard } from "@/components/cards/PuppyCard";
import {
  DogCardSkeleton,
  LitterCardSkeleton,
  PuppyCardSkeleton,
} from "@/components/feedback/Skeletons";
import { InquiryForm } from "@/components/forms/InquiryForm";

/**
 * Visual check for B-column primitives. Not linked from the site.
 * Open /dev/components against mock/*.json.
 */
export default async function ComponentsPreview() {
  const [kennel, dogs, litters] = await Promise.all([
    getKennel(),
    getDogs(),
    getLitters(),
  ]);
  const litter = litters[0];
  const puppy = litter?.puppies[0];
  const dog = dogs[0];

  return (
    <main className="pb-24">
      <Section>
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            B10 · components
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            Component preview
          </h1>
          <p className="mt-3 max-w-[60ch] text-lg text-ink-soft">
            Every B-column primitive against {kennel.name} mock data. Tokens stay
            in /dev/tokens.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="space-y-16">
          <Block title="Button">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Reserve a puppy</Button>
              <Button variant="brand">Meet the dogs</Button>
              <Button variant="ghost">Join the waitlist</Button>
              <Button disabled>Sending…</Button>
            </div>
          </Block>

          <Block title="Badge / Tag">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">Available</Badge>
              <Badge>Reserved</Badge>
              <Tag>Current litter</Tag>
            </div>
          </Block>

          <Block title="Card / Divider">
            <Card className="max-w-sm p-6">
              <p className="font-display text-xl">Surface card</p>
              <p className="mt-2 text-ink-soft">bg-surface, no second radius.</p>
            </Card>
            <Divider className="mt-8" />
          </Block>

          <Block title="Field">
            <div className="max-w-[46ch] space-y-4">
              <Field label="Your name" name="preview-name" defaultValue="Ada" />
              <Field label="Email" name="preview-email" error="That email does not look right." />
              <TextAreaField label="About your home" name="preview-msg" optional />
            </div>
          </Block>

          <Block title="Breadcrumb">
            <Breadcrumb
              items={[
                { href: "/", label: "Home" },
                { href: "/litters", label: "Litters" },
                { label: litter?.name ?? "Litter" },
              ]}
            />
          </Block>

          <Block title="Media">
            {litter && (
              <div className="max-w-xl">
                <Media src={litter.photos[0]} alt={litter.name} aspect="4/3" />
                <p className="mt-6 text-sm text-ink-soft">Gallery + lightbox</p>
                <MediaGallery
                  className="mt-3"
                  images={litter.photos}
                  alt={litter.name}
                />
              </div>
            )}
          </Block>

          <Block title="DogCard">
            {dog && (
              <div className="max-w-sm">
                <DogCard dog={dog} />
              </div>
            )}
          </Block>

          <Block title="LitterCard">
            {litter && <LitterCard litter={litter} />}
          </Block>

          <Block title="PuppyCard">
            {puppy && litter && (
              <div className="max-w-sm">
                <PuppyCard puppy={puppy} litterId={litter.id} />
              </div>
            )}
          </Block>

          <Block title="Skeletons">
            <div className="grid gap-8 md:grid-cols-3">
              <DogCardSkeleton />
              <PuppyCardSkeleton />
              <div className="md:col-span-3">
                <LitterCardSkeleton />
              </div>
            </div>
          </Block>

          <Block title="Inquiry form">
            <div className="max-w-[46ch]">
              <InquiryForm
                litterId={litter?.id}
                context="Preview only — posts to /api/inquiries in mock mode."
              />
            </div>
          </Block>
        </Container>
      </Section>

      <Section tone="brand">
        <Container>
          <h2 className="font-display text-3xl">Dark-section (brand-fixed)</h2>
          <p className="mt-3 max-w-[46ch] text-brand-fixed-ink/80">
            The one invert. Buttons use tone=&quot;on-brand&quot;.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button tone="on-brand">Join the waitlist</Button>
            <Button variant="ghost" tone="on-brand">
              Email us
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
