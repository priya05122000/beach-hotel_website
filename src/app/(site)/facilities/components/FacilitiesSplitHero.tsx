"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { applySplitSlideUp, applyLinesSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import PillLinkButton from "@/src/components/common/PillLinkButton";
import Eyebrow from "@/src/components/common/Eyebrow";

const BOOKING_URL = "https://devnew.skyhms.in/booking_next/booking/";

const TEXT_LINES = [
    "Signature",
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
    const desktopTaglineRef = useRef<HTMLElement>(null);
    const desktopHeadlineRef = useRef<HTMLHeadingElement>(null);
    const desktopHeadlineLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
    const desktopCtaRef = useRef<HTMLDivElement>(null);
    const desktopParaRef = useRef<HTMLParagraphElement>(null);

    // ── Mobile refs ───────────────────────────────────────────────
    const mobilePanelRef = useRef<HTMLDivElement>(null);
    const mobileTaglineRef = useRef<HTMLElement>(null);
    const mobileHeadlineRef = useRef<HTMLDivElement>(null);
    const mobileHeadlineLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
    const mobileCtaRef = useRef<HTMLDivElement>(null);
    const mobileParaRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        // ── Mobile animation (< 768 px) ───────────────────────────
        mm.add("(max-width: 767px)", () => {
            gsap.set(mobilePanelRef.current, { opacity: 1 });
            const tl = gsap.timeline({ delay: 0.2 });
            applySplitSlideUp({ target: mobileTaglineRef.current, timeline: tl, duration: 0.5 });
            applyLinesSlideUp({ lines: mobileHeadlineLinesRef.current, timeline: tl, position: ">-0.1", stagger: 0.1, duration: 0.55 });
            tl.fromTo(mobileCtaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, ">-0.1");
            tl.fromTo(mobileParaRef.current, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" }, ">-0.1");
        });

        // ── Desktop animation (≥ 768 px) ──────────────────────────
        mm.add("(min-width: 768px)", () => {
            gsap.set(desktopPanelRef.current, { opacity: 0 });
            // Top-left transform origin so scale+translate can place the
            // box's corner directly, without center-origin shrinkage math.
            gsap.set(imageWrapRef.current, { transformOrigin: "0% 0%" });

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

            // Visual end state: 50% width, 100vh height of the 100%×120vh
            // layout box, shifted to x:50% (resolves against the element's
            // own layout width, i.e. exactly 50vw) and y:20vh (an absolute
            // length, unaffected by the element's own size). The box's real
            // DOM size never changes — only its transform — so this no
            // longer forces layout on every scrub tick.
            tl.to(imageWrapRef.current, {
                scaleX: 0.5,
                scaleY: 100 / 120,
                x: "50%",
                y: "20vh",
                ease: "none",
                duration: 1,
                onUpdate: function () {
                    // Reproduce the original independent 1.08 zoom (same
                    // easing curve, evaluated manually) combined with the
                    // exact reciprocal of the wrapper's current scale, so
                    // the photo keeps both effects without the two tweens
                    // fighting over the same target's scale property.
                    const sx = gsap.getProperty(imageWrapRef.current, "scaleX") as number;
                    const sy = gsap.getProperty(imageWrapRef.current, "scaleY") as number;
                    const zoomEase = gsap.parseEase("power2.inOut");
                    const zoomScale = gsap.utils.interpolate(1, 1.08, zoomEase(this.ratio));
                    gsap.set(imageInnerRef.current, {
                        scaleX: zoomScale / sx,
                        scaleY: zoomScale / sy,
                    });
                },
            }, 0);

            tl.to(desktopPanelRef.current, { opacity: 1, duration: 0.2 }, ">");

            applySplitSlideUp({ target: desktopTaglineRef.current, timeline: tl, position: ">", duration: 0.35 });
            applyLinesSlideUp({ lines: desktopHeadlineLinesRef.current, timeline: tl, position: ">-0.15", stagger: 0.1, duration: 0.45 });
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
                <div className="relative w-full" style={{ height: "50vh", minHeight: 240 }}>
                    <Image src="/facilities/1.webp" alt="Hotel Facilities" fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div ref={mobilePanelRef} className="px-6 py-10 flex flex-col gap-6" style={{ opacity: 0 }}>
                    <div>
                        <Eyebrow
                            ref={mobileTaglineRef}
                            className="mb-4"
                            style={{ display: "inline-block" }}
                        >
                            Our Facilities
                        </Eyebrow>

                        <div
                            ref={mobileHeadlineRef}
                            className="type-display-sm uppercase text-primary-dark leading-tight"
                        >
                            {TEXT_LINES.map((line, i) => (
                                <div key={i} className="overflow-hidden">
                                    <span
                                        ref={(el) => { mobileHeadlineLinesRef.current[i] = el; }}
                                        className="block"
                                    >
                                        {line}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div ref={mobileCtaRef} className="mt-8" style={{ opacity: 0 }}>
                            <PillLinkButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-fit">
                                Book Now
                            </PillLinkButton>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <p ref={mobileParaRef} className="type-body">{PARAGRAPH}</p>
                    </div>
                </div>
            </div>

            {/* ── Desktop layout (≥ md) — scroll-animated split ────────── */}
            <div ref={containerRef} className="relative  h-[120vh] w-full overflow-hidden hidden md:block">
                <div
                    ref={imageWrapRef}
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: "100%", height: "120vh", willChange: "transform" }}
                >
                    <div ref={imageInnerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
                        <Image src="/facilities/1.webp" alt="Hotel Facilities" fill priority className="object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>

                <div
                    ref={desktopPanelRef}
                    className="absolute  py-16 lg:py-20 top-0 left-0 w-full h-[calc(100%-10vh)] z-10 pointer-events-none px-6 sm:px-4"
                    style={{ opacity: 0 }}
                >
                    <div className="max-w-[95%]  sm:max-w-156  lg:max-w-232 xl:max-w-300 mx-auto px-0 md:px-4 lg:px-12 xl:px-0 h-full">
                        <div className="flex flex-col  h-full justify-evenly w-1/2 pr-6 md:pr-10 lg:pr-0 xl:pr-0">
                            <div>
                                <Eyebrow
                                    ref={desktopTaglineRef}
                                    className="mb-4"
                                    style={{ display: "inline-block" }}
                                >
                                    Our Facilities
                                </Eyebrow>

                                <h1
                                    ref={desktopHeadlineRef}
                                    className="type-display-sm uppercase text-primary-dark leading-tight"
                                >
                                    {TEXT_LINES.map((line, i) => (
                                        <div key={i} className="overflow-hidden">
                                            <span
                                                ref={(el) => { desktopHeadlineLinesRef.current[i] = el; }}
                                                className="block"
                                            >
                                                {line}
                                            </span>
                                        </div>
                                    ))}
                                </h1>

                                <div ref={desktopCtaRef} className="mt-8 pointer-events-auto" style={{ opacity: 0 }}>
                                    <PillLinkButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-fit">
                                        Book Now
                                    </PillLinkButton>
                                </div>
                            </div>

                            <div className="max-w-sm lg:mx-auto overflow-hidden">
                                <p ref={desktopParaRef} className="type-body text-charcoal">{PARAGRAPH}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
