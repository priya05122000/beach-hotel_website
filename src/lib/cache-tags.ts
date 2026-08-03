/**
 * Single source of truth for cache tag names — used by every service's
 * `apiFetch` call and by the `/api/revalidate` webhook, so a typo can't
 * silently make a revalidation call a no-op.
 */
export const CACHE_TAGS = {
  rooms: "rooms",
  facilities: "facilities",
  destinations: "destinations",
  offers: "offers",
  guestReviews: "guest-reviews",
  galleryCategories: "gallery-categories",
  galleries: "galleries",
  faqCategories: "faq-categories",
  faqs: "faqs",
  banners: "banners",
  blogs: "blogs",
  reels: "reels",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
