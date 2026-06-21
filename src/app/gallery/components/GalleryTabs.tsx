"use client";

import { useState } from "react";
import Section from "@/src/components/common/Section";
import { GalleryCategory } from "@/src/types";

interface GalleryTabsProps {
    galleries: GalleryCategory[];
}

export default function GalleryTabs({
    galleries,
}: GalleryTabsProps) {
    const [active, setActive] = useState<number | null>(
        galleries[0]?.id ?? null
    );

    const scrollToSection = (id: number) => {
        setActive(id);

        const element = document.getElementById(`gallery-${id}`);

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
                    <div className="relative w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
                        <div className="relative flex items-center gap-8 w-max sm:px-0 sm:mx-auto border-b-2 border-white">
                            {galleries.map((gallery) => (
                                <button
                                    key={gallery.id}
                                    onClick={() =>
                                        scrollToSection(gallery.id)
                                    }
                                    className={`relative whitespace-nowrap shrink-0 px-4 pb-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${active === gallery.id
                                            ? "text-white"
                                            : "text-white hover:text-primary"
                                        }`}
                                >
                                    {gallery.category_name}

                                    {active === gallery.id && (
                                        <span className="absolute -bottom-0.5 left-0 z-10 h-0.5 w-full bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}