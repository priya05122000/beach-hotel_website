"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import Section from "../common/Section";
import { Announcement } from "@/src/types";
import { Button } from "../common/button";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  {
    label: "Stay",
    children: [
      { href: "/rooms", label: "Room" },
      { href: "/facilities", label: "Facility" },
    ],
  },
  {
    label: "Explore",
    children: [
      { href: "/gallery", label: "Gallery" },
      { href: "/destinations", label: "Destination" },
    ],
  },
  {
    label: "Company",
    children: [
      { href: "/about-us", label: "About Us" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/contact-us", label: "Contact Us" },
];

const NAV_LEFT = [
  { href: "/rooms", label: "Room" },
  { href: "/facilities", label: "Facility" },
  { href: "/gallery", label: "Gallery" },
  { href: "/destinations", label: "Destination" },
];

const NAV_RIGHT = [
  { href: "/blog", label: "Blog" },
  { href: "/about-us", label: "About Us" },
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
  const [isOverDark, setIsOverDark] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const childLinksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const animTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const footer = document.getElementById("footer");
      const header = document.querySelector("header");
      if (!footer || !header) return;

      const navBottom = window.scrollY + header.getBoundingClientRect().height;
      setHideNav(navBottom >= footer.offsetTop - 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkDarkSection = () => {
    const elements = document.elementsFromPoint(window.innerWidth / 2, 48);
    const overDark = elements.some(
      (el) => !el.closest("header") && el.classList.contains("bg-primary"),
    );
    setIsOverDark(overDark);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkDarkSection, { passive: true });
    checkDarkSection();
    return () => window.removeEventListener("scroll", checkDarkSection);
  }, []);

  useEffect(() => {
    const t = setTimeout(checkDarkSection, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    return () => {
      animTimersRef.current.forEach(clearTimeout);
      animTimersRef.current = [];
    };
  }, [pathname]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const scheduleAnim = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    animTimersRef.current.push(id);
    return id;
  };

  const clearAnimTimers = () => {
    animTimersRef.current.forEach(clearTimeout);
    animTimersRef.current = [];
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleLinkClick = () => {
    setOpen(false);
    runClose();
  };

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

  // ── Animation: open ───────────────────────────────────────────────────────

  const runOpen = () => {
    const overlay = overlayRef.current;
    const image = imageRef.current;
    const meta = metaRef.current;
    if (!overlay || !meta) return;

    clearAnimTimers();
    setAnimating(true);
    resetAll();

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

    scheduleAnim(() => {
      if (!image) return;
      image.style.transition = `clip-path 1s ${EASE_OUT}, transform 1.2s ${EASE_OUT}, opacity 0.8s ease`;
      image.style.clipPath = "inset(0% 0 0 0)";
      image.style.transform = "scale(1)";
      image.style.opacity = "1";
    }, 800);

    linksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(() => {
        if (!el) return;
        el.style.transition = `transform 0.75s ${EASE_OUT}`;
        el.style.transform = "translateY(0%)";
      }, 880 + i * 75);
    });

    let childIdx = 0;
    NAV_LINKS.forEach((link, i) => {
      if (!link.children) return;
      const parentDelay = 880 + i * 75 + 120;
      link.children.forEach((_, j) => {
        const el = childLinksRef.current[childIdx++];
        if (!el) return;
        scheduleAnim(() => {
          if (!el) return;
          el.style.transition = `opacity 0.5s ease, transform 0.5s ${EASE_OUT}`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, parentDelay + j * 50);
      });
    });

    scheduleAnim(() => {
      if (!meta) return;
      meta.style.transition = `opacity 0.6s ease, transform 0.6s ${EASE_OUT}`;
      meta.style.opacity = "1";
      meta.style.transform = "translateY(0)";
    }, 1180);

    scheduleAnim(() => setAnimating(false), 1500);
  };

  // ── Animation: close ──────────────────────────────────────────────────────

  const runClose = () => {
    const overlay = overlayRef.current;
    const image = imageRef.current;
    const meta = metaRef.current;
    if (!overlay || !meta) return;

    clearAnimTimers();
    setAnimating(true);

    meta.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    meta.style.opacity = "0";
    meta.style.transform = "translateY(10px)";

    childLinksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(() => {
        if (!el) return;
        el.style.transition = "opacity 0.2s ease";
        el.style.opacity = "0";
      }, i * 20);
    });

    linksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(() => {
        if (!el) return;
        el.style.transition = `transform 0.55s ${EASE}`;
        el.style.transform = "translateY(-110%)";
      }, 50 + i * 40);
    });

    if (image) {
      image.style.transition = `clip-path 0.55s ${EASE}, opacity 0.35s ease`;
      image.style.clipPath = "inset(0% 0 100% 0)";
      image.style.opacity = "0";
    }

    scheduleAnim(() => {
      overlay.style.transition = `clip-path 0.65s ${EASE}`;
      overlay.style.clipPath = "inset(0% 0 100% 0)";
    }, 120);

    scheduleAnim(() => {
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

  // ── Derived values ────────────────────────────────────────────────────────

  const logoSrc = isOverDark && !open ? "/toplogowhite.svg" : "/toplogo.svg";
  const iconColor = isOverDark && !open ? "text-white" : "text-primary-dark";

  const desktopLinksVisible = isDesktop && !scrolled && !open && !animating;

  const desktopLinkCls = (href: string) =>
    [
      "relative text-[11px]  tracking-[0.6px] uppercase transition-colors pb-0.5",
      "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300",
      isActive(href) ? "after:scale-x-100" : "after:scale-x-0",
      isOverDark
        ? "text-white hover:text-accent after:bg-white"
        : "text-primary-dark hover:text-white text-shadow-lg after:bg-primary-dark",
    ].join(" ");

  // Counter assigned during render for child ref indices
  let childIdx = 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-100 transition-transform duration-500"
        style={{ transform: hideNav ? "translateY(-100%)" : "translateY(0)" }}
      >
        {/* Main nav bar */}
        <div className="transition-colors duration-500 bg-transparent">
          <div className="px-6 xl:px-10">
            <div className="relative  h-16 flex items-center justify-between ">

              {/* Left nav links — desktop, not scrolled */}
              <ul
                className={`hidden  lg:pl-30 xl:pl-40 lg:flex items-center gap-6  transition-opacity duration-300 ${
                  desktopLinksVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {NAV_LEFT.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className={desktopLinkCls(href)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Logo — centered when not scrolled */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  opacity: scrolled ? 0 : 1,
                  transition: "opacity 0.5s ease",
                  pointerEvents: scrolled ? "none" : "auto",
                }}
              >
                <Link href="/" className="inline-flex items-center">
                  <Image src={logoSrc} alt="The Beach Hotel" width={300} height={150} className="h-10 w-auto" />
                </Link>
              </div>

              {/* Logo — left-aligned when scrolled */}
              <div
                className="absolute left-0"
                style={{
                  opacity: scrolled ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: scrolled ? "auto" : "none",
                }}
              >
                <Link href="/" className="inline-flex items-center">
                  <Image src={logoSrc} alt="The Beach Hotel" width={300} height={150} className="h-10 w-auto" />
                </Link>
              </div>

              {/* Right nav links + hamburger */}
              <div className="flex  items-center ">
                {/* Right nav links — desktop, not scrolled */}
                <ul
                  className={`hidden lg:pr-30 xl:pr-40 lg:flex items-center gap-6  transition-opacity duration-300 ${
                    desktopLinksVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {NAV_RIGHT.map(({ href, label }) => (
                    <li key={label}>
                      <Link href={href} className={desktopLinkCls(href)}>
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact-us" className="inline-flex items-center gap-3">
                      <span className={`text-[11px]  tracking-[0.6px] uppercase text-shadow-lg ${iconColor}`}>
                        Book My Stay
                      </span>
                    </Link>
                  </li>
                </ul>

                {/* Hamburger / Close toggle */}
                <button
                  onClick={toggle}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  className={`group relative z-110 cursor-pointer bg-transparent border-0 h-10 overflow-hidden flex items-end transition-all duration-300 ${
                    !isDesktop || scrolled || open
                      ? "w-14 opacity-100 pointer-events-auto"
                      : "w-0 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    opacity: !isDesktop ? 1 : open ? 1 : scrolled ? 1 : 0,
                    transitionDelay: !isDesktop ? "0ms" : open ? "900ms" : scrolled ? "150ms" : "0ms",
                  }}
                >
                  {/* Menu label */}
                  <span
                    className="absolute inset-0 flex items-center justify-between"
                    style={{
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                      transform: open ? "translateY(-100%)" : "translateY(0)",
                    }}
                  >
                    <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                      <Menu size={14} className={iconColor} />
                    </span>
                    <span className={`type-overline font-medium transition-colors duration-300 ${iconColor}`}>
                      Menu
                    </span>
                  </span>

                  {/* Close label */}
                  <span
                    className="absolute inset-0 flex items-center justify-between"
                    style={{
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                      transform: open ? "translateY(0)" : "translateY(100%)",
                    }}
                  >
                    <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                      <X size={16} className={iconColor} />
                    </span>
                    <span className={`type-overline font-medium transition-colors duration-300 ${iconColor}`}>
                      Close
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Fullscreen overlay ─────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-90 bg-white overflow-hidden flex flex-col justify-center"
        style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
      >
        <Section>
          <div className="flex flex-1 min-h-0 gap-8 lg:gap-12">

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
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="relative z-10 mt-auto p-8">
                <p
                  className="text-white font-extralight leading-[1.1] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)" }}
                >
                  The Beach<br />Hotel
                </p>
                <p className="type-label-sm text-white/80 tracking-[0.22em] uppercase font-light mt-3">
                  Kanyakumari, India
                </p>
              </div>
            </div>

            {/* Right — nav links + meta */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <nav className="flex-1 flex flex-col justify-center">
                <ul className="list-none m-0 p-0">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.label} className="pt-3 pb-3">
                      {/* Parent link */}
                      <div className="overflow-hidden">
                        {link.href ? (
                          <Link
                            ref={(el) => { linksRef.current[i] = el as HTMLAnchorElement; }}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="group type-body-lg uppercase tracking-[0.2em] text-primary-dark transition-colors duration-300"
                            style={{ transform: "translateY(110%)", display: "block" }}
                          >
                            <span className="relative inline-block pb-1 transition-all duration-300">
                              {link.label}
                              <span className={`absolute left-0 bottom-0 h-px w-full bg-primary/70 origin-left transition-transform duration-500 ${isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                            </span>
                          </Link>
                        ) : (
                          <span
                            ref={(el) => { linksRef.current[i] = el as unknown as HTMLAnchorElement; }}
                            className="type-body-lg cursor-default select-none"
                            style={{ transform: "translateY(110%)", display: "block" }}
                          >
                            <span className="relative text-gray pb-1">{link.label}</span>
                          </span>
                        )}
                      </div>

                      {/* Child links */}
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
                                <Link
                                  href={child.href}
                                  onClick={handleLinkClick}
                                  className="group/child type-body-lg uppercase tracking-[0.2em] text-primary-dark font-arizona-flare-regular transition-colors duration-200"
                                >
                                  <span className="relative inline-block pb-0.5">
                                    {child.label}
                                    <span className={`absolute left-0 bottom-0 h-px w-full bg-primary/70 origin-left transition-transform duration-500 ${isActive(child.href) ? "scale-x-100" : "scale-x-0 group-hover/child:scale-x-100"}`} />
                                  </span>
                                </Link>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom meta */}
              <div
                ref={metaRef}
                className="flex flex-col sm:flex-row sm:items-end sm:justify-between pt-6 shrink-0 gap-6 sm:gap-0"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+915467898765"
                    className="text-primary-dark type-body-lg tracking-wide uppercase no-underline font-arizona-flare-regular transition-colors duration-200"
                  >
                    <span className="type-overline text-gray">Enquiry:</span> +91 54678 98765
                  </a>
                  <p className="text-primary-dark type-body-lg tracking-wider uppercase font-light">
                    <span className="type-overline text-gray">Address:</span> Beach Rd, Kanniyakumari, TN 629702
                  </p>
                </div>
                <Button
                  href="/contact-us"
                  className="text-[11px] tracking-[0.2em] font-medium text-primary-dark w-45"
                >
                  Book My Stay
                </Button>
              </div>
            </div>

          </div>
        </Section>
      </div>
    </>
  );
}
