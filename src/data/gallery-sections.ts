export interface GallerySection {
  id: string;
  category: string;
  label: string;
  description: string;
  caption: string;
  images: {
    main: string;
    top: string;
    bottom: string;
  };
}

export const GALLERY_SECTIONS: GallerySection[] = [
  {
    id: "rooms",
    category: "Rooms & Suites",
    label: "Gallery Section",
    description:
      "Elegantly appointed rooms where every detail is considered — from the quality of the linen to the view framed by your window at dawn.",
    caption: "01 / Interiors",
    images: {
      main: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      top: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      bottom: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    },
  },
  {
    id: "dining",
    category: "Dining",
    label: "Gallery Section",
    description:
      "Coastal cuisine shaped by what arrived this morning — fish, spice, and the kind of freshness that only proximity to the sea can produce.",
    caption: "02 / Cuisine",
    images: {
      main: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      top: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80",
      bottom: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    },
  },
  {
    id: "pool",
    category: "Pool & Wellness",
    label: "Gallery Section",
    description:
      "An infinity pool that dissolves into the horizon, and a wellness sanctuary where ancient rituals meet the rhythm of the sea.",
    caption: "03 / Leisure",
    images: {
      main: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      top: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      bottom: "https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?w=800&q=80",
    },
  },
  {
    id: "coast",
    category: "Coastline",
    label: "Gallery Section",
    description:
      "Where three oceans meet at the edge of India — a landscape of rare light, living tides, and a horizon that shifts with every hour.",
    caption: "04 / Landscape",
    images: {
      main: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      top: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      bottom: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
  },
];
