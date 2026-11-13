export interface SocialLink {
  label: string;
  href: string;
  /** Icon variant paths — "dark" for use on dark backgrounds (e.g. footer), "light" for use on light backgrounds. */
  icon: { dark: string; light: string };
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/the_beach_bay/",
    icon: { dark: "/common/icons/instagram-icon-white.svg", light: "/common/icons/instagram-icon-blue.svg" },
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    icon: { dark: "/common/icons/facebook-icon-white.svg", light: "/common/icons/facebook-icon-blue.svg" },
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@The_Beach_Hotel",
    icon: { dark: "/common/icons/youtube-icon-white.svg", light: "/common/icons/youtube-icon-blue.svg" },
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/TheBeachHotel_",
    icon: { dark: "/common/icons/x-icon-white.svg", light: "/common/icons/x-icon-blue.svg" },
  },
];
