import React, { forwardRef } from "react";

interface CenterSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

const CenterSection = forwardRef<HTMLDivElement | null, CenterSectionProps>(
    ({ children, className = '', id, style }, ref) => {
        return (
            <section
                className={`relative px-6 sm:px-4 ${className}`}
                id={id}
                style={style}
            >
                <div
                    ref={ref}
                    className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  mx-auto px-0 md:px-4 lg:px-12 xl:px-0"
                >
                    {children}
                </div>
            </section>
        );
    }
);

CenterSection.displayName = "CenterSection";

export default CenterSection;