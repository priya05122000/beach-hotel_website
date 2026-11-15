import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    /** false while the first-load preloader is showing; see src/lib/site-reveal.ts */
    __siteRevealed?: boolean;
    /** performance.now() when the preloader GIF finished loading (set by the boot script) */
    __preloaderGifLoadedAt?: number;
  }
}

export {};
