import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

export default function ContactIntro() {
    return (
        <section className="bg-primary py-16 lg:py-20">
            <Section>
                <div className="grid gap-10 lg:grid-cols-12">
                    {/* Left Content */}
                    <div className="lg:max-w-md lg:col-span-5">
                        <div className="mb-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-white">
                                Contact Us
                            </p>

                            <h2
                                className={`mt-2 max-w-sm text-white ${typography.textFoXl}`}
                            >
                                Contact Us
                            </h2>
                        </div>

                        <h3
                            className={`max-w-xl font-arizona font-semibold leading-tight text-white ${typography.textFiXl}`}
                        >
                            Step Out Of Bed And Straight Onto The Sun-Kissed Sands
                            Of Kanyakumari.
                        </h3>


                    </div>

                    {/* Address */}
                    <div className="lg:col-span-4">
                        <h3 className={`mb-3 text-white ${typography.textXl}`}
                        >
                            The Beach Hotel
                        </h3>

                        <p className={`text-sm leading-relaxed text-white`}>
                            Erumanayakkanpatti Beach Road,
                            <br />
                            Kanyakumari 629702, India
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="lg:col-span-3">
                        <h3 className={`mb-3 text-white ${typography.textXl}`}
                        >
                            Phone number
                        </h3>

                        <a
                            href="tel:04652237491"
                            className="text-white text-sm transition hover:text-white"
                        >
                            04652 237 491
                        </a>
                    </div>
                </div>
            </Section>
        </section>
    );
}