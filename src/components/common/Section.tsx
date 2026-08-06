import React, { forwardRef } from "react";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    /** "wide" (default) matches Section's original max-widths; "narrow" matches CenterSection's. */
    width?: "wide" | "narrow";
    /** Scroll targets (e.g. `data-destination-id`) read by SectionScroller. */
    [key: `data-${string}`]: string | number | undefined;
}

const widthClasses: Record<"wide" | "narrow", string> = {
    wide: "max-w-[95%] sm:max-w-156 lg:max-w-232 xl:max-w-300",
    narrow: "max-w-[95%] sm:max-w-156 lg:max-w-200 xl:max-w-232",
};

const Section = forwardRef<HTMLDivElement | null, SectionProps>(
    ({ children, className = '', id, style, width = "wide", ...dataAttrs }, ref) => {
        return (
            <section
                className={`relative px-6 sm:px-4 ${className}`}
                id={id}
                style={style}
                {...dataAttrs}
            >
                <div
                    ref={ref}
                    className={`${widthClasses[width]} mx-auto px-0 md:px-4 lg:px-12 xl:px-0 h-full`}
                >
                    {children}
                </div>
            </section>
        );
    }
);

Section.displayName = "Section";

export default Section;