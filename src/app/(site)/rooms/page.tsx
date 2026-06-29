import CommonBanner from "@/src/components/common/CommonBanner";
import RoomsList from "./components/RoomsList";
import { ROOMS_DATA } from "@/src/data/rooms";
import RoomBanner from "./components/RoomBanner";

export default function RoomsPage() {
  const rooms = ROOMS_DATA.filter((r) => r.is_active);

  return (
    <div>
      {/* <CommonBanner title="Rooms & Suites" /> */}
      <RoomBanner />
      <RoomsList rooms={rooms} />
    </div>
  );
}
