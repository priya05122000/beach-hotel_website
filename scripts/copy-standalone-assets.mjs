// `output: "standalone"` traces only the server (server.js, minimal
// node_modules, .next/server) into .next/standalone — it does NOT include
// .next/static or public/. Without those, a deploy that just copies
// .next/standalone serves fresh server-rendered HTML against a stale (or
// entirely missing) client JS bundle: every asset under /_next/static/...
// stays frozen at whatever was last placed there, no matter how many times
// the app is rebuilt and redeployed afterward.
//
// Runs automatically via the `postbuild` script so this can't be forgotten.
import { existsSync, cpSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const copies = [
  { from: join(rootDir, ".next", "static"), to: join(rootDir, ".next", "standalone", ".next", "static") },
  { from: join(rootDir, "public"), to: join(rootDir, ".next", "standalone", "public") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.warn(`[copy-standalone-assets] Skipping missing source: ${from}`);
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`[copy-standalone-assets] Copied ${from} -> ${to}`);
}
