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
    const mobileLineRightRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        if (!section || !imageWrapper) return;

        const mm = gsap.matchMedia();

        // ── Desktop ───────────────────────────────────────────────────────
        mm.add("(min-width: 768px)", () => {
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
        mm.add("(max-width: 767px)", () => {
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
            <div className="md:hidden relative">
                <div
                    ref={mobileImageRef}
                    className="relative w-full h-[70vw] max-h-120 overflow-hidden"
                >
                    <Image
                        src={IMAGE_SRC}
                        alt="The Beach Hotel"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute inset-0 grid grid-cols-2 py-16 px-6">
                        <div className="flex items-start">
                            <div className="overflow-hidden">
                                <h1
                                    ref={mobileLineLeftRef}
                                    className="type-display-md leading-tight text-white"
                                >
                                    {TEXT_LINES.map((line, i) => (
                                        <span key={i} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-end justify-end">
                            <div className="overflow-hidden">
                                <div
                                    ref={mobileLineRightRef}
                                    className="text-white leading-tight type-display-md text-right"
                                >
                                    Experience
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Desktop ────────────────────────────────────────────────── */}
            <div className="hidden md:block relative overflow-hidden bg-ivory h-screen">
                <div
                    ref={imageWrapperRef}
                    className="absolute overflow-hidden"
                    style={{ width: "50vw", height: "75vh" }}
                >
                    <Image
                        src={IMAGE_SRC}
                        alt="The Beach Hotel"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                </div>

                <div className="absolute inset-0 grid grid-cols-2 pointer-events-none px-8 md:px-12 lg:px-20 my-auto h-[60vh]">

                    <div className="flex items-start">
                        <div className="overflow-hidden">
                            <h1
                                className="type-display-lg text-white leading-tight"
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
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="overflow-hidden">
                            <span
                                ref={desktopLineRightRef}
                                className="type-display-lg  leading-tight text-white  block"

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