"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubHeading from "@/src/components/common/SubHeading";
import Section from "@/src/components/common/Section";
import { PHONE_NUMBER_DISPLAY, RECEPTION_PHONE_NUMBER_DISPLAY } from "@/src/lib/site-links";

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
        <Section ref={wrapperRef} className="relative bg-primary h-[45vh] sm:h-[50vh]">
            <div className="sticky top-0 sm:top-[25vh] flex flex-col sm:flex-row h-[45vh] sm:h-[50vh] items-center justify-start sm:justify-end px-6 sm:px-4 py-16 text-white overflow-hidden">
                {/* Image — hidden initially, animated in by GSAP */}
                <div
                    ref={imageRef}
                    className="pointer-events-none absolute  left-0 translate-x-0 bottom-0 w-full sm:w-[45vw] xl:w-screen max-w-2xl aspect-16/10"
                    style={{ opacity: 0 }}
                >
                    <Image
                        src="/home/banner_logo.svg"
                        alt="The Beach Hotel"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>

                {/* Content — always visible */}
                <div className="relative type-body z-10 text-center flex items-center pt-0 sm:py-0">
                    {/* Not a heading — it renders before the page's actual
                        <h1> (SignatureHeadline, later in DOM order), so
                        making it an h2 here would put a heading ahead of
                        the h1 ("H1: Non-Sequential" in SEO audits). This is
                        brand/decorative text, not a real section heading. */}

                    <div>
                        <SubHeading as="p" className="mb-4">
                            The Beach Hotel
                        </SubHeading>

                        <p className="mt-4 max-w-70 sm:max-w-80 mx-auto text-sm sm:text-base text-white/40 font-extralight uppercase">
                            Beach Rd, Kanniyakumari, Tamil Nadu 629702, India
                        </p>

                        <p className="mt-2 max-w-70 sm:max-w-80 mx-auto text-sm sm:text-base text-white/40 font-extralight uppercase">
                            {PHONE_NUMBER_DISPLAY} | {RECEPTION_PHONE_NUMBER_DISPLAY}
                        </p>
                    </div>

                </div>
            </div>
        </Section>
    );
};

export default BannerBelowSection;


