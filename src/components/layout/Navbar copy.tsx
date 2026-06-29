"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { X, ChevronDown } from "lucide-react";

import Section from "../common/Section";
import { Announcement } from "@/src/types";
import Image from "next/image";

const NAV_LINKS = [
    {
        href: "/stay",
        label: "Stay",
        children: [
            { href: "/stay/room", label: "Room" },
            { href: "/stay/facility", label: "Facility" },
        ],
    },
    {
        href: "/explore",
        label: "Explore",
        children: [
            { href: "/explore/gallery", label: "Gallery" },
            { href: "/explore/destination", label: "Destination" },
        ],
    },
    {
        href: "/company",
        label: "Company",
        children: [
            { href: "/company/about-us", label: "About Us" },
            { href: "/company/blog", label: "Blog" },
        ],
    },
    { href: "/contact-us", label: "Contact Us" },
];

interface AnnouncementProps {
    announcementData: Announcement[];
}

export default function Header({ announcementData }: AnnouncementProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    const pathname = usePathname();
    const lastScrollY = useRef(0);
    const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const handleMouseEnter = (label: string) => {
        if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    const toggleMobileExpanded = (label: string) => {
        setMobileExpanded((prev) => (prev === label ? null : label));
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
            >
                {/* Announcement Bar */}
                <div className={`overflow-hidden bg-white/50 backdrop-blur-md transition-all duration-500 ease-in-out ${scrolled ? "h-0" : "h-10"}`}>
                    <Marquee
                        speed={40}
                        gradient={false}
                        pauseOnHover
                        autoFill
                        className="h-full text-xs font-arizona-flare-regular tracking-[0.6px] font-normal uppercase text-primary-dark"
                    >
                        {announcementData?.map((item) => (
                            <span key={item.id} className="mx-16">
                                {item.description}
                            </span>
                        ))}
                    </Marquee>
                </div>

                <div className="transition-all duration-700 ease-out relative bg-transparent backdrop-blur-xl shadow-lg">
                    <Section>
                        <div className="grid h-16 relative grid-cols-3 items-center">
                            {/* Left Side */}
                            <div />

                            {/* Center - Logo */}
                            <div className="flex justify-center">
                                <Link href="/" className="inline-flex items-center">
                                    <Image
                                        width={300}
                                        height={150}
                                        alt="Navbar logo"
                                        src="/toplogo.svg"
                                        className="h-10 w-auto"
                                    />
                                </Link>
                            </div>

                            {/* Right Side - Desktop Nav */}
                            <div className="flex items-center justify-end">
                                <ul className="hidden lg:flex items-center gap-8">
                                    {NAV_LINKS.map(({ href, label, children }) => (
                                        <li
                                            key={href}
                                            className="relative"
                                            onMouseEnter={() => children ? handleMouseEnter(label) : undefined}
                                            onMouseLeave={children ? handleMouseLeave : undefined}
                                        >
                                            <Link
                                                href={href}
                                                className={`inline-flex items-center gap-1 transition-colors font-semibold  text-xs lg:text-sm tracking-[0.6px] ${isActive(href) ? "text-accent" : "text-primary-dark hover:text-accent"}`}
                                            >
                                                {label}
                                                {children && (
                                                    <ChevronDown
                                                        size={14}
                                                        className={`transition-transform duration-200 ${activeDropdown === label ? "rotate-180" : ""}`}
                                                    />
                                                )}
                                            </Link>

                                            {/* Dropdown */}
                                            {children && (
                                                <div
                                                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}
                                                >
                                                    <ul className="bg-white shadow-lg min-w-35 py-2">
                                                        {children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link
                                                                    href={child.href}
                                                                    className={`block px-5 py-2.5 text-xs lg:text-sm tracking-[0.6px] transition-colors ${isActive(child.href) ? "text-accent bg-cream" : "text-primary-dark hover:text-accent hover:bg-cream"}`}
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMenuOpen(true)}
                                    className="cursor-pointer text-xs lg:text-sm tracking-[0.6px] font-semibold text-primary-dark hover:text-accent lg:hidden underline underline-offset-2"
                                    aria-label="Open Menu"
                                >
                                    Menu
                                </button>
                            </div>
                        </div>
                    </Section>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-999 bg-primary transition-all duration-300 lg:hidden ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-6 right-6 cursor-pointer text-white"
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>

                <ul className="flex h-full flex-col items-center justify-center gap-6">
                    {NAV_LINKS.map(({ href, label, children }) => (
                        <li key={href} className="w-full max-w-xs text-center">
                            {children ? (
                                <>
                                    <button
                                        onClick={() => toggleMobileExpanded(label)}
                                        className={`inline-flex items-center gap-2 text-xs lg:text-sm tracking-[0.6px] transition-colors ${isActive(href) ? "text-accent" : "text-white"}`}
                                    >
                                        {label}
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-200 ${mobileExpanded === label ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <ul
                                        className={`overflow-hidden transition-all duration-300 ${mobileExpanded === label ? "max-h-40 mt-3" : "max-h-0"}`}
                                    >
                                        {children.map((child) => (
                                            <li key={child.href} className="py-1">
                                                <Link
                                                    href={child.href}
                                                    onClick={() => setMenuOpen(false)}
                                                    className={`text-xs lg:text-sm tracking-[0.6px] transition-colors ${isActive(child.href) ? "text-accent" : "text-white/70 hover:text-white"}`}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <Link
                                    href={href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`text-xs lg:text-sm tracking-[0.6px] transition-colors ${isActive(href) ? "text-accent" : "text-white"}`}
                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    ))}

                    <button className="mt-4 bg-accent px-6 py-3 font-semibold text-primary-dark">
                        BOOK MY STAY
                    </button>
                </ul>
            </div>
        </>
    );
}
