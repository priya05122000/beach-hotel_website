# SEO Audit Fixes (Screaming Frog)

Fixes made on **2026-11-20** after a Screaming Frog crawl of thebeachbay.in.
For each issue: the report it appeared in, the cause, and every file changed,
with before/after code. The checklist at the end is for the next project.

| # | Screaming Frog report | URLs flagged | Files changed | Commit |
|---|---|---|---|---|
| 1 | Response Codes › Internal Client Error (4xx) | 10 | 1 | `1bf448c` |
| 2 | Images › Missing Alt Text | 4 | 2 | `1bf448c` |
| 3 | Canonicals › Canonicalised | 20 | 11 | not committed yet |
| 4 | Links › Pages With High External Outlinks | ~25 | 0 (reviewed, no change) | n/a |
| 5 | H2 › Multiple | 14 | 0 (reviewed, no change) | n/a |
| 6 | Open Graph › Incomplete OG Tags (missing `og:image`) | 4 | 6 | not committed yet |
| 7 | X Cards › Incomplete X Cards | 4 (same pages as #6) | 1 | not committed yet |
| 8 | Images › Missing Image Title / Missing Size Attributes | 96 / 62 | 0 (reviewed, no change) | n/a |

---

## 1. 404 on Open Graph / X Card images (blog posts)

### What the report showed
- 10 URLs returning **404 Not Found**, e.g.
  `https://thebeachbay.in/images/Top_10_Places_in_Kanyakumari_..._Travel_Guide_2026_1....png`
- Inlinks tab: link type **Open Graph Image** and **X Card Image**, from
  `/blog/<slug>` pages. They are not visible links. They are the
  `<meta property="og:image">` and `<meta name="twitter:image">` tags in `<head>`.
- Effect: sharing a blog post on WhatsApp / Facebook / LinkedIn / X showed no preview image.

### Cause
- The API returns `blog.image_url` as a **relative path** on the API server
  (e.g. `images/Top_10_....png`).
- `generateMetadata` passed it unchanged into `openGraph.images`.
- Next.js resolves relative metadata URLs against `metadataBase`
  (`https://thebeachbay.in`, set in `src/app/layout.tsx`), giving
  `https://thebeachbay.in/images/...`, where the file doesn't exist.
- The real file is at `${NEXT_PUBLIC_API_URL}/uploads/images/...`, which is how
  `BlogHero.tsx` and `BlogCard.tsx` already show it on the page.
- `twitter` had no `images`, so the X card fell back to the same broken OG URL.

### Changes

**File: `src/app/(site)/blog/[slug]/page.tsx`**, in `generateMetadata()`

Added (after `const description = ...`):
```ts
// image_url is a path on the API's uploads dir (e.g. "images/foo.png").
// It must be made absolute here, otherwise Next resolves it against
// metadataBase (the website domain), where the file doesn't exist.
const ogImage = blog.image_url
  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url.replace(/^\/+/, "")}`
  : undefined;
```

`openGraph.images`, before:
```ts
images: blog.image_url
  ? [{ url: blog.image_url, width: 1200, height: 630, alt: blog.title }]
  : [],
```
After:
```ts
images: ogImage
  ? [{ url: ogImage, width: 1200, height: 630, alt: blog.title }]
  : [],
```

`twitter`, before:
```ts
twitter: { card: "summary_large_image", title: blog.title, description },
```
After:
```ts
twitter: {
  card: "summary_large_image",
  title: blog.title,
  description,
  images: ogImage ? [ogImage] : undefined,
},
```

### Result
`og:image` and `twitter:image` now hold the API's `/uploads/...` URL instead of a
path on the website domain (the old one returned 404).

---

## 2. Missing Alt Text (loader + floating action icons)

### What the report showed
| Image | IMG inlinks |
|---|---|
| `/the-beach-bay-loader.gif` | 80 |
| `/_next/image?url=/common/icons/phone-call-icon.png` | 40 |
| `/_next/image?url=/common/icons/book-now-icon.png` | 40 |
| `/_next/image?url=/common/icons/whatsapp-icon.png` | 40 |

The counts are high because these components render on **every page** (the loader twice per page).

### Cause
All four had `alt=""`. That was deliberate: the loader is decorative, and each icon sits
next to a visible text label. Screaming Frog still reports an empty `alt` as
"Missing Alt Text".

### Changes

**File: `src/components/common/PageLoader.tsx`**, the loader `<Image>`

Before:
```tsx
src="/the-beach-bay-loader.gif"
alt=""
```
After:
```tsx
src="/the-beach-bay-loader.gif"
alt="The Beach Bay, Kanyakumari logo animation"
aria-hidden="true"
```
`aria-hidden` keeps screen readers quiet; the wrapper `<div role="status" aria-label="Loading">` still announces "Loading".

**File: `src/components/common/FloatingActionButtons.tsx`**, three icons

| Button | Before | After |
|---|---|---|
| WhatsApp | `<span className={dockIconClass}>` + `alt=""` | `<span className={dockIconClass} aria-hidden="true">` + `alt="WhatsApp icon"` |
| Call Us | ``<span className={`${dockIconClass}  `}>`` + `alt=""` | `<span className={dockIconClass} aria-hidden="true">` + `alt="Phone call icon"` |
| Book Now | `<span className={dockIconClass}>` + `alt=""` | `<span className={dockIconClass} aria-hidden="true">` + `alt="Book now icon"` |

Example (WhatsApp), before:
```tsx
<span className={dockIconClass}>
  <Image src="/common/icons/whatsapp-icon.png" alt="" width={24} height={24} className="object-contain" />
</span>
```
After:
```tsx
<span className={dockIconClass} aria-hidden="true">
  <Image src="/common/icons/whatsapp-icon.png" alt="WhatsApp icon" width={24} height={24} className="object-contain" />
</span>
```
Why `aria-hidden` on the wrapper: crawlers see the alt text, but screen readers
skip the icon, so they read "WhatsApp" once, not "WhatsApp icon, WhatsApp".
The Call Us icon wrapper's stray extra space in its class string was also removed.

---

## 3. Canonicalised `?to=` URLs (home page card links)

### What the report showed
20 **Non-Indexable / Canonicalised** URLs:
- `/facilities?to=1` … `/facilities?to=10`
- `/destinations?to=1` … `/destinations?to=8`
- `/rooms?to=4`, `/rooms?to=6`

### Cause
- Home page cards linked to e.g. `/facilities?to=3`. `?to=N` only told the
  listing page which item to scroll to (`SectionScroller` read it with `useSearchParams`).
- Search engines treat each `?to=N` as a **separate URL**. Each one's canonical
  points back to `/facilities`, so Google crawled 20 duplicates of 3 pages, and
  the home page's internal links pointed at non-canonical URLs.

### Fix approach
Use a URL **fragment** (`#`) instead of a query param. Crawlers ignore everything after `#`,
so every link now points at the canonical URL, and scrolling to the item still works.

| Before | After |
|---|---|
| `/facilities?to=3` | `/facilities#facility-3` |
| `/destinations?to=5` | `/destinations#destination-5` |
| `/rooms?to=4` | `/rooms#room-4` |

### Changes

**A. Scroll logic: `src/components/common/SectionScroller.tsx`** (rewritten)

| | Before | After |
|---|---|---|
| Reads target from | `useSearchParams().get("to")` | `window.location.hash`, e.g. `#facility-3` → `3` |
| Props | `dataAttr` | `dataAttr`, **`hashPrefix`** (new, required) |
| Old `?to=` links | the only format | still work (fallback) |
| Same-page `#` change | n/a | handled via `hashchange` listener |
| Selector | `[${dataAttr}="${to}"]` | `[${dataAttr}="${CSS.escape(to)}"]` (safe against odd input) |
| Scroll behaviour | 350 ms delay, -80 px offset, Lenis or `window.scrollTo` | unchanged |

New code:
```tsx
"use client";

import { useEffect } from "react";

interface Props {
  dataAttr: string;
  /** Hash prefix used by incoming links, e.g. "facility-" for `#facility-3`. */
  hashPrefix: string;
}

