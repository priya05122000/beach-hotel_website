import CenterSection from "@/src/components/common/CenterSection";
import Section from "@/src/components/common/Section";
import Image from "next/image";

const photos = [
    { src: "/home/kanyakumari-statue.png", alt: "Hotel room", rotate: "-9deg", zIndex: 1 },
    { src: "/home/hero-2.png", alt: "Hotel sign", rotate: "4deg", zIndex: 3 },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel", rotate: "-5deg", zIndex: 2 },
    { src: "/home/hero-1.webp", alt: "Hotel guest", rotate: "12deg", zIndex: 5 },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel view", rotate: "4deg", zIndex: 6 },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel view", rotate: "-20deg", zIndex: 0 },
];

function PhotoStrip() {
    return (
        <Section>
            {/* Mobile: vertical stack, each photo one by one with its rotation */}
            <div className="md:hidden flex flex-col  items-center gap-10 pt-16  ">
                {photos.slice(0, 4).map((photo, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-xl p-1 w-full rounded-md"
                    >
                        <div className="relative w-full h-60">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                unoptimized
                                className="object-cover rounded-sm"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: overlapping fan layout */}
            <div className="hidden md:block relative  h-36 lg:h-44 xl:h-56  ">
                <div className="absolute  left-1/2 top-0 flex h-full -translate-x-1/2 -translate-y-1/3 items-center justify-center">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="shrink-0 bg-white rounded-md shadow-xl w-28 lg:w-36 xl:w-48 p-1 "
                            style={{
                                transform: `rotate(${photo.rotate})`,
                                zIndex: photo.zIndex,
                            }}
                        >
                            <div className="relative w-full h-36 lg:h-44 xl:h-56">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    unoptimized
                                    className="object-cover  rounded-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default function StorySection() {
    return (
        <section className="bg-primary">
            <PhotoStrip />

            <CenterSection>
                <div className="py-16 lg:py-20">
                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-20">
                        {/* Left Content */}
                        <div>
                            <h2 className="mb-4 text-[clamp(1.7rem,3vw,2.3rem)] font-bold leading-tight text-accent">
                                Step Out Of Bed
                                <br />
                                And Straight Onto
                            </h2>

                            <p className="mb-3 text-sm font-semibold text-white">
                                Contact Front Desk
                            </p>

                            <p className="text-xs leading-relaxed text-white/50">
                                Hotel Facilities Are Designated Space
                            </p>
                        </div>

                        {/* Right Content */}
                        <div className="space-y-6">
                            <p className="text-sm leading-relaxed text-white">
                                Hotel Facilities Are Designated Spaces And Services Designed To
                                Enhance The Guest Experience. Hotel Facilities Are Designated
                                Spaces.
                            </p>

                            <p className="text-sm leading-relaxed text-white">
                                Hotel Facilities Are Designated Spaces And Services Designed To
                                Enhance The Guest Experience. Hotel Facilities Are Designated
                                Spaces.
                            </p>
                        </div>
                    </div>
                </div>
            </CenterSection>
        </section>
    );
}
