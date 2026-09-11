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
    const leftLogoRef = useRef<HTMLImageElement>(null);
    const rightLogoRef = useRef<HTMLImageElement>(null);

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

                gsap.fromTo(
                    [leftLogoRef.current, rightLogoRef.current],
                    { opacity: 0, y: 80 },
                    {
                        opacity: 0.4,
                        y: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: wrapperRef.current,
                            start: "bottom 95%",
                            end: "top 0%",
                            scrub: 1.5,
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
        <Section ref={wrapperRef} className="relative bg-primary h-[45vh] lg:h-[50vh]">

            <Image
                ref={leftLogoRef}
                src="/common/toplogowhite.svg"
                alt="The Beach Hotel"
                width={300}
                height={150}
                style={{ opacity: 0 }}
                className="
        absolute left-4 sm:left-6 lg:left-10
        bottom-0
        h-[30%] sm:h-[40%]
        w-auto
    "
            />

            <Image
                ref={rightLogoRef}
                src="/common/toplogowhite.svg"
                alt="The Beach Hotel"
                width={300}
                height={150}
                style={{ opacity: 0 }}
                className="
        absolute right-4 sm:right-6 lg:right-10
        bottom-0
        h-[30%] sm:h-[40%]
        w-auto
        -scale-x-100
    "
            />
            <div className="sticky  top-0 sm:top-[25vh] flex flex-col sm:flex-row h-[45vh] lg:h-[50vh] items-start justify-center px-16 sm:px-4 py-16 text-white overflow-hidden">
                {/* Image — hidden initially, animated in by GSAP */}
                <div
                    ref={imageRef}
                    className="pointer-events-none absolute  left-1/2 -translate-x-1/2 bottom-0 w-[60vw] sm:w-[45vw] xl:w-screen max-w-3xl aspect-16/10"
                    style={{ opacity: 0 }}
                >
                    <Image
                        src="/home/beachhotel_logo.svg"
                        alt="The Beach Hotel"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>

                {/* Content — always visible */}
                <div className="relative   type-body z-10 text-center flex items-center pt-0 sm:py-0">
                    {/* Not a heading — it renders before the page's actual
                        <h1> (SignatureHeadline, later in DOM order), so
                        making it an h2 here would put a heading ahead of
                        the h1 ("H1: Non-Sequential" in SEO audits). This is
                        brand/decorative text, not a real section heading. */}

                    <div className="">
                        <SubHeading as="p" className="mb-4">
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
        </Section >
    );
};

export default BannerBelowSection;


