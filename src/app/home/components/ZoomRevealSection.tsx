"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import CenterSection from "@/src/components/common/CenterSection";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = ["Where Every Moment", "Becomes a Memory"];

const IMAGE_SRC =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80";

export default function ZoomRevealSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const mobileImageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const imageWrapper = imageWrapperRef.current;
        const content = contentRef.current;
        if (!section || !imageWrapper || !content) return;

        const mm = gsap.matchMedia();

        // ── Desktop: pinned zoom + reveal ────────────────────────────
        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const lines = linesRef.current.filter(Boolean);

                gsap.set(imageWrapper, {
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    scale: 0.32,
                    transformOrigin: "center center",
                });
                gsap.set(content, { opacity: 0, x: 40 });
                gsap.set(lines, { yPercent: 110 });
                if (paraRef.current) gsap.set(paraRef.current, { opacity: 0, y: 24 });
                if (btnRef.current) gsap.set(btnRef.current, { opacity: 0, y: 16 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=260%",
                        pin: true,
                        anticipatePin: 1,
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });

                // Phase 1 — image zooms from center
                tl.to(imageWrapper, { scale: 0.65, duration: 1, ease: "none" });

                // Phase 2 — right content reveals
                tl.to(content, { opacity: 1, x: 0, duration: 0.4 });
                tl.to(
                    lines,
                    { yPercent: 0, stagger: 0.14, duration: 0.55, ease: "power3.out" },
                    "<"
                );
                tl.to(paraRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25");
                tl.to(btnRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
            }, section);

            return () => ctx.revert();
        });

        // ── Mobile / Tablet: scroll-driven zoom on image only ────────
        mm.add("(max-width: 1023px)", () => {
            const ctx = gsap.context(() => {
                const mobileImage = mobileImageRef.current;
                if (!mobileImage) return;

                gsap.fromTo(
                    mobileImage,
                    { scale: 0.82, transformOrigin: "center center" },
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
            }, section);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (

        <div ref={sectionRef} className="">

            <CenterSection className="relative overflow-hidden bg-white lg:h-screen">
                {/* ── Mobile / Tablet: stacked column layout ──────────────── */}
                <div className="flex flex-col lg:hidden">
                    <div ref={mobileImageRef} className="relative w-full  mx-auto h-64 sm:h-80  overflow-hidden">
                        <Image
                            src={IMAGE_SRC}
                            alt="The Beach Hotel"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                    <div className=" py-10 ">
                        <div className="mb-5">
                            {HEADLINE_LINES.map((line, i) => (
                                <h2
                                    key={i}
                                    className="text-3xl sm:text-4xl font-normal text-primary leading-tight"
                                >
                                    {line}
                                </h2>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
                            Nestled on the shores of Kanyakumari, The Beach Hotel invites you
                            to experience the art of refined coastal living.
                        </p>
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center text-xs font-semibold tracking-[0.18em] uppercase text-primary border border-primary px-7 py-3.5 hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                            Book My Stay
                        </Link>
                    </div>
                </div>

                {/* ── Desktop: GSAP pinned zoom + reveal ──────────────────── */}
                <div className="hidden lg:block">
                    {/* Image — absolutely positioned, animated by GSAP */}
                    <div
                        ref={imageWrapperRef}
                        className="absolute overflow-hidden"
                        style={{ width: "47vw", height: "78vh" }}
                    >
                        <Image
                            src={IMAGE_SRC}
                            alt="The Beach Hotel"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>

                    {/* Right-side content — revealed by GSAP */}
                    <div
                        ref={contentRef}
                        className="absolute right-0 top-0 h-full w-[35%] flex flex-col justify-center pl-10 pr-16"
                    >
                        <div className="mb-6">
                            {HEADLINE_LINES.map((line, i) => (
                                <div key={i} className="overflow-hidden leading-tight">
                                    <span
                                        ref={(el) => { linesRef.current[i] = el; }}
                                        className="block text-[2.6rem] font-normal text-primary"
                                    >
                                        {line}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p
                            ref={paraRef}
                            className="text-sm text-gray-500 leading-relaxed mb-10 max-w-xs"
                        >
                            Nestled on the shores of Kanyakumari, The Beach Hotel invites you
                            to experience the art of refined coastal living.
                        </p>
                        <div ref={btnRef} className="w-fit">
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center text-xs font-semibold tracking-[0.18em] uppercase text-primary border border-primary px-7 py-3.5 hover:bg-primary hover:text-white transition-colors duration-300"
                            >
                                Book My Stay
                            </Link>
                        </div>
                    </div>
                </div>
            </CenterSection>



        </div>
    );
}
