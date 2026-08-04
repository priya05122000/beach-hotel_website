import type { Metadata } from "next";
import RoomsList from "./components/RoomsList";
import { getRoomsData } from "@/src/service/rooms";
import RoomBanner from "./components/RoomBanner";
import { Suspense } from "react";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  title: "Affordable Rooms in Kanyakumari",
  description:
    "Affordable luxury meets stunning sea views at The Beach Hotel Kanyakumari. Book direct today for the best rates and exclusive offers!",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms & Suites — The Beach Hotel",
    description:
      "Rooms and suites designed for comfort with wide ocean views in Kanyakumari.",
    url: "/rooms",
  },
};

export default async function RoomsPage() {
  const { data: rooms } = await getRoomsData();
  const activeRooms = rooms.filter((room) => room.is_active);

  return (
    <>
      <Suspense fallback={null}>
        <SectionScroller dataAttr="data-room-id" />
      </Suspense>
      <RoomBanner />
      <RoomsList rooms={activeRooms} />
    </>
  );
}
