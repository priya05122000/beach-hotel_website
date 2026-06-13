"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { Menu, X } from "lucide-react";

import Section from "../common/Section";
import { typography } from "@/src/lib/typography";
import { Announcement } from "@/src/types";



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
        <header className="fixed top-0 left-0 z-50 w-full">
            {/* Announcement Bar */}
            <div className="h-10 bg-white">
                <Marquee
                    speed={40}
                    gradient={false}
                    pauseOnHover
                    autoFill
                    className="h-full text-base font-normal font-arizona uppercase text-primary"
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

            <Section className="relative">
                {/* Navbar */}
                <div className="mt-5 ">
                    <div className="mx-auto flex items-center justify-between">


                        {/* Navigation + CTA */}
                        <div className="flex h-12 w-full justify-between rounded-md backdrop-blur-md overflow-hidden bg-primary/60 shadow-lg">

                            {/* Logo */}
                            <div className="mr-3 flex h-12 items-center justify-center p-3  ">
                                {/* <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={42}
                                    height={42}
                                    priority
                                    className="h-9 object-contain"
                                /> */}
                                <p className={`text-white font-arizona uppercase font-medium tracking-wider ${typography.textTwoXl}`}>The Beach Hotel</p>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center px-3 ">
                                {/* Desktop Menu */}
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

                                {/* Mobile Menu Trigger */}
                                <button
                                    onClick={() => setMenuOpen(true)}
                                    className="text-white xl:hidden"
                                    aria-label="Open menu"
                                >
                                    <Menu size={28} />
                                </button>
                            </div>


                        </div>

                        {/* CTA */}
                        {/* <button className="ml-3 hidden h-12 w-auto rounded-md bg-accent px-6 text-sm font-normal text-white shadow-lg md:block">
                            BOOK MY STAY
                        </button> */}

                        <button className="ml-3 hidden h-12 w-36 shrink-0 whitespace-nowrap rounded-md bg-accent px-6 text-sm font-normal text-white shadow-lg md:block">
                            BOOK MY STAY
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-999 bg-primary transition-all duration-300 xl:hidden ${menuOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-6 right-6 text-white"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    {/* Mobile Navigation */}
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

                        <button className="mt-4 rounded-md bg-accent px-6 py-3 font-semibold text-white">
                            BOOK MY STAY
                        </button>
                    </ul>
                </div>
            </Section>
        </header>
    );
}