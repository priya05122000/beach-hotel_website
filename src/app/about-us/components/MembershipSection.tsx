import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import {
    Gift,
    Percent,
    BadgePercent,
    Crown,
} from "lucide-react";

const benefits = [
    {
        id: 1,
        title: "Membership Is Free",
        description: "Hotel Facilities Are Designated Spaces",
        icon: Gift,
    },
    {
        id: 2,
        title: "Enjoy Member Rate",
        description: "Hotel Facilities Are Designated Spaces",
        icon: Percent,
    },
    {
        id: 3,
        title: "Membership Is Free",
        description: "Hotel Facilities Are Designated Spaces",
        icon: BadgePercent,
    },
    {
        id: 4,
        title: "Membership Is Free",
        description: "Hotel Facilities Are Designated Spaces",
        icon: Crown,
    },
];

export default function MembershipSection() {
    return (
        <Section className="relative">
            <div className=" overflow-hidden py-20">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/home/hero-1.webp')",
                    }}
                />

                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-primary/28 backdrop-blur-md" />

                <div className="relative z-10 ">

                    <h2
                        className={` mb-12 text-center font-semibold leading-tight text-white ${typography.textFiXl}`}
                    >
                        Join The Beach Hotel
                    </h2>

                    {/* Benefits */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    className="text-center text-white"
                                >
                                    <div className="group mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded border border-white bg-accent/92 text-white transition-all duration-300 hover:bg-highlight">
                                        <Icon
                                            size={20}
                                            className="transition-transform duration-700 ease-in-out group-hover:rotate-360"
                                        />
                                    </div>

                                    <h3 className={`mb-2 ${typography.textXl} font-semibold`}>
                                        {item.title}
                                    </h3>

                                    <p className={`text-sm font-light text-white ${typography.textBase}`}>
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>

    );
}