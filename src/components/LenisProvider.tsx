"use client";

import { useEffect, useLayoutEffect, useRef } from "react"; // 
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";


let ScrollTriggerRef: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // syncTouch simulates momentum scrolling over touch input, which fights
      // the browser's native touch-fling physics and reads as laggy/stuck on
      // mobile. Let touch scrolling stay native; only wheel input is smoothed.
      syncTouch: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let cancelled = false;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      ScrollTriggerRef = ScrollTrigger;
      lenis.on("scroll", ScrollTrigger.update);
    });

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelled = true;
      lenisRef.current = null;
      delete window.__lenis;
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
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
