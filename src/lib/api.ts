import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Kennel, Dog, Litter } from "./types";

/**
 * Server-only data layer for the public site.
 *
 * - `MOCK` (default when no backend URL is set) reads `mock/*.json` so the site
 *   builds with zero backend. Cursor and Claude both work against these.
 * - Live mode fetches `${PUBLIC_API_BASE_URL}/api/public/*` with ISR; the
 *   dashboard pings `/api/revalidate` on publish to refresh sooner.
 */
const BASE = process.env.PUBLIC_API_BASE_URL;
const MOCK = process.env.MOCK === "1" || !BASE;
const REVALIDATE = Number(process.env.PUBLIC_REVALIDATE_SECONDS ?? 300);

const mockDir = join(process.cwd(), "mock");

async function readMock<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(join(mockDir, file), "utf8")) as T;
}

async function live<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/api/public${path}`, {
    next: { revalidate: REVALIDATE, tags: ["public"] },
  });
  if (!res.ok) throw new Error(`public API ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getKennel(): Promise<Kennel> {
  return MOCK ? readMock("kennel.json") : live("/kennel");
}

export async function getDogs(): Promise<Dog[]> {
  return MOCK ? readMock("dogs.json") : live("/dogs");
}

export async function getLitters(): Promise<Litter[]> {
  return MOCK ? readMock("litters.json") : live("/litters");
}

export async function getLitter(id: string): Promise<Litter | null> {
  if (MOCK) {
    const all = await getLitters();
    return all.find((l) => l.id === id) ?? null;
  }
  const res = await fetch(`${BASE}/api/public/litters/${id}`, {
    next: { revalidate: REVALIDATE, tags: ["public"] },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`public API /litters/${id} -> ${res.status}`);
  return res.json();
}
