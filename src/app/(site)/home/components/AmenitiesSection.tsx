import CenterSection from "@/src/components/common/CenterSection";
import Eyebrow from "@/src/components/common/Eyebrow";
import SubHeading from "@/src/components/common/SubHeading";
import Image from "next/image";
import Link from "next/link";
import { getFacilitiesData } from "@/src/service/facilities";
import { Button } from "@/src/components/common/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function IconCard({
  iconUrl,
  title,
  href,
}: {
  iconUrl: string;
  title: string;
  href: string;
}) {

  return (
    <Link href={href} className="flex flex-col items-center gap-5 sm:gap-3">
      <div
        className="w-full sm:w-20 xl:w-24 h-18 sm:h-28 xl:h-34 aspect-1/2 rounded-full bg-linear-to-b from-primary via-accent/76 to-primary shadow-[0px_4px_4px_0px_#00000040]
        group
        relative
        overflow-hidden
        p-px
        bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
        bg-size-[250%]
        bg-left
        duration-1000
        transition-all
        hover:bg-right"
      >
        <div className="bg-ivory transition-all duration-300 w-full h-full rounded-full flex items-center justify-center">
          <div className="relative w-full h-auto p-4 sm:p-6">
            <Image
              src={iconUrl}
              alt={title}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-gray text-xs lg:text-sm">{title}</p>
    </Link>
  );
}

function Editorial({ align = "left" }: { align?: "left" | "right" }) {
  const isRight = align === "right";

  return (
    <div
      className={`flex pb-4 lg:pb-20 sm:w-1/2 lg:w-full flex-col ${isRight ? "items-end text-right" : "items-start text-left"
        }`}
    >
      <SubHeading as="p" className="text-primary-dark mb-4">
        Thoughtful Indulgences For Every Moment Of Your Stay
      </SubHeading>

      <p className="text-charcoal">
        Experience a collection of amenities thoughtfully designed to complement every stay at The Beach Hotel. From wellness and recreation to dining and personalized services, our hotel in Kanniyakumari offers facilities designed to provide comfort and convenience for business and leisure travellers alike.
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
    href: `/facilities?to=${f.id}`,
  });

  return (
    <CenterSection className="bg-ivory py-16 lg:py-20 relative overflow-hidden">
      <Eyebrow align="center" className="text-gray pb-10 font-normal">
        AMENITIES
      </Eyebrow>

      <section className="relative px-4 sm:px-0  type-body">
        {/* Mobile */}
        <div className="sm:hidden space-y-8">
          <Editorial align="left" />

          <div className="grid grid-cols-4 gap-5">
            {active.slice(0, 8).map((item) => {
              const { title, iconUrl, href } = toCard(item);

              return (
                <IconCard
                  key={item.id}
                  iconUrl={iconUrl}
                  title={title}
                  href={href}
                />
              );
            })}
          </div>
        </div>

        {/* Tablet + Desktop */}
        <div className="hidden sm:block space-y-10">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] space-y-5 lg:space-y-0 lg:gap-5 items-end">
            <Editorial align="left" />

            <div className="grid grid-cols-5 w-3/4 ml-auto lg:w-full gap-5">
              {active.slice(0, 5).map((item) => {
                const { title, iconUrl, href } = toCard(item);

                return (
                  <IconCard
                    key={item.id}
                    iconUrl={iconUrl}
                    title={title}
                    href={href}
                  />
                );
              })}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-5 items-end">
            <div className="grid grid-cols-5 w-3/4 lg:w-full gap-5">
              {active.slice(5, 10).map((item) => {
                const { title, iconUrl, href } = toCard(item);

                return (
                  <IconCard
                    key={item.id}
                    iconUrl={iconUrl}
                    title={title}
                    href={href}
                  />
                );
              })}
            </div>

            <div className="hidden lg:flex justify-end ">
              {/* <Button href="/facilities" className="text-primary-dark w-50 ">
                Find Out More
              </Button> */}

              <Button href="/facilities" className="mt-6 sm:w-50 font-normal text-primary-dark cursor-pointer">
                Find Out More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CenterSection>
  );
}