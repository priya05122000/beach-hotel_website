import Link from "next/link";

type ButtonProps = {
  label: string;
  className?: string;
} & ({ href: string; action?: never } | { action: () => void; href?: never });

export const Button = ({ label, href, action, className }: ButtonProps) => {
  const inner = (
    <>
      <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
      {label}
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
