"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import CenterSection from "@/src/components/common/CenterSection";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import Section from "@/src/components/common/Section";

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
        <Section>

            <section
                ref={sectionRef}
                className="pt-32 pb-16 lg:pt-40 lg:pb-20"
            >
                <div className="mx-auto max-w-280 text-center">
                    <h1
                        className="
          bg-[url('/jdjflkajs.jpg')]
          bg-contain
          bg-clip-text
          text-transparent
          uppercase type-display-md
          font-bold
          text-center
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          animate-glass
        "
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
                    </h1>
                </div>
            </section>
        </Section>
    );
};

export default SignatureHeadline;