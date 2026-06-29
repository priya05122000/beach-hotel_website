import { Sparkle } from "lucide-react";
import GallerySectionBlock from "./GallerySectionBlock";
import { GalleryCategory, Gallery } from "@/src/types";
import Section from "@/src/components/common/Section";

interface Props {
  sections: GalleryCategory[];
  galleries: Gallery[];
}

export default function GalleryList({ sections, galleries }: Props) {
  const activeSections = sections.filter((s) => s.is_active !== false);
  const activeGalleries = galleries.filter((g) => g.is_active !== false);

  return (
    <div className="flex flex-col">
      <Section>
        <div className="grid sm:grid-cols-[0.5fr_1fr]">
          <div className="text-primary-dark flex gap-3 items-center mb-4 sm:mb-0 sm:h-25">
            <Sparkle size={10} fill="#012644" className="" />{" "}
            <p>Gallery</p>
          </div>
          <div className="text-xl text-primary-darkfont-arizona-flare-regular lg:max-w-md xl:max-w-150 tracking-wide leading-relaxed">
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
