"use client";

import { useEffect, useRef, useState } from "react";
import PageLoader from "@/src/components/common/PageLoader";
import { isSiteRevealed, markSiteRevealed, PRELOADER_SEEN_KEY } from "@/src/lib/site-reveal";

// /the-beach-bay-loader.gif: 79 frames × 100ms. Update if the GIF changes.
const GIF_DURATION_MS = 7900;
// Never hold the site longer than this after mount, even if some
// third-party resource keeps the window "load" event from firing.
const MAX_WAIT_MS = 20000;
const FADE_MS = 700;

/**
 * Full-screen first-load loader. Server-rendered so it covers the page from
 * the very first paint; the inline boot script in app/layout.tsx decides
 * whether it plays (first load this session) or is hidden by CSS.
 *
 * Reveals once BOTH the GIF has played through once (measured from when it
 * finished loading) AND the page has finished loading — whichever is later.
 */
export default function SitePreloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"active" | "fading" | "done">("active");

  useEffect(() => {
    // Skipped this session — the boot script already hid it via CSS.
    if (isSiteRevealed()) return;

    const overlay = overlayRef.current;
    let cancelled = false;

    // Keep the hidden page from scrolling underneath. Lenis listens on
    // window, so stopping propagation at the overlay keeps it out too;
    // `html.preloading { overflow: hidden }` covers native/keyboard scroll.
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    overlay?.addEventListener("wheel", block, { passive: false });
    overlay?.addEventListener("touchmove", block, { passive: false });

    const gifPlayed = new Promise<void>((resolve) => {
      const waitFrom = (loadedAt: number) =>
        setTimeout(resolve, Math.max(0, loadedAt + GIF_DURATION_MS - performance.now()));

      if (window.__preloaderGifLoadedAt != null) {
        waitFrom(window.__preloaderGifLoadedAt);
        return;
      }
      const img = document.getElementById("site-preloader-gif") as HTMLImageElement | null;
      if (!img || img.complete) {
        waitFrom(performance.now());
        return;
      }
      img.addEventListener("load", () => waitFrom(performance.now()), { once: true });
      // GIF failed to load — nothing to wait for; reveal as soon as the page is ready.
      img.addEventListener("error", () => resolve(), { once: true });
    });

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const cap = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));

    Promise.race([Promise.all([gifPlayed, pageReady]), cap]).then(() => {
      if (cancelled) return;

      // Start the revealed page at the top (unless a #hash target is
      // being handled by LenisProvider).
      if (!window.location.hash) {
        window.__lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      document.documentElement.classList.remove("preloading");
      try {
        sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
      } catch {
        // Storage blocked (private mode etc.) — loader just plays again next load.
      }
      setPhase("fading");
      // Fire now so page intro animations play as the loader fades away.
      markSiteRevealed();
    });

    return () => {
      cancelled = true;
      overlay?.removeEventListener("wheel", block);
      overlay?.removeEventListener("touchmove", block);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("done"), FADE_MS + 50);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      id="site-preloader"
      ref={overlayRef}
      aria-live="polite"
      className={`fixed inset-0 z-9999 bg-cream transition-opacity duration-700 ease-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PageLoader gifId="site-preloader-gif" />
    </div>
  );
}
