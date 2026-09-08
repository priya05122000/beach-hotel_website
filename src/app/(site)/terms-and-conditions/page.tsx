import type { Metadata } from "next";
import Link from "next/link";
import CommonBanner from "@/src/components/common/CommonBanner";
import CenterSection from "@/src/components/common/CenterSection";
import { PHONE_NUMBER, PHONE_NUMBER_DISPLAY } from "@/src/lib/site-links";

export const metadata: Metadata = {
  title: "Terms & Conditions of Stay",
  description:
    "Read the terms and conditions for booking and staying at The Beach Hotel, Kanyakumari, including cancellations and payments.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions — The Beach Hotel",
    description:
      "Booking, cancellation, payment, and stay policies for The Beach Hotel, Kanyakumari.",
    url: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <CommonBanner
        title="TERMS & CONDITIONS"
        src="/common/banner/facilities.webp"
        alt="Terms & Conditions — The Beach Hotel, Kanyakumari"
      />
      <CenterSection className="py-16 lg:py-20">
        <div className="legal-content mx-auto text-charcoal">
          <h2>Welcome to The Beach Hotel</h2>
          <p>
            Welcome to The Beach Hotel. By continuing to browse and use this website, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please refrain from using our website.
          </p>

          <h2>Use of Website Information</h2>
          <p>
            The content provided on this website is for your general information and personal use only. While we strive to ensure that all information is accurate and up-to-date, please note that content is subject to change without prior notice. We encourage you to contact us directly to confirm details before making travel plans based on website information.
          </p>

          <h2>Website Usage Guidelines</h2>
          <p>
            To ensure a positive experience for all our guests, we kindly
            ask that you observe the following:
          </p>
          <ul>
            <li>
              Please refrain from using our website in any way that may
              damage or impair its availability or accessibility.
            </li>
            <li>
              The use of this website for any unlawful, illegal, fraudulent,
              or harmful purposes is strictly prohibited.
            </li>
            <li>
              You may not use our website for any marketing purposes without
              our prior written consent.
            </li>
            <li>
              We kindly ask that you do not use this site to distribute spam
              or mass mailings.
            </li>
            <li>
              We reserve the right to edit or remove any material posted on
              our website at our discretion.
            </li>
            <li>
              We may update these terms from time to time, so please check
              this page regularly to stay informed of the current version.
            </li>
          </ul>

          <h2>Check-in, Identification &amp; Payment</h2>
          <p>
            To ensure the safety, security, and comfort of all our guests,
            the following check-in requirements apply:
          </p>
          <ul>
            <li>
              Guests must generally be 18 years of age or older to register
              for and occupy a room independently.
            </li>
            <li>
              All registered guests are required to provide an original,
              valid, government-issued photo identification at check-in.
            </li>
            <li>
              Accepted identification documents may include an Aadhaar Card,
              Passport, Voter ID, or Driving Licence, subject to applicable
              government requirements. A PAN card may not be accepted as a
              valid identity document for check-in.
            </li>
            <li>
              The Hotel reserves the right to request additional information
              or documentation where required by applicable laws or
              regulations.
            </li>
            <li>
              A valid payment method, credit card, or cash deposit may be
              required at check-in towards room charges and any applicable
              incidental expenses.
            </li>
            <li>
              Failure to provide the required identification or
              payment/security deposit may result in the Hotel being unable
              to complete the check-in process.
            </li>
          </ul>

          <h2>Visitors &amp; Guest Conduct</h2>
          <ul>
            <li>
              For the safety, security, and comfort of all guests, visitors
              who are not registered guests may be permitted only in
              designated public areas or during specific visiting hours as
              determined by the Hotel.
            </li>
            <li>
              Unauthorized overnight visitors or additional occupants are
              strictly prohibited.
            </li>
            <li>
              Guests are responsible for ensuring that their visitors comply
              with the Hotel&rsquo;s rules and regulations.
            </li>
            <li>
              The Hotel reserves the right to restrict or refuse access to
              visitors where necessary for safety, security, privacy, or
              operational reasons.
            </li>
          </ul>

          <h2>Guest Conduct &amp; Zero-Tolerance Policy</h2>
          <p>
            We are committed to providing a safe, comfortable, and welcoming
            environment for all our guests.
          </p>
          <ul>
            <li>
              Any behaviour that is illegal, disruptive, threatening,
              abusive, or contrary to public decency will not be tolerated.
              Such conduct may result in immediate eviction from the Hotel
              without refund, subject to applicable laws and regulations.
            </li>
            <li>
              The Hotel reserves the right to take appropriate action where a
              guest&rsquo;s conduct affects the safety, comfort, privacy, or
              well-being of other guests, employees, or Hotel property.
            </li>
          </ul>

          <h2>Damage to Hotel Property</h2>
          <ul>
            <li>
              Guests are responsible for any loss, damage, or destruction
              caused to Hotel property by themselves, their registered or
              unregistered visitors, or any person for whom they are
              responsible.
            </li>
            <li>
              In the event of damage or loss caused by a guest or their
              visitors, the Hotel reserves the right to recover the
              reasonable cost of repair, replacement, or restoration from the
              responsible guest.
            </li>
            <li>
              Guests are kindly requested to treat all Hotel property,
              furnishings, equipment, and facilities with care.
            </li>
          </ul>

          <h2>Guest Complaints</h2>
          <p>
            We value our guests&rsquo; feedback and are committed to
            addressing concerns as promptly as possible.
          </p>
          <p>
            Guests are requested to raise any complaints, concerns, or
            requests with the Front Office or Hotel Management during their
            stay so that we have an opportunity to assist and resolve the
            matter in a timely manner.
          </p>

          <h2>Pet Policy</h2>
          <p>
            The Beach Hotel is pleased to welcome guests travelling with
            their cherished companions and offers a pet-friendly stay by the
            sea. To ensure the comfort, safety, and enjoyment of all guests,
            the following pet policy applies:
          </p>
          <ul>
            <li>A maximum of one pet is permitted per room.</li>
            <li>Only dogs are permitted.</li>
            <li>
              Dogs must be well-behaved, supervised, and kept under control
              at all times.
            </li>
            <li>
              Only dogs up to 45 cm in height at the shoulder are permitted.
            </li>
            <li>Large or aggressive breeds are not permitted.</li>
            <li>
              Guests are responsible for the behaviour, care, cleanliness,
              and safety of their pets throughout their stay.
            </li>
            <li>
              Guests may be held responsible for any damage, loss,
              disturbance, or additional cleaning requirements caused by
              their pet.
            </li>
            <li>
              The Hotel reserves the right to refuse or restrict a
              pet&rsquo;s stay where necessary for the safety, comfort, or
              well-being of guests, staff, or other animals.
            </li>
            <li>
              Guests are encouraged to contact the Hotel in advance to
              confirm the current pet policy and any applicable requirements
              or charges.
            </li>
          </ul>

          <h2>Intellectual Property &amp; Copyright</h2>
          <p>
            All content, including text, design, graphics, photographs, and
            code, is the exclusive property of The Beach Hotel unless
            otherwise stated. Reproduction, redistribution, or modification
            of any material from this site in any form is prohibited without
            our prior written permission.
          </p>
          <ul>
            <li>
              Any unauthorized use of website content may constitute a
              violation of applicable copyright and intellectual property
              laws.
            </li>
            <li>
              You are welcome to view or print pages for your own
              non-commercial use, provided that all proprietary notices
              remain intact.
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            While we make every reasonable effort to ensure that our website
            and information are reliable, we cannot guarantee that the
            website will always be available, uninterrupted, or error-free.
            Use of this website is at your own risk. To the extent permitted
            by applicable law, The Beach Hotel shall not be held liable for
            any direct, indirect, special, punitive, incidental, or
            consequential damages arising from your use of this website or
            any linked websites.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may occasionally include links to other websites for
            your convenience. These links do not signify our endorsement of
            those websites, products, or services. The Beach Hotel does not
            control and is not responsible for the content, availability,
            security, or privacy practices of external websites.
          </p>

          <h2>Booking &amp; Cancellation Policy</h2>
          <p>
            To ensure we provide the best service to all our guests, our
            cancellation policy is as follows:
          </p>
          <ul>
            <li>
              <b>General Bookings:</b> Cancellations received less than 15
              days prior to the scheduled arrival date will incur a charge
              equivalent to the total length of the stay.
            </li>
            <li>
              <b>Peak Season (21 December to 10 January):</b> Cancellations
              received less than 45 days prior to arrival will incur a
              charge equivalent to the total length of the stay.
            </li>
            <li>
              <b>Group Bookings (5 rooms or more):</b> Cancellations received
              less than 45 days prior to arrival will incur a charge
              equivalent to the total length of the stay.
            </li>
          </ul>
          <p>
            Additional booking-specific terms, including payment, deposit,
            modification, no-show, and refund conditions, may apply and will
            be communicated at the time of booking.
          </p>

          <h2>Privacy &amp; Data</h2>
          <p>
            We value your privacy. We use information such as IP addresses
            and website usage information to understand how our website is
            used and to improve your experience.
          </p>
          <p>
            For information regarding the collection, use, storage, and
            protection of personal information, please refer to our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>Compliance with Laws &amp; Government Regulations</h2>
          <ul>
            <li>
              Guests are requested to observe, comply with, and be bound by
              all applicable laws, regulations, government requirements, and
              local rules of the Republic of India, including those
              applicable in the State of Tamil Nadu.
            </li>
            <li>
              Guests are also expected to comply with all reasonable Hotel
              rules and instructions relating to safety, security, public
              order, and the use of Hotel facilities.
            </li>
            <li>
              Failure to comply with applicable laws, government
              regulations, or Hotel rules may result in appropriate action by
              the Hotel, including cancellation of a stay or removal from
              the premises, where permitted by law.
            </li>
          </ul>

          <h2>Management Rights &amp; Updates</h2>
          <p>
            The Hotel Management reserves the right to add, alter, amend, or
            update these Terms, Conditions, and Hotel Rules from time to
            time. Any updated terms will be published on this website or
            otherwise communicated where appropriate. Guests are encouraged
            to review these terms periodically to remain informed of the
            current policies.
          </p>

          <h2>Entire Agreement</h2>
          <p>
            These Terms and Conditions, together with our Privacy Policy and
            any booking-specific terms communicated to the guest, constitute
            the agreement between you and The Beach Hotel regarding your use
            of this website and your stay at the Hotel, subject to
            applicable law.
          </p>

          <h2>Governing Law &amp; Contact</h2>
          <p>
            Your use of this website, your stay at The Beach Hotel, and any
            disputes arising in connection with these matters shall be
            governed by the applicable laws of India. Subject to applicable
            law, disputes shall be subject to the jurisdiction of the
            competent courts in Tamil Nadu.
          </p>
          <p>
            If you have any questions regarding these Terms and Conditions
            or our Hotel policies, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@thebeachhotel.in">
                support@thebeachhotel.in
              </a>
            </li>
            <li>
              Phone: <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER_DISPLAY}</a>
            </li>
            <li>Address: Erumanayakkanpatti Beach Road, Kanyakumari, Tamil Nadu 629702</li>
          </ul>
          <p>
            We appreciate your cooperation and look forward to welcoming you
            to The Beach Hotel.
          </p>
        </div>
      </CenterSection>
    </div>
  );
}
