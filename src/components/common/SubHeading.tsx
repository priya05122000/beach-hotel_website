import React from "react";
import type { JSX } from "react";

type SubHeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

interface SubHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: SubHeadingTag;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared bold, uppercase, wide-tracking sub-heading style (font-arizona-flare-regular).
 * font-size is fixed here (not left to the h1-h4/p tag default) so tracking-widest —
 * which is em-based — renders identically no matter which tag `as` picks.
 */
const SubHeading = React.forwardRef<HTMLElement, SubHeadingProps>(
  ({ as = "h3", children, className = "", ...rest }, ref) => {
    const Tag = as as keyof JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      {
        ref,
        className: `type-h6  font-semibold uppercase tracking-widest  ${className}`,
        ...rest,
      },
      children
    );
  }
);

SubHeading.displayName = "SubHeading";

export default SubHeading;
