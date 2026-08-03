import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS, type CacheTag } from "@/src/lib/cache-tags";

const VALID_TAGS = new Set<string>(Object.values(CACHE_TAGS));

/**
 * On-demand ISR revalidation webhook — the CMS backend calls this
 * immediately after any create/update/delete so the affected data appears
 * on the live site right away, instead of only after the 10–60 minute
 * `revalidate` window (or a full rebuild) elapses.
 *
 * POST /api/revalidate
 * Headers: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body:    { "tag": "rooms" }               — revalidate one resource
 *          { "tags": ["rooms", "offers"] }  — revalidate several at once
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }

  let body: { tag?: string; tags?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const requested = body.tags ?? (body.tag ? [body.tag] : []);
  if (requested.length === 0) {
    return NextResponse.json(
      { success: false, message: "Provide a `tag` or `tags` field" },
      { status: 400 }
    );
  }

  const invalid = requested.filter((t) => !VALID_TAGS.has(t));
  if (invalid.length > 0) {
    return NextResponse.json(
      { success: false, message: `Unknown tag(s): ${invalid.join(", ")}` },
      { status: 400 }
    );
  }

  for (const tag of requested as CacheTag[]) {
    // `{ expire: 0 }` forces immediate expiration rather than the default
    // lazy stale-while-revalidate marking — this route exists specifically
    // for an external webhook that needs the change to be live right away,
    // per Next's own guidance for this exact scenario.
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ success: true, revalidated: requested });
}
