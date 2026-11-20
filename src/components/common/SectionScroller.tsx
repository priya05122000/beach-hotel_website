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
