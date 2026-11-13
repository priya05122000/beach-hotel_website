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

export default function Footer() {
  return (
    <footer id="footer">
      <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20 px-6 sm:px-0 lg:min-h-screen">
        <div
          className="h-full flex flex-col justify-between
        font-arizona-light space-y-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
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

            <div className="flex flex-col gap-5">
              <div>
                <p className="type-label-md font-arizona-flare-regular tracking-widest uppercase text-white mb-3">
                  Working Hours :
                </p>
                <ul className="flex flex-col gap-1.5">
                  <li className="type-label tracking-widest uppercase">
                    Check-In — 1:00 PM
                  </li>
                  <li className="type-label tracking-widest uppercase">
                    Check-Out — 11:00 AM
                  </li>
                  <li className="type-label tracking-widest uppercase">
                    Front Desk — 24 / 7
                  </li>
                  <li className="type-label tracking-widest uppercase">
                    Room Service — 24 / 7
                  </li>
                </ul>
                {/* <p className="type-label font-arizona-flare-regular tracking-widest mt-4 max-w-xs">Warm, intuitive service ensuring your stay is perfectly seamless throughout.</p> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-6 ">
            <div className=" flex flex-col justify-between gap-5">
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
                    href="mailto:support@thebeachhotel.in"
                    className="type-body-sm flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail size={15} />
                    support@thebeachhotel.in
                  </a>

                  <a
                    href="https://maps.app.goo.gl/ZSH8BojKYomwLvUSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-body-sm flex gap-2 hover:text-accent transition-colors"
                  >
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    Erumanayakkanpatti Beach Road, Kanyakumari, Tamil Nadu
                    629702
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
                src="/common/big_logo_1.svg"
                alt="The Beach Bay"
                width={700}
                height={200}
                className="h-full w-full pointer-events-none select-none"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex justify-center"
              >
                <div
                  className="relative h-full max-w-full aspect-527/282 overflow-hidden mix-blend-screen"
                  style={{
                    clipPath: "url(#footer-logo-palm)",
                    WebkitClipPath: "url(#footer-logo-palm)",
                  }}
                >
                  <span className="footer-palm-shine" />
                </div>
              </div>

              <svg aria-hidden width="0" height="0" className="absolute">
                <clipPath
                  id="footer-logo-palm"
                  clipPathUnits="objectBoundingBox"
                  transform="scale(0.00189753 0.0035461)"
                >
                  <path d="M332.438 79.1836C257.274 136.695 268.258 237.855 284.004 280.508H256.071C249.164 142.957 300.274 84.6992 325.836 73.5L332.438 79.1836Z" />
                  <path d="M325.387 78.5352C302.336 76.6289 267.453 112.391 253.816 131.668C253.746 113.086 269.852 92.3047 277.91 84.2383C262.09 84.3555 243.496 96.3711 236.18 102.367C245.422 74.6328 273.492 64.5156 286.371 62.9258C277.719 57.0781 253.098 59.7383 241.871 61.8047C255.441 36.9922 294.258 48.3008 311.969 57.0586C300.055 44.3711 277.266 31.668 267.359 26.9023C287.105 18.625 313.699 38.918 324.527 50.1016C322.312 34.7031 305.219 14.5195 296.945 6.35547C324.664 14.2773 335.254 34.1836 337.086 43.1445C340.992 30.3398 338.629 14.5781 336.957 8.30078C348.121 12.7578 352.785 34.4492 353.723 44.7383C376.328 32.2148 390.715 41.4258 395.086 47.5977C386.082 44.6016 367.086 53.1289 358.715 57.7656C399.008 63.3789 405.227 76.3398 403.305 82.1172C393.203 73.7461 368.207 71.9063 356.969 72.0352C393.688 82.9531 400.25 107.086 398.941 117.785C387.375 102.246 366.184 92.4258 357.035 89.457C391.992 109.996 382.254 142.547 373.016 156.254C373.992 129.113 360.719 113.187 353.961 108.617C368.437 133.852 350.57 164.254 339.828 176.301C349.094 153.215 345.957 132.172 343.234 124.535C335.434 154.793 314.617 165.051 305.184 166.395C336.535 124.426 333.77 92.2695 327.062 79.6445C326.727 79.0117 326.102 78.5938 325.387 78.5352Z" />
                </clipPath>
              </svg>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
