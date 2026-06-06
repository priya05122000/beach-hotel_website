"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Section from "../common/Section";
import Image from "next/image";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/facilities", label: "Hotel Facilities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/destinations", label: "Nearby Destination" },
    { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 z-50 w-full">
            {/* Announcement Bar */}
            <div className="h-10  bg-white">
                <Marquee
                    speed={40}
                    gradient={false}
                    pauseOnHover
                    autoFill
                    className="h-full text-base font-semibold uppercase text-primary"
                >
                    <span className="mx-16">
                        10% OFF EVERYTHING - LIMITED TIME!
                    </span>

                    <span className="mx-16">
                        EXCLUSIVE 10% OFF VOUCHER INSIDE, BOOK NOW & SAVE 10% ON YOUR FIRST
                        ORDER.
                    </span>
                </Marquee>
            </div>

            <Section className="relative">
                {/* Floating Navbar */}
                <div className="mt-5 ">
                    <div className="mx-auto flex  items-center justify-between">
                        {/* Logo */}
                        <div className="mr-3 p-3   bg-primary/60 rounded-md h-12 flex items-center justify-center shadow-lg backdrop-blur-md">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={42}
                                height={42}
                                priority
                                className="h-9 object-contain"
                            />
                        </div>

                        <div className=" flex  h-12">
                            {/* Navigation Container */}
                            <div className="flex  items-center rounded-md bg-primary/60 px-3 shadow-lg backdrop-blur-md">
                                {/* Desktop Menu */}
                                <ul className="hidden items-center lg:flex">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={`px-4 py-2 text-sm transition-colors ${pathname === link.href
                                                    ? "rounded text-accent"
                                                    : "text-white hover:text-accent"
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMenuOpen(true)}
                                    className="text-white lg:hidden"
                                >
                                    <Menu size={28} />
                                </button>
                            </div>

                            {/* CTA Button */}
                            <button className="ml-3 hidden h-12 rounded-md bg-accent px-6 text-sm font-semibold text-white shadow-lg md:block">
                                BOOK MY STAY
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-999 bg-[#1E1E8A] transition-all duration-300 lg:hidden ${menuOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                        }`}
                >
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute right-6 top-6 text-white"
                    >
                        <X size={32} />
                    </button>

                    <ul className="flex h-full flex-col items-center justify-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`text-xl ${pathname === link.href
                                        ? "text-orange-400"
                                        : "text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        <button className="mt-4 rounded-md bg-[#FF8A00] px-6 py-3 font-semibold text-white">
                            BOOK MY STAY
                        </button>
                    </ul>
                </div>
            </Section>
        </header>
    );
}