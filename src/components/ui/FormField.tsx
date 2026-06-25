import React from "react";

interface BaseProps {
  label?: string;
  error?: string;
  className?: string;
}

interface InputProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface TextareaProps extends BaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
  rows?: number;
}

type FormFieldProps = InputProps | TextareaProps;

export default function FormField(props: FormFieldProps) {
  const { label, error, className = "", as = "input", ...rest } = props;

  const base =
    "w-full bg-surface border border-silver/60 px-4 py-3 text-sm text-primary placeholder:text-gray/60 focus:outline-none focus:border-primary/50 transition-colors duration-200";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/60">
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${base} resize-none ${className}`}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className={`${base} ${className}`}
        />
      )}
      {error && (
        <p className="text-[11px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}
