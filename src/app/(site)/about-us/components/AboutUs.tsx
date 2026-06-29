"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { applySlideUp } from '@/src/lib/gsap/useSlideUp';

const AboutUs = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!bgRef.current || !sectionRef.current) return;
            const scrolled = -sectionRef.current.getBoundingClientRect().top;
            if (scrolled >= 0) {
                bgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        applySlideUp([titleRef.current], { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" });
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden" style={{ height: '200vh' }}>

            {/* Parallax video */}
            <div
                ref={bgRef}
                className="absolute"
                style={{ inset: '-10% 0', willChange: 'transform' }}
            >
                <video
                    src="/home/seaview.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
            </div>


            {/* First 100vh — left content */}
            <div className="absolute inset-x-0 top-0 z-10 flex flex-col justify-end px-8 lg:px-16 pb-16 lg:pb-20" style={{ height: '100vh' }}>
                <div className="overflow-hidden">
                    <div
                        ref={titleRef}
                        className="text-white type-display-2xl leading-none "
                    >
                        Where Every<br />Wave Tells<br />Our Story
                    </div>
                </div>
                <p className="text-white/50 type-body uppercase mt-8 flex items-center gap-3">
                    <span className="inline-block w-8 h-px bg-white/40" />
                    Scroll to explore
                </p>
            </div>

            {/* Second 100vh — right content */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-end px-8 lg:px-16" style={{ height: '100vh' }}>
                <div className="max-w-lg flex flex-col gap-6">
                    <h2
                        className="text-white type-display-sm leading-tight "
                    >
                        We believe the sea has a story to tell — and we&apos;ve spent decades making sure you hear it.
                    </h2>
                    <p className="text-white/55 type-body leading-relaxed">
                        Nestled at the tip of India where three oceans meet, The Beach Hotel was born from a simple dream: to let every guest wake up to the sound of waves and fall asleep under a sky full of stars.
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-flex items-center gap-3 text-accent text-[12px] tracking-[0.22em] uppercase font-semibold group mt-2"
                    >
                        <span className="inline-block w-8 h-px bg-accent transition-all duration-300 group-hover:w-14" />
                        Our Story
                    </a>
                </div>
            </div>

        </section>
    );
};

export default AboutUs;
