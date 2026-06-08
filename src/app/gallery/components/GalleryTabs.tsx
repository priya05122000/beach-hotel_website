"use client";

import { useState } from "react";
import Section from "@/src/components/common/Section";

export default function GalleryTabs() {
    const [active, setActive] = useState("hotel");

    const scrollToSection = (
        id: string,
        tab: "hotel" | "spa"
    ) => {
        setActive(tab);

        const element = document.getElementById(id);

        if (!element) return;

        const offset = 120;

        const top =
            element.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-primary/43 pt-10">
            <Section>
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        {/* Bottom Border */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white" />

                        <div className="flex items-center gap-10">
                            {/* Hotels */}
                            <button
                                onClick={() =>
                                    scrollToSection(
                                        "hotel-section",
                                        "hotel"
                                    )
                                }
                                className={`relative px-4 pb-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${active === "hotel"
                                        ? "text-primary"
                                        : "text-white hover:text-accent"
                                    }`}
                            >
                                Hotels

                                {active === "hotel" && (
                                    <span className="absolute bottom-0 left-0 z-10 h-0.5 w-full bg-accent" />
                                )}
                            </button>

                            {/* Spa */}
                            <button
                                onClick={() =>
                                    scrollToSection(
                                        "spa-section",
                                        "spa"
                                    )
                                }
                                className={`relative px-4 pb-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${active === "spa"
                                        ? "text-primary"
                                        : "text-white hover:text-accent"
                                    }`}
                            >
                                Spa

                                {active === "spa" && (
                                    <span className="absolute bottom-0 left-0 z-10 h-0.5 w-full bg-accent" />
                                )}
                            </button>

                            {/* Other Tabs */}
                            <button className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent">
                                Rooms
                            </button>

                            <button className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent">
                                Dining
                            </button>

                            <button className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent">
                                Fitness
                            </button>

                            <button className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent">
                                Pool
                            </button>

                            <button className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent">
                                Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}