"use client";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { typography } from "@/src/lib/typography";

const offers = [
    {
        id: 1,
        image: "/home/ireland.webp",
        alt: "Ireland",
        title: "Study in Ireland",
    },
    {
        id: 2,
        image: "/home/ireland.webp",
        alt: "Ireland",
        title: "Study in Ireland",
    },
    {
        id: 3,
        image: "/home/ireland.webp",
        alt: "Ireland",
        title: "Study in Ireland",
    },
];

const hoverImage = "/home/hoverimage.png";

const ExclusiveOffersSection = () => {

    const [activeCard, setActiveCard] = useState<number | null>(null);


    return (
        <Section className="py-16 lg:py-20">

            <h2 className={`${typography.textFoXl} font-arizona text-gray uppercase font-normal mb-10 `}>
                Exclusive Offers
            </h2>
            <div className="grid gap-6 xl:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer) => {
                    const isActive = activeCard === offer.id;

                    return (
                        <div
                            key={offer.id}
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    setActiveCard(isActive ? null : offer.id);
                                }
                            }}
                            className="group relative h-100 xl:h-110 overflow-hidden rounded-3xl will-change-transform p-0.5 bg-linear-to-br from-accent to-primary "                    >
                            {/* Default Image */}
                            <div className="relative h-full w-full overflow-hidden rounded-[20px]">

                                <Image
                                    src={offer.image}
                                    alt={offer.alt}
                                    fill
                                    className="
            object-cover
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-110
        "
                                />

                                {/* Hover Image */}
                                {/* <Image
                                    src={hoverImage}
                                    alt="Hover"
                                    fill
                                    className={`
        absolute inset-0  object-cover transition-opacity duration-700
        opacity-0
        lg:group-hover:opacity-100
        ${isActive ? "opacity-100 lg:opacity-0" : ""}
    `}
                                /> */}

                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    <svg
                                        className="absolute bottom-0 right-0 w-full h-full"
                                        viewBox="0 0 400 500"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            //                                         d="
                                            //   M0 0
                                            //   H260
                                            //   C250 20 235 40 220 65
                                            //   L180 130
                                            //   C170 145 175 160 190 170
                                            //   L280 235
                                            //   C300 250 300 285 275 295
                                            //   L170 315
                                            //   C145 320 135 335 135 355
                                            //   L145 500
                                            //   C145 320 135 335 135 355
                                            //   L145 500
                                            //   L0 500
                                            //   Z
                                            //   "

                                            d="
    M0 0
    H260
    C250 20 235 40 220 65
    "
                                            fill="rgba(0,0,0,0.65)"
                                        />
                                    </svg>
                                </div>

                            </div>


                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                                {/* Top Row - Always Visible */}
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex  bg-linear-to-r from-primary to-accent p-0.5 h-10 text-sm font-normal text-white rounded-xs">

                                        <span
                                            className={`
        flex items-center px-2 transition-all duration-700

        bg-dusty

        lg:group-hover:bg-white
        lg:group-hover:text-primary

        ${isActive
                                                    ? "bg-white text-primary lg:bg-dusty lg:text-white"
                                                    : ""
                                                }
    `}
                                        >
                                            EXCLUSIVE OFFER
                                        </span>
                                    </div>

                                    <button
                                        className={`
        flex h-10 w-10 items-center justify-center
        rounded-xs border border-primary bg-white text-primary
        transition-all duration-700

        lg:group-hover:scale-105

        ${isActive ? "scale-105 lg:scale-100" : ""}
    `}
                                    >
                                        <ArrowUpRight size={20} />
                                    </button>
                                </div>

                                <div
                                    className={`
        overflow-hidden
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
pb-5 lg:pb-0
        max-h-0
        opacity-0
        translate-y-4

        lg:group-hover:max-h-24
        lg:group-hover:opacity-100
        lg:group-hover:translate-y-0

        ${isActive
                                            ? "max-h-24 opacity-100 translate-y-0 lg:max-h-0 lg:opacity-0 lg:translate-y-4"
                                            : ""
                                        }
    `}
                                >
                                    <p className={` lg:mt-3 leading-snufg text-white ${typography.textBase}`}>
                                        Discover exciting opportunities and start your international
                                        education journey today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Section>
    );
};

export default ExclusiveOffersSection;