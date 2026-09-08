import type { Metadata } from "next";
import Image from "next/image";
import { getDogs } from "@/lib/api";
import { Reveal } from "@/components/scroll/Reveal";
import type { Dog } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our dogs",
  description:
    "The health-tested sires and dams behind every Rathmore litter, with clearances on file.",
};

function age(dob?: string): string {
  if (!dob) return "";
  const years = (Date.now() - Date.parse(dob)) / 3.15576e10;
  return years < 1 ? `${Math.round(years * 12)} months` : `${Math.floor(years)} years`;
}

function DogProfile({ dog }: { dog: Dog }) {
  return (
    <article className="grid gap-6 border-t border-line pt-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
        {dog.photos.slice(0, 2).map((src, i) => (
          <div key={i} className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image src={src} alt={dog.name} fill sizes="(min-width: 768px) 320px, 45vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="font-display text-2xl md:text-3xl">{dog.name}</h3>
          <span className="text-ink-soft">
            {dog.role === "sire" ? "Sire" : "Dam"} · {dog.breed}
            {dog.dob ? ` · ${age(dog.dob)}` : ""}
          </span>
        </div>
        {dog.titles && <p className="mt-1 text-sm text-ink-soft">{dog.titles}</p>}
        {dog.bio && <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">{dog.bio}</p>}

        {dog.healthTests && dog.healthTests.length > 0 && (
          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {dog.healthTests.map((t) => (
              <div key={t.name} className="flex justify-between gap-4 text-sm">
                <dt className="text-ink-soft">{t.name}</dt>
                <dd className="font-display">{t.result}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default async function DogsPage() {
  const dogs = await getDogs();
  const dams = dogs.filter((d) => d.role === "dam");
  const sires = dogs.filter((d) => d.role === "sire");

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <Reveal>
        <h1 className="font-display text-4xl md:text-5xl">Our dogs</h1>
        <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-ink-soft">
          Every dog here is fully health-tested before it is bred. Clearances are
          current and available to see on request.
        </p>
      </Reveal>

      {/* one breed for now; a breed filter lands when the Labrador line starts */}
      {dams.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl text-ink-soft">Dams</h2>
          </Reveal>
          <div className="mt-4 space-y-4">
            {dams.map((d) => (
              <Reveal key={d.id}>
                <DogProfile dog={d} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {sires.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-xl text-ink-soft">Sires</h2>
          </Reveal>
          <div className="mt-4 space-y-4">
            {sires.map((d) => (
              <Reveal key={d.id}>
                <DogProfile dog={d} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
