/**
 * Visual check for the F2 design tokens. Not linked from the site.
 * Open /dev/tokens in light and dark (OS setting) to verify contrast.
 */
const swatches = [
  ["bg", "--color-bg"],
  ["surface", "--color-surface"],
  ["surface-2", "--color-surface-2"],
  ["ink", "--color-ink"],
  ["ink-soft", "--color-ink-soft"],
  ["brand", "--color-brand"],
  ["brand-strong", "--color-brand-strong"],
  ["accent", "--color-accent"],
  ["line", "--color-line"],
] as const;

export default function Tokens() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16 space-y-16">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">F2 · design tokens</p>
        <h1 className="mt-2 text-4xl md:text-5xl">Rathmore Retrievers</h1>
        <p className="mt-3 max-w-[60ch] text-lg text-ink-soft">
          Forest green, a green-tinted off-white, and one russet accent. The dogs
          bring the gold; the interface stays cool so the photography carries the
          warmth.
        </p>
      </header>

      <section>
        <h2 className="text-2xl">Colour</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map(([name, varName]) => (
            <div key={name} className="border border-line">
              <div className="h-20" style={{ background: `var(${varName})` }} />
              <div className="p-2 text-xs">
                <div className="font-display">{name}</div>
                <div className="text-ink-soft">{varName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl">Type scale</h2>
        <div className="mt-4 space-y-3">
          <p className="font-display text-6xl md:text-7xl leading-[1.05]">Raised underfoot</p>
          <p className="font-display text-3xl md:text-4xl">Section heading, Bricolage Grotesque</p>
          <p className="text-lg leading-relaxed max-w-[65ch]">
            Body copy is Newsreader — a reading serif. It sets long trust copy
            (health guarantee, the About story) without the templated look of a
            serif <em>headline</em>. Emphasis stays in the same family.
          </p>
          <p className="text-lg italic leading-relaxed max-w-[65ch] text-ink-soft">
            &ldquo;They knew every puppy by temperament, not just by collar
            colour.&rdquo; Newsreader italic, for testimonials.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl">Buttons</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="rounded-sm bg-accent px-5 py-2.5 text-sm text-accent-ink transition-transform duration-200 active:translate-y-px">
            Reserve a puppy
          </button>
          <button className="rounded-sm bg-brand px-5 py-2.5 text-sm text-white transition-transform duration-200 active:translate-y-px">
            Meet the dogs
          </button>
          <button className="rounded-sm border border-ink/30 px-5 py-2.5 text-sm transition-colors hover:bg-surface">
            Join the waitlist
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl">Motion</h2>
        <p className="mt-2 max-w-[60ch] text-ink-soft">
          Durations 200 / 400 / 700ms, ease{" "}
          <code className="text-sm">cubic-bezier(.16,1,.3,1)</code>. Lenis smooth
          scroll, scroll-reveal stagger, one pinned hero, one horizontal litters
          pan, growth chart drawing on entry. Everything collapses to static
          under <code className="text-sm">prefers-reduced-motion</code>.
        </p>
      </section>
    </main>
  );
}
