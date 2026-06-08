import Image from "next/image";
import Section from "@/src/components/common/Section";

export default function StorySection() {
    return (
        <section className="bg-primary/19 py-16 lg:py-20">
            <Section>
                <div className="grid items-center gap-12 lg:grid-cols-2">

                    {/* Left Content */}
                    <div className="max-w-md">
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">
                            Story
                        </p>
                        <p className="mb-3 font-semibold text-base uppercase tracking-[0.25em] text-primary">
                            Our Story
                        </p>

                        <h2 className="text-5xl font-semibold leading-tight text-primary">
                            Step Out Of Bed
                            <br />
                            And Straight Onto
                            <br />
                            The Sun-Kissed
                            <br />
                            Sands Of
                            <br />
                            Kanyakumari.
                        </h2>

                        <p className="mt-8 max-w-sm text-base text-primary leading-relaxed text-accent">
                            Hotel Facilities Are Designated Spaces
                            And Services Designed To Enhance The Guest
                            Experience.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative h-[500px] w-full overflow-hidden">
                            <Image
                                src="/home/hero-1.png"
                                alt="Hotel Room"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -top-6 right-0 bg-primary p-6 text-white shadow-xl">
                            <h3 className="mb-3 text-3xl font-semibold">
                                Our Story
                            </h3>

                            <p className="max-w-[180px] text-sm leading-relaxed text-white">
                                Hotel Facilities Are Designated Spaces
                                And Services Designed To Enhance The
                                Guest Experience
                            </p>
                        </div>
                    </div>

                </div>
            </Section>
        </section>
    );
}