import RoomsList from "./components/RoomsList";
import { getRoomsData } from "@/src/service/rooms";
import RoomBanner from "./components/RoomBanner";

export default async function RoomsPage() {
  const { data: rooms } = await getRoomsData();

  return (
    <div>
      {/* <CommonBanner title="Rooms & Suites" /> */}
      <RoomBanner  />
      <RoomsList rooms={rooms} />
    </div>
  );
}
