import CenterSection from "@/src/components/common/CenterSection";
import Image from "next/image";

const photos = [
    { src: "/home/kanyakumari-statue.png", alt: "Hotel room" },
    { src: "/home/hero-2.png", alt: "Hotel sign" },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel" },
    { src: "/home/hero-1.webp", alt: "Hotel guest" },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel view" },
    { src: "/home/kanyakumari-statue.png", alt: "Hotel view" },
];

function PhotoStrip() {
    return (
        <div className="relative h-16 sm:h-20 md:h-24">
            <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center justify-center">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="
              shrink-0 bg-white shadow-xl
              w-16 sm:w-20 md:w-28 lg:w-36 xl:w-44
              p-1 sm:p-1.5 md:p-2
              -mx-1 sm:-mx-2
            "
                    >
                        <div
                            className="
                relative w-full
                h-20 sm:h-28 md:h-36 lg:h-44 xl:h-52
              "
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default function StorySection() {
    return (
        <section className="bg-primary">
            <PhotoStrip />

            <CenterSection>
                <div className="pb-16 pt-32 lg:pb-20 lg:pt-40">
                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-20">
                        {/* Left Content */}
                        <div>
                            <h2 className="mb-4 font-marcellus text-[clamp(1.7rem,3vw,2.3rem)] font-bold leading-tight text-accent">
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