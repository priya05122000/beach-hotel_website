"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import CenterSection from "@/src/components/common/CenterSection";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

const SignatureHeadline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const ctx = gsap.context(() => {
            if (prefersReduced) return;

            const split = applySplitSlideUp({
                target: headingRef.current,
                trigger: sectionRef.current,
                start: ANIM.start.default,
                duration: ANIM.duration.base,
                stagger: ANIM.stagger.base,
                ease: ANIM.ease.default,
            });

            return () => split?.revert();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <CenterSection>
            <section
                ref={sectionRef}
                className="pt-32 pb-16 lg:pt-40 lg:pb-20"
            >
                <div className="mx-auto text-center">
                    <h2
                        ref={headingRef}
                        className="uppercase type-display-sm font-light text-primary-dark"
                    >
                        Kanniyakumari&apos;s most extraordinary{" "}
                        <span className="text-gray opacity-80">
                            luxury address
                        </span>{" "}
                        — where every horizon is yours alone, at the meeting point of{" "}
                        <span className="text-gray opacity-80">
                            three oceans
                        </span>
                        .
                    </h2>
                </div>
            </section>
        </CenterSection>
    );
};

export default SignatureHeadline;