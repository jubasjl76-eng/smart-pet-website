import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * The dashboard calls this after a "Publish to website" toggle so the site
 * refreshes before the ISR window elapses.
 *   POST /api/revalidate  { "secret": "..." }
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 501 });
  }
  let body: { secret?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  if (body.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidatePath("/", "layout"); // refresh every page that shows public data
  return NextResponse.json({ revalidated: true });
}
