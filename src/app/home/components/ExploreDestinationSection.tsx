import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import Image from "next/image";

const ExploreDestinationSection = () => {
    return (
        <section className="bg-white py-16 lg:py-20">
            <div className="container mx-auto">

                {/* Top Content */}
                <Section>
                    <div className=" grid gap-8 sm:grid-cols-2 lg:items-start">

                        {/* Left */}
                        <h2 className={`max-w-xl ${typography.textFoXl}  font-normal leading-tight text-primary uppercase`}>
                            Kanniyakumari's most extraordinary luxury address - where every horizon is yours alone, at the meeting point of three oceans.
                        </h2>

                        {/* Right */}
                        <div className="flex flex-col items-start sm:items-end ">
                            <p className={`max-w-xl sm:text-right ${typography.textXl}`}>
                                Rising at the iconic edge of India, where oceans meet in a rare natural confluence, our hotel stands in a setting of quiet distinction. The meeting of converging tides and endless blue waters creates a calm sense of place, where sea, sky and light move in harmony. Here, luxury is defined not by excess, but by stillness, space and the natural rhythm of the coastline.

                            </p>

                            <button className="mt-6 flex items-center gap-2 border border-primary px-5 h-10 py-2 text-sm uppercase transition font-normal hover:bg-primary text-primary hover:text-white rounded-md">
                                Explore
                                <span>&#8594;</span>
                            </button>
                        </div>
                    </div>

                </Section>

                {/* Image */}
                <div className="relative  h-140 lg:h-180 xl:h-220 overflow-hidden rounded-[14px]">
                    <Image
                        src="/home/kanyakumari-statue.png"
                        alt="Kanyakumari"
                        fill
                        className="h-full w-full object-cover object-top-right"
                    />

                    <div className="absolute top-0 left-0 right-0 h-50 bg-linear-to-b from-white to-transparent" />

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default ExploreDestinationSection
