"use client";

import Image from "next/image";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import CenterSection from "@/src/components/common/CenterSection";

const HOTEL_NAMES =
    "Hotel Sangam | Chennai Inn | Rameshwaram Grand | Temple Citi AR Residency | Comorin Grand | Hotel Seaview | Hotel Seaface Ocean Heritage | Triveni Tourist Home | Gopinivas Grand";

const companies = [
    {
        name: "Seashore & Co",
        logo: "/contact-us/seashore.png",
        address: "2/12, East Car Street, Kanyakumari, Tamilnadu, India - 629702",
        description:
            "Description About The Hotel Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience, Distinct From Individual Room Amenities. Key Offerings",
    },
    {
        name: "Gt Holidays",
        logo: "/contact-us/gtholidays.png",
        address:
            "No.1, Gemini Parsn, Kodambakkam High Road, Nungambakkam, Chennai - 600006 Tamil Nadu, India.",
        description:
            "Description About The Hotel Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience, Distinct From Individual Room Amenities. Key Offerings",
    },
    {
        name: "Sri Maniya College",
        logo: "/contact-us/srimaniya.png",
        address:
            "No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu - 629702.",
        description:
            "Description About The Hotel Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience, Distinct From Individual Room Amenities. Key Offerings",
    },
    {
        name: "Follicle",
        logo: "/contact-us/follicle.png",
        address:
            "NO 2/75, Customs Colony, Opp To Jain College, OMR Service Road, Elliamman Nagar, Thoraipakkam - 600097",
        description:
            "Description About The Hotel Hotel Facilities Are Designated Spaces And Services Designed To Enhance The Guest Experience, Distinct From Individual Room Amenities. Key Offerings",
    },
];

export default function GroupCompaniesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = companies[activeIndex];

    return (
        <section className="bg-cream py-16 lg:py-20">
            <CenterSection>
                <div className="grid gap-20 lg:grid-cols-[1fr_3fr]">
                    {/* Left â€” Title + Tab List */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
                            Brands
                        </p>
                        <h2
                            className={` font-semibold leading-tight text-primary mb-10 ${typography.textFoXl}`}
                        >
                            Our Group Of Companies
                        </h2>

                        <div className="divide-y divide-primary/20  ">
                            {companies.map((company, i) => (
                                <button
                                    key={company.name}
                                    onClick={() => setActiveIndex(i)}
                                    className={`w-full text-left py-4 text-base font-medium transition-colors ${i === activeIndex
                                        ? "text-primary"
                                        : "text-primary/50 hover:text-primary"
                                        }`}
                                >
                                    {company.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right â€” Hotel Names Box + Company Detail */}
                    <div className="flex flex-col gap-8">
                        {/* Hotel names bordered box */}
                        <div className=" rounded ">
                            <p className={`leading-relaxed text-primary/80 ${typography.textBase}`}>
                                {HOTEL_NAMES}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <div className="relative h-24 w-full mb-6">
                                    <Image
                                        src={active.logo}
                                        alt={active.name}
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>

                                <h3
                                    className={` font-semibold text-primary ${typography.textXl}`}
                                >
                                    {active.name}
                                </h3>

                                <p className={`mt-1 text-gray ${typography.textBase}`}>
                                    {active.address}
                                </p>
                            </div>

                            <div>
                                <p className={`text-gray leading-relaxed ${typography.textBase}`}>
                                    {active.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CenterSection>
        </section>
    );
}
