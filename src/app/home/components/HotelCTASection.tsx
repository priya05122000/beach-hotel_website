import Section from "@/src/components/common/Section";
import Image from "next/image";

export default function HotelCTASection() {
    return (
        <div className="pt-20">


            <div className="relative overflow-hidden">
                {/* Background Image */}
                <div className="relative h-137 w-full overflow-hidden">
                    <Image
                        src="/home/cta-banner.jpg"
                        alt="Hotel Staff"
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 w-2/3 bg-linear-to-r from-primary via-primary/90 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 z-10 flex items-center">
                        <Section className="w-full">
                            <div className="max-w-lg text-white">
                                <p className=" text-lg">
                                    Hotel Facilities Are Designated Spaces And Services<br />
                                    Designed To Enhance The Guest Experience, Distinct
                                    From Individual Room Amenities.
                                </p>

                                <div className="space-x-4">
                                    <button className="mt-4 rounded-md bg-accent px-6 h-10 text-sm font-semibold text-white shadow-lg uppercase w-40">
                                        Sign in
                                    </button>
                                    <button className="mt-4 rounded-md bg-white px-6 h-10 text-sm font-semibold text-primary shadow-lg w-40 uppercase">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>


        </div >


    );
}