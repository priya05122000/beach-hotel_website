import CommonBanner from "@/src/components/common/CommonBanner";
import RoomsList from "./components/RoomsList";
import { ROOMS_DATA } from "@/src/data/rooms";

export default function RoomsPage() {
  const rooms = ROOMS_DATA.filter((r) => r.is_active);

  return (
    <div>
      <CommonBanner title="Rooms & Suites" />
      <RoomsList rooms={rooms} />
    </div>
  );
}
