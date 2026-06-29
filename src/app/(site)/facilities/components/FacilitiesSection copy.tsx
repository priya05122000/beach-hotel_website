import Image from "next/image";
import Section from "@/src/components/common/Section";
import { getFacilitiesData } from "@/src/service/facilities";
import RightSpaceGridSection from "@/src/components/common/RightSpaceGridSection";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FALLBACK_IMG = "/home/hero-1.webp";

const getImageSrc = (img?: string | null) => {
    if (!img) return FALLBACK_IMG;
    const s = String(img).trim();
    if (!s) return FALLBACK_IMG;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    // backend may return "images/xxx.jpg" or "/uploads/xxx.jpg" or just filename
    if (s.startsWith("/")) return `${BASE_URL}${s}`;
    return `${BASE_URL}/uploads/${s}`;
};

export default async function FacilitiesSection() {
    const { data: facilities = [] } = await getFacilitiesData().catch(() => ({ data: [] }));

    if (!facilities.length) {
        return null;
    }

    return (
        <section className="bg-primary/19 pb-10">
            <RightSpaceGridSection>
                <div className="space-y-8">
                    {facilities.map((item, index) => (
                        <div key={item.id ?? index} className="grid items-center gap-12 sm:grid-cols-12">
                            {/* Image */}
                            <div className="sm:col-span-7">
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={getImageSrc((item as any).image_url ?? (item as any).media_url)}
                                        alt={(item as any).title ?? (item as any).name ?? "Facility"}
                                        fill
                                        unoptimized
                                        className="object-cover transition duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="sm:col-span-5 sm:py-10">
                                <h3 className="mb-6 text-4xl font-semibold uppercase text-primary-dark">
                                    {(item as any).facility_name ?? (item as any).title ?? (item as any).name ?? "Facility"}
                                </h3>

                                {/* <p className="mb-4 max-w-md text-lg  text-primary-dark">
                                {(item as any).short_description ?? (item as any).description ?? ""}
                            </p> */}

                                <p
                                    className="text-lg  text-primary-dark"
                                    suppressHydrationWarning
                                    dangerouslySetInnerHTML={{ __html: (item as any).description ?? "" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </RightSpaceGridSection>

        </section>
    );
}