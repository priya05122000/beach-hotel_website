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
`npm run dev` still uses Turbopack for fast local iteration. See "Duplicate
packages across route chunks" below for why.

## Performance Optimization Checklist

A running log of the Lighthouse/Core Web Vitals issues found and fixed on
this project, kept as a reusable checklist for future Next.js projects.
Re-check these on any new project before assuming a low Lighthouse score
means something exotic is wrong — most of the time it's one of these.

### Images (LCP, CLS)

- **Always use `next/image`**, never a raw `<img>` tag. Raw `<img>` skips
  responsive `srcset` generation, format negotiation (AVIF/WebP), and lazy
  loading — this alone caused the biggest single LCP regression found here
  (a scrollytelling section fetching full-resolution originals via `<img>`).
- **Every `fill` image needs an explicit `sizes` prop** matching its actual
  rendered width at each breakpoint (e.g. `sizes="(min-width: 640px) 320px,
  240px"` for a fixed-width card, not a lazy `100vw` default) — otherwise
  Next serves the largest breakpoint variant regardless of how small the
  image actually renders, wasting bandwidth on mobile.
- **The one true LCP image** (usually the hero) should have `preload`
  (this project's Next version deprecated `priority` in favor of `preload`
  — check your installed Next version's own docs, this varies by version)
  **and explicitly `fetchPriority="high"`**. Preload alone only controls
  whether a `<link rel="preload">` is inserted in `<head>`; it does not
  automatically set `fetchPriority` on the request in every Next version —
  verify both are present in the rendered HTML, don't assume one implies
  the other.
- **`next.config` image `formats`**: avoid `"image/avif"` unless you have a
  CDN/edge cache in front of a self-hosted (`output: "standalone"`) image
  optimizer. AVIF encoding is dramatically more CPU-expensive than WebP for
  a marginal size win, and that cost lands directly in the request path on
  every cache miss — this was the dominant contributor to a 2+ second
  "resource load duration" in one LCP breakdown here. WebP alone is fast to
  encode and still compresses well.
- **Set `images.minimumCacheTTL`** explicitly (e.g. a year) for images that
  rarely change. The framework default cache window can be short enough
  that an expensive on-demand re-encode repeats far more often than it
  needs to.
- **Check `public/` for orphaned assets** every so often — an unused,
  uncompressed original (e.g. a multi-MB `.png` left behind after switching
  to a `.webp` version) doesn't cost anything if nothing references it, but
  it's easy to accidentally re-link the wrong one later. Grep for the
  filename across `src/` before assuming a large file is actually served.

### JS bundle / main-thread work (TBT, Script Evaluation)

- **Never import a heavy animation library (GSAP, ScrollTrigger, SplitText,
  Lenis, etc.) at the root layout level.** If it's imported anywhere a
  shared layout/provider touches, it gets forced into the initial bundle of
  *every route*, even pages that don't animate at all. Scope these imports
  to the individual components that actually use them; lazy-`import()`
  anything only needed after mount (e.g. `gsap/ScrollTrigger` inside a
  `useEffect`, not at module scope in a global provider).
- **The same rule applies to any provider/widget mounted in a shared
  layout, not just animation libraries.** A toast notification system
  (`<Toaster />`), for example, has no reason to mount on every route if
  only one page ever calls `toast()`. Move the provider down to the
  page/component that actually triggers it instead of the root layout.
- **Code-split rarely-opened heavy widgets with `next/dynamic`.** A date
  picker, rich text editor, modal, chart library, etc. that only renders
  after a user interaction (click to open a popup) shouldn't ship as part
  of the initial page bundle. Split the actual widget into its own
  component and load it with
  `dynamic(() => import("./Widget"), { ssr: false })`, rendered only once
  the relevant `open`/interaction state is true. One date-picker library in
  this project was a ~50KB chunk that had been loading unconditionally on
  every visit to a page that has it — splitting it removed that entirely
  from the initial load (confirmed: the chunk was completely absent from
  the initial page's script list after the change).
- **`next/dynamic()` and a bare `import()` are not equivalent for this
  purpose — verify which one you actually need.** `next/dynamic()` wraps a
  *component* and Next excludes its chunk from the route's initial script
  manifest until it's actually rendered — this is what makes the date-picker
  split above work. A bare `import("some-library").then(...)` inside a
  `useEffect` (used for a library instance/side-effect, not a component —
  e.g. initializing a smooth-scroll library) still gets code-split into its
  own chunk, but this project's Turbopack build still listed that chunk in
  the route's initial `<script async>` tags regardless of when the promise
  resolved. It's not wasted effort (keeps the module out of a larger shared
  chunk, and defers *evaluation* to after mount) but don't claim it removes
  the request from the initial load without checking the actual served
  HTML — it may not, unlike a true `next/dynamic()` component split.
  Only trust "this reduced the initial bundle" once you've confirmed it by
  inspecting the built HTML's script tags / chunk contents directly, not by
  assuming the technique worked.
- **Check for the same shared library duplicated across multiple route
  chunks, not just within one route.** A library imported independently by
  components on several different pages (e.g. GSAP core, imported by nearly
  every route's own client components rather than through a shared layout)
  *should* collapse into one chunk that every route references — but don't
  assume the bundler always does this correctly. Verify empirically: build,
  then for each route grep its referenced chunk files for a signature string
  unique to the library (a class name, a distinctive string literal) and
  compare which physical chunk file(s) each route points to. If two routes
  reference *different* chunk files both containing the same library, it's
  being duplicated, not shared — check file sizes too (near-identical sizes
  across "different" chunks is a strong signal). On this project, Turbopack
  (the current default bundler, a newer Rust-based tool with automatic
  per-route chunking and — confirmed via this Next version's own docs — no
  exposed manual chunk-splitting config comparable to webpack's
  `splitChunks`/`cacheGroups`) was silently shipping GSAP core as 3 separate
  copies across 7 routes instead of 1 shared copy, costing ~70KB of
  unnecessary duplicate downloads on 2 of them. The fix was switching the
  **production build** to webpack (`next build --webpack` — keep `next dev`
  on Turbopack for fast local iteration; webpack production builds are
  slower, ~27s vs Turbopack's ~5-14s here, but only run at deploy time) —
  webpack's mature chunk-splitting correctly collapsed it back to one shared
  chunk referenced by all 7 routes, verified the same way (content grep +
  route-by-route chunk comparison). If a newer Turbopack release gains
  equivalent cross-route deduplication, re-test before assuming webpack is
  still necessary.
- **Delete unused exports from expensive libraries eagerly.** A `next/font`
  export that's never applied anywhere still executes and preloads at
  module-eval time just by being defined/imported — same idea applies to
  any library where "unused but imported" still costs bytes/CPU.
- **Remove dependencies that are installed but never imported anywhere.**
  Grep for the package name across `src/` before assuming it's load-bearing
  — one unused UI kit dependency here was pulling in 54 transitive packages
  for zero actual usage. Run `npm install` after removing it from
  `package.json` so `package-lock.json`/`node_modules` stay in sync.
- **Simple one-shot scroll reveals (fade/slide-up on first intersect, no
  scrub/pin) don't need GSAP at all** — a plain `IntersectionObserver` +
  CSS transition does the same job with zero animation-library JS cost.
  Reserve GSAP/ScrollTrigger for effects that genuinely need scrub or pin
  behavior (pinned scrollytelling, horizontal scroll hijacking, etc.).
- **Gate decorative/non-essential scroll animations off mobile** with
  `gsap.matchMedia().add("(min-width: 768px)", () => {...})` (or an
  equivalent media-query check before creating any tween). Several
  simultaneous scrub animations competing for main-thread time on a single
  scroll frame is a common, easy-to-miss source of "sometimes fast,
  sometimes stuck" scroll feel specifically on mobile CPUs.
- **Set an explicit `browserslist`** in `package.json` targeting modern
  evergreen browsers. Without one, the compiler falls back to a broader,
  more conservative target and down-levels/polyfills syntax that's
  unnecessary for real visitors — this is the standard cause of Lighthouse's
  "legacy JavaScript" finding in a from-scratch Next.js app.
- **Throttle every raw `scroll`/`resize` listener that reads layout**
  (`getBoundingClientRect`, `offsetTop`, `elementsFromPoint`, `scrollWidth`,
  etc.) to at most once per animation frame via a dirty-flag +
  `requestAnimationFrame` pattern — an unthrottled listener doing a forced
  layout read on every single scroll event triggers Lighthouse's "Forced
  reflow" diagnostic and is a very common, very avoidable source of jank.
  This applies to *every* component with its own scroll listener, not just
  a shared navbar — this project had the same bug independently in a
  parallax gallery component on a completely different page.
- **Smooth-scroll libraries (Lenis, etc.): don't enable "sync touch"
  behavior unless you've specifically tested it on real mobile devices.**
  Simulating momentum scrolling over touch input fights the browser's
  native touch-fling physics and is a common cause of scrolling feeling
  inconsistent (fast, then stuck) specifically on mobile — desktop wheel
  scrolling is a separate code path and isn't affected the same way.
- **Never animate `left`/`top`/`width`/`height`/`margin`/`padding` with
  GSAP (or any animation library) — only `x`/`y`/`xPercent`/`yPercent`/
  `scale`/`scaleX`/`scaleY`/`rotate`/`opacity`.** The former forces a
  synchronous layout recalculation on *every single animation frame*; the
  latter are compositor-only and effectively free. This matters most for
  `scrub`-driven ScrollTrigger tweens, since they re-run on every scroll
  tick, not just once. Audit every `gsap.to`/`gsap.fromTo`/`.set()` call
  (including inside shared animation helpers — check what they actually
  animate, a hook can look innocuous but still be the culprit for every
  caller) for these properties.
  - **The common offender is a "zoom hero" pattern**: a box that starts
    small/positioned and grows to fill the viewport by animating its actual
    `width`/`height`/`left`/`top`. Fix: keep the box's real DOM layout size
    constant (matching its *final* visual size) from the start, and use
    `scale`/`x`/`y` to make it merely *look* smaller initially — an
    `overflow-hidden` ancestor clips the rest.
  - **Non-uniform scale (different X/Y factors) will visually stretch/
    squish any image content inside the animated box** (e.g. a `next/image
    fill` + `object-cover` child), since the transform applies to
    everything inside it. Fix: give the image its own inner wrapper that
    carries the exact inverse scale, computed **every frame** from the
    outer element's live value via `onUpdate` + `gsap.getProperty(el,
    "scaleX"/"scaleY")` — not two independently-eased tweens set once at
    the start/end. Two separately-interpolated values (even if their
    endpoints are exact reciprocals) do **not** cancel exactly in between:
    the product of two linear interpolations is quadratic, not constant, so
    pairing e.g. a `0.5→1` tween with a `2→1` tween produces a real,
    visible mismatch mid-animation, not just a theoretical one. Deriving
    the counter-scale from the driving tween's actual current value each
    frame is the only way to get an exact cancellation at every instant.
  - If a second, independent effect (e.g. a subtle background zoom) is
    already animating the *same* element/property the counter-scale needs
    to write to, don't run them as two separate competing tweens (last one
    each frame wins, breaking one or both) — reproduce the second effect's
    curve manually inside the single `onUpdate` via
    `gsap.parseEase("...")` + `gsap.utils.interpolate(from, to, easedT)`,
    and multiply it with the counter-scale so both apply together.

### Network payload (LCP, "Avoid enormous network payloads")

- **Any autoplaying background `<video>` is a prime suspect for oversized
  page weight.** A `<video autoPlay>` with no `preload` attribute set
  defaults to eagerly buffering the file the moment it mounts, regardless
  of whether it's ever scrolled into view. A single ~4.6MB ambient
  background video here was, on its own, over half of the page's total
  network payload. Fix: don't mount the `<video>`/`<source>` in the DOM at
  all until an `IntersectionObserver` confirms the section is about to
  scroll into view (use a `rootMargin` to start slightly before it's
  visible), and set `preload="none"` on the element itself as a second
  layer of defense.
- **Prefer serving pre-compressed, appropriately-sized media over relying
  entirely on runtime optimization** — a large background video especially
  benefits from being re-encoded at a lower bitrate/resolution suited to
  its actual display size before it ever reaches the app, not just deferred.

### Render-blocking requests (FCP)

- **Inline critical CSS if the framework supports it** for small/atomic CSS
  bundles (Tailwind, etc.) — eliminates the render-blocking
  `<link rel="stylesheet">` round-trip entirely. Check your framework's docs
  for the current mechanism (e.g. Next's `experimental.inlineCss`); this is
  most worth doing for small compact bundles, less so for large stylesheets
  where separate caching across page loads matters more.
- **Audit every `await` in a layout/root component that wraps every
  route.** A blocking fetch at that level delays FCP for the *entire site*
  on every request — and if the fetched data isn't actually rendered
  anywhere (check for dead props/unused data), it's pure waste. This project
  had exactly that: an announcements API call awaited in the site layout
  for a banner that was never wired up in the UI. Removing it also let
  several routes flip from server-rendered-on-demand to statically
  prerendered, which is a much bigger win than the fetch removal alone.

### Lazy-load third-party libraries behind visibility

- **A library only used by a below-the-fold section (a carousel, a marquee,
  etc.) shouldn't be fetched until that section is about to scroll into
  view** — not merely "on mount" or "on interaction" if the component
  auto-renders on mount anyway. Pattern used here: a reusable `useInView`
  hook (`IntersectionObserver`, fires once, `rootMargin` gives it a head
  start before the element is actually on-screen) feeding a `LazySection`
  wrapper that renders a lightweight placeholder (sized to roughly match the
  real content, to avoid layout shift) until then, and only mounts the real
  (dynamically-imported) component once visible.
- **`next/dynamic()` must be called at module top level, not inside a
  component body/render/useMemo** — this Next version's own docs are
  explicit: "`dynamic()` can't be used inside of React rendering as it needs
  to be marked in the top level of the module for preloading to work,
  similar to `React.lazy`." Declare the `dynamic(() => import(...))` call
  once outside any component, and reference the resulting component inside
  JSX/`LazySection`.
- **`ssr: false` is not allowed on a `next/dynamic()` call inside a Server
  Component — only inside a Client Component.** If the page/section that
  needs the lazy-loaded library is itself a Server Component (e.g. an async
  page with data fetching), don't just drop `ssr: false` and assume it's
  fine: this project's own docs also note that dynamically importing from a
  Server Component *actively preloads* the chunk's assets — confirmed
  empirically here, a page-level `dynamic()` (no `ssr: false`, since the
  page was a Server Component) still emitted an eager `<script async>` tag
  for the lazy chunk on every load of that route, completely defeating the
  visibility gate. Fix: move the `dynamic()` call into its own small
  `"use client"` wrapper file that internally renders `LazySection` +
  the dynamically-imported component, and have the Server Component page
  import *that* wrapper as a normal (non-dynamic) Client Component import.
  That satisfies the `ssr: false` requirement and avoids the Server-Component
  preload behavior entirely.
- **Always verify the fix empirically by inspecting the built HTML's
  `<script>` tags per route, not by assuming the gate worked.** `curl` each
  route's HTML in a production build (`next build && next start`), extract
  every `/_next/static/chunks/*.js` reference, and confirm the
  library-specific chunk is absent from routes where it should be deferred.
  Don't rely on "the code looks right" — this project's own contact-us page
  passed a visual/code read but still eagerly loaded `react-fast-marquee`
  until this exact check caught it (see previous bullet).
- **A library used by 2+ separate `next/dynamic()`/`React.lazy()` boundaries
  can get silently hoisted by webpack's built-in `default`/`defaultVendors`
  chunk-splitting cache groups into a shared chunk that's referenced on
  *every* route's initial script list — including routes that never render
  any of those boundaries.** This is easy to miss because each individual
  `dynamic()` call site looks correctly deferred in isolation; the bug only
  shows up when comparing the actual served chunk list across *unrelated*
  routes (e.g. a route with zero carousels still downloading the carousel
  library). Confirmed here: an embla-carousel library used by three
  different lazy-loaded components (each on a different page) got merged
  into one ~20KB chunk that was script-tagged on literally every page,
  including ones with no carousel at all. Fix: in `next.config.ts`, add a
  `webpack(config, { isServer })` override that disables the built-in
  `default`/`defaultVendors` cache groups for the client build
  (`config.optimization.splitChunks.cacheGroups.default = false` /
  `...defaultVendors = false`), leaving only Next's own purpose-built
  `framework`/`lib` cache groups in control of splitting. Re-verify with the
  same per-route `<script>`-tag grep afterward — this is a build-wide
  config change, so check *all* routes, not just the ones you were trying
  to fix.

### Don't stop at the home page

- **A perf pass on one page doesn't cover the site.** This project's images/
  video/scroll-listener bugs were fixed on the home page first, then found
  to independently exist on about-us, facilities, gallery, rooms, and
  contact-us too — each page had its own instance of the same anti-patterns
  (missing `sizes`, unthrottled scroll listeners, ungated autoplay video),
  not a shared root cause. Audit every route directory explicitly rather
  than assuming a home-page fix generalizes.
- **A CSS `background-image` used for a large hero/section background is
  the same missed-optimization class as a raw `<img>`** — it skips
  `next/image` entirely (no responsive sizing, no format negotiation, no
  lazy loading). Replace with an absolutely-positioned `<Image fill>` behind
  the content, using `alt=""` if the image is purely decorative with a
  content overlay on top.
- **A background/ambient video that IS the page's own hero (first thing
  rendered, meant to autoplay immediately) should NOT be gated behind an
  IntersectionObserver** — that would delay the intended visual entirely.
  Only gate autoplay video that's further down the page and not part of the
  initial viewport; for a true hero video, `preload="none"` alone is the
  right amount of restraint (hints the browser not to over-fetch, without
  blocking the intended immediate playback).
- **A component repeated many times per page (one instance per list item/
  category) multiplies any per-instance cost.** A gallery page rendering one
  autoplay-video block per category can end up loading several multi-MB
  videos simultaneously on load — same fix (IntersectionObserver gating +
  `preload="none"`) but worth checking specifically wherever a component is
  rendered in a `.map()`, since the cost scales with content, not code.
- **A `"use client"` directive earns its keep or it should go.** For every
  file marked `"use client"`, check it (and any shared hook/util it calls)
  for at least one of: a React hook (`useState`, `useEffect`,
  `useLayoutEffect`, `useRef`, `useContext`, `useSearchParams`, or a custom
  hook built on these), an event handler (`onClick`, `onChange`, `onSubmit`,
  etc.), a browser-only API (`window`, `document`, `navigator`,
  `IntersectionObserver`, `localStorage`), or a client-only library
  (carousel/date-picker/etc. that requires a browser runtime, or
  `next/dynamic(ssr:false)`). If none apply, drop the directive — it should
  be a plain server component. Don't stop at the file itself: a component
  can look inert but call a shared helper (e.g. a GSAP animation utility)
  that does the actual hook/DOM work — check what the helper does before
  concluding either way. This is worth re-running as a periodic audit, not
  a one-time pass — new components get added and can pick up an unnecessary
  directive by copy-paste from a sibling that genuinely needs it. (On this
  project: an audit of all 41 `"use client"` files found exactly one
  unnecessary case — a blog-post hero component that was a pure `next/image`
  render with zero interactivity — everything else already had a genuine
  hook/handler/browser-API/library reason.)

### Reduce React re-renders

- **`React.memo` alone doesn't help if the parent passes a new inline
  function/object to the child every render.** `React.memo` does a shallow
  prop comparison — an inline arrow function created fresh in a `.map()`
  (e.g. `onClick={() => handler(item.id)}`) is a *different* function
  reference every render, so the memoized child always sees "changed" props
  and re-renders anyway. Fix: give the child a stable callback (the same
  `useCallback`-wrapped function reference passed directly, not wrapped
  again) and have the child itself call `onAction(item.id)` — the callback
  identity now stays constant across renders, so `React.memo` can actually
  skip re-rendering children whose own data didn't change.
- **Don't pass a shared/parent-level piece of state down to every item in a
  list** when only one item's rendering actually depends on it. A "which
  item is selected/copied/active" string id in the parent, passed as-is to
  every list item, makes every item's props appear to change whenever *any*
  item's selection changes — even ones that aren't selected before or after.
  Derive a per-item boolean (`isActive={selectedId === item.id}`) instead,
  so only the item whose boolean actually flips sees a prop change.
- **A component that owns both frequently-changing state (scroll position,
  form input, animation flags) and a large mostly-static render tree
  re-renders that whole tree on every state tick**, even parts whose output
  doesn't depend on that state at all (e.g. a data-driven nav link list
  that only cares about the current route and a color mode, not a
  scroll-position/menu-open flag also owned by the same component). Extract
  the static-but-data-driven part into its own `React.memo`'d component
  taking only the props it actually needs — it then skips re-rendering
  whenever the parent's *other* state changes, since none of what causes
  the parent to re-render is present in its own prop set.
- **A static background/decorative element (an image, a gradient overlay)
  sitting in the same component as interactive form state** (e.g. a hero
  banner section with a date-picker) gets torn down and rebuilt by React on
  every keystroke/selection even though it never depends on that state.
  Extracting it into its own component (memoized or not — even an
  unmemoized sibling component with zero props skips re-executing when its
  own parent-of-parent doesn't force it) separates "this changes often" from
  "this never changes" so React doesn't have to reconcile the static part
  every time.
- **There is no context provider in this codebase (by design)** — if one is
  added later, remember a `<Context.Provider value={{...}}>` with an inline
  object literal re-creates that value every render, which re-renders every
  consumer regardless of whether the specific piece of data they use
  actually changed. Memoize the value (`useMemo`) or split into multiple
  narrower contexts.

### General workflow notes

- **Confirm whether a Lighthouse report was run against `next dev` or a
  production build before treating the numbers as real.** Dev mode ships
  unminified bundles, skips image optimization in some configs, and
  recompiles routes on demand — all of which inflate Script Evaluation,
  Script Parsing, and image transfer size well above what a real visitor
  experiences. Always re-measure against `next build && next start` (or the
  actual deployed environment) before and after a round of fixes.
- **A code fix only helps once it's deployed.** If Lighthouse is run
  against a live/production URL, confirm the deployment picked up the
  latest commit before concluding a fix "didn't work" — several rounds of
  this project's fixes were correct but not yet visible because the fix
  hadn't been redeployed yet.
- **Not every panel in a Lighthouse report is a failing check.** Diagnostic
  sections marked "Unscored" (LCP breakdown, DOM size, long main-thread
  tasks, layout shift culprits, etc.) are informational context, not
  automatically a problem — only act on ones actually showing a red/orange
  severity indicator and concrete numbers; treat the rest as supporting
  detail once you already have a real finding to investigate.
