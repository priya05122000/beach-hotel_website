"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";

const TEXT_LINES = [
    "Curated",
    "Comforts At ",
    "The Land's End.",
];

const PARAGRAPH = `True luxury lies in the freedom to simply be. At The Beach Hotel, every amenity — from sea-view dining and the infinity pool to our signature spa and intuitive concierge — is designed to dissolve the everyday and leave only ease in its place. Whatever your heart desires, you will find it has been considered long before you ask.`;

export default function FacilitiesSplitHero() {
    // ── Desktop refs ──────────────────────────────────────────────
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);
    const desktopPanelRef = useRef<HTMLDivElement>(null);
    const desktopTaglineRef = useRef<HTMLSpanElement>(null);
    const desktopLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const desktopCtaRef = useRef<HTMLAnchorElement>(null);
    const desktopParaRef = useRef<HTMLParagraphElement>(null);

    // ── Mobile refs ───────────────────────────────────────────────
    const mobilePanelRef = useRef<HTMLDivElement>(null);
    const mobileTaglineRef = useRef<HTMLSpanElement>(null);
    const mobileLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mobileCtaRef = useRef<HTMLAnchorElement>(null);
    const mobileParaRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        // ── Mobile animation (< 768 px) ───────────────────────────
        mm.add("(max-width: 767px)", () => {
            gsap.set(mobilePanelRef.current, { opacity: 1 });
            const tl = gsap.timeline({ delay: 0.2 });
            applySlideUp([mobileTaglineRef.current], { timeline: tl, duration: 0.5 });
            applySlideUp(mobileLineRefs.current, { timeline: tl, position: ">-0.1", stagger: 0.1, duration: 0.55 });
            tl.fromTo(mobileCtaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ">-0.1");
            tl.fromTo(mobileParaRef.current, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" }, ">-0.1");
        });

        // ── Desktop animation (≥ 768 px) ──────────────────────────
        mm.add("(min-width: 768px)", () => {
            gsap.set(desktopPanelRef.current, { opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=120%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            tl.to(imageWrapRef.current, {
                left: "50%",
                width: "50%",
                height: "100vh",
                top: "20vh",
                ease: "none",
                duration: 1,
            }, 0);

            tl.to(imageInnerRef.current, {
                scale: 1.08,
                ease: "power2.inOut",
                duration: 1,
            }, 0);

            tl.to(desktopPanelRef.current, { opacity: 1, duration: 0.2 }, ">");

            applySlideUp([desktopTaglineRef.current], { timeline: tl, position: ">", duration: 0.35 });
            applySlideUp(desktopLineRefs.current, { timeline: tl, position: ">-0.15", stagger: 0.1, duration: 0.45 });
            tl.fromTo(desktopCtaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, ">-0.1");
            gsap.set(desktopParaRef.current, { yPercent: 110, opacity: 0 });
            tl.to(desktopParaRef.current, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, ">-0.15");
        });

        return () => mm.revert();
    }, []);

    

    return (
        <>
            {/* ── Mobile layout (< md) ─────────────────────────────────── */}
            <div className="flex flex-col md:hidden w-full">
                <div className="relative w-full" style={{ height: "80vw", minHeight: 240 }}>
                    <Image src="/facilities/1.webp" alt="Hotel Facilities" fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div ref={mobilePanelRef} className="px-6 py-10 flex flex-col gap-6" style={{ opacity: 0 }}>
                    <div>
                        <div className="overflow-hidden mb-4">
                            <span
                                ref={mobileTaglineRef}
                                className="block type-body uppercase text-gray"
                                style={{ display: "inline-block" }}
                            >
                                Our Facilities
                            </span>
                        </div>

                        <h1
                            className="type-display-sm uppercase text-primary-dark leading-tight"
                        >
                            {TEXT_LINES.map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span ref={(el) => { mobileLineRefs.current[i] = el; }} className="block" style={{ display: "block" }}>
                                        {line}
                                    </span>
                                </span>
                            ))}
                        </h1>

                        {/* <a
                            ref={mobileCtaRef}
                            href="#facilities"
                            className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold mt-8 group"
                            style={{ opacity: 0 }}
                        >
                            <span className="inline-block w-8 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                            Explore All
                        </a> */}
                    </div>

                    <div className="overflow-hidden">
                        <p ref={mobileParaRef} className="type-body">{PARAGRAPH}</p>
                    </div>
                </div>
            </div>

            {/* ── Desktop layout (≥ md) — scroll-animated split ────────── */}
            <div ref={containerRef} className="relative h-[120vh] w-full overflow-hidden hidden md:block">
                <div
                    ref={imageWrapRef}
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: "100%", height: "120vh", willChange: "left,width,height,top" }}
                >
                    <div ref={imageInnerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
                        <Image src="/facilities/1.webp" alt="Hotel Facilities" fill priority className="object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>

                <div
                    ref={desktopPanelRef}
                    className="absolute py-16 lg:py-20 top-0 left-0 w-full h-[calc(100%-10vh)] z-10 pointer-events-none px-6 sm:px-4"
                    style={{ opacity: 0 }}
                >
                    <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-0 md:px-4 lg:px-12 xl:px-0 h-full">
                        <div className="flex flex-col h-full justify-evenly w-1/2">
                            <div>
                                <div className="overflow-hidden mb-4">
                                    <span
                                        ref={desktopTaglineRef}
                                        className="block type-body text-gray uppercase "
                                        style={{ display: "inline-block" }}
                                    >
                                        Our Facilities
                                    </span>
                                </div>

                                <h1
                                    className="type-display-sm uppercase text-primary-dark leading-tight"
                                >
                                    {TEXT_LINES.map((line, i) => (
                                        <span key={i} className="block overflow-hidden">
                                            <span ref={(el) => { desktopLineRefs.current[i] = el; }} className="block" style={{ display: "block" }}>
                                                {line}
                                            </span>
                                        </span>
                                    ))}
                                </h1>

                                {/* <a
                                    ref={desktopCtaRef}
                                    href="#facilities"
                                    className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold mt-10 pointer-events-auto group"
                                    style={{ opacity: 0 }}
                                >
                                    <span className="inline-block w-8 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                                    Explore All
                                </a> */}
                            </div>

                            <div className="max-w-xs lg:mx-auto overflow-hidden">
                                <p ref={desktopParaRef} className="type-body text-charcoal">{PARAGRAPH}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
