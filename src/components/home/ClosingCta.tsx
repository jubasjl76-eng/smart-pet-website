import Link from "next/link";
import { Reveal } from "@/components/scroll/Reveal";

/** The one deliberate brand-colour block on the page (fixed in both themes). */
export function ClosingCta({ email }: { email: string }) {
  return (
    <section className="bg-brand-fixed text-brand-fixed-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <Reveal className="mx-auto max-w-[40ch]">
          <h2 className="font-display text-3xl md:text-4xl">Thinking about a puppy?</h2>
          <p className="mt-4 text-brand-fixed-ink/80">
            We match approved families to puppies at four weeks. Tell us about your
            home and we will be in touch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/apply"
              className="rounded-sm bg-accent px-6 py-3 text-sm text-accent-ink transition-transform active:translate-y-px"
            >
              Join the waitlist
            </Link>
            <a
              href={`mailto:${email}`}
              className="rounded-sm border border-brand-fixed-ink/40 px-6 py-3 text-sm transition-colors hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
