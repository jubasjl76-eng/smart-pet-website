import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Dog } from "@/lib/types";
import { Reveal } from "@/components/scroll/Reveal";
import { HorizontalPan } from "@/components/scroll/HorizontalPan";

function healthLine(d: Dog): string {
  const tests = (d.healthTests ?? [])
    .slice(0, 3)
    .map((t) => `${t.name.split(" (")[0].toLowerCase()} ${t.result.toLowerCase()}`);
  return tests.length ? tests.join(", ") : "";
}

export async function Parents({ dogs }: { dogs: Dog[] }) {
  const [t, dogsT] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Dogs"),
  ]);
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">{t("parentsTitle")}</h2>
          <p className="mt-2 max-w-[50ch] text-ink-soft">{t("parentsSub")}</p>
        </Reveal>
      </div>

      <HorizontalPan className="mt-10">
        {dogs.map((d) => (
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
              <span className="text-sm text-ink-soft">
                {d.role === "sire" ? dogsT("sire") : dogsT("dam")}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">{healthLine(d)}</p>
          </article>
        ))}
        <div className="flex w-[60vw] shrink-0 items-center sm:w-[300px]">
          <Link href="/dogs" className="font-display text-lg underline underline-offset-4">
            {t("meetTheDogs")}
          </Link>
        </div>
      </HorizontalPan>
    </section>
  );
}
