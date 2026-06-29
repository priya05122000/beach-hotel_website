import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ({ href: string; action?: never } | { action: () => void; href?: never });

export const Button = ({ children, href, action, className }: ButtonProps) => {
  const inner = (
    <>
      <span className="inline-block min-w-8 w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-3 uppercase group${className ? ` ${className}` : ""}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      onClick={action}
      className={`inline-flex items-center gap-3 uppercase group${className ? ` ${className}` : ""}`}
    >
      {inner}
    </button>
  );
};
