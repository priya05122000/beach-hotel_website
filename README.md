# Beach Hotel Website

Modern hotel website built with Next.js, TypeScript and Tailwind CSS.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

Production builds use **webpack**, not Turbopack (`next build --webpack`) —
`npm run dev` still uses Turbopack for fast local iteration. Turbopack has no
`splitChunks`-equivalent config, so it can duplicate/hoist shared libraries
across route chunks in ways webpack won't.

## Performance Optimization Checklist

Lighthouse/Core Web Vitals issues found on this project. Re-check these on
any new project before assuming a low score means something exotic is wrong.

### Images (LCP, CLS)

- Always use `next/image`, never a raw `<img>` or CSS `background-image`.
- Every `fill` image needs a `sizes` prop matching its real rendered width —
  don't leave it at a lazy `100vw` default.
- Only the true LCP image should have `preload` + `fetchPriority="high"`.
  Grep the whole page for stray `priority`/`preload` props on other images
  (easy to copy-paste in) — each one adds a competing `<link rel="preload">`
  that delays the real hero image's fetch. Verify by curling the built HTML:
  exactly one `rel="preload" as="image"` per page.
- Avoid `image/avif` in `next.config` unless you have a CDN in front of a
  self-hosted image optimizer — AVIF encoding is far more CPU-expensive than
  WebP per cache miss.
- Set `images.minimumCacheTTL` explicitly for images that rarely change.
- Check `public/` for orphaned, unreferenced originals left behind after a
  format switch.

### JS bundle / main-thread work (TBT)

- Don't import heavy libraries (GSAP, Lenis, etc.) or mount providers/widgets
  (toasts, modals) at the root layout — that forces them into every route's
  bundle. Scope imports to the components that use them.
- Code-split rarely-opened widgets (date picker, modal, rich text editor)
  with `dynamic(() => import("./Widget"), { ssr: false })`, rendered only on
  interaction.
- `next/dynamic()` code-splits a *component* and excludes its chunk from the
  initial script manifest; a bare `import()` inside `useEffect` still
  code-splits but doesn't guarantee exclusion from the initial `<script>`
  tags. Verify either way by inspecting the built HTML, not by assumption.
- A library imported independently by multiple routes should collapse into
  one shared chunk — verify by grepping each route's chunks for a signature
  string and comparing file sizes/hashes. If Turbopack duplicates it, switch
  the production build to webpack.
- Delete unused library exports and unused dependencies (`npm uninstall`,
  then reinstall to sync the lockfile).
- Simple one-shot scroll reveals don't need GSAP — a plain
  `IntersectionObserver` + CSS transition is enough. Reserve GSAP for
  scrub/pin effects.
- Gate non-essential scroll animations off mobile with
  `gsap.matchMedia().add("(min-width: 768px)", ...)`.
- Set an explicit `browserslist` targeting modern browsers to avoid
  unnecessary legacy JS down-leveling.
- Throttle scroll/resize listeners that read layout
  (`getBoundingClientRect`, etc.) to once per frame via `requestAnimationFrame`
  — avoids Lighthouse's "Forced reflow".
- Don't enable "sync touch" on smooth-scroll libraries (Lenis) without
  testing on real mobile devices — it fights native touch-fling physics.
- **Never animate `left`/`top`/`width`/`height`/`margin`/`padding` with GSAP —
  only `x`/`y`/`scale`/`rotate`/`opacity`.** The former forces layout on every
  frame; critical for `scrub` tweens.
  - Common offender: a "zoom hero" that grows via `width`/`height`. Fix: keep
    real layout size at the *final* visual size, use `scale` to look smaller
    initially, clip with `overflow-hidden`.
  - Non-uniform scale (different X/Y) stretches image content inside the box.
    Counter-scale an inner wrapper by the exact reciprocal, computed **every
    frame** via `onUpdate` — two independently-eased tweens do not cancel
    exactly mid-animation (the product of two lerps is quadratic, not
    constant).
  - If a second effect already animates the same property, don't run two
    competing tweens — reproduce its curve manually inside the one
    `onUpdate` (`gsap.parseEase` + `gsap.utils.interpolate`) and combine.

### Network payload (LCP)

- Autoplaying background `<video>` is a common oversized-payload culprit.
  Don't mount `<video>`/`<source>` until an `IntersectionObserver` confirms
  the section is about to scroll into view, and set `preload="none"` as a
  second layer of defense. Don't gate a true hero video this way though —
  it should autoplay immediately.
