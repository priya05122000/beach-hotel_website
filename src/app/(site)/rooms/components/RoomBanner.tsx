"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_SRC =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80";


export default function RoomBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);
    const mobileImageRef = useRef<HTMLDivElement>(null);
    const desktopLineLeftRef = useRef<HTMLHeadingElement>(null);
    const desktopLineRightRef = useRef<HTMLSpanElement>(null);
    const mobileLineLeftRef = useRef<HTMLHeadingElement>(null);
    const mobileLineRightRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        const imageInner = imageInnerRef.current;
        if (!section || !imageWrapper || !imageInner) return;

        const mm = gsap.matchMedia();

        // ── Desktop ───────────────────────────────────────────────────────
        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                // const leftLines = desktopLineRefs.current.filter(Boolean) as HTMLSpanElement[];
                const leftLine = desktopLineLeftRef.current;
                const rightLine = desktopLineRightRef.current;

                if (!rightLine || !leftLine) return;

                // Wrapper is full-bleed in the DOM (matches the animation's
                // end state); the initial "small" look is purely a visual
                // scale-down, never an actual layout size, so it never
                // forces reflow. The inner element carries the exact
                // reciprocal scale so the photo itself renders undistorted
                // (just clipped smaller by the wrapper's overflow-hidden).
                // Original visual size was a 50vw×75vh box with an
                // additional 0.55 scale on top of it, i.e. 27.5vw×41.25vh —
                // expressed here as a fraction of the new 100vw×100vh box.
                const initialScaleX = 0.5 * 0.55;
                const initialScaleY = 0.75 * 0.55;

                gsap.set(imageWrapper, {
                    scaleX: initialScaleX,
                    scaleY: initialScaleY,
                    transformOrigin: "center center",
                });
                gsap.set(imageInner, {
                    scaleX: 1 / initialScaleX,
                    scaleY: 1 / initialScaleY,
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
                    scaleX: 1,
                    scaleY: 1,
                    duration: 1,
                    ease: "none",
                    onUpdate: function () {
                        // Derive the inner element's counter-scale from the
                        // wrapper's *current* value every frame, so the
                        // photo stays undistorted at every instant of the
                        // scrub, not just at the start/end.
                        const sx = gsap.getProperty(imageWrapper, "scaleX") as number;
                        const sy = gsap.getProperty(imageWrapper, "scaleY") as number;
                        gsap.set(imageInner, { scaleX: 1 / sx, scaleY: 1 / sy });
                    },
                });

                // ② Left line — overlap zoom at 0
                applySplitSlideUp({ target: leftLine, timeline: tl, position: 0, duration: 2 });

                // ③ Right line — 0.3 after left line starts
                applySplitSlideUp({ target: rightLine, timeline: tl, position: 0.3, duration: 2 });
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

                applySplitSlideUp({
                    target: mobileLineLeftRef.current,
                    trigger: mobileImage,
                    start: "top 65%",
                    duration: 0.7,
                });

                applySplitSlideUp({
                    target: mobileLineRightRef.current,
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
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute inset-0 grid grid-cols-2 py-16 px-6">
                        <div className="flex items-start">
                            <h1
                                ref={mobileLineLeftRef}
                                className="type-display-lg leading-tight text-white"
                            >
                                Orna Villas
                            </h1>
                        </div>

                        <div className="flex items-end justify-end">
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

            {/* ── Desktop ────────────────────────────────────────────────── */}
            <div className="hidden md:block relative overflow-hidden bg-ivory h-screen">
                <div
                    ref={imageWrapperRef}
                    className="absolute inset-0 overflow-hidden"
                >
                    <div ref={imageInnerRef} className="absolute inset-0">
                        <Image
                            src={IMAGE_SRC}
                            alt="The Beach Hotel"
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                    </div>
                </div>

                <div className="absolute inset-0 grid grid-cols-2 pointer-events-none px-8 md:px-12 lg:px-20 my-auto h-[60vh]">

                    <div className="flex items-start">
                        <h1
                            ref={desktopLineLeftRef}
                            className="type-display-lg text-white leading-tight"
                        >
                            Orna Villas
                        </h1>
                    </div>

                    <div className="flex items-end justify-end">
                        <span
                            ref={desktopLineRightRef}
                            className="type-display-lg leading-tight text-white block"
                        >
                            Experience
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}