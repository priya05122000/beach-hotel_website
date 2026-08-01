"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";
import { Button } from "@/src/components/common/button";

const IMAGE_SRC = "/banner/gallery.webp";

const displaySize = "clamp(3.5rem,11vw,8rem)";
const subSize = "clamp(2.5rem,11vw,8rem)";

const clipStyle = {
    backgroundImage: `url(${IMAGE_SRC})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
} as const;

export default function GalleryBanner() {
    const container = useRef<HTMLDivElement>(null);

    const leftRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const rightRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const leftLines = leftRefs.current.filter(Boolean) as HTMLSpanElement[];
            const rightLine = rightRef.current;

            gsap.set(".leftReveal", { clipPath: "inset(0 100% 0 0)" });
            gsap.set(".readReveal", { yPercent: 100 });

            const tl = gsap.timeline();

            // Left image reveal
            tl.to(".leftReveal", {
                clipPath: "inset(0 0% 0 0)",
                duration: 2,
                ease: "power4.inOut",
            });

            // THE BEACH + HOTEL
            applySlideUp(leftLines, { timeline: tl, position: ">0.1", stagger: 0.13, duration: 0.8 });

            // WAY
            applySlideUp([rightLine], { timeline: tl, position: "<0.2", duration: 0.7 });

            // Read More
            tl.to(
                ".readReveal",
                {
                    yPercent: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                "<0.2"
            );
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="relative h-screen overflow-hidden mb-16  lg:mb-20 bg-white flex"
        >
            {/* LEFT 60% */}
            <div className="relative w-1/2 sm:w-[60%] h-full ">

                {/* Image */}
                <div className="leftReveal absolute inset-0 overflow-hidden">
                    <Image
                        src={IMAGE_SRC}
                        fill
                        priority
                        alt="The Beach Hotel"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                </div>

                {/* Center Title */}
                <div className="absolute right-0 top-1/2  translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">

                    <div className="overflow-hidden">
                        <span
                            ref={(el) => {
                                leftRefs.current[0] = el;
                            }}
                            className="block type-display-lg tracking-wider font-bold bg-clip-text text-transparent  leading-none"
                            style={{
                                fontSize: displaySize,
                                ...clipStyle,
                            }}
                        >
                            THE BEACH
                        </span>
                    </div>

                    <div className="overflow-hidden">
                        <span
                            ref={(el) => {
                                leftRefs.current[1] = el;
                            }}
                            // className="block  font-arizona-flare-regular tracking-wider  font-bold  leading-none bg-clip-text text-transparent"
                            // style={{
                            //     fontSize: subSize,
                            //     ...clipStyle,
                            // }}
                            className="block type-display-lg tracking-wider font-bold bg-clip-text text-transparent  leading-none"
                            style={{
                                fontSize: displaySize,
                                ...clipStyle,
                            }}
                        >
                            HOTEL
                        </span>
                    </div>

                    {/* <div className="overflow-hidden w-full mt-10  text-end"> */}
                    {/* <p className="readReveal  type-body">
                            Read More
                        </p> */}

                    {/* <Button href="/gallery" className="sm:w-50 readReveal pointer-events-auto whitespace-nowrap font-normal text-primary-dark cursor-pointer">
                            Read More
                        </Button> */}
                    {/* <hr className="w-1/2 ml-auto mt-4" /> */}
                    {/* </div> */}


                </div>

            </div>

            {/* RIGHT 40% */}
            {/* <div className="w-[40%] h-full flex items-center justify-center relative bg-white">

                <div className="w-md absolute left-0 bottom-[20%] bg-amber-600">



                    <div className="overflow-hidden">
                        <h2 className="readReveal text-5xl font-bold mb-6">
                            Read More
                        </h2>
                    </div>


                </div>

            </div> */}

        </section>
    );
}