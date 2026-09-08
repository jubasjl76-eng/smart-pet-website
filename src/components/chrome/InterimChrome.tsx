import Link from "next/link";

/**
 * Interim header + footer so pages are presentable. Task B3 (Cursor) replaces
 * both with the real nav (mobile drawer) and footer.
 */
const NAV = [
  { href: "/dogs", label: "Dogs" },
  { href: "/litters", label: "Litters" },
  { href: "/about", label: "About" },
  { href: "/apply", label: "Apply" },
];

export function InterimHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Rathmore Retrievers
        </Link>
        <nav className="hidden gap-7 text-sm sm:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-ink-soft transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function InterimFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-ink">Rathmore Retrievers</span>
        <span>County Meath, Ireland</span>
        <a href="mailto:hello@rathmoreretrievers.example" className="hover:text-ink">
          hello@rathmoreretrievers.example
        </a>
      </div>
    </footer>
  );
}
