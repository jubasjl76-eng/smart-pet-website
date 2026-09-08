import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLitters } from "@/lib/api";
import { Reveal } from "@/components/scroll/Reveal";
import type { Litter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Litters",
  description:
    "Planned and current retriever litters at Rathmore, with availability and how the waitlist works.",
};

const FALLBACK = "https://picsum.photos/seed/rathmore-litter/1200/900";

const STATUS_LABEL: Record<Litter["status"], string> = {
  planned: "Planned",
  expecting: "Expecting",
  born: "Just born",
  available: "Puppies available",
  reserved: "All reserved",
  sold_out: "Placed",
};

function when(l: Litter): string {
  const long = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
  const monthYear = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IE", { month: "long", year: "numeric" });
  if (l.bornOn) return `Born ${long(l.bornOn)}`;
  if (l.expectedOn) return `Expected ${monthYear(l.expectedOn)}`;
  return "Dates to be confirmed";
}

export default async function LittersPage() {
  const litters = await getLitters();

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl">Litters</h1>
        <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-ink-soft">
          We plan one or two litters a year. Available puppies are listed here
          first; once a litter is full, the waitlist carries to the next one.
        </p>
      </Reveal>

      {litters.length === 0 ? (
        <p className="mt-16 text-lg text-ink-soft">
          Nothing planned is public yet. Join the waitlist and we will be in touch
          when the next litter is announced.
        </p>
      ) : (
        <div className="mt-14 space-y-16">
          {litters.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.05}>
              <Link
                href={`/litters/${l.id}`}
                className="group grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={l.photos[0] ?? FALLBACK}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 620px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <span className="inline-flex rounded-sm bg-surface-2 px-2 py-0.5 text-xs text-ink-soft">
                    {STATUS_LABEL[l.status]}
                  </span>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl">{l.name}</h2>
                  <p className="mt-2 text-ink-soft">
                    {l.dam?.name} and {l.sire?.name}
                  </p>
                  <p className="mt-1 text-ink-soft">
                    {when(l)}
                    {l.availableCount > 0
                      ? ` · ${l.availableCount} of ${l.puppyCount} available`
                      : ""}
                  </p>
                  {l.description && (
                    <p className="mt-4 line-clamp-3 text-lg leading-relaxed">
                      {l.description}
                    </p>
                  )}
                  <span className="mt-4 inline-block underline underline-offset-4">
                    See the litter
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