- Prefer pre-compressed, appropriately-sized media over relying entirely on
  runtime optimization.
- A component repeated per list item (e.g. one video per gallery category)
  multiplies the cost — same IntersectionObserver + `preload="none"` fix.

### Render-blocking requests (FCP)

- Inline critical CSS for small/atomic bundles if the framework supports it
  (e.g. Next's `experimental.inlineCss`).
- Audit every `await` in a root layout — a blocking fetch there delays FCP
  site-wide, and may prevent routes from being statically prerendered.

### Lazy-load third-party libraries behind visibility

- A library only used by a below-the-fold section (carousel, marquee)
  shouldn't fetch until that section is about to scroll into view. Pattern:
  a reusable `useInView` hook (`IntersectionObserver`, fires once) feeding a
  `LazySection` wrapper that renders a placeholder until then, mounting the
  dynamically-imported component only once visible.
- `next/dynamic()` must be called at module top level, not inside a
  component body/render.
- `ssr: false` is only allowed inside a Client Component. If the page is a
  Server Component, move the `dynamic()` call into its own small
  `"use client"` wrapper (rendering `LazySection` + the dynamic import) and
  have the page import *that* as a normal Client Component — a Server
  Component `dynamic()` call preloads its chunk regardless of visibility.
- Verify empirically: curl the built HTML per route and confirm the
  library's chunk is absent from routes where it should be deferred. Don't
  trust a code read alone.
- A library used by 2+ separate lazy boundaries can get hoisted by webpack's
  built-in `default`/`defaultVendors` cache groups into a shared chunk that's
  referenced on *every* route, defeating the gate entirely. Fix: in
  `next.config.ts`, add a `webpack(config, { isServer })` override that sets
  `config.optimization.splitChunks.cacheGroups.default = false` and
  `...defaultVendors = false` for the client build, leaving only Next's own
  `framework`/`lib` cache groups. Re-verify across *all* routes after.

### Don't stop at the home page

- A perf pass on one page doesn't cover the site — audit every route
  explicitly; the same anti-patterns tend to repeat independently per page.
- A true hero video/image (first thing rendered) should NOT be gated behind
  an `IntersectionObserver` — only gate content further down the page.
- Audit every `"use client"` file (and shared hooks/helpers it calls) for an
  actual hook/handler/browser-API/client-library reason. If none apply, drop
  the directive.

### Reduce React re-renders

- `React.memo` doesn't help if the parent passes a new inline
  function/object every render. Pass a stable `useCallback` reference and
  have the child call it with its own data, instead of wrapping a new arrow
  function per item.
- Don't pass shared parent state to every item in a list — derive a per-item
  boolean (`isActive={selectedId === item.id}`) so only the affected item's
  props actually change.
- Extract a large static render tree into its own memoized component when
  its parent also owns fast-changing state (scroll position, form input) —
  otherwise the static tree re-renders on every tick even though its output
  never changes.
- If a context provider is added later, memoize the value passed to it
  (`useMemo`) — an inline object literal re-renders every consumer on every
  render regardless of relevance.

### Dependency vulnerabilities (`npm audit`)

- `npm audit fix` only bumps packages *your own* `package.json` depends on
  directly — it can't touch a vulnerable package nested inside another
  dependency's own `package.json` (e.g. `sharp` bundled inside `next`).
  `--force` in that case just downgrades the outer package to an old version
  that happens to want a newer nested one — not a real fix, a regression.
- To force a patched version of a nested dependency without downgrading
  anything, add it to the top-level `overrides` field in `package.json`
  (e.g. `"sharp": "^0.35.3"`) and run `npm install` — this pins every copy
  in the tree, at any depth, to that version. Confirm with `npm ls <pkg>`
  (should show one deduped version) and `npm audit` (0 vulnerabilities).
- Re-verify after any override: `tsc`/`lint`/`build`, plus a runtime check
  of whatever the overridden package actually does (e.g. hit
  `/_next/image?...` and confirm it still returns a valid resized image
  when overriding `sharp`, since that's Next's image-optimization engine).

### General workflow notes

- Confirm a Lighthouse report was run against a production build
  (`next build && next start`), not `next dev` — dev mode inflates most
  metrics.
- Confirm a live-site fix was actually deployed before concluding it "didn't
  work".
- "Unscored" Lighthouse panels are informational, not failing checks — only
  act on ones with a red/orange severity indicator.
