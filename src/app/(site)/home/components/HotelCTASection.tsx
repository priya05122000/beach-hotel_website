import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import Image from "next/image";

export default function HotelCTASection() {
    return (

        <div className="relative overflow-hidden ">
            {/* Background Image */}
            <div className="relative h-80 sm:h-100 lg:h-135 w-full overflow-hidden">
                <Image
                    src="/home/cta.jpg"
                    alt="Hotel Staff"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 w-full ml-auto md:w-1/2 bg-primary" />

                {/* Content */}
                <div className="absolute md:w-1/2  inset-0 z-10 flex items-center justify-center ml-auto">
                    <div className="px-6 sm:px-8 lg:px-0 lg:max-w-md xl:max-w-lg ">
                        <div className=" text-white ">
                            <p className={`${typography.textXl}`}>
                                Access your account or create a new profile to manage bookings, view offers and enjoy a smoother stay experience at The Beach Hotel, Kanniyakumari.
                            </p>

                            <div className="space-x-4 mt-6 flex">
                                <button className=" bg-accent px-6 h-10 text-sm font-normal text-primary shadow-lg uppercase">
                                    Sign in
                                </button>
                                <button className=" bg-white px-6 h-10 text-sm font-normal text-primary shadow-lg  uppercase">
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}