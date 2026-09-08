import Image from "next/image";
import Link from "next/link";
import type { Dog } from "@/lib/types";
import { Reveal } from "@/components/scroll/Reveal";
import { HorizontalPan } from "@/components/scroll/HorizontalPan";

function healthLine(d: Dog): string {
  const tests = (d.healthTests ?? [])
    .slice(0, 3)
    .map((t) => `${t.name.split(" (")[0].toLowerCase()} ${t.result.toLowerCase()}`);
  return tests.length ? tests.join(", ") : "Fully health-tested";
}

export function Parents({ dogs }: { dogs: Dog[] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">The parents</h2>
          <p className="mt-2 max-w-[50ch] text-ink-soft">
            Every litter comes from these dogs. Clearances are current and on file.
          </p>
        </Reveal>
      </div>

      <HorizontalPan className="mt-10">
        {dogs.map((d) => (
          // interim tile — replace with <DogCard> (task B6)
          <article key={d.id} className="w-[78vw] shrink-0 sm:w-[400px]">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={d.photos[0]}
                alt={d.name}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="font-display text-xl">{d.name}</h3>
              <span className="text-sm capitalize text-ink-soft">{d.role}</span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">{healthLine(d)}</p>
          </article>
        ))}
        <div className="flex w-[60vw] shrink-0 items-center sm:w-[300px]">
          <Link href="/dogs" className="font-display text-lg underline underline-offset-4">
            Meet the dogs
          </Link>
        </div>
      </HorizontalPan>
    </section>
  );
}
