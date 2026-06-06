import Section from "@/src/components/common/Section";
import Image from "next/image";

const ExploreDestinationSection = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto">

                {/* Top Content */}
                <Section>
                    <div className=" grid gap-8 lg:grid-cols-2 lg:items-start">

                        {/* Left */}
                        <div>
                            <h2 className="max-w-xl text-5xl font-bold leading-tight text-primary">
                                Step Out Of Bed And Straight Onto The Sun-Kissed Sands Of Kanyakumari.
                            </h2>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col items-end">
                            <p className="max-w-xl text-right text-lg text-gray-500">
                                Hotel Facilities Are Designated Spaces And Services Designed To
                                Enhance The Guest Experience, Distinct From Individual Room
                                Amenities. Key Offerings Include 24-Hour Reception, Swimming Pools,
                                Fitness Centers, Restaurants/Bars, Meeting Rooms, And Parking.
                            </p>

                            <button className="mt-6 flex items-center gap-2 border border-gray-400 px-5 py-2 text-sm uppercase transition hover:bg-primary hover:text-white">
                                Explore
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                </Section>

                {/* Image */}
                <div className="relative h-220 overflow-hidden rounded-md">
                    <Image
                        src="/home/kanyakumari-statue.png"
                        alt="Kanyakumari"
                        fill
                        className="h-full w-full object-cover object-top"
                    />

                    <div className="absolute top-0 left-0 right-0 h-100 bg-linear-to-b from-white to-transparent" />

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default ExploreDestinationSection
