import Link from "next/link";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import SocialIconLinks from "@/src/components/common/SocialIconLinks";
import { Mail, MapPin, Phone } from "lucide-react";
import { BOOKING_URL } from "@/src/lib/site-links";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "HOTEL FACILITIES", href: "/facilities" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NEARBY DESTINATION", href: "/destinations" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "CONTACT US", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer id="footer">
      <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20 px-6 sm:px-0 lg:min-h-screen">
        <div className="h-full flex flex-col justify-between
        font-arizona-light space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
            {/* Left: description + CTA + socials + contact */}
            <div className="flex flex-col gap-5">
              <h3 className="type-body-lg uppercase sm:max-w-sm xl:max-w-lg">
                Let the charm of the coastline and luxurious comforts set the
                stage for an unforgettable stay amidst stunning views and
                refined comfort.
              </h3>

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
                  <li className="type-label font-arizona-flare-regular tracking-widest uppercase">
                    Front Desk — 24 / 7
                  </li>
                  <li className="type-label font-arizona-flare-regular tracking-widest uppercase">
                    Check-In — 10:00 AM to 5:00 PM
                  </li>
                  <li className="type-label font-arizona-flare-regular tracking-widest uppercase">
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
                  <a
                    href="tel:+915467898765"
                    className="type-body-sm flex items-center gap-2  hover:text-accent transition-colors"
                  >
                    <Phone size={15} />
                    +91 54678 98765
                  </a>

                  <a
                    href="mailto:support@thebeachhotel.in"
                    className="type-body-sm flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail size={15} />
                    support@thebeachhotel.in
                  </a>

                  <div className="type-body-sm flex gap-2  hover:text-accent transition-colors">
                    <MapPin size={15} className="mt-0.5" />
                    Beach Rd, Kanniyakumari, Tamil Nadu 629702, India
                  </div>
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
            <div className=" ">
              <Image
                src="/common/big_logo.svg"
                alt="The Beach Hotel"
                width={700}
                height={200}
                className="h-full w-full opacity-40 pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
