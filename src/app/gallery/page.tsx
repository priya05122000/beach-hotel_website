import CommonBanner from "@/src/components/common/CommonBanner";
import GalleryList from "./components/GalleryList";
import { GALLERY_SECTIONS } from "@/src/data/gallery-sections";

export default function GalleryPage() {
  return (
    <>
      <CommonBanner title="Gallery" />
      <GalleryList sections={GALLERY_SECTIONS} />
    </>
  );
}
