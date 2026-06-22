import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

export default function StoryPreviewSection() {
    return (
        <section className="bg-cream py-16 lg:py-20">
            <Section>
                {/* Top Content */}
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

                    <h2
                        className={` font-semibold leading-tight text-primary ${typography.textFiXl}`}
                    >
                        Coastal Hotel Stay in Kanniyakumari

                    </h2>

                    {/* Right */}
                    <div>
                        <h3
                            className={` max-w-sm text-primary ${typography.textFoXl}`}
                        >
                            Our Story
                        </h3>

                        <p
                            className={`mt-4 max-w-lg text-primary ${typography.textLg}`}
                        >
                            A calm and welcoming stay in Kanyakumari with well-kept spaces and warm hospitality, designed for a relaxed and comfortable visit.

                        </p>
                    </div>
                </div>

                {/* Images */}
                <div className=" mt-12 grid grid-cols-12 gap-4">

                    {/* 3 Columns */}
                    <div className="col-span-12 sm:col-span-3">
                        <div className="relative h-60 lg:h-80">
                            <Image
                                src="/home/hero-1.webp"
                                alt="Story 1"
                                fill
                                className="object-cover rounded-[14px]"
                            />
                        </div>
                    </div>

                    {/* 6 Columns */}
                    <div className="col-span-12 sm:col-span-6">
                        <div className="relative h-60 lg:h-80">
                            <Image
                                src="/home/hero-2.png"
                                alt="Story 2"
                                fill
                                className="object-cover rounded-[14px]"
                            />
                        </div>
                    </div>

                    {/* 3 Columns */}
                    <div className="col-span-12 sm:col-span-3">
                        <div className="relative h-60 lg:h-80">
                            <Image
                                src="/home/hero-1.webp"
                                alt="Story 3"
                                fill
                                className="object-cover rounded-[14px]"
                            />
                        </div>
                    </div>

                </div>
            </Section>
        </section>
    );
}