import type { GallerySection } from "@/src/data/gallery-sections";
import GallerySectionBlock from "./GallerySectionBlock";

interface Props {
  sections: GallerySection[];
}

export default function GalleryList({ sections }: Props) {
  return (
    <div className="py-16 lg:py-20 flex flex-col gap-15 lg:gap-30">
      {sections.map((section, index) => (
        <GallerySectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}
