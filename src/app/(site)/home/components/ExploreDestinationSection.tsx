"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/src/components/common/button";
import Section from "@/src/components/common/Section";
import { ANIM } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

const ExploreDestinationSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        <section className="bg-white pt-16 lg:pt-20">
            <div className=" mx-auto">

                {/* Top Content */}
                <Section>
                    <div ref={sectionRef} className="grid gap-8 sm:grid-cols-2 min-h-80 sm:min-h-140 lg:min-h-180 xl:min-h-140">

                        {/* Left */}
                        <div ref={headingRef} className={`max-w-xl type-display-sm text-primary-dark uppercase self-start`}>
                            Kanniyakumari&apos;s most extraordinary luxury address — where every horizon is yours alone, at the meeting point of three oceans.
                        </div>

                        {/* Right */}
                        <div className="relative flex flex-col items-start sm:items-end justify-end self-end">

                            <div className=" relative">
                                <span aria-hidden="true" className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-[0.5px] bg-gray h-[calc(100%-25px)]" />
                                <p className={`max-w-xl type-body-xl sm:text-right text-charcoal sm:pr-10`}>
                                    Rising at the iconic edge of India, where oceans meet in a rare natural confluence, our hotel stands in a setting of quiet distinction. The meeting of converging tides and endless blue waters creates a calm sense of place, where sea, sky and light move in harmony. Here, luxury is defined not by excess, but by stillness, space and the natural rhythm of the coastline.
                                </p>
                            </div>

                            {/* <button className="mt-6 mr-10 flex items-center gap-2 h-10 py-2  uppercase transition font-normal  text-primary-dark cursor-pointer ">
                                Explore
                                <span>&#8594;</span>
                            </button> */}
                            <Button href="/destinations" className="mt-6 sm:w-50 font-normal text-primary-dark cursor-pointer">
                                Get to know us
                            </Button>
                        </div>
                    </div>

                </Section>

                {/* Image */}
                <div className="relative overflow-hidden h-65  sm:h-screen ">
                    {/* <Image
                        src="/home/kanyakumari-statue.webp"
                        alt="Kanyakumari"
                        fill
                        className="h-full w-full object-cover object-top-right"
                        /> */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover "
                    >
                        <source src="/home/seaview.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute top-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-b from-white to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-t from-ivory to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default ExploreDestinationSection
