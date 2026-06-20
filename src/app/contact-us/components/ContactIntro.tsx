import Image from "next/image";
import { typography } from "@/src/lib/typography";

export default function ContactIntro() {
    return (
        <section className="grid sm:grid-cols-[1.3fr_2fr] sm:min-h-screen">
            {/* Left â€” Hotel Image */}
            <div className="relative hidden sm:block min-h-75 lg:min-h-120">
                <Image
                    src="/contact-us/contact.jpg"
                    alt="The Beach Hotel exterior"
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            {/* Right â€” Content */}
            <div className="bg-primary px-6 sm:px-4 py-16 lg:py-20 flex flex-col justify-center">
                <div className="px-0 md:px-4 lg:px-12 ">

                    <p className="text-xs uppercase tracking-[0.2em] text-white mb-4">
                        Contact Us
                    </p>

                    <h2
                        className={` font-semibold leading-tight text-white mb-10 max-w-lg ${typography.textFiXl}`}
                    >
                        A Collection of Refined Moments and Quiet Luxury

                    </h2>

                    {/* Address & Phone row */}
                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <h3 className={`font-semibold text-white mb-2 ${typography.textXl}`}>
                                The Beach Hotel
                            </h3>
                            <p className="text-sm text-white/80 leading-relaxed">
                                Erumanayakkanpatti Beach Road,
                                <br />
                                Kanyakumari 629702, India
                            </p>
                        </div>

                        <div>
                            <h3 className={`font-semibold text-white mb-2 ${typography.textXl}`}>
                                Phone number
                            </h3>
                            <a
                                href="tel:04652237491"
                                className="text-sm text-white/80 hover:text-white transition"
                            >
                                04652 237 491
                            </a>
                        </div>
                    </div>

                    {/* Get Direction button */}
                    <div>
                        <a
                            href="https://maps.google.com/?q=Erumanayakkanpatti+Beach+Road,+Kanyakumari+629702,+India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:opacity-90 transition"
                        >
                            Get Direction
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
