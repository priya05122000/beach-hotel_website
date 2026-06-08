import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

const galleryImages = [
    "/home/hero-1.png",
    "/home/hero-2.png",
    "/home/hero-1.png",
    "/home/hero-2.png",
    "/home/hero-1.png",
    "/home/hero-2.png",
    "/home/hero-1.png",
    "/home/hero-2.png",

];

export default function GallerySection() {
    return (
        <Section>
            <section className="py-16 lg:py-20 bg-white">
                <div className="mx-auto">
                    {/* Heading */}
                    <div className="mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-primary">
                            Gallery
                        </p>

                        <h2 className={`mt-2 text-4xl font-light text-gray max-w-sm  ${typography.textThXl}`}>
                            Experience At The Beach Hotel
                        </h2>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Left Large */}
                        <div className="col-span-12 md:col-span-4 md:row-span-2">
                            <GalleryCard
                                image={galleryImages[0]}
                                className="h-72 md:h-96 lg:h-125"
                            />
                        </div>

                        {/* Top Middle */}
                        <div className="col-span-12 md:col-span-4">
                            <GalleryCard
                                image={galleryImages[1]}
                                className="h-60 md:h-46.5 lg:h-61"
                            />
                        </div>

                        {/* Right Large */}
                        <div className="col-span-12 md:col-span-4 md:row-span-2">
                            <GalleryCard
                                image={galleryImages[2]}
                                className="h-72 md:h-96 lg:h-125"
                            />
                        </div>

                        {/* Middle Bottom */}
                        <div className="col-span-12 md:col-span-4">
                            <GalleryCard
                                image={galleryImages[3]}
                                className="h-60 md:h-46.5 lg:h-61"
                            />
                        </div>

                        {/* Bottom Row */}
                        <div className="col-span-12 md:col-span-4">
                            <GalleryCard
                                image={galleryImages[4]}
                                className="h-52 md:h-60 lg:h-55"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <GalleryCard
                                image={galleryImages[5]}
                                className="h-52 md:h-60 lg:h-55"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-2">
                            <GalleryCard
                                image={galleryImages[6]}
                                className="h-52 md:h-60 lg:h-55"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <GalleryCard
                                image={galleryImages[7]}
                                className="h-52 md:h-60 lg:h-55"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Section>
    );
}

type GalleryCardProps = {
    image: string;
    className?: string;
};

function GalleryCard({
    image,
    className,
}: GalleryCardProps) {
    return (
        <div
            className={`  group
    relative
    overflow-hidden
    rounded-md
    p-0.75
    bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)]
    bg-size-[250%]
    bg-left
    duration-1000
    transition-all
    hover:bg-right
    shadow-xl ${className} `}
        >
            <div className="relative h-full w-full overflow-hidden rounded">
                <Image
                    src={image}
                    alt="Gallery Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-50" />
        </div>
    );
}