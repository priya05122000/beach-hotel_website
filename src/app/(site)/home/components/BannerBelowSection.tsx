"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import SubHeading from "@/src/components/common/SubHeading";
import { PHONE_NUMBERS } from "@/src/lib/site-links";


const BannerBelowSection = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        let ctx: { revert: () => void } | undefined;

        (async () => {
            // GSAP/ScrollTrigger are loaded lazily so they stay out of the
            // home route's initial JS bundle (previously imported at module
            // scope).
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            if (cancelled) return;

            ctx = gsap.context(() => {
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
        })();

        return () => {
            cancelled = true;
            ctx?.revert();
        };
    }, []);
    return (
        <div ref={wrapperRef} className="relative h-[30vh] sm:h-[40vh]  ">
            <div className="sticky top-[15vh] sm:top-[20vh] lg:top-[25vh] flex h-[30vh] sm:h-[40vh]   items-center justify-center bg-primary px-4 py-10 text-white overflow-hidden">
                {/* Image — hidden initially, animated in by GSAP */}
                <div
                    ref={imageRef}
                    className="pointer-events-none px-2 xl:px-0  absolute bottom-0 "
                    style={{ opacity: 0 }}
                >
                    <Image
                        src="/common/the-beach-bay-logo.svg"
                        alt="The Beach Bay"
                        width={1920}
                        height={1200}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content — always visible */}
                <div className="relative   type-body z-10 text-center flex items-start h-full sm:pt-2 xl:pt-6 ">
                    {/* Not a heading — it renders before the page's actual
                        <h1> (SignatureHeadline, later in DOM order), so
                        making it an h2 here would put a heading ahead of
                        the h1 ("H1: Non-Sequential" in SEO audits). This is
                        brand/decorative text, not a real section heading. */}

                    <div className="">
                        <SubHeading as="p" className="">
                            The Beach Bay Resort &amp; Spa
                        </SubHeading>

                        <p className="mt-4  sm:max-w-80 mx-auto text-sm sm:text-base  text-white/40 font-extralight uppercase">
                            6/61H, Beach Road, Kanyakumari - 629702
                        </p>

                        <div className="mt-2 mx-auto flex flex-wrap items-center justify-center gap-x-2 text-sm sm:text-base text-white/40 font-extralight uppercase">
                            <Phone size={15} />
                            {PHONE_NUMBERS.map(({ tel, display }, i) => (
                                <span key={tel} className="flex items-center gap-2">
                                    {i > 0 && "/"}
                                    <a href={`tel:${tel}`} className="hover:text-white transition-colors whitespace-nowrap">
                                        {display}
                                    </a>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BannerBelowSection;

