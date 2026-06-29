"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Section from '@/src/components/common/Section';

const ParallaxGallery = () => {
    const galleryRef = useRef<HTMLElement>(null);
    const imgLeftRef = useRef<HTMLDivElement>(null);
    const imgRightRef = useRef<HTMLDivElement>(null);
    const imgSmallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!galleryRef.current) return;
            // Disable parallax on small screens
            if (window.innerWidth < 640) return;
            const top = galleryRef.current.getBoundingClientRect().top;
            const entered = Math.max(0, window.innerHeight - top);
            if (imgLeftRef.current) imgLeftRef.current.style.transform = `translateY(${-entered * 0.15}px)`;
            if (imgRightRef.current) imgRightRef.current.style.transform = `translateY(${-entered * 0.08}px)`;
            if (imgSmallRef.current) imgSmallRef.current.style.transform = `translateY(${-entered * 0.22}px)`;
        };

        // Reset transforms when resizing below breakpoint
        const handleResize = () => {
            if (window.innerWidth < 640) {
                [imgLeftRef, imgRightRef, imgSmallRef].forEach(ref => {
                    if (ref.current) ref.current.style.transform = 'none';
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section ref={galleryRef} className=" py-16 px-8 lg:px-16 lg:py-0">
            <Section>
                {/* ── Mobile: two overlapping images, no animation ─────────── */}
                <div className="sm:hidden relative pb-25" >
                    {/* Large image */}
                    <div className="relative aspect-3/2 w-[85%] overflow-hidden">
                        <Image src="/facilities/2.jpg" alt="Hotel room" fill className="object-cover" />
                    </div>
                    {/* Small overlapping image — bottom-right */}
                    <div className="absolute bottom-0 right-0 w-[48%]">
                        <div className="relative aspect-4/5 overflow-hidden">
                            <Image src="/facilities/3.jpg" alt="Hotel detail" fill className="object-cover" />
                        </div>
                    </div>
                </div>

                {/* ── Desktop: parallax offset grid ─────────────────────────── */}
                <div className="hidden sm:grid grid-cols-12 gap-10 items-start">

                    {/* Left — tall portrait */}
                    <div ref={imgLeftRef} className="col-span-4 will-change-transform" >
                        <div className="relative aspect-3/4 overflow-hidden">
                            <Image src="/facilities/1.jpg" alt="Hotel facilities" fill className="object-cover" />
                        </div>
                    </div>

                    <div className="col-span-1" />

                    {/* Right — large + overlapping small */}
                    <div className="relative col-span-5 mt-[30%] pb-35" >

                        {/* Large landscape */}
                        <div ref={imgRightRef} className='will-change-transform' >
                            <div className="relative aspect-3/2 overflow-hidden">
                                <Image src="/facilities/2.jpg" alt="Hotel room" fill className="object-cover" />
                            </div>
                        </div>

                        {/* Small overlapping — bottom-right, bleeds outside */}
                        <div
                            ref={imgSmallRef}
                            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-40 will-change-transform"
                        >
                            <div className="relative aspect-4/5 lg:aspect-2/3 overflow-hidden">
                                <Image src="/facilities/3.jpg" alt="Hotel detail" fill className="object-cover" />
                            </div>
                        </div>

                    </div>
                </div>
            </Section>
        </section>
    );
};

export default ParallaxGallery;
