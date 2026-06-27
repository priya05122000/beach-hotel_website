"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_LINES = [
    "Spaces crafted",
    "for those who",
    "demand more.",
];

export default function FacilitiesSplitHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const taglineRef = useRef<HTMLSpanElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=120%",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // ── Phase 1: image shrinks from full-width to right 50% ──────
            tl.to(imageWrapRef.current, {
                left: "50%",
                width: "50%",
                ease: "none",
                duration: 1,
            }, 0);

            // Subtle zoom-in on the image itself as container shrinks
            tl.to(imageInnerRef.current, {
                scale: 1.08,
                ease: "none",
                duration: 1,
            }, 0);

            // ── Phase 2: left panel fades in (starts at 30% of timeline) ─
            tl.to(leftPanelRef.current, {
                opacity: 1,
                ease: "none",
                duration: 0.4,
            }, 0.3);

            // Tagline slides up
            tl.fromTo(taglineRef.current,
                { yPercent: 110 },
                { yPercent: 0, ease: "power2.out", duration: 0.4 },
                0.35
            );

            // Heading lines — staggered mask reveal
            lineRefs.current.forEach((line, i) => {
                tl.fromTo(line,
                    { yPercent: 110 },
                    { yPercent: 0, ease: "power2.out", duration: 0.5 },
                    0.4 + i * 0.12
                );
            });

            // CTA
            tl.fromTo(ctaRef.current,
                { opacity: 0, yPercent: 30 },
                { opacity: 1, yPercent: 0, ease: "power2.out", duration: 0.4 },
                0.8
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative h-[150vh] w-full overflow-hidden bg-ivory">
            <div
                ref={imageWrapRef}
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: "100%", willChange: "left, width" }}
            >
                <div ref={imageInnerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
                    <Image
                        src="/facilities/1.jpg"
                        alt="Hotel Facilities"
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Overlay — fades as image moves right */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </div>

            {/* ── Left text panel — revealed as image moves right ───────── */}
            <div
                ref={leftPanelRef}
                className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-10 lg:px-16 z-10 pointer-events-none"
                style={{ opacity: 0 }}
            >
                {/* Tagline */}
                <div className="overflow-hidden mb-6">
                    <span
                        ref={taglineRef}
                        className="block text-[11px] tracking-[0.3em] uppercase text-dusty font-arizona-sans-regular"
                        style={{ display: "inline-block" }}
                    >
                        Our Facilities
                    </span>
                </div>

                {/* Heading — each line mask-revealed */}
                <h2
                    className="font-arizona-flare-regular text-primary leading-[0.95]"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", fontWeight: 400 }}
                >
                    {TEXT_LINES.map((line, i) => (
                        <span key={i} className="block overflow-hidden">
                            <span
                                ref={(el) => { lineRefs.current[i] = el; }}
                                className="block"
                                style={{ display: "block" }}
                            >
                                {line}
                            </span>
                        </span>
                    ))}
                </h2>

                {/* CTA */}
                <a
                    ref={ctaRef}
                    href="#facilities"
                    className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold mt-10 pointer-events-auto group"
                    style={{ opacity: 0 }}
                >
                    <span className="inline-block w-8 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                    Explore All
                </a>
            </div>

        </div>
    );
}
