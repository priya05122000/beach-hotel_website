"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import gsap from "gsap";


let ScrollTriggerRef: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let rafCallback: ((time: number) => void) | null = null;

   
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;

      const lenis = new LenisCtor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,

        syncTouch: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return;
        ScrollTriggerRef = ScrollTrigger;
        lenis.on("scroll", ScrollTrigger.update);
      });

      rafCallback = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (rafCallback) gsap.ticker.remove(rafCallback);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  useLayoutEffect(() => {

    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    return () => {
      ScrollTriggerRef?.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  useEffect(() => {
    let refreshed = false;
    const refreshOnce = () => {
      if (refreshed) return;
      refreshed = true;
      ScrollTriggerRef?.refresh();
    };

    const id = setTimeout(refreshOnce, 300);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) refreshOnce();
    });

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
