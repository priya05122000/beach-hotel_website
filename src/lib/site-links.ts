/** Shared across every "Book Now" / "Book Your Stay" CTA site-wide. */
export const BOOKING_URL = "https://bookings.skyrooms.in/bookapp/booking/?bkgpropid=1181";

/** Main hotel website — legal pages and footer navigation live here. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const TERMS_URL = `${SITE_URL}/terms-and-conditions`;
export const PRIVACY_URL = `${SITE_URL}/privacy-policy`;

/** Hotel homepage — logo links. */
export const HOTEL_HOME_URL = "https://thebeachhotel.in/";

/** Primary contact number — Navbar, Footer, floating action dock, WhatsApp, legal pages. */
export const PHONE_NUMBER = "+919384938420";
export const PHONE_NUMBER_DISPLAY = "+91 93849 38420";

/** Guest support email — Footer and invoices. */
export const SUPPORT_EMAIL = "support@thebeachhotel.in";

/** Reception line — contact page only. */
export const RECEPTION_PHONE_NUMBER = "+919384938430";
export const RECEPTION_PHONE_NUMBER_DISPLAY = "+91 93849 38430";

const WHATSAPP_PREFILLED_MESSAGE =
  "Hi there! Welcome to The Beach Hotel, Kanyakumari. \nHow can we help you today?";
export const WHATSAPP_URL = `https://wa.me/919384938420?text=${encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE)}`;
