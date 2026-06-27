import GallerySectionBlock from "./GallerySectionBlock";
import { GalleryCategory, Gallery } from "@/src/types";

interface Props {
  sections: GalleryCategory[];
  galleries: Gallery[];
}

export default function GalleryList({ sections, galleries }: Props) {
  const activeSections = sections.filter((s) => s.is_active !== false);
  const activeGalleries = galleries.filter((g) => g.is_active !== false);

  return (
    <div className="flex flex-col">
      {activeSections.map((section, index) => (
        <GallerySectionBlock
          key={section.id}
          section={section}
          galleries={activeGalleries.filter((g) => g.category_id === section.id)}
          index={index}
        />
      ))}
    </div>
  );
}
