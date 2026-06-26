export interface RoomAmenity {
  label: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  bed_type: string;
  size_sqm: number;
  floor: string;
  view: string;
  wifi: boolean;
  air_conditioning: boolean;
  minibar: boolean;
  balcony: boolean;
  bathtub: boolean;
  images: string[];
  is_active: boolean;
}

export const ROOMS_DATA: Room[] = [
  {
    id: "1",
    name: "Deluxe Ocean Room",
    slug: "deluxe-ocean-room",
    type: "Deluxe",
    description:
      "Wake to uninterrupted ocean views from this elegantly appointed room. Warm tones, locally crafted furnishings, and a private balcony make this a serene retreat at the edge of the sea. Every detail has been considered to ensure that rest comes naturally and mornings feel like a reward.",
    price_per_night: 8500,
    max_guests: 2,
    bed_type: "1 King Bed",
    size_sqm: 42,
    floor: "3rd – 5th",
    view: "Ocean View",
    wifi: true,
    air_conditioning: true,
    minibar: true,
    balcony: true,
    bathtub: false,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
    ],
    is_active: true,
  },
  {
    id: "2",
    name: "Premier Sea Suite",
    slug: "premier-sea-suite",
    type: "Suite",
    description:
      "A generously proportioned suite with a separate living area and panoramic sea views from every window. The deep soaking tub overlooks the horizon, and the king bed is positioned to catch the morning light. Thoughtfully stocked with local amenities, the Premier Sea Suite is our most requested room for good reason.",
    price_per_night: 14500,
    max_guests: 3,
    bed_type: "1 King Bed",
    size_sqm: 68,
    floor: "6th – 8th",
    view: "Sea View",
    wifi: true,
    air_conditioning: true,
    minibar: true,
    balcony: true,
    bathtub: true,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
    ],
    is_active: true,
  },
  {
    id: "3",
    name: "Garden Courtyard Room",
    slug: "garden-courtyard-room",
    type: "Standard",
    description:
      "Peaceful and private, this room opens onto a lush internal garden courtyard. Ideal for guests who prefer shade and quiet over seascape, it offers a cool green retreat from the coastal sun. The room is compact but considered — every surface has a purpose and the natural light through the courtyard window is extraordinarily calming.",
    price_per_night: 5800,
    max_guests: 2,
    bed_type: "1 Queen Bed",
    size_sqm: 34,
    floor: "1st – 2nd",
    view: "Garden View",
    wifi: true,
    air_conditioning: true,
    minibar: false,
    balcony: false,
    bathtub: false,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    ],
    is_active: true,
  },
  {
    id: "4",
    name: "Horizon Penthouse",
    slug: "horizon-penthouse",
    type: "Penthouse",
    description:
      "Our finest accommodation occupies the entire top floor, with 270-degree views encompassing the ocean, the town, and the meeting of three seas at the cape. A private terrace, full butler service, and bespoke interiors make this a destination in itself. Guests who have stayed in the Horizon Penthouse rarely choose any other room on their return.",
    price_per_night: 32000,
    max_guests: 4,
    bed_type: "2 King Beds",
    size_sqm: 145,
    floor: "Top Floor",
    view: "Panoramic 270° View",
    wifi: true,
    air_conditioning: true,
    minibar: true,
    balcony: true,
    bathtub: true,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    is_active: true,
  },
];
