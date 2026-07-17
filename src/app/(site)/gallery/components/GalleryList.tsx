import { Sparkle } from "lucide-react";
import GallerySectionBlock from "./GallerySectionBlock";
import { GalleryCategory, Gallery } from "@/src/types";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

interface Props {
  sections: GalleryCategory[];
  galleries: Gallery[];
}

export default function GalleryList({ sections, galleries }: Props) {
  const activeSections = sections.filter((s) => s.is_active !== false);
  const activeGalleries = galleries.filter((g) => g.is_active !== false);

  return (
    <div className="flex flex-col">
      <Section className="">
        <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 pt-16 lg:py-20 type-body">
          {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
          <Eyebrow as="h1" align="responsive">Gallery</Eyebrow>
          <div className="text-xl text-charcoal type-body-xl lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 leading-relaxed">
            Kanyakumari is a destination of many wonders — a sacred shore where
            three oceans meet, revered temples that have drawn pilgrims for two
            thousand years, and a hidden hinterland of misted mountains, secret
            waterfalls and timeless heritage that few ever discover. From the
            comfort of The Beach Hotel, every one of these treasures lies within
            easy reach. Let our concierge curate the journey; you need only
            choose where to wander first.
          </div>
        </div>

      </Section>

      {activeSections.map((section, index) => (
        <GallerySectionBlock
          key={section.id}
          section={section}
          galleries={activeGalleries.filter(
            (g) => g.category_id === section.id,
          )}
          index={index}
        />
      ))}
    </div>
  );
}
