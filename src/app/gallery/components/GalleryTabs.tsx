"use client";

import { useState } from "react";
import Section from "@/src/components/common/Section";

type TabKey = "hotel" | "spa";

type Tab = { label: string; id: string; key: TabKey } | { label: string };

export default function GalleryTabs() {
    const [active, setActive] = useState<TabKey>("hotel");

    const scrollToSection = (id: string, tab: TabKey) => {
        setActive(tab);
        const element = document.getElementById(id);
        if (!element) return;
        const offset = 120;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
    };

    const tabs: Tab[] = [
        { label: "Hotels", id: "hotel-section", key: "hotel" },
        { label: "Spa", id: "spa-section", key: "spa" },
        { label: "Rooms" },
        { label: "Dining" },
        { label: "Fitness" },
        { label: "Pool" },
        { label: "Meeting" },
    ];

    function TabButton({
        label,
        id,
        keyName,
    }: {
        label: string;
        id?: string;
        keyName?: TabKey;
    }) {
        const isActive = keyName !== undefined && keyName === active;

        const handleClick = () => {
            if (id && keyName) scrollToSection(id, keyName);
        };

        return (
            <button
                onClick={handleClick}
                className={`relative whitespace-nowrap shrink-0 px-4  pb-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${isActive ? "text-white" : "text-white hover:text-accent"
                    }`}
            >
                {label}
                {isActive && (
                    <span className="absolute -bottom-0.5 left-0 z-10 h-0.5 w-full bg-accent" />
                )}
            </button>
        );
    }

    return (
        <div className="bg-primary/43 pt-10">
            <Section>
                <div className="flex justify-center">
                    <div className="relative w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
                        <div className="relative flex items-center gap-8 w-max sm:px-0 sm:mx-auto border-b-2 border-white">
                            {tabs.map((t, i) =>
                                "id" in t && "key" in t ? (
                                    <TabButton
                                        key={t.label}
                                        label={t.label}
                                        id={t.id}
                                        keyName={t.key}
                                    />
                                ) : (
                                    <button
                                        key={t.label}
                                        className="whitespace-nowrap flex-shrink-0 px-4 pb-3 text-xs font-medium uppercase tracking-wider text-white transition hover:text-accent"
                                    >
                                        {t.label}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}