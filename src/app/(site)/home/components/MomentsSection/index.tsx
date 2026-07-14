import { getReelsData } from "@/src/service/reels";
import MomentsSectionClient, { type MomentItem } from "./Client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default async function MomentsSection() {
  const { data: reels } = await getReelsData();

  const items: MomentItem[] = reels
    .filter((r) => r.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((r) => ({
      id: String(r.id),
      title: r.title,
      description: r.description,
      reelUrl: r.reel_url,
      videoUrl: r.video ? `${API_URL}/uploads/${r.video}` : undefined,
      thumbnailUrl: r.thumbnail ? `${API_URL}/uploads/${r.thumbnail}` : undefined,
    }));

  return <MomentsSectionClient items={items} />;
}
