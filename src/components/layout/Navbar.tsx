"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { Menu, X } from "lucide-react";

import Section from "../common/Section";
import { Announcement } from "@/src/types";
import Image from "next/image";



const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/facilities", label: "Hotel Facilities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/destinations", label: "Nearby Destination" },
    { href: "/contact-us", label: "Contact Us" },
];


interface AnnouncementProps {
    announcementData: Announcement[];
}


export default function Header({ announcementData }: AnnouncementProps) {

    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <header className="fixed top-0 left-0 z-50 w-full overflow-x-hidden">
            {/* Announcement Bar */}
            <div className="h-10 bg-white">
                <Marquee
                    speed={40}
                    gradient={false}
                    pauseOnHover
                    autoFill
                    className="h-full text-base font-normal uppercase text-primary"
                >
                    {announcementData?.map((item) => (
                        <span
                            key={item.id}
                            className="mx-16"
                        >
                            {item.description}
                        </span>
                    ))}
                </Marquee>
            </div>

            <Section className="relative ">
                <div className="mt-5">
                    <div className="mx-auto flex items-center justify-between h-16 xl:h-20 overflow-hidden">
                        <div className="relative h-full">
                            <div className="absolute  bg-primary h-12 xl:h-14 bottom-0 left-0 right-0"></div>

                            <Image
                                src="/navbar_logo.png"
                                alt="Logo"
                                width={300}
                                height={150}
                                priority
                                className="relative z-10 w-auto h-full object-contain"
                            />
                        </div>


                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex items-center px-3 py-2 bg-primary/60 backdrop-blur-md shadow-[0px_4px_4px_0px_#00000040] rounded-md">
                                <ul className="hidden items-center xl:flex">
                                    {NAV_LINKS.map(({ href, label }) => (
                                        <li key={href}>
                                            <Link
                                                href={href}
                                                className={`px-4 py-2 text-sm transition-colors ${isActive(href)
                                                    ? "rounded text-accent"
                                                    : "text-white hover:text-accent"
                                                    }`}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => setMenuOpen(true)}
                                    className="text-white xl:hidden"
                                    aria-label="Open menu"
                                >
                                    <Menu size={28} />
                                </button>
                            </div>

                            <button className="hidden h-10 w-36 shrink-0 whitespace-nowrap rounded-md bg-accent px-6 text-sm font-normal text-primary shadow-[0px_4px_4px_0px_#00000040] md:block">
                                BOOK MY STAY
                            </button>
                        </div>

                    </div>
                </div>

                <div
                    className={`fixed inset-0 z-999 bg-primary transition-all duration-300 xl:hidden ${menuOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                        }`}
                >
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-6 right-6 text-white"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <ul className="flex h-full flex-col items-center justify-center gap-8">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`text-xl ${isActive(href)
                                        ? "text-accent"
                                        : "text-white"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        <button className="mt-4 rounded-md bg-accent px-6 py-3 font-semibold text-primary">
                            BOOK MY STAY
                        </button>
                    </ul>
                </div>
            </Section>
        </header>
    );
}