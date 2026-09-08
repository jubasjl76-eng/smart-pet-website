import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * The site's own inquiry endpoint. The browser posts here (same origin); we
 * validate + drop bots, then forward to the backend's public inquiry route.
 * In MOCK mode (no backend URL) it just accepts and logs.
 */
const BASE = process.env.PUBLIC_API_BASE_URL;

const Body = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
  puppyId: z.string().max(64).optional(),
  litterId: z.string().max(64).optional(),
  // honeypot — real users never fill this
  company: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }
  const { company, ...inquiry } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // silently drop bots

  if (!BASE) {
    console.log("[inquiry:mock]", inquiry);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`${BASE}/api/public/inquiries`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(inquiry),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "Could not submit right now" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
