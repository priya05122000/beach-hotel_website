export interface SocialLink {
  label: string;
  href: string;
  /** Icon variant paths — "dark" for use on dark backgrounds (e.g. footer), "light" for use on light backgrounds. */
  icon: { dark: string; light: string };
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thebeachhotel_/",
    icon: { dark: "/icons/instagram.svg", light: "/icons/instagramblue.svg" },
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    icon: { dark: "/icons/facebook.svg", light: "/icons/facebookblue.svg" },
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@The_Beach_Hotel",
    icon: { dark: "/icons/youtube.svg", light: "/icons/youtubeblue.svg" },
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/TheBeachHotel_",
    icon: { dark: "/icons/x.svg", light: "/icons/xblue.svg" },
  },
];
