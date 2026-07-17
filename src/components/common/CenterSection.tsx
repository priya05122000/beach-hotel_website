import React, { forwardRef } from "react";
import Section from "./Section";

interface CenterSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

/** Narrow variant of Section — kept as a named wrapper for readability at call sites. */
const CenterSection = forwardRef<HTMLDivElement | null, CenterSectionProps>(
    (props, ref) => <Section ref={ref} width="narrow" {...props} />
);

CenterSection.displayName = "CenterSection";

export default CenterSection;
