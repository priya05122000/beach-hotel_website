"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CenterSection from "@/src/components/common/CenterSection";

gsap.registerPlugin(ScrollTrigger);

const LINES: React.ReactNode[] = [
    <>Kanniyakumari&apos;s most extraordinary</>,
    <><span className="text-gray/90">luxury address</span> — where every</>,
    <>horizon is yours alone, at the meeting</>,
    <>point of <span className="text-gray/90">three oceans</span>.</>,
];

const SignatureHeadline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
        if (!section || lines.length === 0) return;

        gsap.set(lines, { yPercent: 110 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        });

        tl.to(lines, {
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <CenterSection className="">
            <div ref={sectionRef} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
                <div className="mx-auto text-center">
                    <div
                        className="
              uppercase
              text-[37px] lg:text-[45px]
              font-arizona-flare-regular
              font-light
              text-primary
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
