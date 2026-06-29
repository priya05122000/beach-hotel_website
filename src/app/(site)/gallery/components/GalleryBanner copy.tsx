"use client";

import Image from "next/image";

const IMAGE_SRC = "/home/herobanner.jpg";

const clipStyle = {
    backgroundImage: `url('${IMAGE_SRC}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
} as const;

export default function GalleryBanner() {
    return (
        <>
            <style>{`
                @keyframes revealImagePanel {
                    from { clip-path: inset(0 100% 0 0); }
                    to   { clip-path: inset(0 0% 0 0); }
                }
                @keyframes revealTextLine {
                    from { clip-path: inset(0 100% 0 0); }
                    to   { clip-path: inset(0 0% 0 0); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                .banner-image-panel {
                    clip-path: inset(0 100% 0 0);
                    animation: revealImagePanel 1.1s cubic-bezier(0.76, 0, 0.24, 1) 0.3s forwards;
                }

                .banner-story-label {
                    opacity: 0;
                    animation: fadeIn 0.4s ease 1.8s forwards;
                }

                .banner-line-1 {
                    clip-path: inset(0 100% 0 0);
                    animation: revealTextLine 0.75s cubic-bezier(0.76, 0, 0.24, 1) 1.6s forwards;
                }

                .banner-line-2 {
                    clip-path: inset(0 100% 0 0);
                    animation: revealTextLine 0.75s cubic-bezier(0.76, 0, 0.24, 1) 1.9s forwards;
                }

                .banner-divider {
                    opacity: 0;
                    animation: fadeIn 0.4s ease 2.5s forwards;
                }

                .banner-read-more {
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadeSlideUp 0.55s ease 2.6s forwards;
                }
            `}</style>

            <section className="relative h-screen overflow-hidden bg-white">

                {/* ── Left panel: image reveals 0 → 60% ── */}
                <div className="banner-image-panel absolute inset-y-0 left-0 w-[60%]">
                    <Image
                        src={IMAGE_SRC}
                        fill
                        className="object-cover object-center"
                        alt="Desert landscape — Sands of Time"
                        priority
                    />
                    {/* soft right-edge fade so it bleeds into white */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30" />
                </div>

                {/* ── Right panel: white, fixed ── */}
                <div className="absolute inset-y-0 right-0 w-[40%] bg-white flex flex-col justify-end items-start px-10 pb-12 gap-3">
                    <div className="banner-divider w-20 border-t border-neutral-300" />
                    <a
                        href="#"
                        className="banner-read-more text-[13px] tracking-widest text-neutral-700 hover:text-neutral-900 transition-colors duration-200 font-sans"
                    >
                        Read more
                    </a>
                </div>

                {/* ── Center text overlay ── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-[20%]">

                    {/* Story label */}
                    <span className="banner-story-label text-[10px] tracking-[0.25em] uppercase text-white/70 mb-1 font-sans">
                        Story 01
                    </span>

                    {/* "Sands" — image clip-path text */}
                    <span
                        className="banner-line-1 block font-serif font-bold leading-[0.9] bg-clip-text text-transparent"
                        style={{
                            fontSize: "clamp(3.5rem, 9vw, 8rem)",
                            ...clipStyle,
                        }}
                    >
                        Sands
                    </span>

                    {/* "of time" — image clip-path text, slightly smaller */}
                    <span
                        className="banner-line-2 block font-serif font-bold leading-[0.9] bg-clip-text text-transparent"
                        style={{
                            fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)",
                            ...clipStyle,
                        }}
                    >
                        of time
                    </span>

                </div>

            </section>
        </>
    );
}