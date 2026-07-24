import React from "react";

type FormFieldVariant = "surface" | "underline";

interface BaseProps {
  label?: string;
  error?: string;
  className?: string;
  variant?: FormFieldVariant;
}

interface InputProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface TextareaProps extends BaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
  rows?: number;
}

type FormFieldProps = InputProps | TextareaProps;

const inputBase: Record<FormFieldVariant, string> = {
  surface:
    "w-full bg-surface border border-silver/60 px-4 py-3 text-sm text-primary-dark placeholder:text-gray/60 focus:outline-none focus:border-primary/50 transition-colors duration-200",
  underline:
    "w-full bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200",
};

const labelBase: Record<FormFieldVariant, string> = {
  // /60 and /50 measured under 4.5:1 contrast against the near-white
  // surface/ivory backgrounds these labels sit on — bumped to /80 to pass.
  surface: "text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/80",
  underline: "type-label-sm uppercase tracking-[0.12em] text-primary-dark/80 font-medium",
};

export default function FormField(props: FormFieldProps) {
  const { label, error, className = "", as = "input", variant = "surface", ...rest } = props;
  const generatedId = React.useId();
  const fieldId = rest.id ?? (rest.name ? `${rest.name}-${generatedId}` : generatedId);

  const base = inputBase[variant];

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className={labelBase[variant]}>
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={fieldId}
          className={`${base} resize-none ${className}`}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          id={fieldId}
          className={`${base} ${className}`}
        />
      )}
      {error && (
        <p className="text-[11px] text-red-400 mt-0.5">{error}</p>
      )}
    </div>
  );
}
