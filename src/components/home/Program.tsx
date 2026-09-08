import { Reveal } from "@/components/scroll/Reveal";

/** Full-width statement — the one manifesto paragraph. */
export function Program() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28 md:py-36">
      <Reveal className="mx-auto max-w-[46ch] text-center">
        <h2 className="font-display text-3xl md:text-4xl">
          One or two litters a year, done properly
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Every parent is fully health-tested before a mating is planned. Puppies
          are born in the kitchen and raised with daily handling, novel surfaces
          and sounds, and early crate and car time. Families stay in touch with us
          for the life of the dog.
        </p>
      </Reveal>
    </section>
  );
}
