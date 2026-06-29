import CenterSection from "@/src/components/common/CenterSection";
import Image from "next/image";
import { getFacilitiesData } from "@/src/service/facilities";
import { Button } from "@/src/components/common/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function IconCard({ iconUrl, title }: { iconUrl: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-3">
      <div
        className="w-full sm:w-20 xl:w-24 h-24 sm:h-28 xl:h-34 aspect-1/2 rounded-full bg-linear-to-b from-primary via-accent/76 to-primary  shadow-[0px_4px_4px_0px_#00000040]

             group
    relative
    overflow-hidden
    p-px
    bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
    bg-size-[250%]
    bg-left
    duration-1000
    transition-all
    hover:bg-right
            "
      >
        <div className="bg-ivory transition-all duration-300    w-full h-full rounded-full flex items-center justify-center">
          <div className="relative w-full h-auto p-4 sm:p-6">
            <Image
              src={iconUrl}
              alt={title}
              width={50}
              height={50}
              unoptimized
              className="object-contain "
            />
          </div>
        </div>
      </div>
      <p className="text-center text-gray text-xs lg:text-sm ">{title}</p>
    </div>
  );
}

function Editorial({ align = "left" }: { align?: "left" | "right" }) {
  const isRight = align === "right";
  return (
    <div
      className={`flex pb-4 lg:pb-20 sm:w-1/2 lg:w-full flex-col ${isRight ? "items-end text-right" : "items-start text-left"}`}
    >
      <p className={` text-primary-dark  font-bold mb-4 uppercase`}>
        Thoughtful Indulgences For Every Moment Of Your Stay
      </p>
      <p className="text-charcoal">
        Hotel Facilities Are Designated Spaces And Services Designed To Enhance
        The Guest Experience, Distinct From Individual Room Amenities. Key
        Offerings Include 24-Hour Reception,
      </p>
      <hr className="mt-6 w-[calc(100%-30px)] hidden sm:block border border-gray" />
    </div>
  );
}

export default async function AmenitiesSection() {
  const { data: facilities } = await getFacilitiesData();

  const active = facilities
    .filter((f) => f.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const toCard = (f: (typeof active)[number]) => ({
    title: f.facility_name,
    iconUrl: f.icon_url
      ? `${API_URL}/uploads/${f.icon_url}`
      : "/placeholder.jpg",
  });

  return (
    <CenterSection className="bg-ivory py-16 lg:py-20">
      <h2 className="type-h6 tracking-[73%]  lg:tracking-[83%]  text-gray text-center  pb-10 uppercase font-normal">
        AMENITIES
      </h2>

      <section className="relative px-4 sm:px-0 space-y-10 type-body">
        {/* Mobile only: editorial + 8 icons in 4+4 grid */}
        <div className="sm:hidden space-y-8 ">
          <Editorial align="left" />
          <div className="grid grid-cols-4 gap-5">
            {active.slice(0, 8).map((item) => {
              const { title, iconUrl } = toCard(item);
              return <IconCard key={item.id} iconUrl={iconUrl} title={title} />;
            })}
          </div>
        </div>

        {/* Tablet + Desktop */}
        <div className="hidden sm:block space-y-10">
          {/* Row 1 — tablet: stacked | desktop: 3fr+5fr */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] space-y-5 lg:space-y-0 lg:gap-5 items-end">
            <Editorial align="left" />
            <div className="grid grid-cols-5 w-3/4 ml-auto lg:w-full gap-5">
              {active.slice(0, 5).map((item) => {
                const { title, iconUrl } = toCard(item);
                return (
                  <IconCard key={item.id} iconUrl={iconUrl} title={title} />
                );
              })}
            </div>
          </div>

          {/* Row 2 — tablet: stacked | desktop: 5fr+3fr with label */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-5 items-end">
            <div className="grid grid-cols-5 w-3/4 lg:w-full gap-5">
              {active.slice(5, 10).map((item) => {
                const { title, iconUrl } = toCard(item);
                return (
                  <IconCard key={item.id} iconUrl={iconUrl} title={title} />
                );
              })}
            </div>
            <div className="hidden lg:flex justify-end">
              <Button
                href="/facilities"
                variant="solid"
                className="text-gray w-40"
              >
                View All
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CenterSection>
  );
}
