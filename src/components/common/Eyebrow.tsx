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
  responsive: "text-center sm:text-left",
};

/** Shared "kicker" label used above section headings: type-h6, wide tracking, uppercase. */
const Eyebrow = React.forwardRef<HTMLElement, EyebrowProps>(
  ({ as = "h2", align = "left", children, className = "", ...rest }, ref) => {
    const Tag = as as keyof JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      {
        ref,
        className: `type-h6 tracking-[73%] lg:tracking-[83%] uppercase ${alignClasses[align]} ${className}`,
        ...rest,
      },
      children
    );
  }
);

Eyebrow.displayName = "Eyebrow";

export default Eyebrow;
