import Image from "next/image";
import Section from "@/src/components/common/Section";

const facilities = [
    {
        title: "SPA AREA",
        image: "/home/hero-1.webp",
        description:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience",
    },
    {
        title: "DELUXE ROOM",
        image: "/home/hero-1.webp",
        description:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience",
    },
    {
        title: "RESTAURANT",
        image: "/home/hero-1.webp",
        description:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience",
    },
    {
        title: "SWIMMING POOL",
        image: "/home/hero-1.webp",
        description:
            "Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience",
    },
];

export default function FacilitiesSection() {
    return (
        <section className="bg-primary/19 pb-10">
            <div className="space-y-8">
                {facilities.map((item, index) => (
                    <div
                        key={index}
                        className="grid items-center gap-12 lg:grid-cols-12"
                    >
                        {/* Image */}
                        <div className="lg:col-span-7">
                            <div className="relative h-80 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-5">
                            <h3 className="mb-6 text-5xl font-semibold uppercase text-primary">
                                {item.title}
                            </h3>

                            <p className="mb-4 max-w-md text-lg leading-relaxed text-primary">
                                {item.description}
                            </p>

                            <p className="max-w-md text-lg leading-relaxed text-primary">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}