// Links use a `#` fragment (not `?to=`) so crawlers only ever see the
// canonical page URL. `?to=` is still read as a fallback for old links.
function readTarget(hashPrefix: string): string | null {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash.startsWith(hashPrefix)) return hash.slice(hashPrefix.length) || null;
  return new URLSearchParams(window.location.search).get("to");
}

export function SectionScroller({ dataAttr, hashPrefix }: Props) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const scrollToTarget = () => {
      const to = readTarget(hashPrefix);
      if (!to) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const targets = Array.from(
          document.querySelectorAll(`[${dataAttr}="${CSS.escape(to)}"]`)
        );
        const target = targets.find(
          (el) => (el as HTMLElement).getBoundingClientRect().height > 0
        ) as HTMLElement | null;
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(top, { duration: 1.8 });
        } else {
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 350);
    };

    scrollToTarget();
    window.addEventListener("hashchange", scrollToTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToTarget);
    };
  }, [dataAttr, hashPrefix]);

  return null;
}
```

**B. Pages that use `SectionScroller`**, each now passes `hashPrefix`

| File | Before | After |
|---|---|---|
| `src/app/(site)/facilities/page.tsx` | `<SectionScroller dataAttr="data-facility-order" />` | `<SectionScroller dataAttr="data-facility-order" hashPrefix="facility-" />` |
| `src/app/(site)/destinations/page.tsx` | `<SectionScroller dataAttr="data-destination-order" />` | `<SectionScroller dataAttr="data-destination-order" hashPrefix="destination-" />` |
| `src/app/(site)/rooms/page.tsx` | `<SectionScroller dataAttr="data-room-id" />` | `<SectionScroller dataAttr="data-room-id" hashPrefix="room-" />` |

The existing `<Suspense>` wrappers were left in place (no longer required, but harmless).
The scroll-target attributes (`data-facility-order`, `data-destination-order`,
`data-room-id`) were not changed.

**C. Home page links**

| File | Section | Before | After |
|---|---|---|---|
| `src/app/(site)/home/components/AmenitiesSection.tsx` | Amenities cards | `` href: `/facilities?to=${i + 1}` `` | `` href: `/facilities#facility-${i + 1}` `` |
| `src/app/(site)/home/components/RoomShowcaseSection/index.tsx` | Facility showcase | `` href: `/facilities?to=${i + 1}` `` | `` href: `/facilities#facility-${i + 1}` `` |
| `src/app/(site)/home/components/HorizontalScrollSection/Client.tsx` | Destination image link | `` href={`/destinations?to=${i + 1}`} `` | `` href={`/destinations#destination-${i + 1}`} `` |
| same file | Destination arrow link | `` href={`/destinations?to=${i + 1}`} `` | `` href={`/destinations#destination-${i + 1}`} `` |
| `src/app/(site)/home/components/RoomCardsSection/Client.tsx` | Room "View Details" | `` href={`/rooms?to=${room.id}`} `` | `` href={`/rooms#room-${room.id}`} `` |

