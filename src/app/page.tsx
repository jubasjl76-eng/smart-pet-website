import { getKennel, getDogs, getLitters } from "@/lib/api";

/**
 * Placeholder home — proves the data layer (types + api.ts + mock/*.json) is
 * wired end to end. Replaced by the scroll-driven home in task A2.
 */
export default async function Home() {
  const [kennel, dogs, litters] = await Promise.all([
    getKennel(),
    getDogs(),
    getLitters(),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm uppercase tracking-widest text-neutral-500">
        Phase 3 scaffold
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{kennel.name}</h1>
      <p className="mt-2 text-neutral-600">{kennel.tagline}</p>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Dogs ({dogs.length})
      </h2>
      <ul className="mt-2 space-y-1 text-sm">
        {dogs.map((d) => (
          <li key={d.id}>
            {d.name} — {d.role}, {d.breed}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Litters ({litters.length})
      </h2>
      <ul className="mt-2 space-y-1 text-sm">
        {litters.map((l) => (
          <li key={l.id}>
            {l.name} — {l.status}, {l.availableCount}/{l.puppyCount} available
          </li>
        ))}
      </ul>
    </main>
  );
}
