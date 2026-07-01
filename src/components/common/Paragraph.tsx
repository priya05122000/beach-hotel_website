import React from "react";

type ParagraphSize = "xl" | "lg" | "base" | "sm";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  size?: ParagraphSize;
}

const sizeClasses: Record<ParagraphSize, string> = {
  xl: "text-lg sm:text-xl lg:text-2xl",
  lg: "text-base lg:text-lg",
  base: "text-base",
  sm: "text-sm",
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, className = "", size = "base", ...rest }, ref) => (
    <p ref={ref} className={`${sizeClasses[size]} ${className}`} {...rest}>
      {children}
    </p>
  )
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
