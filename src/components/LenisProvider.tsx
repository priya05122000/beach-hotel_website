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
    let hash = window.location.hash;

    // Defensively collapse a malformed/duplicated fragment (e.g. from a
    // stale history entry like "#contact-form#contact-form") down to the
    // first valid segment.
    if (hash.indexOf("#", 1) !== -1) {
      hash = hash.slice(0, hash.indexOf("#", 1));
      history.replaceState(null, "", window.location.pathname + window.location.search + hash);
    }

    if (!hash) {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
      return () => {
        ScrollTriggerRef?.getAll().forEach((t) => t.kill());
      };
    }

    // Undo the browser's own instant jump-to-fragment so every navigation
    // starts from the top and animates down consistently.
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });

    let cancelled = false;
    let attempts = 0;
    const tryScrollToHash = () => {
      if (cancelled) return;
      const el = document.querySelector(hash);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement, { duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        setTimeout(tryScrollToHash, 100);
      }
    };
    const startId = setTimeout(tryScrollToHash, 50);

    return () => {
      cancelled = true;
      clearTimeout(startId);
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
