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
                <div className="grid grid-cols-12 gap-x-[2.2222222222vw] items-start">
                    {/* Left label */}
                    <div className="col-span-12 sm:col-span-3  lg:col-span-2 flex items-center h-full pt-2">
                        <p className="tracking-[0.25em]  text-gray flex items-center gap-2">
                            <span className="text-primary-dark font-semibold"><Sparkle size={10} fill='#012644' /></span>
                            Discover
                        </p>
                    </div>

                    {/* Statement + categories */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col gap-10 sm:gap-12 ">
                        <div
                            ref={revealRef}
                            className="text-primary-dark font-arizona-flare-regular text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none flex flex-wrap gap-x-[0.25em]"
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

                        <ul className="flex flex-col gap-3 max-w-full sm:max-w-75 lg:max-w-sm xl:max-w-md">
                            <div
                                className="text-gray  text-[18px] lg:text-[20px] "
                            >
                                We are a team* of like-minded design enthusiasts and tech aficionados that explore the digital frontier with grit and dedication. Intrigued by beauty, fascinated by technology and fuelled with an everlasting devotion to digital craftsmanship and meaningful aesthetics.
                            </div>
                        </ul>
                    </div>

                </div>
            </Section>

            <section ref={galleryRef} className="mt-10 sm:mt-0  mb-0 sm:mb-20 px-6 sm:px-4">
                <div className='max-w-full sm:max-w-xl lg:max-w-4xl xl:max-w-5xl  mx-auto px-0 md:px-4 lg:px-12 xl:px-0'>
                    {/* ── Mobile: two images + text ─────────── */}
                    <div className="sm:hidden">
                        {/* Large image — right-aligned */}
                        <div className="relative aspect-3/2 w-[78%] ml-auto">
                            <Image src="/facilities/2.jpg" alt="Hotel room" fill className="object-cover" />
                        </div>
                        {/* Small portrait + text side by side */}
                        <div className="  gap-4 -mt-20">
                            <div className=" w-[48%] shrink-0">
                                <div className="relative aspect-4/5">
                                    <Image src="/facilities/3.jpg" alt="Hotel detail" fill className="object-cover" />
                                </div>
                                <hr className="mb-3 mt-6" />

                            </div>

                            <div className="w-2/3 ">
                                <p className="text-[13px] text-gray leading-relaxed">
                                    *We believe in a fluid team approach that allows us to bring together the best designers, developers and agencies in the world in order to serve the needs of today&apos;s clients.
                                </p>
                            </div>
                        </div>
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
                            <p>
                                *We believe in a fluid team approach that allows us to bring together the best designers, developers and agencies in the world in order to serve the needs of today’s clients.</p>
                        </div>

                    </div>
                </div>
            </section>

        </div>


    );
};

export default TeamSection;
