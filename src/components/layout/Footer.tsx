import Link from "next/link";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import SocialIconLinks from "@/src/components/common/SocialIconLinks";
import ScrollLink from "@/src/components/common/ScrollLink";
import { Mail, MapPin, Phone, ClipboardList, PawPrint } from "lucide-react";
import { BOOKING_URL, PHONE_NUMBERS } from "@/src/lib/site-links";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "ROOMS & SUITES", href: "/rooms" },
  { label: "HOTEL FACILITIES", href: "/facilities" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NEARBY DESTINATION", href: "/destinations" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT US", href: "/contact-us" },
];

const workingHours = [
  "Check-In — 1:00 PM",
  "Check-Out — 11:00 AM",
  "Front Desk — 24 / 7",
  "Room Service — 24 / 7",
];

function WorkingHours({ className = "" }: { className?: string }) {
  return (
    <div className={`flex-col gap-5 ${className}`}>
      <div>
        <p className="type-label-md font-arizona-flare-regular tracking-widest uppercase text-white mb-3">
          Working Hours :
        </p>
        <ul className="flex flex-col gap-1.5">
          {workingHours.map((item) => (
            <li key={item} className="type-label tracking-widest uppercase">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="footer">
      <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20 px-6 sm:px-0 lg:min-h-screen">
        <div
          className="h-full flex flex-col justify-between
        font-arizona-light space-y-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
            {/* Left: description + CTA + socials + contact */}
            <div className="flex flex-col gap-5">
              <h3 className="type-body-lg uppercase sm:max-w-sm xl:max-w-lg">
                Let the charm of the coastline and luxurious comforts set the
                stage for an unforgettable stay amidst stunning views and
                refined comfort.
              </h3>

              <p className="type-body-lg  inline-flex items-center gap-4 text-white uppercase">
                <PawPrint size={30} className="shrink-0" />
                Pet-friendly accommodation available.
              </p>

              <div>
                {/* <Link
                  href="/booking"
                  className=" items-center text-white px-4 h-10  text-sm font-arizona-sans-regular tracking-widest cursor-pointer bg-accent"
                >
                  Book My Stay
                </Link> */}

                <div className="animated-border inline-block w-auto relative overflow-hidden">
                  <div className="inline-flex items-center gap-3 px-4 h-10 bg-primary  ">
                    <Link
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-label cursor-pointer font-medium text-white"
                    >
                      Book My Stay
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: nav links */}
            <div>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="type-label font-arizona-flare-regular tracking-widest uppercase hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile + desktop position. On tablet it moves down beside
                Follow Us (see the second copy below). */}
            <WorkingHours className="sm:hidden lg:flex" />
          </div>

          {/* Tablet stacks the logo full-width under the contact column: a
              2-col split leaves the logo ~half width (too small). Side-by-side
              only from lg, where the wide 2.5fr column gives it room. */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-6 ">
            <div className=" flex flex-col justify-between gap-5">
              {/* Tablet: same 2fr/1fr split as the top row so Working Hours
                  sits beside Follow Us, aligned under the nav column. */}
              <div className="sm:max-lg:grid sm:max-lg:grid-cols-[2fr_1fr] sm:max-lg:gap-10">
              <div>
                <div className="mt-6 lg:mt-4 xl:mt-2">
                  <p className="type-label uppercase mb-3">Follow Us :</p>
                  <SocialIconLinks variant="dark" />
                </div>
                <div className="flex flex-col space-y-2 mt-8">
                  <div className="type-body-sm flex flex-wrap items-center gap-x-2">
                    <Phone size={15} />
                    {PHONE_NUMBERS.map(({ tel, display }, i) => (
                      <span key={tel} className="flex items-center gap-2">
                        {i > 0 && "/"}
                        <a href={`tel:${tel}`} className="hover:text-accent transition-colors whitespace-nowrap">
                          {display}
                        </a>
                      </span>
                    ))}
                  </div>

                  <a
                    href="mailto:support@thebeachbay.in"
                    className="type-body-sm flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail size={15} />
                    support@thebeachbay.in
                  </a>

                  <a
                    href="https://maps.app.goo.gl/ZSH8BojKYomwLvUSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-body-sm flex gap-2 hover:text-accent transition-colors"
                  >
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    6/61H, Beach Road, Kanyakumari - 629702
                  </a>

                  <ScrollLink
                    href="/contact-us#contact-form"
                    className="type-body-sm flex items-center gap-2 uppercase underline underline-offset-4 hover:text-accent transition-colors w-fit"
                  >
                    <ClipboardList size={15} />
                    Enquiry
                  </ScrollLink>
                </div>
              </div>
              <WorkingHours className="hidden sm:max-lg:flex mt-6" />
              </div>

              {/* Bottom bar */}
              <div className="sm:mb-4">
                <div className="flex items-center gap-2 type-overline font-arizona-flare-regular text-white">
                  <Link
                    href="/terms-and-conditions"
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50  hover:text-white"
                  >
                    Terms &amp; Condition
                  </Link>
                  <span>|</span>
                  <Link
                    href="/privacy-policy"
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50  hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className=" relative">
              <Image
                src="/common/the-beach-bay-resort-and-spa-logo.svg"
                alt="The Beach Bay Resort &amp; Spa, Kanyakumari logo"
                width={700}
                height={200}
                className="h-full w-full pointer-events-none select-none"
              />

              {/* Shine masked to the palm. mask-size: contain + center mirrors how
                  the <img> letterboxes the SVG, so the two stay aligned at every
                  breakpoint (a clip-path in objectBoundingBox units stretched with
                  the grid cell and drifted off the palm on tablet). */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
                style={{
                  maskImage: "url(/common/footer-palm-mask.svg)",
                  WebkitMaskImage: "url(/common/footer-palm-mask.svg)",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              >
                <span className="footer-palm-shine" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
