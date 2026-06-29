"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import Section from "../common/Section";
import { Announcement } from "@/src/types";
import { Button } from "../common/button";

// ─── Constants ───────────────────────────────────────────────────────────────

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

  const pathname = usePathname();

  // Refs for animated elements in the overlay
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const childLinksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const animTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Effects ──────────────────────────────────────────────────────────────

  // useEffect(() => {
  //     const onScroll = () => setScrolled(window.scrollY > 50);
  //     window.addEventListener("scroll", onScroll, { passive: true });
  //     return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const footer = document.getElementById("footer");
      const header = document.querySelector("header");

      if (!footer || !header) return;

      const headerHeight = header.getBoundingClientRect().height;

      // Footer absolute position
      const footerTop = footer.offsetTop;

      // Navbar bottom absolute position
      const navBottom = window.scrollY + headerHeight;

      // Hide only 10px before footer
      setHideNav(navBottom >= footerTop - 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkDarkSection = () => {
    const elements = document.elementsFromPoint(window.innerWidth / 2, 48);
    const overDark = elements.some((el) => {
      if (el.closest("header")) return false;
      return el.classList.contains("bg-primary");
    });
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cancel all pending animation timers on unmount or route change
  useEffect(() => {
    return () => {
      animTimersRef.current.forEach(clearTimeout);
      animTimersRef.current = [];
    };
  }, [pathname]);

  // ── Helpers ──────────────────────────────────────────────────────────────

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

    clearAnimTimers();
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
    scheduleAnim(() => {
      if (!image) return;
      image.style.transition = `clip-path 1s ${EASE_OUT}, transform 1.2s ${EASE_OUT}, opacity 0.8s ease`;
      image.style.clipPath = "inset(0% 0 0 0)";
      image.style.transform = "scale(1)";
      image.style.opacity = "1";
    }, 800);

    // Parent links — was 280 + i*75, now 880 + i*75
    linksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(
        () => {
          if (!el) return;
          el.style.transition = `transform 0.75s ${EASE_OUT}`;
          el.style.transform = "translateY(0%)";
        },
        880 + i * 75,
      );
    });

    // Child links — was 280 + i*75 + 120, now 880 + i*75 + 120
    let childIdx = 0;
    NAV_LINKS.forEach((link, i) => {
      if (!link.children) return;
      const parentDelay = 880 + i * 75 + 120;
      link.children.forEach((_, j) => {
        const el = childLinksRef.current[childIdx++];
        if (!el) return;
        scheduleAnim(
          () => {
            if (!el) return;
            el.style.transition = `opacity 0.5s ease, transform 0.5s ${EASE_OUT}`;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          },
          parentDelay + j * 50,
        );
      });
    });

    // Meta — was 580ms, now 1180ms
    scheduleAnim(() => {
      if (!meta) return;
      meta.style.transition = `opacity 0.6s ease, transform 0.6s ${EASE_OUT}`;
      meta.style.opacity = "1";
      meta.style.transform = "translateY(0)";
    }, 1180);

    scheduleAnim(() => setAnimating(false), 1500);
  };

  // ── Animation: close ─────────────────────────────────────────────────────

  const runClose = () => {
    const overlay = overlayRef.current;
    const image = imageRef.current;
    const meta = metaRef.current;
    if (!overlay || !meta) return;

    clearAnimTimers();
    setAnimating(true);

    // Meta out
    meta.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    meta.style.opacity = "0";
    meta.style.transform = "translateY(10px)";

    // Child links fade out (staggered)
    childLinksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(() => {
        if (!el) return;
        el.style.transition = "opacity 0.2s ease";
        el.style.opacity = "0";
      }, i * 20);
    });

    // Parent links slide down (visible exit, staggered)
    linksRef.current.forEach((el, i) => {
      if (!el) return;
      scheduleAnim(
        () => {
          if (!el) return;
          el.style.transition = `transform 0.55s ${EASE}`;
          el.style.transform = "translateY(-110%)";
        },
        50 + i * 40,
      );
    });

    // Image clips out to bottom
    if (image) {
      image.style.transition = `clip-path 0.55s ${EASE}, opacity 0.35s ease`;
      image.style.clipPath = "inset(0% 0 100% 0)";
      image.style.opacity = "0";
    }

    // Overlay closes slightly after
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

  // ── Render ────────────────────────────────────────────────────────────────

  // Counter used during render to assign consecutive child ref indices
  let childIdx = 0;

  return (
    <>
      {/* <header className="fixed inset-x-0 top-0 z-[100]"> */}

      <header
        className="fixed inset-x-0 top-0 z-100 transition-transform duration-500"
        style={{
          transform: hideNav ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Announcement bar — collapses on scroll */}
        {/* <div className={`overflow-hidden bg-white/50 backdrop-blur-md transition-all duration-500 ease-in-out ${scrolled || open ? "h-0" : "h-10"}`}>
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
                </div> */}

        {/* Main nav bar */}
        <div className={`transition-colors duration-500 bg-transparent"}`}>
          <div className="px-8 xl:px-20">
            <div className="relative h-16 flex items-center justify-between">

              {/* ── Left nav links (desktop, not scrolled) ── */}
              <ul
                className={`hidden lg:flex items-center gap-6 transition-opacity duration-300 ${
                  isDesktop && !scrolled && !open && !animating
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {NAV_LEFT.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`relative font-semibold text-sm tracking-[0.6px] uppercase transition-colors pb-0.5
                        after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300
                        ${isActive(href) ? "after:scale-x-100" : "after:scale-x-0"}
                        ${isOverDark ? "text-white hover:text-accent after:bg-white" : "text-primary-dark hover:text-accent after:bg-primary-dark"}
                      `}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* ── Logo — always centered absolutely ── */}
              {/* Centered logo (not scrolled) */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  opacity: scrolled ? 0 : 1,
                  transition: "opacity 0.5s ease",
                  pointerEvents: scrolled ? "none" : "auto",
                }}
              >
                <Link href="/" className="inline-flex items-center">
                  <Image
                    width={300}
                    height={150}
                    alt="Navbar logo"
                    src={isOverDark && !open ? "/toplogowhite.svg" : "/toplogo.svg"}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>

              {/* Left-aligned logo (scrolled) */}
              <div
                className="absolute left-0"
                style={{
                  opacity: scrolled ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: scrolled ? "auto" : "none",
                }}
              >
                <Link href="/" className="inline-flex items-center">
                  <Image
                    width={300}
                    height={150}
                    alt="Navbar logo"
                    src={isOverDark && !open ? "/toplogowhite.svg" : "/toplogo.svg"}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>

              {/* ── Right nav links + Book button + hamburger ── */}
              <div className="flex items-center ml-auto">
                {/* Right nav links (desktop, not scrolled) */}
                <ul
                  className={`hidden lg:flex items-center gap-6 transition-opacity duration-300 ${
                    isDesktop && !scrolled && !open && !animating
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {NAV_RIGHT.map(({ href, label }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className={`relative font-semibold text-sm tracking-[0.6px] uppercase transition-colors pb-0.5
                          after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300
                          ${isActive(href) ? "after:scale-x-100" : "after:scale-x-0"}
                          ${isOverDark ? "text-white hover:text-accent after:bg-white" : "text-primary-dark hover:text-accent after:bg-primary-dark"}
                        `}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact-us">
                      <div className="animated-border inline-block w-auto relative overflow-hidden">
                        <div className="inline-flex items-center gap-3 px-4 h-8 bg-primary">
                          <span className="font-medium text-white text-xs tracking-[0.6px] uppercase">
                            Book My Stay
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>

                {/* Hamburger / Close button */}
                <button
                  onClick={toggle}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  className={`group relative z-110 cursor-pointer bg-transparent border-0 h-10 overflow-hidden flex items-end transition-all duration-300 ${
                    !isDesktop || scrolled || open
                      ? "w-16 opacity-100 pointer-events-auto"
                      : "w-0 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    opacity: !isDesktop ? 1 : open ? 1 : scrolled ? 1 : 0,
                    transitionDelay: !isDesktop
                      ? "0ms"
                      : open
                        ? "900ms"
                        : scrolled
                          ? "150ms"
                          : "0ms",
                  }}
                >
                  {/* Menu span */}
                  <span
                    className="absolute inset-0 flex items-center justify-between"
                    style={{
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                      transform: open ? "translateY(-100%)" : "translateY(0)",
                    }}
                  >
                    <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                      <Menu
                        size={16}
                        className={`${isOverDark && !open ? "text-white" : "text-primary-dark"}`}
                      />
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300 ${isOverDark && !open ? "text-white" : "text-primary-dark"}`}
                    >
                      Menu
                    </span>
                  </span>

                  {/* Close span */}
                  <span
                    className="absolute inset-0 flex items-center justify-between"
                    style={{
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                      transform: open ? "translateY(0)" : "translateY(100%)",
                    }}
                  >
                    <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
                      <X
                        size={16}
                        className={`${isOverDark && !open ? "text-white" : "text-primary-dark"}`}
                      />
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300 ${isOverDark && !open ? "text-white" : "text-primary-dark"}`}
                    >
                      Close
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Fullscreen overlay ─────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-90 bg-white overflow-hidden flex flex-col justify-center"
        style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
      >
        <Section>
          <div className="flex flex-1 min-h-0 gap-8 lg:gap-12 ">
            {/* Left — image panel (desktop only) */}
            <div
              ref={imageRef}
              className="hidden lg:flex flex-col w-[38%] shrink-0 relative overflow-hidden"
              style={{
                clipPath: "inset(100% 0 0 0)",
                transform: "scale(1.08)",
                opacity: 0,
              }}
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
                  The Beach
                  <br />
                  Hotel
                </p>
                <p className="text-white/80 text-[11px] tracking-[0.22em] uppercase font-light mt-3">
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
                      {/* Parent link — overflow-hidden acts as the reveal mask */}
                      <div className="overflow-hidden">
                        {link.href ? (
                          <a
                            ref={(el) => {
                              linksRef.current[i] = el;
                            }}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="group text-[16px] uppercase tracking-[0.2em] text-primary-dark transition-colors font-arizona-flare-regular duration-300"
                            style={{
                              transform: "translateY(110%)",
                              display: "block",
                            }}
                          >
                            <span className="relative inline-block pb-1 transition-all duration-300">
                              {link.label}
                              <span className={`absolute left-0 bottom-0 h-px w-full bg-primary/70 origin-left transition-transform duration-500 ${isActive(link.href!) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                            </span>
                          </a>
                        ) : (
                          <span
                            ref={(el) => {
                              linksRef.current[i] =
                                el as unknown as HTMLAnchorElement;
                            }}
                            className="text-primary/40 text-[14px] lg:text-[16px] font-arizona-sans-regular font-extralight cursor-default select-none"
                            style={{
                              transform: "translateY(110%)",
                              display: "block",
                            }}
                          >
                            <span className="relative pb-1">{link.label}</span>
                          </span>
                        )}
                      </div>

                      {/* Child links — each wrapped in an animated span */}
                      {link.children && (
                        <div className="mt-2 flex gap-6 flex-wrap">
                          {link.children.map((child) => {
                            const refIdx = childIdx++;
                            return (
                              <span
                                key={child.href}
                                ref={(el) => {
                                  childLinksRef.current[refIdx] = el;
                                }}
                                style={{
                                  opacity: 0,
                                  transform: "translateY(10px)",
                                  display: "inline-block",
                                }}
                              >
                                <a
                                  href={child.href}
                                  onClick={handleLinkClick}
                                  className="group/child text-[16px] uppercase tracking-[0.2em] text-primary-dark font-arizona-flare-regular transition-colors duration-200"
                                >
                                  <span className="relative inline-block pb-0.5">
                                    {child.label}
                                    <span className={`absolute left-0 bottom-0 h-px w-full bg-primary/70 origin-left transition-transform duration-500 ${isActive(child.href) ? "scale-x-100" : "scale-x-0 group-hover/child:scale-x-100"}`} />
                                  </span>
                                </a>
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
                    className="text-primary-darktext-[16px] tracking-wide uppercase no-underline font-arizona-flare-regular transition-colors duration-200"
                  >
                    <span className="text-[10px]">Enquiry:</span> +91 54678
                    98765
                  </a>

                  <p className="text-primary-darktext-xs tracking-wider uppercase font-light">
                    <span className="text-[10px]">Address:</span> Beach Rd,
                    Kanniyakumari, TN 629702
                  </p>
                </div>
                {/* <a
                  href="/contact-us"
                  onClick={handleLinkClick}
                  className=" px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-primary-darkunderline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
                >
                  Book My Stay
                </a> */}
                <Button
                  href="/contact-us"
                  className="text-[11px] tracking-[0.2em] font-semibold text-primary-darkw-45"
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
