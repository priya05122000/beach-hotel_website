import CommonBanner from "@/src/components/common/CommonBanner";
import RoomsList from "./components/RoomsList";
import { getRoomsData } from "@/src/service/rooms";

export default async function RoomsPage() {
  const { data: rooms } = await getRoomsData();

  return (
    <div>
      <CommonBanner title="Rooms & Suites" />
      <RoomsList rooms={rooms} />
    </div>
  );
}
