import CommonBanner from "@/src/components/common/CommonBanner";
import GalleryList from "./components/GalleryList";
import { getGalleryData } from "@/src/service/galleries";
import { getGalleryCategoriesData } from "@/src/service/gallery-categories";
import GalleryBanner from "./components/GalleryBanner";

export default async function GalleryPage() {
  const [{ data: categories }, { data: galleries }] = await Promise.all([
    getGalleryCategoriesData(),
    getGalleryData(),
  ]);

  return (
    <>
      {/* <CommonBanner title="Gallery" /> */}
      <GalleryBanner />
      <GalleryList sections={categories} galleries={galleries} />
    </>
  );
}
