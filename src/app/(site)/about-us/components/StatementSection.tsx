"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Section from '@/src/components/common/Section';
import { Sparkle } from 'lucide-react';

const SERVICES = [
    'Beachfront Accommodation',
    'Fine Dining & Cuisine',
    'Wellness & Recreation',
];

const StatementSection = () => {
    const imgRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    return (
        <section ref={sectionRef} className="relative overflow-hidden pb-16 lg:pb-20">

            <Section>
                {/* Content grid */}
                <div className="grid grid-cols-12 gap-x-[2.2222222222vw] items-start">
                    {/* Left label */}
                    <div className="col-span-12 sm:col-span-3  lg:col-span-2 flex items-center h-full pt-2">
                        <p className="tracking-[0.25em]  text-gray flex items-center gap-2">
                            <span className="text-primary font-semibold"><Sparkle size={10} fill='#012644' /></span>
                            Discover
                        </p>
                    </div>

                    {/* Statement + categories */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col gap-10 sm:gap-12 ">
                        <div
                            className="text-primary font-arizona-flare-regular text-[42px] lg:text-[50px] leading-tight"

                        >
                            We welcome guests who seek the extraordinary — where three oceans meet the horizon.
                        </div>

                        <ul className="flex flex-col gap-3">
                            {SERVICES.map((item) => (
                                <li
                                    key={item}
                                    className="text-gray font-arizona-flare-regular"

                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </Section>

        </section>
    );
};

export default StatementSection;
