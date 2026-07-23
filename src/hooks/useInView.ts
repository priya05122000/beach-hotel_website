"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to a wrapper element and whether that element has
 * scrolled near the viewport at least once (per `rootMargin`). Stays `true`
 * once it fires — doesn't toggle back off if the element scrolls away again.
 */
export function useInView<T extends HTMLElement>(rootMargin = "300px 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