**D. Comments only (no behaviour change)**

| File | Before | After |
|---|---|---|
| `src/service/facilities.ts` | `` `/facilities?to=<position>` `` | `` `/facilities#facility-<position>` `` |
| `src/service/nearbyDestination.ts` | `` `/destinations?to=<position>` `` | `` `/destinations#destination-<position>` `` |
| `src/app/(site)/home/components/AmenitiesSection.tsx` | `` `?to=` is the 1-based position… `` | `` `#facility-N` is the 1-based position… `` |
| `src/app/(site)/facilities/components/FacilitiesSection.tsx` | `` …matched against `?to=` `` | `` …matched against `#facility-N` `` |
| `src/app/(site)/destinations/components/NearbyDestinationsSection.tsx` | `` …matched against `?to=` from… `` | `` …matched against `#destination-N` from… `` |

### Result
- Home page links now point to `/facilities`, `/destinations`, `/rooms` (canonical).
  The `?to=` URLs should drop out of the "Canonicalised" report on the next crawl.
- Clicking a card still smooth-scrolls to the right item.
- Old `?to=` URLs (bookmarks, already indexed) still scroll correctly.

---

## 4. Pages With High External Outlinks: reviewed, no change

### What the report showed
Pages with **11–21 external outlinks** (links to other domains):

| Page type | External outlinks | Unique external |
|---|---|---|
| Home, `/facilities`, `/blog`, `/contact-us` | 11–13 | 6–8 |
| Blog posts (`/blog/<slug>`) | 11–12 | 7–8 |
| `/destinations` (and its old `?to=` URLs) | 21 | 18 |

