import Image from "next/image";
import Section from "@/src/components/common/Section";

export default function StoryPreviewSection() {
    return (
        <section className="bg-primary/13 py-20">
            <Section>
                {/* Top Content */}
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

                    {/* Left */}
                    <div>
                        <h2 className="max-w-md text-5xl font-semibold leading-tight text-primary">
                            Step Out Of Bed
                            <br />
                            And Straight Onto
                        </h2>
                    </div>

                    {/* Right */}
                    <div>
                        <h3 className="mb-4 text-3xl font-semibold text-primary">
                            Our Story
                        </h3>

                        <p className="max-w-xl text-lg leading-relaxed text-primary/90">
                            Hotel Facilities Are Designated Spaces And Services
                            Designed To Enhance The Guest Experience.
                        </p>
                    </div>
                </div>

                {/* Images */}
                <div className=" mt-16 grid grid-cols-12 gap-4">

                    {/* 3 Columns */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="relative h-[320px]">
                            <Image
                                src="/home/hero-1.png"
                                alt="Story 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* 6 Columns */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="relative h-[320px]">
                            <Image
                                src="/home/hero-2.png"
                                alt="Story 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* 3 Columns */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="relative h-[320px]">
                            <Image
                                src="/home/hero-1.png"
                                alt="Story 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </Section>
        </section>
    );
}