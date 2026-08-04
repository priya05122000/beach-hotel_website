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
        <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] border-b border-silver pb-10 sm:pt-16 lg:py-20 type-body">
          {/* <Sparkle size={10} fill="#012644" className="" />{" "} */}
          <Eyebrow as="h1" align="responsive">Gallery</Eyebrow>
          <div className="text-xl text-charcoal type-body-xl lg:max-w-md xl:max-w-xl mt-10 sm:mt-0 leading-relaxed">
            These photos capture what it&apos;s actually like to stay at The
            Beach Hotel — sunrise over the meeting point of three oceans,
            quiet mornings by the pool, rooms with a view, and the coast of
            Kanyakumari beyond our walls. Browse the collection below and
            picture your own stay here.
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
