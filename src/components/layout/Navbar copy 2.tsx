"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter / X", href: "https://twitter.com" },
];

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [animating, setAnimating] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const metaRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const runOpen = () => {
        const overlay = overlayRef.current;
        const links = linksRef.current;
        const meta = metaRef.current;
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        if (!overlay || !meta) return;

        setAnimating(true);

        overlay.style.visibility = "visible";
        overlay.style.clipPath = "inset(100% 0 0 0)";
        overlay.style.transition = "none";

        if (l1 && l2) {
            l1.style.transition = `transform 0.6s ${EASE} 0.05s, top 0.4s ${EASE}`;
            l2.style.transition = `transform 0.6s ${EASE} 0.05s, top 0.4s ${EASE}`;
            l1.style.top = "50%";
            l2.style.top = "50%";
            setTimeout(() => {
                if (!l1 || !l2) return;
                l1.style.transform = "translateY(-50%) rotate(45deg)";
                l2.style.transform = "translateY(-50%) rotate(-45deg)";
            }, 80);
        }

        requestAnimationFrame(() => {
            if (!overlay) return;
            overlay.style.transition = `clip-path 0.85s ${EASE}`;
            overlay.style.clipPath = "inset(0% 0 0 0)";
        });

        links.forEach((el, i) => {
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "translateY(70px)";
            el.style.opacity = "0";
            setTimeout(() => {
                if (!el) return;
                el.style.transition = `transform 0.9s ${EASE_OUT}, opacity 0.7s ease`;
                el.style.transform = "translateY(0)";
                el.style.opacity = "1";
            }, 280 + i * 90);
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
        const l1 = line1Ref.current;
        const l2 = line2Ref.current;
        if (!overlay || !meta) return;

        setAnimating(true);

        if (l1 && l2) {
            l1.style.transition = `transform 0.5s ${EASE}, top 0.45s ${EASE} 0.15s`;
            l2.style.transition = `transform 0.5s ${EASE}, top 0.45s ${EASE} 0.15s`;
            l1.style.transform = "translateY(-50%) rotate(0deg)";
            l2.style.transform = "translateY(-50%) rotate(0deg)";
            setTimeout(() => {
                if (!l1 || !l2) return;
                l1.style.top = "30%";
                l2.style.top = "70%";
            }, 150);
        }

        links.forEach((el, i) => {
            if (!el) return;
            el.style.transition = `transform 0.4s ${EASE}, opacity 0.3s ease ${i * 40}ms`;
            el.style.transform = "translateY(-30px)";
            el.style.opacity = "0";
        });

        meta.style.transition = "opacity 0.3s ease";
        meta.style.opacity = "0";

        setTimeout(() => {
            if (!overlay) return;
            overlay.style.transition = `clip-path 0.75s ${EASE}`;
            overlay.style.clipPath = "inset(0% 0 100% 0)";
        }, 200);

        setTimeout(() => {
            if (!overlay) return;
            overlay.style.visibility = "hidden";
            setAnimating(false);
        }, 1000);
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
            {/* Fixed bar */}
            <header
                className={`fixed top-0 left-0 right-0 z-[100] py-7 px-12 flex items-center justify-between ease-in-out duration-500 ${scrolled && !open
                        ? "bg-[rgba(13,14,19,0.7)] backdrop-blur-md"
                        : "bg-transparent"
                    }`}
                style={{ transition: "background 0.5s ease, backdrop-filter 0.5s ease" }}
            >
                {/* Logo */}
                <a
                    href="/"
                    className="relative z-[110] text-white text-[13px] tracking-[0.2em] uppercase font-light no-underline mix-blend-difference"
                >
                    Exo Ape
                </a>

                {/* Hamburger */}
                <button
                    onClick={toggle}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="relative z-[110] cursor-pointer p-2 w-10 h-10 bg-transparent border-0 mix-blend-difference"
                >
                    <span
                        ref={line1Ref}
                        className="block absolute left-2 right-2 h-[1.5px] bg-white origin-center"
                        style={{
                            top: "30%",
                            transform: "translateY(-50%)",
                            transition: `transform 0.6s ${EASE}, top 0.4s ${EASE}`,
                        }}
                    />
                    <span
                        ref={line2Ref}
                        className="block absolute left-2 right-2 h-[1.5px] bg-white origin-center"
                        style={{
                            top: "70%",
                            transform: "translateY(-50%)",
                            transition: `transform 0.6s ${EASE}, top 0.4s ${EASE}`,
                        }}
                    />
                </button>
            </header>

            {/* Fullscreen overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[90] bg-[#0d0e13] flex flex-col justify-end pt-10 px-12 pb-[60px] overflow-hidden"
                style={{
                    visibility: "hidden",
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                {/* Top rule */}
                <div className="absolute top-[100px] left-12 right-12 h-px bg-white/[0.07]" />

                {/* Nav links */}
                <nav className="flex-1 flex flex-col justify-center">
                    <ul className="list-none m-0 p-0">
                        {NAV_LINKS.map((link, i) => (
                            <li key={link.label} className="border-t border-white/[0.07] overflow-hidden">
                                <a
                                    ref={(el) => { linksRef.current[i] = el; }}
                                    href={link.href}
                                    onClick={() => { setOpen(false); runClose(); }}
                                    className="block text-white no-underline font-serif font-extralight leading-[1.1] py-[0.2em] tracking-[-0.02em] relative hover:text-white/40 transition-colors duration-300"
                                    style={{
                                        fontSize: "clamp(2.8rem, 7vw, 7rem)",
                                        opacity: 0,
                                        transform: "translateY(70px)",
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="border-t border-white/[0.07] h-px" />
                    </ul>
                </nav>

                {/* Meta row */}
                <div
                    ref={metaRef}
                    className="flex items-end justify-between pt-12"
                    style={{ opacity: 0, transform: "translateY(20px)" }}
                >
                    <div>
                        <p className="text-white/25 text-[11px] tracking-[0.25em] uppercase mb-1 font-light">
                            Digital Design Studio
                        </p>
                        <p className="text-white/25 text-[11px] tracking-[0.25em] uppercase font-light">
                            Netherlands — Est. 2015
                        </p>
                    </div>

                    <div className="flex gap-8">
                        {SOCIAL_LINKS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/30 text-[11px] tracking-[0.2em] uppercase no-underline font-light transition-colors duration-[250ms] hover:text-white"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
