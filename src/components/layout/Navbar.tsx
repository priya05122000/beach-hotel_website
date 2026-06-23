"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { X } from "lucide-react";

import Section from "../common/Section";
import { Announcement } from "@/src/types";
import Image from "next/image";

const NAV_LINKS = [

    { href: "/stay", label: "Stay" },
    { href: "/explore", label: "Explore" },
    { href: "/company", label: "Company" },
    { href: "/contact-us", label: "ContactUs" },
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
                <div className={`overflow-hidden bg-white/50 backdrop-blur-md transition-all duration-500 ease-in-out ${scrolled ? "h-0" : "h-10"}`}>
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
                    className={`transition-all duration-700 ease-out relative ${scrolled
                        ? "bg-transparent backdrop-blur-xl  shadow-lg"
                        : "bg-transparent backdrop-blur-xl shadow-lg"
                        }`}
                >

                    <Section>
                        <div>
                            <div className="grid h-16 relative grid-cols-3 items-center">
                                {/* Left Side - intentionally empty */}
                                <div />

                                {/* Center - Logo */}
                                <div className="flex justify-center ">
                                    <Link href="/" className="inline-flex items-center ">
                                        <Image
                                            width={300}
                                            height={150}
                                            alt="Navbar logo"
                                            src="/toplogo.svg"
                                            className="h-10 w-auto"
                                        />
                                    </Link>
                                </div>

                                {/* Right Side - Navigation */}
                                <div className="flex items-center justify-end">
                                    {/* Desktop Navigation */}
                                    <ul className="hidden lg:flex items-center gap-8">
                                        {NAV_LINKS.map(({ href, label }) => (
                                            <li key={href}>
                                                <Link
                                                    href={href}
                                                    className={`transition-colors font-semibold text-sm ${isActive(href)
                                                        ? "text-accent"
                                                        : "text-primary hover:text-accent"
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
                                        className="cursor-pointer text-sm font-semibold text-primary hover:text-accent lg:hidden  underline underline-offset-2"
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
                className={`fixed inset-0 z-999 bg-primary transition-all duration-300 lg:hidden ${menuOpen
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

                    <button className="mt-4  bg-accent px-6 py-3 font-semibold text-primary">
                        BOOK MY STAY
                    </button>
                </ul>
            </div>
        </>
    );
}