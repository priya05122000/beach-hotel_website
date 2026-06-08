import Section from "@/src/components/common/Section";

export default function ContactIntro() {
    return (
        <section className="bg-primary py-16 lg:py-20 lg:py-28">
            <Section>
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Left Content */}
                    <div className="lg:col-span-5">
                        <p className="mb-3 text-xs uppercase tracking-widest text-white">
                            Contact Us
                        </p>

                        <h2 className="max-w-md text-4xl font-medium leading-tight text-white md:text-5xl">
                            Step Out Of Bed
                            <br />
                            And Straight Onto
                            <br />
                            The Sun-Kissed
                            <br />
                            Sands Of
                            <br />
                            Kanyakumari.
                        </h2>
                    </div>

                    {/* Address */}
                    <div className="lg:col-span-4">
                        <h3 className="mb-3 text-2xl font-medium text-white">
                            The Beach Hotel
                        </h3>

                        <p className="max-w-xs leading-relaxed text-white">
                            Erumanayakkanpatti Beach Road,
                            <br />
                            Kanyakumari 629702, India
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-medium text-white">
                            Phone number
                        </h3>

                        <a
                            href="tel:04652237491"
                            className="text-white transition hover:text-white"
                        >
                            04652 237 491
                        </a>
                    </div>
                </div>
            </Section>
        </section>
    );
}