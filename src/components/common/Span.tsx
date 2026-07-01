import React from "react";

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Span: React.FC<SpanProps> = ({ children, className = "", ...rest }) => (
  <span className={`text-sm ${className}`} {...rest}>
    {children}
  </span>
);

export default Span;
