import Link from "next/link";
import type { Dog } from "@/lib/types";
import { Media } from "@/components/media/Media";
import { Tag } from "@/components/ui/Tag";

function healthLine(d: Dog): string {
  const tests = (d.healthTests ?? [])
    .slice(0, 3)
    .map((t) => `${t.name.split(" (")[0].toLowerCase()} ${t.result.toLowerCase()}`);
  return tests.length ? tests.join(", ") : "Fully health-tested";
}

export function DogCard({
  dog,
  href = "/dogs",
}: {
  dog: Dog;
  href?: string;
}) {
  const photo = dog.photos[0];
  return (
    <article>
      <Link href={href} className="group block">
        {photo ? (
          <Media
            src={photo}
            alt={dog.name}
            aspect="4/5"
            sizes="400px"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="aspect-[4/5] bg-surface" />
        )}
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl">{dog.name}</h3>
          <Tag className="text-xs normal-case tracking-normal text-ink-soft">
            {dog.role}
          </Tag>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{healthLine(dog)}</p>
      </Link>
    </article>
  );
}
