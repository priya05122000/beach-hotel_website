"use client";

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Section from '@/src/components/common/Section';
import { ANIM } from '@/src/lib/gsap/config';
import { applySplitSlideUp } from '@/src/lib/gsap/useSplitSlideUp';

const SERVICES = [
    'Beachfront Accommodation',
    'Fine Dining & Cuisine',
    'Wellness & Recreation',
];

const StatementSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            if (prefersReduced) return;

            const split = applySplitSlideUp({
                target: textRef.current,
                trigger: sectionRef.current,
                start: "top 85%",
                duration: ANIM.duration.base,
                stagger: ANIM.stagger.tight,
                ease: ANIM.ease.default,
            });

            return () => split?.revert();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden pb-16 lg:pb-20">
            <Section>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-x-[2.2222222222vw] items-start">
                    <div className="sm:col-span-3 lg:col-span-2 flex items-center pt-2">
                        <p className="type-h6 tracking-[73%] text-left lg:tracking-[83%] uppercase text-gray pb-10">

                            Discover</p>
                    </div>

                    <div className="hidden sm:block sm:col-span-1" />

                    <div className="sm:col-span-8 flex flex-col gap-8 sm:gap-12">
                        <div ref={textRef} className="type-display-sm text-primary-dark font-arizona-flare-regular leading-tight">
                            We welcome guests who seek the extraordinary — where three oceans meet the horizon.
                        </div>

                        <ul className="flex flex-col gap-3">
                            {SERVICES.map((item) => (
                                <li key={item} className="type-body text-gray font-arizona-flare-regular">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>
        </section>
    );
};

export default StatementSection;
