import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/scroll/Reveal";

export async function Voices() {
  const t = await getTranslations("Voices");
  const home = await getTranslations("Home");
  const items = [1, 2, 3].map((i) => ({
    quote: t(`q${i}`),
    name: t(`n${i}`),
    town: t(`t${i}`),
  }));

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <Reveal>
        <h2 className="font-display text-3xl md:text-4xl">{home("voicesTitle")}</h2>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.08} className="border-t border-line pt-5">
            <blockquote className="text-lg italic leading-relaxed">{item.quote}</blockquote>
            <figcaption className="mt-4 text-sm not-italic text-ink-soft">
              {item.name}, {item.town}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
