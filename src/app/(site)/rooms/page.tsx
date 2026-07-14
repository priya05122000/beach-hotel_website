import type { Metadata } from "next";
import RoomsList from "./components/RoomsList";
import { getRoomsData } from "@/src/service/rooms";
import RoomBanner from "./components/RoomBanner";
import { Suspense } from "react";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Explore our curated collection of luxurious rooms and suites at The Beach Hotel, Kanyakumari — each designed for comfort with breathtaking ocean views.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms & Suites — The Beach Hotel",
    description:
      "Luxurious rooms and suites designed for comfort with breathtaking ocean views in Kanyakumari.",
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
