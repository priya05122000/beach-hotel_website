import Link from "next/link";
import Image from "next/image";
import Section from "@/src/components/common/Section";
import { Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "HOTEL FACILITIES", href: "/facilities" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NEARBY DESTINATION", href: "/nearby" },
  { label: "CONTACT US", href: "/contact" },
];

const spaLinks = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Spa", href: "/spa" },
  { label: "Infinity Pool", href: "/infinity-pool" },
  { label: "Executive Lounge", href: "/executive-lounge" },
  { label: "Transportation", href: "/transportation" },
];

const socialIcons: { href: string; label: string; path: string }[] = [
  {
    href: "https://www.instagram.com/thebeachhotel_/",
    label: "Instagram",
    path: "/icons/instagram.svg",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    label: "Facebook",
    path: "/icons/facebook.svg",
  },
  {
    href: "https://www.youtube.com/@The_Beach_Hotel",
    label: "YouTube",
    path: "/icons/youtube.svg",
  },
  {
    href: "https://x.com/TheBeachHotel_",
    label: "X (Twitter)",
    path: "/icons/x.svg",
  },
];

export default function Footer() {
  return (
    <footer>
      <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20 px-6 sm:px-0">
        <div className="h-full flex flex-col justify-between font-arizona-light space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
            {/* Left: description + CTA + socials + contact */}
            <div className="flex flex-col gap-5">
              <h3 className="uppercase  sm:max-w-sm xl:max-w-lg ">
                Let the charm of the coastline and luxurious comforts set the
                stage for an unforgettable stay amidst breathtaking views and
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
                    <button className="cursor-pointer  font-medium text-white ">
                      Book My Stay
                    </button>
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
                      className="text-xs font-arizona-flare-regular tracking-widest uppercase hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: spa/secondary links */}
            <div>
              <ul className="flex flex-col gap-2">
                {spaLinks.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-xs font-arizona-flare-regular tracking-widest uppercase hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-6 ">
            <div className=" flex flex-col justify-between gap-5">
              <div>
                <div className="mt-6 lg:mt-4 xl:mt-2">
                  <p className="uppercase mb-3">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    {socialIcons.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        className="border border-gray-700 p-1.5  hover:border-gray-500 transition-colors"
                      >
                        <Image
                          src={item.path}
                          alt={item.label}
                          width={28}
                          height={28}
                          className="w-4 h-4"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 mt-8">
                  <a
                    href="tel:+915467898765"
                    className="flex items-center gap-2  hover:text-accent transition-colors"
                  >
                    <Phone size={15} />
                    +91 54678 98765
                  </a>

                  <a
                    href="mailto:support@thebeachhotel.in"
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail  size={15}/>
                    support@thebeachhotel.in
                  </a>

                  <div className="flex gap-2  hover:text-accent transition-colors">
                    <MapPin size={15} className="mt-0.5" />
                    Beach Rd, Kanniyakumari, Tamil Nadu 629702, India
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="sm:mb-4">
                <div className="flex items-center gap-2 text-[10px] font-arizona-flare-regular tracking-widest text-white uppercase">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`}
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50  hover:text-white"
                  >
                    Terms &amp; Condition
                  </Link>
                  <span>|</span>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`}
                    className="transition-colors hover:underline underline-offset-4 decoration-white/50  hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className=" ">
              <Image
                src="/footer_logo.svg"
                alt="The Beach Hotel"
                width={700}
                height={200}
                className="h-full w-full  opacity-40 pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
