"use client";

import type { ReactNode } from "react";
import { useInView } from "@/src/hooks/useInView";

interface LazySectionProps {
  /**
   * Typically a `next/dynamic(..., { ssr: false })`-wrapped component —
   * its module (and any third-party library it imports) isn't fetched
   * until this wrapper actually renders it, which only happens once
   * `inView` becomes true.
   */
  children: ReactNode;
  /** Rendered until the section scrolls near the viewport; should roughly
   * match the real content's height to avoid layout shift. */
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  placeholder = null,
  rootMargin,
  className,
}: LazySectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>(rootMargin);

  return (
    <div ref={ref} className={className}>
      {inView ? children : placeholder}
    </div>
  );
}
