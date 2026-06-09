import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

export default function SectionHeading() {
    return (
        <Section className="bg-primary/9">
            <div className=" py-16 lg:py-28 md:py-20 ">
                <div className="mx-auto max-w-5xl  text-center">
                    <h3
                        className={`font-arizona font-semibold leading-tight text-primary ${typography.textFiXl}`}
                    >
                        Step Out Of Bed And Straight Onto The Sun-Kissed Sands
                        Of Kanyakumari.
                    </h3>
                </div>
            </div>
        </Section>

    );
}