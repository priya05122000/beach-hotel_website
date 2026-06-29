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
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-6 sm:gap-x-[2.2222222222vw] items-start">
                    <div className="sm:col-span-3 lg:col-span-2 flex items-center pt-2">
                        <p className="type-h6 tracking-[73%] text-left lg:tracking-[83%] uppercase">Discover</p>
                    </div>

                    <div className="hidden sm:block sm:col-span-1" />

                    <div className="sm:col-span-8 flex flex-col gap-8 sm:gap-12">
                        <div className="type-display-sm text-primary-dark font-arizona-flare-regular leading-tight">
                            We welcome guests who seek the extraordinary — where three oceans meet the horizon.
                        </div>

                        <ul className="flex flex-col gap-3">
                            {SERVICES.map((item) => (
                                <li key={item} className="type-body text-gray font-arizona-flare-regular">
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
