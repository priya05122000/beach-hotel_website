// Shared "site revealed" signal for the first-load preloader.
//
// The inline boot script in `app/layout.tsx` sets `window.__siteRevealed`
// to `false` while the full-screen loader is going to play, and `true` when
// it is skipped (already seen this session). `SitePreloader` flips it to
// `true` and fires SITE_REVEALED_EVENT once the loader starts fading out.
// Anything that is undefined (SSR, in-app navigations) counts as revealed.

export const SITE_REVEALED_EVENT = "site:revealed";
export const PRELOADER_SEEN_KEY = "tbb-preloader-seen";
const BOOT_FAILSAFE_MS = 25000;

/**
 * Inline, render-blocking boot script for <head>. Runs during HTML parse —
 * before first paint and before React — so the loader is either shown from
 * the first frame or hidden without ever flashing. (next/script's
 * "beforeInteractive" is queued for the Next runtime in the App Router, so
 * it would run too late for that.)
 */
export const PRELOADER_BOOT_SCRIPT = `(function(){
var d=document.documentElement,w=window;
try{if(sessionStorage.getItem(${JSON.stringify(PRELOADER_SEEN_KEY)})){d.classList.add("preloader-skip");w.__siteRevealed=true;return;}}catch(e){}
d.classList.add("preloading");w.__siteRevealed=false;
document.addEventListener("load",function(e){var t=e.target;if(t&&t.id==="site-preloader-gif"&&w.__preloaderGifLoadedAt==null){w.__preloaderGifLoadedAt=performance.now();}},true);
setTimeout(function(){if(w.__siteRevealed===false){d.classList.remove("preloading");d.classList.add("preloader-skip");w.__siteRevealed=true;w.dispatchEvent(new Event(${JSON.stringify(SITE_REVEALED_EVENT)}));}},${BOOT_FAILSAFE_MS});
})();`;

export function isSiteRevealed(): boolean {
  return typeof window === "undefined" || window.__siteRevealed !== false;
}

/** Runs `cb` once the site is revealed (immediately if it already is). Returns an unsubscribe. */
export function onSiteRevealed(cb: () => void): () => void {
  if (isSiteRevealed()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(SITE_REVEALED_EVENT, handler, { once: true });
  return () => window.removeEventListener(SITE_REVEALED_EVENT, handler);
}

export function markSiteRevealed() {
  window.__siteRevealed = true;
  window.dispatchEvent(new Event(SITE_REVEALED_EVENT));
}
