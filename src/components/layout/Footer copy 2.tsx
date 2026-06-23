import Link from "next/link";
import Image from "next/image";
import Section from "@/src/components/common/Section";

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
        href: "#",
        label: "Instagram",
        path: "/icons/instagram.svg",
    },
    {
        href: "#",
        label: "Facebook",
        path: "/icons/facebook.svg",
    },
    {
        href: "#",
        label: "YouTube",
        path: "/icons/youtube.svg",
    },
    {
        href: "#",
        label: "X (Twitter)",
        path: "/icons/x.svg",
    },
];

export default function Footer() {
    return (
        <footer>
            <Section className="bg-primary w-full relative text-white overflow-hidden z-10 pt-10 lg:pt-20">
                <div className="h-full flex flex-col justify-between-light space-y-10">

                    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-6">
                        {/* Left: description + CTA + socials + contact */}
                        <div className="flex flex-col gap-5">
                            <p className="text-sm lg:text-base leading-relaxed uppercase tracking-wide sm:max-w-sm xl:max-w-lg text-justify">
                                Hotel facilities are designated spaces and services designed to
                                enhance the guest experience, distinct from individual room
                                amenities.
                            </p>

                            <div>
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center text-primary px-4 h-10  text-xs lg:text-sm-sans-regular tracking-widest cursor-pointer bg-accent uppercase"
                                >
                                    Book My Stay
                                </Link>
                            </div>
                        </div>

                        {/* Middle: nav links */}
                        <div>
                            <ul className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm lg:text-base tracking-widest uppercase hover:text-accent transition-colors"
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
                                            className="text-sm lg:text-base tracking-widest uppercase hover:text-accent transition-colors"
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
                                    <p className="text-base lg:text-lg tracking-wider mb-3">Follow Us</p>
                                    <div className="flex items-center gap-3">
                                        {socialIcons.map((item) => (
                                            <Link key={item.label} href={item.href} aria-label={item.label}>
                                                <Image
                                                    src={item.path}
                                                    alt={item.label}
                                                    width={28}
                                                    height={28}
                                                    className="w-6 h-6"
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 mt-4">
                                    <a
                                        href="tel:+915467898765"
                                        className="flex items-center gap-2 text-sm lg:text-base hover:text-accent transition-colors"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="shrink-0"
                                        >
                                            <path
                                                d="M5.11596 12.7268L8.15456 9.08666C8.46255 8.69067 8.61655 8.49267 8.69726 8.27061C8.76867 8.07411 8.79821 7.86486 8.784 7.65628C8.76793 7.42055 8.67477 7.18766 8.48846 6.72187L7.77776 4.94513C7.50204 4.25581 7.36417 3.91116 7.12635 3.68525C6.91678 3.48618 6.65417 3.3519 6.37009 3.29856C6.0477 3.23803 5.68758 3.32806 4.96733 3.50812L3 4.00002C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3122 20.7617 17.952 20.7012 17.6297C20.6478 17.3456 20.5136 17.083 20.3145 16.8734C20.0886 16.6356 19.7439 16.4977 19.0546 16.222L17.4691 15.5878C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4002C15.4877 15.512 15.2854 15.7144 14.8807 16.1191L11.7943 19.1569"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        +91 54678 98765
                                    </a>

                                    <a
                                        href="mailto:Thebeachhotel.In"
                                        className="flex items-center gap-2 text-base hover:text-accent transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="shrink-0"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        Thebeachhotel.In
                                    </a>
                                </div>
                            </div>

                            {/* Bottom bar */}
                            <div className="sm:mb-4">
                                <div className="flex items-center gap-2 text-sm text-white">
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`}
                                        className="transition-colors underline underline-offset-4 decoration-white/50  hover:text-white"
                                    >
                                        Terms &amp; Condition
                                    </Link>
                                    <span>|</span>
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`}
                                        className="transition-colors underline underline-offset-4 decoration-white/50  hover:text-white"
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
