// ...existing code...
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
} from "lucide-react";
import Section from "../common/Section";
import { JSX } from "react/jsx-runtime";
import Image from "next/image";

const quickLinks = [
    "Home",
    "About Us",
    "Hotel Facilities",
    "Gallery",
    "Nearby Destination",
    "Contact Us",
];

const socialIcons: { href: string; svg: JSX.Element }[] = [
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
            </svg>
        ),
    },
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}>
                <path fill="none" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}>
                <path d="M2.5 17a24.1 24.1 0 0 1 0-10a2 2 0 0 1 1.4-1.4a49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10a2 2 0 0 1-1.4 1.4a49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15l5-3l-5-3z" />
            </svg>
        ),
    },
];

function SocialButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="flex  items-center justify-center rounded-md  transition-all duration-300 text-white"
            aria-label="social"
        >
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <Section className="bg-primary text-white">
            <footer className="mx-auto py-20">
                <div className="grid gap-20 lg:grid-cols-12 ">
                    {/* Left Section */}
                    <div className="lg:col-span-6">
                        {/* <h2 className="text-5xl font-bold">Logo</h2> */}
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={42}
                            height={42}
                            priority
                            className="h-20 w-auto"
                        />


                        <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/90">
                            Hotel Facilities Are Designated Spaces And Services
                            Designed To Enhance The Guest Experience, Distinct
                            From Individual Room Amenities.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-5 flex gap-4">
                            {socialIcons.map((s, i) => (
                                <SocialButton key={i} href={s.href}>
                                    {s.svg}
                                </SocialButton>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-semibold">Links</h3>

                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-white/90 transition hover:text-accent">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Facilities */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-semibold">Facilities</h3>

                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-white/90 transition hover:text-accent">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-20 grid gap-20 lg:grid-cols-12">
                    {/* Content */}
                    <div className="lg:col-span-6">
                        <h3 className="mb-3 text-4xl font-bold">Content</h3>

                        <p className="max-w-lg text-xl font-semibold leading-relaxed">
                            Hotel Facilities Are Designated Spaces And Services
                            Designed To Enhance The Guest Experience, Distinct
                            From Individual Room Amenities.
                        </p>
                    </div>

                    {/* Address */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-semibold">Address</h3>

                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="mt-1 shrink-0" />

                            <p className="text-white/90">
                                Erumanayakkanpatti Beach Road,
                                Kanyakumari - 629702,
                                Tamil Nadu, India
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-3 text-2xl font-semibold">Phone Number</h3>

                        <div className="flex items-center gap-3">
                            <Phone size={18} />

                            <p className="text-white/90">+91 98765 43210</p>
                        </div>

                        <h3 className="mt-5 mb-3 text-2xl font-semibold">Email</h3>

                        <div className="flex items-center gap-3">
                            <Mail size={18} />

                            <p className="text-white/90">info@thebeachhotel.in</p>
                        </div>
                    </div>
                </div>


            </footer>
        </Section>
    );
}
// ...existing code...