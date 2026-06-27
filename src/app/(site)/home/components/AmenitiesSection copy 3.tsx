import CenterSection from "@/src/components/common/CenterSection";
import Section from "@/src/components/common/Section";
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
        <div className="flex flex-col items-center gap-3 ">
            <div className=" w-24 aspect-2/3 rounded-full   bg-linear-to-r from-primary via-accent/76 to-primary p-px shadow-[0px_4px_4px_0px_#00000040]">
                <div className="bg-ivory w-full h-full rounded-full flex items-center justify-center">
                    <Icon size={50} strokeWidth={1.5} className="text-primary" />

                </div>
            </div>
            <p className="text-xs text-center text-primary/60 ">{title}</p>
        </div>
    );
}

function Editorial({ align = "left" }: { align?: "left" | "right" }) {
    const isRight = align === "right";
    return (
        <div className={`flex h-full flex-col  ${isRight ? "items-end text-right" : "items-start text-left"}`}>
            <p className={`${typography.textXl} text-primary mb-4 uppercase`}>
                Step out of bed and straight<br />
                sun-kissed sands of Kanyakumari
            </p>
            <p className={typography.textXl}>
                Hotel Facilities Are Designated Spaces And Services Designed To
                Enhance The Guest Experience, Distinct From Individual Room
                Amenities. Key Offerings Include 24-Hour Reception,
            </p>
            <hr className="mt-6 w-[calc(100%-30px)] border border-gray" />
        </div>
    );
}

export default function AmenitiesSection() {
    return (
        <CenterSection className="bg-ivory py-16 lg:py-20">
            <section className=" relative space-y-16">

                {/* Watermark label — top */}
                <h2 className="text-sm font-arizona-sans-bold text-gray text-center tracking-[70%] sm:tracking-[83%] uppercase font-normal mb-10">
                    A M E N I T I E S
                </h2>

                <div className="grid grid-cols-[3fr_5fr] items-end h-86 bg-amber-600">
                    <Editorial align="left" />
                    <div className="grid grid-cols-5 gap-4">
                        {amenities.slice(0, 5).map((item) => (
                            <IconCard key={item.title} icon={item.icon} title={item.title} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-[5fr_3fr] items-end gap-6">
                    <div className="grid grid-cols-5 gap-4">
                        {amenities.slice(5).map((item) => (
                            <IconCard key={item.title} icon={item.icon} title={item.title} />
                        ))}
                    </div>
                    <p className="text-sm font-arizona-sans-bold text-gray text-end tracking-widest uppercase font-normal ">
                        A M E N I T I E S
                    </p>
                </div>

            </section>
        </CenterSection>
    );
}
