import RoomCardsSectionClient from "./Client";
import type { Room } from "@/src/types";

interface RoomCardsSectionProps {
  rooms: Room[];
}

export default function RoomCardsSection({ rooms }: RoomCardsSectionProps) {
  return <RoomCardsSectionClient rooms={rooms} />;
}
