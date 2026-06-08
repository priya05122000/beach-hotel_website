import Section from "@/src/components/common/Section";

export default function LocationSection() {
    return (
        <section className="bg-[#F4F4FF] pt-20">
            <Section>
                {/* Heading */}
                <div className="max-w-sm">
                    <h2 className="text-4xl font-semibold leading-tight text-primary lg:text-5xl">
                        Need Help or
                        <br />
                        Directions?
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                        Use the map below to find us easily, or
                        send us your query using the contact form.
                    </p>
                </div>

                {/* Map */}
                <div className="mt-12 overflow-hidden rounded-md shadow-xl">
                    <iframe
                        src="https://www.google.com/maps?q=Kanyakumari&output=embed"
                        width="100%"
                        height="500"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="border-0"
                    />
                </div>
            </Section>
        </section>
    );
}