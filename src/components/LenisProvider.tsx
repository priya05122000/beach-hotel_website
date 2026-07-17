"use client";

import { useEffect, useLayoutEffect, useRef } from "react"; // useLayoutEffect needed for ScrollTrigger kill ordering
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current = null;
      delete (window as any).__lenis;
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    // Runs synchronously before the browser paints the new page.
    // window.scrollTo resets the native scroll position immediately so no
    // mid-page content is ever rendered; Lenis is synced to match.
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  useEffect(() => {
    // Fixed-delay refresh as an immediate fallback (covers cached-font visits).
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Web fonts (Arizona flare/sans) can still be loading when ScrollTrigger first
    // measures trigger positions — once they swap in, text reflows and invalidates
    // any trigger below the fold. document.fonts.ready fires exactly when that
    // reflow has happened, so refresh again then to pick up the corrected layout.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
