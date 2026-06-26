"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { ChevronDown, Menu, X } from "lucide-react";

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

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

interface AnnouncementProps {
    announcementData: Announcement[];
}

export default function Header({ announcementData }: AnnouncementProps) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const metaRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null); // <-- Add this
    const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const handleMouseEnter = (label: string) => {
        if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    const runOpen = () => {
        const overlay = overlayRef.current;
        const links = linksRef.current;
        const meta = metaRef.current;
        const image = imageRef.current;

        if (!overlay || !meta) return;

        setAnimating(true);

        overlay.style.visibility = "visible";
        overlay.style.clipPath = "inset(100% 0 0 0)";
        overlay.style.transition = "none";

        if (image) {
            image.style.transition = "none";
            image.style.clipPath = "inset(100% 0 0 0)";
            image.style.transform = "scale(1.1)";
            image.style.opacity = "0";
        }


        requestAnimationFrame(() => {
            if (!overlay) return;
            overlay.style.transition = `clip-path 0.85s ${EASE}`;
            overlay.style.clipPath = "inset(0% 0 0 0)";
        });

        setTimeout(() => {
            if (!image) return;

            image.style.transition =
                `clip-path 1s ${EASE_OUT},
         transform 1.2s ${EASE_OUT},
         opacity .8s ease`;

            image.style.clipPath = "inset(0% 0 0 0)";
            image.style.transform = "scale(1)";
            image.style.opacity = "1";
        }, 250);

        links.forEach((el, i) => {
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "translateY(110%)";
            setTimeout(() => {
                if (!el) return;
                el.style.transition = `transform 0.85s ${EASE_OUT}`;
                el.style.transform = "translateY(0%)";
            }, 300 + i * 80);
        });

        meta.style.transition = "none";
        meta.style.opacity = "0";
        meta.style.transform = "translateY(20px)";
        setTimeout(() => {
            if (!meta) return;
            meta.style.transition = `opacity 0.7s ease, transform 0.7s ${EASE_OUT}`;
            meta.style.opacity = "1";
            meta.style.transform = "translateY(0)";
        }, 600);

        setTimeout(() => setAnimating(false), 900);
    };

    const runClose = () => {
        const overlay = overlayRef.current;
        const links = linksRef.current;
        const meta = metaRef.current;
        const image = imageRef.current;

        if (!overlay || !meta) return;

        setAnimating(true);

        meta.style.transition = "opacity 0.2s ease";
        meta.style.opacity = "0";

        if (image) {
            image.style.transition = `opacity 0.3s ease`;
            image.style.opacity = "0";
        }

        overlay.style.transition = `clip-path 0.75s ${EASE}`;
        overlay.style.clipPath = "inset(0% 0 100% 0)";

        setTimeout(() => {
            if (!overlay) return;
            overlay.style.visibility = "hidden";
            // reset links silently so they're ready for next open
            links.forEach((el) => {
                if (!el) return;
                el.style.transition = "none";
                el.style.transform = "translateY(110%)";
            });
            setAnimating(false);
        }, 800);
    };

    const toggle = () => {
        if (animating) return;
        if (open) {
            setOpen(false);
            runClose();
        } else {
            setOpen(true);
            runOpen();
        }
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-[100]">
                {/* Announcement Bar — hides on scroll, navbar stays */}
                <div className={`overflow-hidden bg-white/50 backdrop-blur-md transition-all duration-500 ease-in-out ${scrolled || open ? "h-0" : "h-10"}`}>
                    <Marquee
                        speed={40}
                        gradient={false}
                        pauseOnHover
                        autoFill
                        className="h-full text-xs font-arizona-flare-regular tracking-[0.6px] font-normal uppercase text-primary"
                    >
                        {announcementData?.map((item) => (
                            <span key={item.id} className="mx-16">
                                {item.description}
                            </span>
                        ))}
                    </Marquee>
                </div>

                {/* Main nav bar — always visible */}
                <div className="bg-transparent backdrop-blur-xl shadow-lg">
                    <Section>
                        <div className="grid h-16 grid-cols-3 items-center">
                            <div />

                            {/* Center — Logo */}
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

                            {/* Right — nav links (desktop, not scrolled) OR hamburger (desktop scrolled + mobile) */}
                            <div className="flex items-center justify-end">
                                {/* Desktop nav links: visible when not scrolled and overlay closed */}
                                <ul className={`hidden lg:flex items-center gap-8 transition-opacity duration-300 ${scrolled || open ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
                                    {NAV_LINKS.map(({ href, label, children }) => (
                                        <li
                                            key={href}
                                            className="relative"
                                            onMouseEnter={() => children ? handleMouseEnter(label) : undefined}
                                            onMouseLeave={children ? handleMouseLeave : undefined}
                                        >
                                            <Link
                                                href={href}
                                                className={`inline-flex items-center gap-1 transition-colors font-semibold text-xs lg:text-sm tracking-[0.6px] ${isActive(href) ? "text-accent" : "text-primary hover:text-accent"}`}
                                            >
                                                {label}
                                                {children && (
                                                    <ChevronDown
                                                        size={14}
                                                        className={`transition-transform duration-200 ${activeDropdown === label ? "rotate-180" : ""}`}
                                                    />
                                                )}
                                            </Link>

                                            {children && (
                                                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                                                    <ul className="bg-white shadow-lg min-w-35 py-2">
                                                        {children.map((child) => (
                                                            <li key={child.href}>
                                                                <Link
                                                                    href={child.href}
                                                                    className={`block px-5 py-2.5 text-xs lg:text-sm tracking-[0.6px] transition-colors ${isActive(child.href) ? "text-accent bg-cream" : "text-primary hover:text-accent hover:bg-cream"}`}
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

                                {/* Hamburger — mobile always, desktop when scrolled or overlay open */}
                                <button
                                    onClick={toggle}
                                    aria-label={open ? "Close menu" : "Open menu"}
                                    aria-expanded={open}
                                    className={`relative z-[110] cursor-pointer p-2 w-10 h-10 bg-transparent border-0
                                        flex ${scrolled || open ? "lg:flex" : "lg:hidden"}
                                    `}
                                >
                                    {open ? (

                                        <X size={20} className="text-primary" />
                                    ) : (
                                        <Menu size={22} className="text-primary" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </Section>
                </div>
            </header>

            {/* Fullscreen overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[90] bg-white overflow-hidden flex flex-col justify-center"
                style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
            >
                <Section>
                    {/* Content area — equal four-side spacing, top offset accounts for header */}
                    <div className="flex flex-1 min-h-0 gap-8 lg:gap-12 px-8 lg:px-14  ">

                        {/* Left — image with text overlay (desktop only) */}
                        <div
                            ref={imageRef}
                            className="hidden lg:flex flex-col w-[38%] shrink-0 relative overflow-hidden"
                        >
                            <Image
                                src="/contact-us/contact.jpg"
                                alt="The Beach Hotel"
                                fill
                                className="object-cover"
                            />
                            {/* gradient so bottom text is readable */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                            {/* Text overlaid at bottom — same style as nav links */}
                            <div className="relative z-10 mt-auto p-8">
                                <p
                                    className="text-white font-extralight leading-[1.1] tracking-[-0.02em]"
                                    style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)" }}
                                >
                                    The Beach<br />Hotel
                                </p>
                                <p className="text-white/40 text-[11px] tracking-[0.22em] uppercase font-light mt-3">
                                    Kanyakumari, India
                                </p>
                            </div>
                        </div>

                        {/* Right — nav links */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                            <nav className="flex-1 flex flex-col justify-center">
                                <ul className="list-none m-0 p-0">
                                    {NAV_LINKS.map((link, i) => (
                                        <li key={link.label} className="border-t border-white/10 pt-3 pb-2">
                                            {/* overflow-hidden is the reveal mask */}
                                            <div className="overflow-hidden">
                                                <a
                                                    ref={(el) => { linksRef.current[i] = el; }}
                                                    href={link.href}
                                                    onClick={() => { setOpen(false); runClose(); }}
                                                    className="block text-primary text-[32px] lg:text-[40px]  font-arizona-sans-regular font-extralight  transition-colors duration-300"
                                                    style={{ transform: "translateY(110%)" }}
                                                >
                                                    {link.label}
                                                </a>
                                            </div>

                                            {link.children && (
                                                <div className="mt-2 flex gap-6 flex-wrap">
                                                    {link.children.map((child) => (
                                                        <a
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={() => { setOpen(false); runClose(); }}
                                                            className="text-[11px] uppercase tracking-[0.2em] text-primary/40 transition-colors duration-200 no-underline"
                                                        >
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    <li className="border-t border-white/[0.07] h-px" />
                                </ul>
                            </nav>

                            {/* Bottom meta */}
                            <div
                                ref={metaRef}
                                className="flex items-end justify-between pt-6 shrink-0"
                                style={{ opacity: 0, transform: "translateY(20px)" }}
                            >
                                <div>
                                    <p className="text-primary text-[11px] tracking-[0.25em] uppercase mb-1 font-light">
                                        Beach Hotel
                                    </p>
                                    <p className="text-primary text-[11px] tracking-[0.25em] uppercase font-light">
                                        Kanyakumari, India
                                    </p>
                                </div>
                                <a
                                    href="/contact-us"
                                    onClick={() => { setOpen(false); runClose(); }}
                                    className="bg-accent px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80"
                                >
                                    Book My Stay
                                </a>
                            </div>
                        </div>
                    </div>
                </Section>

            </div>
        </>
    );
}
