"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import SubHeading from "@/src/components/common/SubHeading";
import Section from "@/src/components/common/Section";
import { PHONE_NUMBER, PHONE_NUMBER_DISPLAY, RECEPTION_PHONE_NUMBER_DISPLAY } from "@/src/lib/site-links";


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
                        src="/common/thebeachhotel.svg"
                        alt="The Beach Hotel"
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
                            The Beach Hotel
                        </SubHeading>

                        <p className="mt-4  sm:max-w-80 mx-auto text-sm sm:text-base  text-white/40 font-extralight uppercase">
                            Erumanayakkanpatti Beach Road, Kanyakumari, Tamil Nadu 629702
                        </p>

                        <a
                            href={`tel:${PHONE_NUMBER}`}
                            className="mt-2 sm:max-w-80 mx-auto flex items-center justify-center gap-2 text-sm sm:text-base text-white/40 font-extralight uppercase hover:text-white transition-colors"
                        >
                            <Phone size={15} />
                            {PHONE_NUMBER_DISPLAY}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BannerBelowSection;

