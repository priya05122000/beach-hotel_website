"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/src/components/common/button";
import Section from "@/src/components/common/Section";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";

const ExploreDestinationSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [videoInView, setVideoInView] = useState(false);

    useLayoutEffect(() => {
        // Reduced-motion is checked before any animation library is loaded.
        if (prefersReducedMotion()) return;

        let cancelled = false;
        let ctx: { revert: () => void } | undefined;
        let split: { revert: () => void } | undefined;

        (async () => {
            // GSAP / ScrollTrigger / SplitType are pulled in lazily so they
            // stay out of the home route's initial JS bundle.
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            const SplitType = (await import("split-type")).default;
            gsap.registerPlugin(ScrollTrigger);
            if (cancelled) return;

            // SplitType measures line breaks synchronously against whatever
            // font is painted at that instant. If the Arizona custom font
            // hasn't swapped in yet, it locks in line breaks sized for the
            // fallback font, which then look ragged once the real font
            // renders into those same frozen line boxes. This heading is
            // below the fold (revealed on scroll), so waiting for fonts to
            // finish loading before splitting costs nothing visible.
            const runSplit = () => {
                const target = headingRef.current;
                if (cancelled || !target) return;

                ctx = gsap.context(() => {
                    split = new SplitType(target, {
                        types: "lines",
                        lineClass: "split-line",
                    });

                    const lines = target.querySelectorAll<HTMLElement>(".split-line");

                    lines.forEach((line) => {
                        const wrapper = document.createElement("div");
                        wrapper.style.overflow = "hidden";
                        wrapper.style.display = "block";

                        line.parentNode?.insertBefore(wrapper, line);
                        wrapper.appendChild(line);
                    });

                    gsap.set(lines, { yPercent: 110 });

                    gsap.to(lines, {
                        yPercent: 0,
                        duration: ANIM.duration.base,
                        ease: ANIM.ease.default,
                        stagger: ANIM.stagger.base,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: ANIM.start.default,
                            toggleActions: "play none none none",
                        },
                    });
                }, sectionRef);
            };

            if (typeof document !== "undefined" && document.fonts && document.fonts.status !== "loaded") {
                document.fonts.ready.then(() => {
                    if (!cancelled) runSplit();
                });
            } else {
                runSplit();
            }
        })();

        return () => {
            cancelled = true;
            split?.revert();
            ctx?.revert();
        };
    }, []);

    useEffect(() => {
        const el = videoContainerRef.current;
        if (!el) return;

        // The background video is a multi-MB file — don't fetch it until
        // this section is about to scroll into view, so it doesn't add to
        // the initial page's network payload for visitors who never reach it.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVideoInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-white pt-16 lg:pt-20">
            <div className=" mx-auto">

                {/* Top Content */}
                <Section>
                    <div ref={sectionRef} className="grid">

                        {/* Left */}
                        <div ref={headingRef} className={` sm:w-1/2 type-display-sm   text-primary-dark uppercase self-start `}>
                            A setting reserved for the remarkable, where nature takes centre stage.

                        </div>

                        {/* Right */}
                        <div className="relative  mt-6 sm:-mt-20 flex flex-col items-start sm:items-end justify-end self-end ">

                            <div className=" relative">
                                <span aria-hidden="true" className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-[0.5px] bg-gray h-[calc(100%-25px)]" />
                                <p className={ `max-w-xs lg:max-w-md xl:max-w-xl type-body-xl sm:text-right text-charcoal sm:pr-10`}>
                                    Rising at the iconic edge of India, where oceans meet in a rare natural confluence, our hotel stands in a setting of quiet distinction. The meeting of converging tides and endless blue waters creates a calm sense of place, where sea, sky and light move in harmony. Here, luxury is defined not by excess, but by stillness, space and the natural rhythm of the coastline.
                                </p>
                            </div>

                            {/* <button className="mt-6 mr-10 flex items-center gap-2 h-10 py-2  uppercase transition font-normal  text-primary-dark cursor-pointer ">
                                Explore
                                <span>&#8594;</span>
                            </button> */}
                            <Button href="/about-us" className="mt-6 sm:w-50 self-end font-normal text-primary-dark cursor-pointer">
                                Get to know us
                            </Button>
                        </div>
                    </div>

                </Section>

                {/* Image */}
                <div ref={videoContainerRef} className="relative overflow-hidden h-65  sm:h-screen ">
                    {/* <Image
                        src="/home/kanyakumari-statue.webp"
                        alt="Kanyakumari"
                        fill
                        className="h-full w-full object-cover object-top-right"
                        /> */}
                    {videoInView && (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                            className="absolute inset-0 h-full w-full object-cover "
                        >
                            <source src="/home/seaview.mp4" type="video/mp4" />
                        </video>
                    )}

                    <div className="absolute top-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-b from-white to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-t from-ivory to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default ExploreDestinationSection
