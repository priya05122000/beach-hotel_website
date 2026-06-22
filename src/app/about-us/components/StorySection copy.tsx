import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

export default function StorySection() {
    return (
        <section className="bg-primary/19 py-16 lg:py-20">
            <Section>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div className="lg:max-w-md">
                        <div className="mb-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-primary">
                                Story
                            </p>

                            <h2
                                className={`mt-2 max-w-sm text-primary ${typography.textFoXl}`}
                            >
                                Our Story
                            </h2>
                        </div>

                        <h3
                            className={`max-w-xl font-marcellus font-semibold leading-tight text-primary ${typography.textFiXl}`}
                        >
                            Step Out Of Bed And Straight Onto The Sun-Kissed Sands
                            Of Kanyakumari.
                        </h3>

                        <p
                            className={`mt-4 max-w-sm text-primary ${typography.textLg}`}
                        >
                            Hotel facilities are designated spaces and services
                            designed to enhance the guest experience.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="relative">
                        <div className="relative h-100 sm:h-125 w-full overflow-hidden">
                            <Image
                                src="/home/hero-1.webp"
                                alt="Hotel Room"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -top-6 right-0 bg-primary p-5 text-white shadow-xl">
                            <h3
                                className={`${typography.textThXl} max-w-sm text-white`}
                            >
                                Our Story
                            </h3>

                            <p
                                className={`mt-4 max-w-45 text-white ${typography.textBase}`}
                            >
                                Hotel facilities are designated spaces and services
                                designed to enhance the guest experience.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}