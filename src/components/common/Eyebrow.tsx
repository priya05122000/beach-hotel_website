import React from "react";
import type { JSX } from "react";

type EyebrowTag = "h1" | "h2" | "h3" | "h4" | "p";
type EyebrowAlign = "left" | "center" | "responsive";

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  as?: EyebrowTag;
  align?: EyebrowAlign;
  children: React.ReactNode;
  className?: string;
}

const alignClasses: Record<EyebrowAlign, string> = {
  left: "text-left",
  center: "text-center",
  responsive: "text-left",
};

/**
 * Shared "kicker" label used above section headings: type-h6, wide tracking,
 * uppercase. Defaults to `<p>` — it's a visual label, not a real heading;
 * pass `as="h1"`/`as="h2"` explicitly on the rare page where it doubles as
 * the actual section heading (e.g. `GalleryList`'s `as="h1"`).
 */
const Eyebrow = React.forwardRef<HTMLElement, EyebrowProps>(
  ({ as = "p", align = "left", children, className = "", ...rest }, ref) => {
    const Tag = as as keyof JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      {
        ref,
        className: `type-h6 leading-relaxed tracking-[60%] lg:tracking-[83%] uppercase text-gray ${alignClasses[align]} ${className}`,
        ...rest,
      },
      children
    );
  }
);

Eyebrow.displayName = "Eyebrow";

export default Eyebrow;
