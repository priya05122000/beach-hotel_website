"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

import Section from "../common/Section";
import { Announcement } from "@/src/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const NAV_LINKS = [
    {
        href: "/stay",
        label: "Stay",
        children: [
            { href: "/rooms", label: "Room" },
            { href: "/facilities", label: "Facility" },
        ],
    },
    {
        href: "/explore",
        label: "Explore",
        children: [
            { href: "/explore/gallery", label: "Gallery" },
            { href: "/destinations", label: "Destination" },
        ],
    },
    {
        href: "/company",
        label: "Company",
        children: [
            { href: "/company/about-us", label: "About Us" },
            { href: "/blog", label: "Blog" },
        ],
    },
    { href: "/contact-us", label: "Contact Us" },
];

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnnouncementProps {
    announcementData: Announcement[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Header({ announcementData }: AnnouncementProps) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const pathname = usePathname();

    // Refs for animated elements in the overlay
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const childLinksRef = useRef<(HTMLSpanElement | null)[]>([]);
    const metaRef = useRef<HTMLDivElement>(null);
    const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Effects ──────────────────────────────────────────────────────────────

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    // ── Helpers ──────────────────────────────────────────────────────────────

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    const handleMouseEnter = (label: string) => {
        if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    const handleLinkClick = () => {
        setOpen(false);
        runClose();
    };

    // Silently snap all animated elements back to their start state
    const resetAll = () => {
        linksRef.current.forEach((el) => {
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "translateY(110%)";
        });
        childLinksRef.current.forEach((el) => {
            if (!el) return;
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.transform = "translateY(10px)";
        });
        const meta = metaRef.current;
        if (meta) {
            meta.style.transition = "none";
            meta.style.opacity = "0";
            meta.style.transform = "translateY(20px)";
        }
    };

    // ── Animation: open ──────────────────────────────────────────────────────

    const runOpen = () => {
        const overlay = overlayRef.current;
        const image = imageRef.current;
        const meta = metaRef.current;
        if (!overlay || !meta) return;

        setAnimating(true);
        resetAll();

        // Overlay clips in immediately
        overlay.style.visibility = "visible";
        overlay.style.clipPath = "inset(100% 0 0 0)";
        overlay.style.transition = "none";

        if (image) {
            image.style.transition = "none";
            image.style.clipPath = "inset(100% 0 0 0)";
            image.style.transform = "scale(1.08)";
            image.style.opacity = "0";
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.transition = `clip-path 0.85s ${EASE}`;
                overlay.style.clipPath = "inset(0% 0 0 0)";
            });
        });

        // ── Everything below shifted by +600ms ──────────────────────

        // Image reveal — was 200ms, now 800ms
        setTimeout(() => {
            if (!image) return;
            image.style.transition = `clip-path 1s ${EASE_OUT}, transform 1.2s ${EASE_OUT}, opacity 0.8s ease`;
            image.style.clipPath = "inset(0% 0 0 0)";
            image.style.transform = "scale(1)";
            image.style.opacity = "1";
        }, 800);

        // Parent links — was 280 + i*75, now 880 + i*75
        linksRef.current.forEach((el, i) => {
            if (!el) return;
            setTimeout(() => {
                if (!el) return;
                el.style.transition = `transform 0.75s ${EASE_OUT}`;
                el.style.transform = "translateY(0%)";
            }, 880 + i * 75);
        });

        // Child links — was 280 + i*75 + 120, now 880 + i*75 + 120
        let childIdx = 0;
        NAV_LINKS.forEach((link, i) => {
            if (!link.children) return;
            const parentDelay = 880 + i * 75 + 120;
            link.children.forEach((_, j) => {
                const el = childLinksRef.current[childIdx++];
                if (!el) return;
                setTimeout(() => {
                    if (!el) return;
                    el.style.transition = `opacity 0.5s ease, transform 0.5s ${EASE_OUT}`;
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, parentDelay + j * 50);
            });
        });

        // Meta — was 580ms, now 1180ms
        setTimeout(() => {
            if (!meta) return;
            meta.style.transition = `opacity 0.6s ease, transform 0.6s ${EASE_OUT}`;
            meta.style.opacity = "1";
            meta.style.transform = "translateY(0)";
        }, 1180);

        setTimeout(() => setAnimating(false), 1500);
    };

    // ── Animation: close ─────────────────────────────────────────────────────

    const runClose = () => {
        const overlay = overlayRef.current;
        const image = imageRef.current;
        const meta = metaRef.current;
        if (!overlay || !meta) return;

        setAnimating(true);

        // Meta out
        meta.style.transition = "opacity 0.2s ease, transform 0.2s ease";
        meta.style.opacity = "0";
        meta.style.transform = "translateY(10px)";

        // Child links fade out (staggered)
        childLinksRef.current.forEach((el, i) => {
            if (!el) return;
            setTimeout(() => {
                if (!el) return;
                el.style.transition = "opacity 0.2s ease";
                el.style.opacity = "0";
            }, i * 20);
        });

        // Parent links slide down (visible exit, staggered)
        linksRef.current.forEach((el, i) => {
            if (!el) return;
            setTimeout(() => {
                if (!el) return;
                el.style.transition = `transform 0.55s ${EASE}`;
                el.style.transform = "translateY(110%)";
            }, 50 + i * 40);
        });

        // Image clips out to bottom
        if (image) {
            image.style.transition = `clip-path 0.55s ${EASE}, opacity 0.35s ease`;
            image.style.clipPath = "inset(0% 0 100% 0)";
            image.style.opacity = "0";
        }

        // Overlay closes slightly after
        setTimeout(() => {
            overlay.style.transition = `clip-path 0.65s ${EASE}`;
            overlay.style.clipPath = "inset(0% 0 100% 0)";
        }, 120);

        setTimeout(() => {
            overlay.style.visibility = "hidden";
            resetAll();
            setAnimating(false);
        }, 800);
    };

    // ── Toggle ────────────────────────────────────────────────────────────────

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

    // ── Render ────────────────────────────────────────────────────────────────

    // Counter used during render to assign consecutive child ref indices
    let childIdx = 0;

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-[100]">

                {/* Announcement bar — collapses on scroll */}
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

                {/* Main nav bar */}
                <div className={`transition-colors duration-500 bg-transparent"}`}>
                    <Section>

                        <div className="relative h-16 flex items-center">

                            {/* Logo */}
                            {/* Logo */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: scrolled ? "0%" : "50%",
                                    transform: scrolled ? "translateX(0)" : "translateX(-50%)",
                                    transition: "left 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                                }}
                            >
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

                            {/* Right — desktop nav links + hamburger */}
                            <div className="ml-auto flex items-center">

                                {/* Desktop nav links: visible when not scrolled and overlay closed */}
                                <ul className={`hidden lg:flex items-center gap-8 transition-opacity duration-200 ${scrolled || open ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                                    }`}>
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

                                {/*
                                    Hamburger / Close button.
                                    Both states live in the DOM stacked vertically;
                                    overflow-hidden clips whichever is off-screen.
                                    On toggle they slide past each other (slot-machine).
                                    Icon rotates 90° on hover.
                                */}
                                {/* Button — ensure overflow-hidden works with explicit height */}
                                <button
                                    onClick={toggle}
                                    aria-label={open ? "Close menu" : "Open menu"}
                                    aria-expanded={open}
                                    className={`group relative z-[110] cursor-pointer bg-transparent border-0 h-10 overflow-hidden flex items-center transition-all duration-200 ${scrolled || open
                                        ? "w-20 pointer-events-auto"
                                        : "w-0 pointer-events-none"
                                        }`}
                                    style={{
                                        opacity: open ? 1 : scrolled ? 1 : 0,
                                        transitionDelay: open ? "900ms" : scrolled ? "150ms" : "0ms",
                                    }}
                                >
                                    {/* Menu span */}
                                    <span
                                        className="absolute inset-0 flex items-center gap-2"
                                        style={{
                                            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                                            transform: open ? "translateY(-100%)" : "translateY(0)",
                                        }}
                                    >
                                        <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                                            <Menu size={16} className="text-primary" />
                                        </span>
                                        <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-primary">
                                            Menu
                                        </span>
                                    </span>

                                    {/* Close span */}
                                    <span
                                        className="absolute inset-0 flex items-center gap-2"
                                        style={{
                                            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                                            transform: open ? "translateY(0)" : "translateY(100%)",
                                        }}
                                    >
                                        <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                                            <X size={16} className="text-primary" />
                                        </span>
                                        <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-primary">
                                            Close
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Section>
                </div>
            </header>

            {/* ── Fullscreen overlay ─────────────────────────────────────────── */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[90] bg-white overflow-hidden flex flex-col justify-center"
                style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
            >
                <Section>
                    <div className="flex flex-1 min-h-0 gap-8 lg:gap-12 ">

                        {/* Left — image panel (desktop only) */}
                        <div
                            ref={imageRef}
                            className="hidden lg:flex flex-col w-[38%] shrink-0 relative overflow-hidden"
                            style={{ clipPath: "inset(100% 0 0 0)", transform: "scale(1.08)", opacity: 0 }}
                        >
                            <Image
                                src="/contact-us/contact.jpg"
                                alt="The Beach Hotel"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
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

                        {/* Right — nav links + meta */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                            <nav className="flex-1 flex flex-col justify-center">
                                <ul className="list-none m-0 p-0">
                                    {NAV_LINKS.map((link, i) => (
                                        <li key={link.label} className="border-t border-primary/10 pt-3 pb-2">

                                            {/* Parent link — overflow-hidden acts as the reveal mask */}
                                            <div className="overflow-hidden">
                                                <a
                                                    ref={(el) => { linksRef.current[i] = el; }}
                                                    href={link.href}
                                                    onClick={handleLinkClick}
                                                    className="block text-primary text-[32px] lg:text-[40px] font-arizona-sans-regular font-extralight transition-colors duration-300"
                                                    style={{ transform: "translateY(110%)" }}
                                                >
                                                    {link.label}
                                                </a>
                                            </div>

                                            {/* Child links — each wrapped in an animated span */}
                                            {link.children && (
                                                <div className="mt-2 flex gap-6 flex-wrap">
                                                    {link.children.map((child) => {
                                                        const refIdx = childIdx++;
                                                        return (
                                                            <span
                                                                key={child.href}
                                                                ref={(el) => { childLinksRef.current[refIdx] = el; }}
                                                                style={{ opacity: 0, transform: "translateY(10px)", display: "inline-block" }}
                                                            >
                                                                <a
                                                                    href={child.href}
                                                                    onClick={handleLinkClick}
                                                                    className="text-[11px] uppercase tracking-[0.2em] text-primary/40 transition-colors duration-200 no-underline hover:text-primary/70"
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    <li className="border-t border-primary/10 h-px" />
                                </ul>
                            </nav>

                            {/* Bottom meta */}
                            <div
                                ref={metaRef}
                                className="flex items-end justify-between pt-6 shrink-0"
                                style={{ opacity: 0, transform: "translateY(20px)" }}
                            >
                                <div className="flex flex-col gap-1">

                                    <a href="tel:+915467898765"
                                        className="text-primary/50 text-[11px] tracking-[0.2em] uppercase font-light no-underline hover:text-primary transition-colors duration-200"
                                    >
                                        +91 54678 98765
                                    </a>

                                    <p className="text-primary/50 text-[11px] tracking-[0.2em] uppercase font-light">
                                        Beach Rd, Kanniyakumari, TN 629702
                                    </p>
                                </div>
                                <a
                                    href="/contact-us"
                                    onClick={handleLinkClick}
                                    className=" px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-primary hover:underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
                                >
                                    Book My Stay
                                </a>
                            </div>
                        </div>

                    </div >
                </Section >
            </div >
        </>
    );
}


