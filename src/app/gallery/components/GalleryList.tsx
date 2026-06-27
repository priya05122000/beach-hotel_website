import type { GallerySection } from "@/src/data/gallery-sections";
import GallerySectionBlock from "./GallerySectionBlock";

interface Props {
  sections: GallerySection[];
}

export default function GalleryList({ sections }: Props) {
  return (
    <div className="flex flex-col">
      {sections.map((section, index) => (
        <GallerySectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}
