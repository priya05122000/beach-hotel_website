type ButtonProps = {
  label: string;
} & ({ href: string; action?: never } | { action: () => void; href?: never });

export const Button = ({ label, href, action }: ButtonProps) => {
  const inner = (
    <button>
      <span className="inline-block w-8 h-px bg-accent transition-all duration-300 group-hover:w-14" />
      {label}
    </button>
  );

  if (href) {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold group mt-2"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={action}
      className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold group mt-2"
    >
      {inner}
    </button>
  );
};
