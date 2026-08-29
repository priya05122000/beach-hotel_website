import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import CenterSection from "@/src/components/common/CenterSection";

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
        src="/banner/facilities.webp"
        alt="Terms & Conditions — The Beach Hotel, Kanyakumari"
      />

      <CenterSection className="py-16 lg:py-20">
        <div className="legal-content mx-auto text-charcoal">
          <h2>Welcome to The Beach Hotel</h2>
          <p>
            Welcome to our website. By continuing to browse and use this
            site, you are agreeing to comply with and be bound by the
            following terms and conditions of use. If you disagree with any
            part of these terms, please refrain from using our website.
          </p>

          <h2>Use of Website Information</h2>
          <p>
            The content provided on this website is for your general
            information and personal use only. While we strive to ensure
            that all information is accurate and up-to-date, please note
            that content is subject to change without prior notice. We
            encourage you to contact us directly to confirm details before
            making travel plans based on website information.
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

          <h2>Intellectual Property &amp; Copyright</h2>
          <p>
            All content, including text, design, graphics, and code, is the
            exclusive property of The Beach Hotel. Reproduction,
            redistribution, or modification of any material from this site
            in any form is prohibited without our prior written permission.
            Any unauthorized use is a violation of copyright laws. You are
            welcome to view or print pages for your own non-commercial use,
            provided our proprietary notices remain intact.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            While we make every reasonable effort to ensure our website is
            reliable, we cannot guarantee that the site will always be
            available or error-free. Use of this website is at your own
            risk. The Beach Hotel shall not be held liable for any direct,
            indirect, special, punitive, incidental, or consequential
            damages (including lost profits or business interruption)
            arising from your use of this site or any linked websites.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may occasionally include links to other sites for
            your convenience. These links do not signify our endorsement,
            and we hold no responsibility for the content of those external
            pages.
          </p>

          <h2>Booking &amp; Cancellation Policy</h2>
          <p>
            To ensure we provide the best service to all our guests, our
            cancellation policy is as follows:
          </p>
          <ul>
            <li>
              <b>General Bookings:</b> Cancellations received less than 15
              days prior to your scheduled arrival date will incur a charge
              for the total length of your stay.
            </li>
            <li>
              <b>Peak Season (21 Dec to 10 Jan):</b> Cancellations received
              less than 45 days prior to arrival will incur a charge for the
              total length of your stay.
            </li>
            <li>
              <b>Group Bookings (5 rooms or more):</b> Cancellations
              received less than 45 days prior to arrival will incur a
              charge for the total length of your stay.
            </li>
          </ul>

          <h2>Privacy &amp; Data</h2>
          <p>
            We value your privacy. We use information (such as IP
            addresses) solely to understand how our site is used so we can
            improve your experience. This data is not linked to your
            personal identity.
          </p>

          <h2>Entire Agreement</h2>
          <p>
            These terms and conditions, together with our privacy policy,
            constitute the entire agreement between you and The Beach Hotel
            regarding your use of this website and supersede any previous
            agreements.
          </p>

          <h2>Governing Law &amp; Contact</h2>
          <p>
            Your use of this website and any disputes arising out of such
            use are subject to the laws of India and the exclusive
            jurisdiction of the courts in Tamil Nadu.
          </p>
          <p>
            If you have any questions regarding these terms, please contact
            us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@thebeachhotel.in">
                support@thebeachhotel.in
              </a>
            </li>
            <li>
              Phone: <a href="tel:+915467898765">+91 546 789 8765</a>
            </li>
            <li>Address: Beach Rd, Kanniyakumari, Tamil Nadu 629702, India</li>
          </ul>
          <p>
            We appreciate your cooperation and look forward to hosting you
            at The Beach Hotel.
          </p>
        </div>
      </CenterSection>
    </div>
  );
}
