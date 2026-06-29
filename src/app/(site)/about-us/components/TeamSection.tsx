"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '@/src/components/common/Section';
import { Sparkle } from 'lucide-react';
import CenterSection from '@/src/components/common/CenterSection';


const REVEAL_WORDS = ['Design &', 'Technology', 'Enthusiasts'];

const TeamSection = () => {

    const galleryRef = useRef<HTMLElement>(null);
    const imgLeftRef = useRef<HTMLDivElement>(null);
    const imgRightRef = useRef<HTMLDivElement>(null);
    const imgSmallRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const [revealedCount, setRevealedCount] = useState(0);

    useEffect(() => {
        const el = revealRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                REVEAL_WORDS.forEach((_, i) => {
                    setTimeout(() => setRevealedCount(i + 1), i * 180);
                });
            },
            { threshold: 0.25 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!galleryRef.current) return;
            // Disable parallax on small screens
            if (window.innerWidth < 640) return;
            const top = galleryRef.current.getBoundingClientRect().top;
            const entered = Math.max(0, window.innerHeight - top);
            if (imgLeftRef.current) imgLeftRef.current.style.transform = `translateY(${-entered * 0.15}px)`;
            if (imgRightRef.current) imgRightRef.current.style.transform = `translateY(${entered * 0.11}px)`;
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

        <div className='py-16 lg:py-20 bg-primary/4'>
            <Section >
                {/* Content grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-x-[2.2222222222vw] items-start">
                    {/* Left label */}
                    <div className="sm:col-span-3 lg:col-span-2 flex items-center pt-2">
                        <p className="type-h6 tracking-[73%] text-left lg:tracking-[83%] uppercase">Discover</p>

                    </div>

                    <div className="hidden sm:block sm:col-span-1" />

                    {/* Statement + categories */}
                    <div className="sm:col-span-8 flex flex-col gap-8 sm:gap-12">
                        <div
                            ref={revealRef}
                            className="text-primary-dark type-display-2xl flex flex-wrap gap-x-[0.25em]"
                        >
                            {REVEAL_WORDS.map((word, i) => (
                                <span key={i} className="overflow-hidden inline-block leading-tight">
                                    <span
                                        className="inline-block transition-all duration-700 ease-out"
                                        style={{
                                            transform: revealedCount > i ? 'translateY(0)' : 'translateY(110%)',
                                            opacity: revealedCount > i ? 1 : 0,
                                        }}
                                    >
                                        {word}
                                    </span>
                                </span>
                            ))}
                        </div>

                        <div className="type-body-xl text-charcoal max-w-full sm:max-w-75 lg:max-w-sm xl:max-w-md">
                            We are a team* of like-minded design enthusiasts and tech aficionados that explore the digital frontier with grit and dedication. Intrigued by beauty, fascinated by technology and fuelled with an everlasting devotion to digital craftsmanship and meaningful aesthetics.
                        </div>
                    </div>

                </div>
            </Section>

            <section ref={galleryRef} className="mt-10 sm:mt-0  mb-0 sm:mb-20 px-6 sm:px-4">
                <div className='max-w-full sm:max-w-xl lg:max-w-4xl xl:max-w-5xl  mx-auto px-0 md:px-4 lg:px-12 xl:px-0'>
                    {/* ── Mobile: stacked images + text ─────────── */}
                    <div className="sm:hidden flex flex-col">
                        {/* Large image — right-aligned */}
                        <div className="relative aspect-3/2 w-[78%] ml-auto">
                            <Image src="/facilities/2.jpg" alt="Hotel room" fill className="object-cover" />
                        </div>
                        {/* Portrait image — left-aligned, overlapping large */}
                        <div className="relative aspect-4/5 w-[48%] -mt-20">
                            <Image src="/facilities/3.jpg" alt="Hotel detail" fill className="object-cover" />
                        </div>
                        <hr className="mt-6 mb-4 w-1/2" />
                        <p className="type-body-sm w-2/3 text-gray leading-relaxed">
                            *We believe in a fluid team approach that allows us to bring together the best designers, developers and agencies in the world in order to serve the needs of today&apos;s clients.
                        </p>
                    </div>

                    {/* ── Desktop: parallax offset grid ─────────────────────────── */}
                    <div className="hidden sm:grid grid-cols-12 gap-10 items-start ">



                        {/* Right — large + overlapping small */}
                        <div className="relative col-span-6 mt-[30%]" >

                            {/* Large landscape */}
                            <div ref={imgRightRef} className='will-change-transform' >
                                <div className="relative aspect-3/2 ">
                                    <Image src="/facilities/2.jpg" alt="Hotel room" fill className="object-cover" />
                                </div>
                            </div>

                        </div>

                        <div className="col-span-1 lg:col-span-2" />

                        {/* Left — tall portrait */}
                        <div className="col-span-5 lg:col-span-4 will-change-transform " >
                            <div className="relative aspect-3/4 ">
                                <Image src="/facilities/1.jpg" alt="Hotel facilities" fill className="object-cover" />
                            </div>
                            <hr className='mt-8 mb-6' />
                            <p className='type-body text-charcoal'>
                                *We believe in a fluid team approach that allows us to bring together the best designers, developers and agencies in the world in order to serve the needs of today’s clients.</p>
                        </div>

                    </div>
                </div>
            </section>

        </div>


    );
};

export default TeamSection;
