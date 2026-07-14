import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "solid" | "bold";
  lineColor?: string;
} & ({ href: string; action?: never } | { action: () => void; href?: never });

const lineHeight = { default: "h-px", solid: "h-[2px]", bold: "h-[3px]" };

export const Button = ({
  children,
  href,
  action,
  className,
  variant = "default",
  lineColor,
}: ButtonProps) => {
  const cls = `inline-flex items-center type-label-sm tracking-[2px] gap-3 uppercase ${variant === "bold" ? " font-bold" : ""} group${className ? ` ${className}` : ""}`;

  const inner = (
    <>
      <span
        className={`inline-block min-w-8 w-8 ${lineHeight[variant]} ${variant === "bold" ? (lineColor ?? "bg-primary-dark") : "bg-current"} transition-all duration-300 group-hover:w-14`}
      />
      {children}
    </>
  );

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button onClick={action} className={cls}>
      {inner}
    </button>
  );
};
