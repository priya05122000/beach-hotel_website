"use client";

import dynamic from "next/dynamic";
import LazySection from "@/src/components/common/LazySection";
import type { GuestReview } from "@/src/types";

// embla-carousel-only — don't fetch that library until this section is
// about to scroll into view. `ssr: false` requires a Client Component
// boundary, which is why this dynamic() call lives here rather than in the
// Server Component page that renders it.
const DynamicTestimonials = dynamic(
  () => import("./Testimonials"),
  { ssr: false }
);

export default function LazyTestimonials({ reviews }: { reviews: GuestReview[] }) {
  return (
    <LazySection placeholder={<div className="min-h-150" />}>
      <DynamicTestimonials reviews={reviews} />
    </LazySection>
  );
}
