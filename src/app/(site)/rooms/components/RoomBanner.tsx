"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_SRC =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80";

const TEXT_LINES = ["Orna Villas", "Living"];

export default function RoomBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const mobileImageRef = useRef<HTMLDivElement>(null);
    const desktopLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const desktopLineRightRef = useRef<HTMLSpanElement>(null);
    const mobileLineLeftRef = useRef<HTMLHeadingElement>(null);
    const mobileLineRightRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        if (!section || !imageWrapper) return;

        const mm = gsap.matchMedia();

        // ── Desktop ───────────────────────────────────────────────────────
        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const leftLines = desktopLineRefs.current.filter(Boolean) as HTMLSpanElement[];
                const rightLine = desktopLineRightRef.current;

                if (!rightLine || leftLines.length === 0) return;

                gsap.set(imageWrapper, {
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    scale: 0.55,
                    transformOrigin: "center center",
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=180%",
                        pin: true,
                        anticipatePin: 1,
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });

                // ① Zoom — 0 to 1
                tl.to(imageWrapper, {
                    height: "100vh",
                    width: "100vw",
                    scale: 1,
                    duration: 1,
                    ease: "none",
                });

                // ② Left lines — overlap zoom at 0
                applySlideUp(leftLines, { timeline: tl, position: 0, stagger: 0.1, duration: 2 });

                // ③ Right line — 0.3 after left lines start
                applySlideUp([rightLine], { timeline: tl, position: 0.3, duration: 2 });
            }, section);

            return () => ctx.revert();
        });

        // ── Mobile ────────────────────────────────────────────────────────
        mm.add("(max-width: 1023px)", () => {
            const ctx = gsap.context(() => {
                const mobileImage = mobileImageRef.current;
                if (!mobileImage) return;

                gsap.fromTo(
                    mobileImage,
                    { scale: 0.85, transformOrigin: "center center" },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: mobileImage,
                            start: "top bottom",
                            end: "center center",
                            scrub: 1.2,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                applySlideUp([mobileLineLeftRef.current], {
                    trigger: mobileImage,
                    start: "top 65%",
                    duration: 0.7,
                });

                applySlideUp([mobileLineRightRef.current], {
                    trigger: mobileImage,
                    start: "top 65%",
                    duration: 0.7,
                    delay: 0.5,
                });
            }, section);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <div ref={sectionRef}>
            {/* ── Mobile ─────────────────────────────────────────────────── */}
            <div className="lg:hidden relative">
                <div
                    ref={mobileImageRef}
                    className="relative w-full h-[70vw] max-h-120 overflow-hidden"
                >
                    <Image
                        src={IMAGE_SRC}
                        alt="The Beach Hotel"
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute inset-0 grid grid-cols-2 p-6">
                        <div className="flex items-start">
                            <div className="overflow-hidden">
                                <h2
                                    ref={mobileLineLeftRef}
                                    className="font-arizona-flare-regular text-white leading-[0.95]"
                                    style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", fontWeight: 400 }}
                                >
                                    {TEXT_LINES.map((line, i) => (
                                        <span key={i} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-end justify-end">
                            <div className="overflow-hidden">
                                <h2
                                    ref={mobileLineRightRef}
                                    className="text-white font-normal text-3xl sm:text-5xl leading-tight text-right"
                                >
                                    Experience
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Desktop ────────────────────────────────────────────────── */}
            <div className="hidden lg:block relative overflow-hidden bg-ivory h-screen px-6 sm:px-4">
                <div
                    ref={imageWrapperRef}
                    className="absolute overflow-hidden"
                    style={{ width: "50vw", height: "75vh" }}
                >
                    <Image
                        src={IMAGE_SRC}
                        alt="The Beach Hotel"
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                </div>

                <div className="absolute inset-0 grid grid-cols-2 p-12 pointer-events-none max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl  mx-auto px-0 md:px-4 lg:px-12 xl:px-0 my-auto h-[60vh]">

                    <div className="flex items-start">
                        <div className="overflow-hidden">
                            <h2
                                className="font-arizona-flare-regular text-white leading-tight"
                                style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", fontWeight: 400 }}
                            >
                                {TEXT_LINES.map((line, i) => (
                                    <span key={i} className="block overflow-hidden">
                                        <span
                                            ref={(el) => { desktopLineRefs.current[i] = el; }}
                                            className="block"
                                        >
                                            {line}
                                        </span>
                                    </span>
                                ))}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="overflow-hidden">
                            <span
                                ref={desktopLineRightRef}
                                className="font-arizona-flare-regular text-white leading-tight block"
                                style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", fontWeight: 400 }}
                            >
                                Experience
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}