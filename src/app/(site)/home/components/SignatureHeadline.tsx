"use client";

import { useRef } from "react";
import CenterSection from "@/src/components/common/CenterSection";
import { useSlideUp } from "@/src/lib/gsap/useSlideUp";

const LINES: React.ReactNode[] = [
    <>Kanniyakumari&apos;s most extraordinary</>,
    <><span className="text-gray/90">luxury address</span> — where every</>,
    <>horizon is yours alone, at the meeting</>,
    <>point of <span className="text-gray/90">three oceans</span>.</>,
];

const SignatureHeadline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useSlideUp({
        targets: lineRefs.current,
        trigger: sectionRef.current,
        start: "top 75%",
        stagger: 0.12,
        duration: 0.8,
        scope: sectionRef.current,
    });

    return (
        <CenterSection className="">
            <div ref={sectionRef} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
                <div className="mx-auto text-center">
                    <div
                        className="
              uppercase
             type-display-sm
              font-light
              text-primary-dark
            "
                    >
                        {LINES.map((line, i) => (
                            <span key={i} className="block overflow-hidden">
                                <span
                                    ref={(el) => { lineRefs.current[i] = el; }}
                                    className="block"
                                >
                                    {line}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </CenterSection>
    );
};

export default SignatureHeadline;
