import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import {
    Dumbbell,
    Wifi,
    Car,
    Utensils,
    Waves,
    BellRing,
    ShieldCheck,
    Coffee,
} from "lucide-react";

const amenities = [
    { title: "Fitness Center", icon: Dumbbell },
    { title: "Free WiFi", icon: Wifi },
    { title: "Parking", icon: Car },
    { title: "Restaurant", icon: Utensils },
    { title: "Swimming Pool", icon: Waves },
    { title: "Room Service", icon: BellRing },
    { title: "24/7 Security", icon: ShieldCheck },
    { title: "Coffee Lounge", icon: Coffee },
];

export default function AmenitiesSection() {
    return (
        <CenterSection>
            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto  px-4">
                    {/* Heading */}
                    <div className="mb-10 text-center">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                            Amenities
                        </p>

                        <h2 className={`mt-2 text-4xl font-arizona font-normal text-gray ${typography.textFoXl}`}>
                            Amenities
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">                        {amenities.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="
    group
    relative
    overflow-hidden
    rounded-md
    p-0.5
    bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
    bg-size-[250%]
    bg-left
    duration-1000
    transition-all
    hover:bg-right
    shadow-xl
  "
                            >
                                <div
                                    className="  group flex items-center gap-3 p-2 inset-0.5 transition-all duration-300  rounded-sm bg-soft-accent"
                                >
                                    {/* Icon */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent text-white">
                                        <Icon
                                            size={16}
                                            className="transition-transform duration-500 group-hover:rotate-360"
                                        />
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm font-medium text-primary">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </section>
        </CenterSection>
    );
}