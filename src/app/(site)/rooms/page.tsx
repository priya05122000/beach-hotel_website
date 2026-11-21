import type { Metadata } from "next";
import { baseOpenGraph } from "@/src/lib/seo";
import RoomsList from "./components/RoomsList";
import RoomAmenitiesSection from "./components/RoomAmenitiesSection";
import { getRoomsData } from "@/src/service/rooms";
import RoomBanner from "./components/RoomBanner";
import { Suspense } from "react";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "Sea View Rooms in Kanyakumari | The Beach Bay" },
  description:
    "Explore sea-view rooms at The Beach Bay in Kanyakumari, with Economy, Deluxe, Executive and Jacuzzi options, breakfast, room service and guest amenities.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    ...baseOpenGraph,
    title: "Sea View Rooms in Kanyakumari | The Beach Bay",
    description:
      "Explore sea-view rooms at The Beach Bay in Kanyakumari, with Economy, Deluxe, Executive and Jacuzzi options, breakfast, room service and guest amenities.",
    url: "/rooms",
  },
};

export default async function RoomsPage() {
  const { data: rooms } = await getRoomsData();
  const activeRooms = rooms
    .filter((room) => room.is_active)
    .sort(
      (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime()
    );

    // console.log("activeRooms", activeRooms);

  return (
    <>
      <Suspense fallback={null}>
        <SectionScroller dataAttr="data-room-id" hashPrefix="room-" />
      </Suspense>
      <RoomBanner />
      <RoomsList rooms={activeRooms} />
      <RoomAmenitiesSection />
    </>
  );
}
