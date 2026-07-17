import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Animated gradient-border button (used for form submit CTAs like "Book Now"). */
export default function GradientBorderButton({
  children,
  className = "",
  ...rest
}: GradientBorderButtonProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        bg-linear-to-b
        from-primary
        via-accent/76
        to-primary
        p-px
        shadow-[0px_4px_4px_0px_#00000040]
        bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
        bg-size-[250%]
        bg-left
        transition-all
        duration-1000
        hover:bg-right
      "
    >
      <div className="flex h-full items-center justify-center bg-ivory">
        <button
          {...rest}
          className={`h-10 cursor-pointer type-caption px-8 font-normal uppercase text-primary-dark transition-opacity hover:opacity-90 ${className}`}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
