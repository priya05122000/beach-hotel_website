"use client";

import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL } from "@/src/lib/site-links";

const WHATSAPP_URL = "https://wa.me/915467898765";
const PHONE_NUMBER = "+915467898765";



// Each item is `relative` so the label can sit absolutely below the whole
// pill; the icon itself rises above the pill's top edge on hover (like a
// macOS dock), which needs the pill's own overflow left visible.
const dockItemClass = "group relative  flex items-center justify-center";

const dockIconClass =
  "relative z-10 flex h-10 w-10 bg-white p-2  items-center justify-center overflow-hidden rounded-full shadow-[0px_4px_4px_0px_#00000040] transition-transform duration-300 ease-out group-hover:-translate-y-5";

const dockLabelClass =
  "pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap  px-2.5  text-[10px] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100";

export default function FloatingActionButtons() {
  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        rounded-full border border-primary-dark/22 bg-white/30 px-4 py-2
        shadow-[0px_4px_12.2px_0px_#00000075] backdrop-blur-[5.3px]
      "
    >


      {/* Plain button (not a Link) — wa.me rate-limits/blocks rapid automated
          requests with 429s, so a static crawlable href here gets this
          flagged as a "broken external link" by SEO site-audit crawlers on
          every page, even though it works fine for real users. */}
      <button
        type="button"
        onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
        aria-label="Chat with us on WhatsApp"
        className={`${dockItemClass} cursor-pointer`}
      >
        <span className={dockIconClass}>
          <Image src="/common/whatsapp.png" alt="" width={24} height={24} className="object-contain" />
        </span>
        <span className={dockLabelClass}>WhatsApp</span>
      </button>

      <Link
        href={`tel:${PHONE_NUMBER}`}
        aria-label="Call Us"
        className={dockItemClass}
      >
        <span className={`${dockIconClass} bg-primary-dark text-ivory`}>
          <Image src="/common/contact.png" alt="" width={24} height={24} className="object-contain" />
        </span>
        <span className={dockLabelClass}>Call Us</span>
      </Link>

      <Link
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book your stay"
        className={dockItemClass}
      >
        <span className={dockIconClass}>
          <Image src="/common/booknow.png" alt="" width={24} height={24} className="object-contain" />
        </span>
        <span className={dockLabelClass}>Book Now</span>
      </Link>
    </div>
  );
}
