import { Reveal } from "@/components/scroll/Reveal";
import { testimonials } from "@/content/testimonials";

export function Voices() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <Reveal>
        <h2 className="font-display text-3xl md:text-4xl">From families</h2>
      </Reveal>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="border-t border-line pt-5">
            <blockquote className="text-lg italic leading-relaxed">{t.quote}</blockquote>
            <figcaption className="mt-4 text-sm not-italic text-ink-soft">
              {t.name}, {t.town}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
