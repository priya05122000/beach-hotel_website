import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

export default function AboutHotelSection() {
    return (
        <section className="bg-cream pb-32 pt-42 lg:pt-50 lg:pb-40  flex items-center justify-center ">
            <Section>
                <div className="mx-auto max-w-lg text-center">
                    <h1
                        className={` font-bold text-primary-dark ${typography.textFoXl}`}
                    >
                        About The Hotel
                    </h1>

                    <p
                        className={`mt-4 text-primary-dark ${typography.textLg}`}
                    >
                        Hotel facilities area designated spaces and services designed to enhance. Hotel facilities area designated spaces and services designed to enhance
                    </p>
                </div>
            </Section>
        </section>
    );
}
