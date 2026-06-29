"use client";

import { useEffect, useRef } from "react";
import { typography } from "@/src/lib/typography";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BannerBelowSection = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "bottom 95%",
                        end: "top 0%",
                        scrub: 1.5,
                        // markers: true,
                    },
                }
            );
        }, wrapperRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="relative h-[50vh]">
            <div className="sticky top-[25vh] flex h-[50vh] items-center justify-center bg-primary px-4 py-10 text-white overflow-hidden">
                {/* Image — hidden initially, animated in by GSAP */}
                <div
                    ref={imageRef}
                    className="pointer-events-none absolute bottom-0 "
                    style={{ opacity: 0 }}
                >
                    <Image
                        src="/home/thebeachhotel.svg"
                        alt="The Beach Hotel"
                        width={1920}
                        height={1200}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content — always visible */}
                <div className="relative type-body z-10 text-center  h-[25vh] ">
                    <p className="uppercase text-white">
                        The Beach Hotel
                    </p>

                    <p className="mt-6  max-w-80 text-white/40 font-extralight uppercase">
                        Erumanayakkanpatti Beach Road, Kanyakumari 629702, India
                    </p>

                    <p className="mt-2  max-w-80 text-white/40 font-extralight uppercase">
                        +91 23456 78654 | +91 43567 86547
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BannerBelowSection;


