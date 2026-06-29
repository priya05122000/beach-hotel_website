import Image from "next/image";
import { typography } from "@/src/lib/typography";
import Section from "@/src/components/common/Section";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function HeroLocationSection() {
  return (
    <Section className="bg-white py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] xl:grid-cols-2 gap-2 mb-8 md:mb-14 xl:mb-20">
        {/* Left Panel */}
        <p className={`font-semibold text-primary ${typography.textThXl}`}>
          A Conversation <br /> Begins Your  Journey
        </p>
        {/* Right Panel */}
        <div className="flex flex-col justify-center">
          <div className="max-w-md">
            <h1
              className={`font-semibold  text-primary ${typography.textFiXl}`}
            >
              Your perfect stay begins the moment you reach out.
            </h1>
            <p className="mt-6">
              However you wish to begin, our team is here — attentive, discreet and delighted to help craft a stay beyond compare.
            </p>

            {/* CTA Button */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              <a
                href="#contact-form"
                className="inline-block border border-foreground/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact A Manager
              </a>
            </div>
          </div>
        </div>
      </div>



      <div className="grid grid-cols-12 gap-10">

        <div className="lg:col-span-4 space-y-5">
          <div className="uppercase text-2xl font-bold font-arizona-sans-bold"> GETTING HERE</div>
          <p>
            Set at the southernmost tip of the Indian peninsula, The Beach Hotel is closer than you imagine — and worth every mile.
          </p>
          <p> <b className="text-xl">By Air </b> - The nearest international gateway is Trivandrum (Thiruvananthapuram) International Airport, approximately [90 km / a 2–2.5 hour scenic drive] away. Thoothukudi International Airport offers an alternative connection from within India.
          </p>

          <p>
            <b className="text-xl">By Rail </b> - Kanyakumari Railway Station, the final stop on India's longest rail route, lies just 1KM from the hotel and connects to major cities across. Nagercoil Junction offers further connections nearby.

          </p>
          <p><b className="text-xl">By Road </b> -  Reach us via NH44, the legendary Kashmir-to-Kanyakumari highway that ends where the land meets the sea. The town of Nagercoil is approximately [20 km] away. Chauffeur-driven transfers can be arranged for a seamless arrival.</p>

        </div>

        <div className="flex flex-col items-center justify-end lg:col-span-5 ">
          <div className="w-full max-w-xs ml-auto">
            <div className="relative h-60 overflow-hidden">
              <Image
                src="/contact-us/contact.jpg"
                alt="The Beach Hotel exterior"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* <div className="mt-3 text-[11px] flex gap-1 items-start justify-between">
              <div className="flex flex-col gap-px">
                <div className="flex gap-1 items-center">
                  <Phone size={12} />
                  <Link href="tel:04652237491">04652 237 491</Link>
                </div>

                <div className="flex gap-1 items-center">
                  <Mail size={12} />
                  <Link href="mailto:thebeachhotel@gmail.com">
                    thebeachhotel@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex gap-1 items-start">
                <MapPin size={12} className="mt-1 shrink-0" />
                <Link href="https://maps.google.com/?q=Erumanayakkanpatti+Beach+Road,+Kanyakumari">
                  Beach Rd, Kanniyakumari, <br />
                  Tamil Nadu 629702, India
                </Link>
              </div>
            </div> */}

            {/* Additional Contact Details */}

          </div>
        </div>

        <div className="mt-4 text-[11px] space-y-4 border-t flex flex-col  justify-end border-white/20 pt-4 lg:col-span-3 ">
          <h2>Find Us</h2>
          <div className="uppercase">
            <div className={`${typography.textLg} font-arizona-flare-regular`}>The Beach Hotel</div>
            <div className={`${typography.textLg} font-arizona-flare-regular`}>
              Beach Road, Kanyakumari,
              <br />
              Tamil Nadu 629702, India
            </div>
          </div>

          <div>
            <div>
              <span className="font-medium text-xs uppercase">General Enquiries:</span>{" "}
              <Link
                href="mailto:info@thebeachhotel.com"
                className={`${typography.textLg} hover:underline`}
              >
                info@thebeachhotel.com
              </Link>
            </div>

            <div>
              <span className="font-medium text-xs uppercase">Reception:</span>{" "}
              <Link
                href="tel:+919876543210"
                className={`${typography.textLg} hover:underline`}
              >
                +91 98765 43210
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
