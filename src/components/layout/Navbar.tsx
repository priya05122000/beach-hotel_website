"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { X } from "lucide-react";

import Section from "../common/Section";
import { Announcement } from "@/src/types";

const NAV_LINKS = [

    { href: "/stay", label: "Stay" },
    { href: "/explore", label: "Explore" },
    { href: "/company", label: "Company" },
    { href: "/contact-us", label: "Contact Us" },
];
// const NAV_LINKS = [
//     { href: "/", label: "Home" },
//     { href: "/about-us", label: "About Us" },
//     { href: "/facilities", label: "Hotel Facilities" },
//     { href: "/gallery", label: "Gallery" },
//     { href: "/destinations", label: "Nearby Destination" },
//     { href: "/contact-us", label: "Contact Us" },
// ];

interface AnnouncementProps {
    announcementData: Announcement[];
}

export default function Header({
    announcementData,
}: AnnouncementProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;

            setScrolled(currentY > 50);

            if (menuOpen) {
                setShowHeader(true);
                return;
            }

            if (currentY > lastScrollY.current && currentY > 80) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const isActive = (href: string) =>
        pathname === href;

    return (

        
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"
                    }
                    `}
            >
                {/* Announcement Bar */}
                <div className="h-10 overflow-hidden bg-white/50 backdrop-blur-md">
                    <Marquee
                        speed={40}
                        gradient={false}
                        pauseOnHover
                        autoFill
                        className="h-full text-xs font-normal uppercase text-primary"
                    >
                        {announcementData?.map((item) => (
                            <span key={item.id} className="mx-16">
                                {item.description}
                            </span>
                        ))}
                    </Marquee>
                </div>
                <div
                    className={`transition-all duration-700 ease-out ${scrolled
                        ? "bg-primary/14  backdrop-blur-xl  shadow-lg"
                        : "bg-transparent backdrop-blur-0 shadow-none"
                        }`}
                >

                    <Section>
                        <div className="">
                            <div className="grid h-16 grid-cols-2 items-center xl:h-20">
                                {/* Left Side */}
                                <div>
                                    {/* Logo Here */}
                                </div>

                                {/* Right Side */}
                                <div className="flex items-center justify-end">
                                    {/* Desktop Navigation */}
                                    <ul className="hidden xl:flex items-center gap-8">
                                        {NAV_LINKS.map(({ href, label }) => (
                                            <li key={href}>
                                                <Link
                                                    href={href}
                                                    className={`transition-colors ${isActive(href)
                                                        ? "text-accent"
                                                        : "text-white hover:text-accent"
                                                        }`}
                                                >
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Mobile Menu Button */}
                                    <button
                                        onClick={() => setMenuOpen(true)}
                                        className="cursor-pointer text-white xl:hidden"
                                        aria-label="Open Menu"
                                    >
                                        Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-999 bg-primary transition-all duration-300 xl:hidden ${menuOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-6 right-6 cursor-pointer text-white"
                    aria-label="Close Menu"
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
        </>
    );
}