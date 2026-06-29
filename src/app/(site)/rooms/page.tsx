import RoomsList from "./components/RoomsList";
import { getRoomsData } from "@/src/service/rooms";
import RoomBanner from "./components/RoomBanner";

export default async function RoomsPage() {
  const { data: rooms } = await getRoomsData();

  const activeRooms = rooms.filter((room) => room.is_active);

  return (
    <div>
      {/* <CommonBanner title="Rooms & Suites" /> */}
      <RoomBanner />
      <RoomsList rooms={activeRooms} />
    </div>
  );
}
