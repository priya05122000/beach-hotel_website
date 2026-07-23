"use client";

import dynamic from "next/dynamic";
import LazySection from "@/src/components/common/LazySection";

// react-fast-marquee-only — don't fetch that library until this section is
// about to scroll into view. `ssr: false` requires a Client Component
// boundary, which is why this dynamic() call lives here rather than in the
// Server Component page that renders it.
const DynamicTrustedBySection = dynamic(
  () => import("./TrustedBySection"),
  { ssr: false }
);

export default function LazyTrustedBySection() {
  return (
    <LazySection placeholder={<div className="min-h-80" />}>
      <DynamicTrustedBySection />
    </LazySection>
  );
}
