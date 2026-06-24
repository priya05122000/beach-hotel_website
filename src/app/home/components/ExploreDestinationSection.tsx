import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import Image from "next/image";

const ExploreDestinationSection = () => {
    return (
        <section className="bg-white pt-16 lg:pt-20">
            <div className=" mx-auto">

                {/* Top Content */}
                <Section>
                    <div className=" grid gap-8 sm:grid-cols-2 lg:items-start  sm:h-110 mb-10 sm:mb-0">

                        {/* Left */}
                        <h2 className={`max-w-xl ${typography.textFoXl}  font-normal leading-tight text-primary uppercase`}>
                            Kanniyakumari's most extraordinary luxury address - where every horizon is yours alone, at the meeting point of three oceans.
                        </h2>

                        {/* Right */}
                        <div className="relative  flex flex-col items-start sm:items-end justify-end h-full ">

                            <div className=" relative">
                                <span aria-hidden="true" className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-[0.5px] bg-gray h-[calc(100%-25px)]" />
                                <p className={`max-w-xl sm:text-right sm:pr-10 ${typography.textXl}`}>
                                    Rising at the iconic edge of India, where oceans meet in a rare natural confluence, our hotel stands in a setting of quiet distinction. The meeting of converging tides and endless blue waters creates a calm sense of place, where sea, sky and light move in harmony. Here, luxury is defined not by excess, but by stillness, space and the natural rhythm of the coastline.
                                </p>
                            </div>

                            <button className="mt-6 mr-10 flex items-center gap-2   h-10 py-2 text-sm uppercase transition font-normal hover:bg-primary text-primary hover:text-white ">
                                Explore
                                <span>&#8594;</span>
                            </button>
                        </div>
                    </div>

                </Section>

                {/* Image */}
                <div className="relative overflow-hidden h-65  sm:h-screen ">
                    {/* <Image
                        src="/home/kanyakumari-statue.png"
                        alt="Kanyakumari"
                        fill
                        className="h-full w-full object-cover object-top-right"
                        /> */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover "
                    >
                        <source src="/home/seaview.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute top-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-b from-white to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-40 bg-linear-to-t from-ivory to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default ExploreDestinationSection
