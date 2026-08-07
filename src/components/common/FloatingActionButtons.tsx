import Link from "next/link";
import Image from "next/image";

const BOOKING_URL = "https://devnew.skyhms.in/booking_next/booking/";
const WHATSAPP_URL = "https://wa.me/915467898765";

export default function FloatingActionButtons() {
  return (
    <div
      className="
        fixed bottom-10 right-0 z-50 p-0.5
        shadow-[0px_4px_4px_0px_#00000040]
        bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
        bg-size-[250%] bg-left transition-all duration-1000 hover:bg-right
      "
    >
      <div className="flex flex-col gap-3 bg-white p-2 backdrop-blur-xl">
        <Link
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book your stay"
          className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center overflow-hidden transition-transform hover:scale-110"
        >
          <Image src="/booking.png" alt="" fill className="object-cover" sizes="40px" />
        </Link>

        <div className="h-px w-full bg-black/20" />

        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center overflow-hidden transition-transform hover:scale-110"
        >
          <Image src="/whatsapp.png" alt="" fill className="object-cover" sizes="40px" />
        </Link>
      </div>
    </div>
  );
}
