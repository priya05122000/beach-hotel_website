import { getActiveFacilities } from "@/src/service/facilities";
import RoomShowcaseSectionClient, { type ShowcaseItem } from "./Client";
import type { Facility } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getPrimaryImage(f: Facility): string {
  const url = f.image_url;
  let files: string[] = [];

  if (Array.isArray(url)) {
    files = url.filter(Boolean);
  } else if (url) {
    try {
      const parsed = JSON.parse(url);
      files = Array.isArray(parsed) ? parsed.filter(Boolean) : [url];
    } catch {
      files = [url];
    }
  }

  const file = files[0] ?? f.icon_url;
  return file ? `${API_URL}/uploads/${file}` : "/placeholder.jpg";
}

export default async function RoomShowcaseSection() {
  const items: ShowcaseItem[] = (await getActiveFacilities())
    .slice(0, 4)
    .map((f, i) => ({
      id: String(f.id),
      title: f.facility_name,
      description: f.short_description ?? f.description ?? "",
      image: getPrimaryImage(f),
      href: `/facilities?to=${i + 1}`,
    }));

  return <RoomShowcaseSectionClient items={items} />;
}