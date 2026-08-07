import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";
import SubHeading from "@/src/components/common/SubHeading";
import PillLinkButton from "@/src/components/common/PillLinkButton";

const BOOKING_URL = "https://devnew.skyhms.in/booking_next/booking/";

export default function FacilitiesCtaSection() {
  return (
    <Section className="py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 xl:grid-cols-[1fr_1.5fr] pb-16 sm:pt-16 lg:py-20 border-b border-silver sm:border-b-0 type-body">
        <Eyebrow align="responsive">
          Plan Your Stay
        </Eyebrow>

        <div className="flex flex-col items-start gap-6">
          <SubHeading as="h2" className="text-primary-dark">
            Ready to Experience It All?
          </SubHeading>

          <p className="text-charcoal type-body max-w-md">
            Book your stay and enjoy every facility The Beach Hotel has to offer.
          </p>

          <PillLinkButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            Book Now
          </PillLinkButton>
        </div>
      </div>
    </Section>
  );
}
