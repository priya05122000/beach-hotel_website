import Link from "next/link";
import type { ReactNode } from "react";

type PillLinkButtonVariant = "dark" | "light";

interface PillLinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: PillLinkButtonVariant;
  target?: string;
  rel?: string;
}

const variantClasses: Record<PillLinkButtonVariant, string> = {
  dark: "border-primary-dark/20 text-primary-dark/70 hover:border-primary-dark hover:text-primary-dark",
  light: "border-white/20 text-white/70 hover:border-white hover:text-white",
};

const hoverTextClasses: Record<PillLinkButtonVariant, string> = {
  dark: "group-hover:text-primary-dark",
  light: "group-hover:text-white",
};

/** Shared outline pill button with a hover-fill sweep, used for CTAs like "Book My Stay" / "Sign In". */
export default function PillLinkButton({
  href,
  children,
  className = "",
  variant = "dark",
  target,
  rel,
}: PillLinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      data-text={typeof children === "string" ? children : undefined}
      className={`group relative overflow-hidden border px-2 py-2 text-[11px] font-arizona-flare-regular uppercase tracking-[3px] transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      {/* Hover Background */}
      <span className="absolute inset-0 -z-10 w-0 bg-transparent transition-all duration-300 group-hover:w-full" />

      <span className={`relative transition-colors duration-300 ${hoverTextClasses[variant]}`}>
        {children}
      </span>
    </Link>
  );
}