(The `?to=` rows are from the crawl before fix #3 and will disappear after deploy.)

### Where the external links come from

**On every page** (navbar, footer, floating buttons):

| Link | Points to | Source |
|---|---|---|
| Book Now (navbar, footer, floating button: same URL 3×) | `bookings.skyrooms.in` | `BOOKING_URL` in `src/lib/site-links.ts`; used in `Navbar.tsx`, `Footer.tsx`, `FloatingActionButtons.tsx` |
| Instagram, Facebook, YouTube, X | own social profiles | `src/lib/social-links.ts` → `SocialIconLinks` in `Footer.tsx` |
| Hotel location | `maps.app.goo.gl` | `src/components/layout/Footer.tsx` (~line 147) |

**Extra on `/destinations`:**
- "Get Directions" map link for each destination (`destination.destination_link`,
  `src/app/(site)/destinations/components/NearbyDestinationsSection.tsx` ~line 183).
- "Book Tickets" links (`destination.ticket_booking_link`, same file ~line 206).
- Hero banner links (`NearbyHeroBanner.tsx` ~lines 203, 258).

**Extra on blog posts:** links inside the article body / `InfluencerCard.tsx`.

### Decision: no change
- Every link is useful to guests: the hotel's own booking engine, its own social
  accounts, and map directions/tickets for nearby attractions.
- Google doesn't penalise 10–20 relevant external links on a page. In Screaming Frog
  this filter is a **warning to review**, not an error.
- Removing them would hurt users (no booking, no directions). `nofollow` isn't
  needed for your own profiles and normal references.

### When to act in future
- A page goes well past ~100 external links, or links to unrelated or low-quality sites.
- Paid / affiliate / partner links: add `rel="sponsored"` (or `rel="nofollow"`).
- User-generated links (comments, reviews): add `rel="ugc"`.

---

## 5. H2 Multiple: reviewed, no change

### What the report showed
14 pages with more than one `<h2>`:

| Page | H2 count | First H2 | Second H2 |
|---|---|---|---|
| Home `/` | 4 | Featured Facilities | Room Types |
| `/rooms` | 2 | Rooms & Suites | Room Facilities |
| `/privacy-policy` | 12 | Welcome to The Beach Bay | Information We Collect |
| `/terms-and-conditions` | 18 | Welcome to The Beach Bay | Use of Website Information |
| 9 blog posts | 2 each | the article's main topic heading | Frequently Asked Questions |
| `/blog/how-to-choose-the-best-hotel-in-kanyakumari-for-your-stay` | 7 | Why Choosing the Right Hotel Matters | Choose a Hotel in a Convenient Location |

### Decision: no change
- Screaming Frog's own description: *"This is not an issue as HTML standards allow
  multiple `<h2>`s when used in a logical hierarchical heading structure."* It's a
  filter for reviewing headings, not an error.
- Each page has one `<h1>` (the page title), and every `<h2>` here is a real section
  heading: home page sections, room sections, one per policy clause, and article
  section + FAQ on blogs. That is the correct structure.
- Blog headings come from the CMS article content, so the structure is set by
  whoever writes the post (see the guideline below).

### Heading guideline (for content writers and the next project)
- **One `<h1>` per page**: the page / article title.
- **`<h2>`** for each main section (e.g. "Best Tourist Places", "Frequently Asked Questions").
- **`<h3>`** for items inside a section (e.g. each place in a top-10 list, each FAQ question).
- Don't skip levels (`h2` → `h4`), and don't use a heading tag just to make text big or bold.
  Use CSS / a type class for styling instead.
- In the CMS editor, use "Heading 2" for sections and "Heading 3" for sub-points, never "Heading 1".

---

## 6. Incomplete OG Tags (missing `og:image`)

### What the report showed
4 pages had `og:url`, `og:title` and `og:description`, but **no `og:image`**:
`/rooms`, `/destinations`, `/privacy-policy`, `/terms-and-conditions`.
(Their X card image was present; it came from the layout.)

### Cause
- `src/app/layout.tsx` sets a default `openGraph` (image, `siteName`, `locale`, `type`).
- Each of these pages sets its own `openGraph` (title, description, url) **without** `images`.
- Next.js does **not** deep-merge `openGraph`: a page's `openGraph` replaces the layout's
  whole object (Next docs: `generate-metadata.md` › Merging). So these pages lost
  `og:image`, and also `og:site_name`, `og:locale` and `og:type`.
- `twitter` isn't set on these pages, so the layout's X card (with image) still applied.

### Changes

**New file: `src/lib/seo.ts`**, one shared default:
```ts
export const DEFAULT_OG_IMAGE = {
  url: "/home/hotel-poolside-exterior-dusk.webp",
  width: 5760,
  height: 2776,
  alt: "Poolside exterior of The Beach Bay, Kanyakumari at dusk",
};

export const baseOpenGraph = {
  type: "website",
  locale: "en_IN",
  siteName: "The Beach Bay",
  images: [DEFAULT_OG_IMAGE],
} satisfies Metadata["openGraph"];
```

**`src/app/layout.tsx`** now uses the shared values (same output as before). Before:
```ts
openGraph: {
  type: "website", locale: "en_IN", siteName: "The Beach Bay",
  images: [{ url: "/home/hotel-poolside-exterior-dusk.webp", width: 1600, height: 900, alt: "..." }],
},
twitter: { card: "summary_large_image", site: "@thebeachhotel", images: ["/home/hotel-poolside-exterior-dusk.webp"] },
```
After:
```ts
openGraph: baseOpenGraph,
twitter: { card: "summary_large_image", site: "@thebeachhotel", images: [DEFAULT_OG_IMAGE.url] },
```
(The declared size was also wrong: the file is 5760×2776, not 1600×900.)

**The 4 pages**: import `baseOpenGraph` and spread it first in `openGraph`:

| File | Change | Resulting `og:image` |
|---|---|---|
| `src/app/(site)/rooms/page.tsx` | `openGraph: { ...baseOpenGraph, title, description, url }` | default (hotel poolside) |
| `src/app/(site)/privacy-policy/page.tsx` | same | default |
| `src/app/(site)/terms-and-conditions/page.tsx` | same | default |
| `src/app/(site)/destinations/page.tsx` | same + own `images` | `/home/thiruvalluvar-statue-vivekananda-rock-kanyakumari-sunrise.webp` (1448×1086) |

Example (`rooms/page.tsx`), before:
```ts
openGraph: {
  title: "Rooms & Suites — The Beach Bay",
  description: "Rooms and suites designed for comfort with wide ocean views in Kanyakumari.",
  url: "/rooms",
},
```
After:
```ts
openGraph: {
  ...baseOpenGraph,
  title: "Rooms & Suites — The Beach Bay",
  description: "Rooms and suites designed for comfort with wide ocean views in Kanyakumari.",
  url: "/rooms",
},
```

### Result
All 4 pages now output `og:image` (plus `og:site_name`, `og:locale`, `og:type`).
`npx tsc --noEmit` passes. Not yet checked in a browser or re-crawled.

### Not changed (follow-ups)
- **Other pages** (home, about-us, blog, blog posts, contact-us, facilities, gallery) set their own
  `images`, so they have all 4 basic OG tags, but they still lose `og:site_name` / `og:locale`.
  Adding `...baseOpenGraph` to them fixes that (blog posts keep `type: "article"` by setting it after the spread).
- **The default image is heavy**: 900KB at 5760×2776. Share previews work best at
  **1200×630, under ~300KB** (WhatsApp may skip larger images). Consider exporting a
  dedicated `public/og-default.jpg` at 1200×630 and pointing `DEFAULT_OG_IMAGE` at it.

---

## 7. Incomplete X Cards

### What the report showed
The same 4 pages as #6 (`/rooms`, `/destinations`, `/privacy-policy`, `/terms-and-conditions`).
`twitter:card`, `twitter:site`, `twitter:title`, `twitter:description` and `twitter:image`
were present; **`twitter:creator` was empty**.

### Cause
- Screaming Frog treats X card tags as complete if **`twitter:card` is set and the OG tags
  are complete** (X falls back to OG). Other pages also had no `twitter:creator` but
  weren't flagged because their OG tags were complete.
- These 4 pages were missing `og:image` (#6), so the OG fallback failed and the missing
  `twitter:creator` counted. **Fix #6 resolves this on its own.**
- Found while checking: `twitter:site` was `@thebeachhotel`, but the hotel's X profile
  (`src/lib/social-links.ts`) is `x.com/TheBeachHotel_`, a different account.

### Changes

**File: `src/app/layout.tsx`**, `twitter` metadata. Before:
```ts
twitter: {
  card: "summary_large_image",
  site: "@thebeachhotel",
  images: [DEFAULT_OG_IMAGE.url],
},
```
After:
```ts
twitter: {
  card: "summary_large_image",
  // Must match the X profile in src/lib/social-links.ts (x.com/TheBeachHotel_).
  site: "@TheBeachHotel_",
  creator: "@TheBeachHotel_",
  images: [DEFAULT_OG_IMAGE.url],
},
```
Pages that don't set `twitter` (rooms, destinations, privacy, terms, and the other static
pages) inherit this. Blog posts set their own `twitter` (title, description, image), so they
don't get `site` / `creator`. That's fine because their OG tags are complete.

### Result
All 6 basic X card tags are present on pages that inherit the layout's `twitter`, and the
handle now points at the real account. `npx tsc --noEmit` passes.

---

## 8. Images: Missing Image Title / Missing Size Attributes: reviewed, no change

Checked against the live home page HTML (65 `<img>` tags).

### Missing Image Title (96)
- No image has a `title` attribute. `title` only adds a hover tooltip; Google doesn't use it
  for image SEO. It uses **`alt`** (already set), the filename and the surrounding text.
- Adding `title` to every image would put tooltips on every photo. **No change.**

### Missing Size Attributes (62)
- All 31 flagged images on the home page are `next/image` with the **`fill`** prop
  (`data-nimg="fill"`). `fill` outputs no `width` / `height` on purpose: the image fills a
  parent box whose size is set by CSS (`relative` + a height or aspect-ratio class).
- The space is reserved before the image loads, so there's **no layout shift (CLS)**, which is
  the only reason size attributes matter. Images that use `width` / `height` props (logos,
  icons) already output both attributes.
- Converting ~32 `fill` usages to fixed sizes would mean guessing aspect ratios for CMS
  uploads and could break cropping. **No change.**

### When to act
- A `fill` image's parent has no fixed height / aspect ratio (it would collapse or jump).
- A plain `<img>` (not `next/image`) is added without `width` / `height`.
- Lighthouse reports CLS above 0.1 on a page.

---

## Also changed
- `README.md`: added an "SEO" section linking to this file.
- `SEO_FIXES.md`: this file (new).

## Verification status
- `npx tsc --noEmit` passes after each fix.
- **Not yet done:** browser test of the card scroll and a re-crawl. After deploy:
  1. View Source on a blog post: `og:image` / `twitter:image` open in the browser (200).
  2. Click a facility, destination and room card on the home page: URL ends in
     `#facility-N` / `#destination-N` / `#room-<id>` and the page scrolls to that item.
  3. Open an old link like `/facilities?to=3`: still scrolls.
  4. Re-crawl in Screaming Frog: 4xx, Missing Alt Text and Canonicalised are clear for these URLs.
  5. Test a blog post in the Facebook Sharing Debugger / opengraph.xyz.

---

## Pre-launch SEO checklist (for the next project)

- [ ] `metadataBase` set in the root `layout.tsx`.
- [ ] Every page has a unique `title`, `description` and `alternates.canonical`.
- [ ] CMS/API images in `openGraph` / `twitter` metadata are **absolute URLs** that return 200.
      Static `/public` images can stay relative.
- [ ] `twitter.images` set explicitly, not left to fall back to `openGraph.images`.
- [ ] Every page has `og:url`, `og:title`, `og:description` **and** `og:image`. Any page that
      sets its own `openGraph` spreads a shared base (`...baseOpenGraph`), because Next
      replaces the layout's `openGraph` instead of merging it.
- [ ] `twitter.card` = `summary_large_image`; `twitter.site` / `twitter.creator` match the real
      X handle in the social links.
- [ ] Default share image is 1200×630, under ~300KB, with correct `width` / `height`.
- [ ] Search for `alt=""`: every image gets alt text. Icons next to a visible label
      get alt text **and** `aria-hidden="true"` on the image or its wrapper.
- [ ] Internal links contain no query params for UI state (scroll-to, tabs, modals).
      Use `#fragment` or component state instead.
- [ ] One `<h1>` per page; `<h2>` for sections, `<h3>` for sub-items; no skipped levels;
      no headings used just for styling (CMS content included).
- [ ] Images: `alt` on every image (`title` not needed). `next/image` with `fill` sits inside a
      parent with a fixed height / aspect ratio; other images pass `width` and `height`.
- [ ] External links reviewed: only own socials, booking engine, maps and relevant references.
      Paid/affiliate links use `rel="sponsored"`; user-generated links use `rel="ugc"`.
- [ ] Crawl with Screaming Frog and clear: 4xx, Missing Alt Text, Canonicalised,
      Missing Meta Description.
- [ ] Test a page share in the Facebook Sharing Debugger / opengraph.xyz.
