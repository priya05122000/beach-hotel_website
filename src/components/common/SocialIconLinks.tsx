import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/src/lib/social-links";

interface SocialIconLinksProps {
  /** Icon color variant to match the surrounding background. */
  variant?: "dark" | "light";
  className?: string;
}

export default function SocialIconLinks({ variant = "dark", className = "" }: SocialIconLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-700 p-1.5 hover:border-gray-500 transition-colors"
        >
          <Image
            src={item.icon[variant]}
            alt={item.label}
            width={28}
            height={28}
            className="w-4 h-4"
          />
        </Link>
      ))}
    </div>
  );
}
