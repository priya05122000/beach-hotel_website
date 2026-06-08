"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { ANIMATIONS } from "@/src/components/common/Animations";
import { Calendar, Quote, Star } from "lucide-react";
import Paragraph from "@/src/components/common/Paragraph";
import Span from "@/src/components/common/Span";
import Heading from "@/src/components/common/Heading";
import CenterSection from "@/src/components/common/CenterSection";

type AnimationKey = keyof typeof ANIMATIONS;

type Testimonial = {
    id: number;
    name: string;
    date: string;
    stars: number;
    image: string;
    message: string;
    location: string;
    position: string;
    size: string;
    animations: AnimationKey;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "James Carter",
        date: "02/04/2025",
        stars: 5,
        image: "/home/uk.webp",
        message:
            "I did my eye check at Bejan Singh Eye Hospital for cataract issues. The doctors explained everything clearly, and the surgery went smoothly. My vision is now sharp and comfortable.",
        location: "United Kingdom",
        position: "top-0 left-0",
        size: "lg:w-[140px] lg:h-[140px] sm:w-[120px] sm:h-[120px] w-[100px] h-[100px]",
        animations: "fadeRight",
    },
    {
        id: 2,
        name: "Sophia Martinez",
        date: "18/03/2025",
        stars: 5,
        image: "/home/spain.webp",
        message:
            "At Bejan Singh Eye Hospital, a detailed vision check and refractive error correction were carried out for me. The results were excellent, and my glasses prescription is perfect now.",
        location: "Spain",
        position: "top-10 sm:top-20 right-0 lg:right-10",
        size: "lg:w-[110px] lg:h-[110px] sm:w-[90px] sm:h-[90px] w-[70px] h-[70px]",
        animations: "fadeDown",
    },
    {
        id: 3,
        name: "Amina Hassan",
        date: "05/01/2025",
        stars: 4,
        image: "/home/uae.webp",
        message: "I visited Bejan Singh Eye Hospital for dry eye treatment. The testing was thorough, and the treatment plan worked very well. My eyes feel relaxed and healthy now.",
        location: "United Arab Emirates",
        position: "bottom-10 left-0",
        size: "lg:w-[100px] lg:h-[100px] sm:w-[80px] sm:h-[80px] w-[60px] h-[60px]",
        animations: "fadeRight",
    },
    {
        id: 4,
        name: "Michael O’Connor",
        date: "28/02/2025",
        stars: 5,
        image: "/home/ireland.webp",
        message: "I had my glaucoma screening and follow-up care at Bejan Singh Eye Hospital. The diagnosis was accurate, and treatment started on time. I feel confident about my eye health.",
        location: "Ireland",
        position: "bottom-0 md:bottom-25 right-2/5 sm:right-1/3 lg:right-1/2",
        size: "lg:w-[100px] lg:h-[100px] sm:w-[120px] sm:h-[120px] w-[100px] h-[100px] xl:h-[130px] xl:w-[130px]",
        animations: "fadeUp",
    },
    {
        id: 5,
        name: "Daniel Wong",
        date: "10/05/2025",
        stars: 4,
        image: "/home/singapore.webp",
        message: "For a diabetic eye examination, Bejan Singh Eye Hospital was my choice. The doctors detected early changes and guided me properly. The care felt professional and reassuring.",
        location: "Singapore",
        position: "bottom-0 right-1/8 sm:right-1/12 lg:right-30",
        size: "lg:w-[100px] lg:h-[100px] sm:w-[80px] sm:h-[80px] w-[60px] h-[60px]",
        animations: "fadeUp",
    },
    {
        id: 6,
        name: "Fatima Al Noor",
        date: "10/05/2025",
        stars: 5,
        image: "/home/oman.webp",
        message: "My child’s eye check at Bejan Singh Eye Hospital focused on squint correction advice. The evaluation was very careful, and the guidance was clear. The results were truly amazing.",
        location: "Oman",
        position: "top-10 sm:left-1/3 sm:left-3/8 lg:left-2/5",
        size: "lg:w-[100px] lg:h-[100px] sm:w-[80px] sm:h-[80px] w-[60px] h-[60px]",
        animations: "fadeDown",
    },
];

// Reusable StarRating for DRY and accessibility
function StarRating({ stars, max = 5 }: { stars: number; max?: number }) {
    return (
        <div
            className="flex gap-1 mt-2"
            aria-label={`Rating: ${stars} out of ${max} stars`}
        >
            {[...Array(stars)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-base" aria-hidden="true">
                    {/* <Star /> */}
                    <Star />
                </span>
            ))}
            {[...Array(max - stars)].map((_, i) => (
                <span key={i} className="text-gray-300 text-base" aria-hidden="true">
                    <Star />
                </span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="bg-surface py-16 lg:py-20 rounded-[20px]">
            <CenterSection>
                <div className="grid min-h-75 grid-cols-1 gap-6 sm:min-h-87.5 sm:grid-cols-2 xl:min-h-100 xl:grid-cols-2 xl:gap-10 ">

                    {/* Left Side Images */}
                    <div className="relative flex min-h-55 items-center justify-center rounded-xl p-4 sm:min-h-80 sm:p-6">
                        {testimonials.map((t, index) => {
                            const anim = ANIMATIONS[t.animations] as Record<string, any> | undefined;
                            const aos = anim?.['data-aos'];
                            const aosDuration = anim?.['data-aos-duration'];

                            return (
                                <div
                                    key={t.id}
                                    data-aos={aos}
                                    data-aos-duration={aosDuration}
                                    suppressHydrationWarning
                                    onClick={() => {
                                        setActiveIndex(index);
                                        emblaApi?.scrollTo(index);
                                    }}
                                    className={`absolute ${t.position} cursor-pointer transition-transform duration-300 hover:scale-105`.replace(/\s+/g, ' ').trim()}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Select testimonial from ${t.name}`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setActiveIndex(index);
                                            emblaApi?.scrollTo(index);
                                        }
                                    }}
                                >
                                    <Image
                                        src={t.image}
                                        alt={`Portrait of ${t.name} from ${t.location}`}
                                        width={100}
                                        height={100}
                                        className={`object-cover rounded-2xl sm:rounded-3xl shadow-lg ${t.size}`}
                                        style={{
                                            border:
                                                activeIndex === index
                                                    ? "3px solid #53BE90"
                                                    : "3px solid #fff",
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side Content */}
                    <div className="flex min-h-55  flex-col justify-center rounded-xl py-6 sm:px-6 sm:min-h-80 sm:py-8 lg:pl-10">
                        <div className="mb-2 hidden sm:block">
                            <Quote
                                className="h-10 w-10 rotate-180 text-primary"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {testimonials.map((item) => (
                                    <div
                                        key={item.id}
                                        className="min-w-0 flex-[0_0_100%]"
                                    >
                                        <Paragraph
                                            size="base"
                                            className="mb-4 max-w-lg leading-relaxed text-dark"
                                        >
                                            {item.message}
                                        </Paragraph>

                                        <Span className="flex items-center gap-2 text-dark">
                                            <Calendar className="h-4 w-4" />
                                            {item.date}
                                        </Span>

                                        <Heading
                                            level={5}
                                            className="mt-4 text-primary"
                                        >
                                            {item.name}
                                        </Heading>

                                        <Span className="text-sm text-dark">
                                            {item.location}
                                        </Span>

                                        <StarRating stars={item.stars} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </CenterSection>
        </div>
    );
}
