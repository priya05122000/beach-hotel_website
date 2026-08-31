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
    icon: { dark: "/common/icons/instagram.svg", light: "/common/icons/instagramblue.svg" },
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    icon: { dark: "/common/icons/facebook.svg", light: "/common/icons/facebookblue.svg" },
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@The_Beach_Hotel",
    icon: { dark: "/common/icons/youtube.svg", light: "/common/icons/youtubeblue.svg" },
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/TheBeachHotel_",
    icon: { dark: "/common/icons/x.svg", light: "/common/icons/xblue.svg" },
  },
];
