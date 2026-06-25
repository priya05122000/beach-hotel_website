import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import {
    BedDouble,
    Leaf,
    Waves,
    Presentation,
    PartyPopper,
    BellRing,
    Crown,
    Utensils,
    Car,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";

const amenities = [
    { title: "Rooms & Suites", icon: BedDouble },
    { title: "Spa & Wellness", icon: Leaf },
    { title: "Infinity Pool", icon: Waves },
    { title: "Business Meetings", icon: Presentation },
    { title: "Events & Celebrations", icon: PartyPopper },
    { title: "Guest Services", icon: BellRing },
    { title: "Executive Lounge", icon: Crown },
    { title: "Fine Dining", icon: Utensils },
    { title: "Transport & Parking", icon: Car },
    { title: "Safety & Security", icon: ShieldCheck },
];

function IconCard({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
    return (
        <div className="flex flex-col items-center gap-5 sm:gap-3">
            <div className="w-full sm:w-20 xl:w-24 h-24 sm:h-28 xl:h-34 aspect-1/2 rounded-full bg-linear-to-b from-primary via-accent/76 to-primary  shadow-[0px_4px_4px_0px_#00000040]

             group
    relative
    overflow-hidden
    p-px
    bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
    bg-size-[250%]
    bg-left
    duration-1000
    transition-all
    hover:bg-right
            ">
                <div className="bg-ivory transition-all duration-300    w-full h-full rounded-full flex items-center justify-center">
                    <Icon strokeWidth={1.5} className="text-primary w-full h-full p-4 sm:p-6" />
                </div>
            </div>
            <p className="text-center text-primary/60 ">{title}</p>
        </div>
    );
}

function Editorial({ align = "left" }: { align?: "left" | "right" }) {
    const isRight = align === "right";
    return (
        <div className={`flex pb-4 lg:pb-20 sm:w-1/2 lg:w-full flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}>
            <p className={` text-primary font-bold mb-4 uppercase`}>
                Step out of bed and straight<br />
                sun-kissed sands of Kanyakumari
            </p>
            <p>
                Hotel Facilities Are Designated Spaces And Services Designed To
                Enhance The Guest Experience, Distinct From Individual Room
                Amenities. Key Offerings Include 24-Hour Reception,
            </p>
            <hr className="mt-6 w-[calc(100%-30px)] hidden sm:block border border-gray" />
        </div>
    );
}

export default function AmenitiesSection() {
    return (
        <CenterSection className="bg-ivory py-16 lg:py-20">
            <h2 className="  text-gray text-center  pb-10 uppercase font-normal">
                AMENITIES
            </h2>

            <section className="relative px-4 sm:px-0 space-y-10 ">

                {/* Mobile only: editorial + 8 icons in 4+4 grid */}
                <div className="sm:hidden space-y-8">
                    <Editorial align="left" />
                    <div className="grid grid-cols-4 gap-5">
                        {amenities.slice(0, 8).map((item) => (
                            <IconCard key={item.title} icon={item.icon} title={item.title} />
                        ))}
                    </div>
                </div>

                {/* Tablet + Desktop */}
                <div className="hidden sm:block space-y-10">
                    {/* Row 1 — tablet: stacked | desktop: 3fr+5fr */}
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] space-y-5 lg:space-y-0 lg:gap-5 items-end">
                        <Editorial align="left" />
                        <div className="grid grid-cols-5 w-3/4 ml-auto lg:w-full gap-5">
                            {amenities.slice(0, 5).map((item) => (
                                <IconCard key={item.title} icon={item.icon} title={item.title} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — tablet: stacked | desktop: 5fr+3fr with label */}
                    <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-5 items-end">
                        <div className="grid grid-cols-5 w-3/4 lg:w-full gap-5">
                            {amenities.slice(5).map((item) => (
                                <IconCard key={item.title} icon={item.icon} title={item.title} />
                            ))}
                        </div>
                        <p className="hidden lg:block  text-gray text-end  uppercase font-normal">
                            A M E N I T I E S
                        </p>
                    </div>
                </div>
            </section>
        </CenterSection>
    );
}
