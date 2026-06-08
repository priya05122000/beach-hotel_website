import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Section from "../common/Section";
import { JSX } from "react";
import { typography } from "@/src/lib/typography";

const quickLinks = [
    "Home",
    "About Us",
    "Hotel Facilities",
    "Gallery",
    "Nearby Destination",
    "Contact Us",
];

const facilities = [
    "Restaurant",
    "Swimming Pool",
    "Spa & Wellness",
    "Free WiFi",
    "Conference Hall",
    "Parking",
];

const socialIcons: { href: string; svg: JSX.Element }[] = [
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}> <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /> <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" /> </svg>
        ),
    },
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}> <path fill="none" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> </svg>
        ),
    },
    {
        href: "#",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 1 }}> <path d="M2.5 17a24.1 24.1 0 0 1 0-10a2 2 0 0 1 1.4-1.4a49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10a2 2 0 0 1-1.4 1.4a49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /> <path d="m10 15l5-3l-5-3z" /> </svg>
        ),
    },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className={`mb-4 font-arizona  font-semibold ${typography.textTwoXl}`}>
            {children}
        </h3>
    );
}

function FooterLinkList({ links }: { links: string[] }) {
    return (
        <ul className="space-y-2">
            {links.map((link) => (
                <li key={link}>
                    <Link
                        href="#"
                        className={`text-white transition-colors hover:text-accent text-sm`}
                    >
                        {link}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function SocialButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            aria-label="social"
            className="flex items-center justify-center text-white transition hover:text-accent"
        >
            {children}
        </a>
    );
}

function ContactItem({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            {icon}
            <div className="text-white text-sm">{children}</div>
        </div>
    );
}

export default function Footer() {
    return (
        <Section className="bg-primary text-white">
            <footer className="py-16 lg:py-20">
                {/* Top Section */}
                <div className="grid gap-8 sm:gap-16 lg:grid-cols-12">
                    {/* Brand */}
                    <div className="col-span-6">
                        <p
                            className={`font-arizona uppercase font-medium tracking-wider ${typography.textThXl}`}
                        >
                            The Beach Hotel
                        </p>

                        <p
                            className={`mt-4 max-w-lg text-white ${typography.textLg}`}
                        >
                            Hotel facilities are designated spaces and services
                            designed to enhance the guest experience, distinct
                            from individual room amenities.
                        </p>

                        <div className="mt-4 flex gap-4">
                            {socialIcons.map((item, index) => (
                                <SocialButton
                                    key={index}
                                    href={item.href}
                                >
                                    {item.svg}
                                </SocialButton>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="col-span-3">
                        <FooterHeading>Links</FooterHeading>
                        <FooterLinkList links={quickLinks} />
                    </div>

                    {/* Facilities */}
                    <div className="col-span-3">
                        <FooterHeading>Facilities</FooterHeading>
                        <FooterLinkList links={facilities} />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 grid gap-8 sm:gap-16 lg:grid-cols-12">
                    {/* Content */}
                    <div className="sm:col-span-6">
                        <p
                            className={`font-arizona uppercase font-medium tracking-wider ${typography.textThXl}`}
                        >
                            Content
                        </p>

                        <p
                            className={`mt-4 max-w-lg text-white ${typography.textLg}`}
                        >
                            Hotel facilities are designated spaces and services
                            designed to enhance the guest experience, distinct
                            from individual room amenities.
                        </p>
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-3">
                        <FooterHeading>Address</FooterHeading>

                        <ContactItem
                            icon={<MapPin size={20} className="shrink-0" />}
                        >
                            Erumanayakkanpatti Beach Road,
                            Kanyakumari - 629702,
                            Tamil Nadu, India
                        </ContactItem>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3 space-y-6">
                        <div>
                            <FooterHeading>Phone Number</FooterHeading>

                            <ContactItem
                                icon={<Phone size={18} />}
                            >
                                +91 98765 43210
                            </ContactItem>
                        </div>

                        <div>
                            <FooterHeading>Email</FooterHeading>

                            <ContactItem
                                icon={<Mail size={18} />}
                            >
                                info@thebeachhotel.in
                            </ContactItem>
                        </div>
                    </div>
                </div>
            </footer>
        </Section>
    );
}