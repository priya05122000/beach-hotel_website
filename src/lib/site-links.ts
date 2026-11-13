/** Shared across every "Book Now" / "Book Your Stay" CTA site-wide. */
export const BOOKING_URL = "https://bookings.skyrooms.in/bookapp/booking/?bkgpropid=1181";

/** Main hotel website — legal pages and footer navigation live here. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const TERMS_URL = `${SITE_URL}/terms-and-conditions`;
export const PRIVACY_URL = `${SITE_URL}/privacy-policy`;

/** Hotel homepage — logo links. */
export const HOTEL_HOME_URL = "https://thebeachbay.in/";

/** Main number — wherever only one fits: call buttons, WhatsApp, structured data. */
export const PHONE_NUMBER = "+919384938420";

/** Every contact number, in display order — Navbar, Footer, home banner, contact page, legal pages. */
export const PHONE_NUMBERS = [
  { tel: PHONE_NUMBER, display: "+91 93849 38420" },
  { tel: "+919384938440", display: "+91 93849 38440" },
];

/** Guest support email — Footer and invoices. */
export const SUPPORT_EMAIL = "support@thebeachbay.in";

const WHATSAPP_PREFILLED_MESSAGE =
  "Hi there! Welcome to The Beach Bay, Kanyakumari. \nHow can we help you today?";
export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE)}`;
