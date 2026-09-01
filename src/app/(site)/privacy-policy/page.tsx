import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import CenterSection from "@/src/components/common/CenterSection";
import { PHONE_NUMBER, PHONE_NUMBER_DISPLAY } from "@/src/lib/site-links";

export const metadata: Metadata = {
  title: "How We Protect Your Privacy",
  description:
    "Learn how The Beach Hotel, Kanyakumari collects, uses, and protects your personal information when you book or visit us.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — The Beach Hotel",
    description:
      "How The Beach Hotel, Kanyakumari collects, uses, and protects your personal information.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <CommonBanner
        title="PRIVACY POLICY"
        src="/common/banner/facilities.webp"
        alt="Privacy Policy — The Beach Hotel, Kanyakumari"
      />

      <CenterSection className="py-16 lg:py-20">
        <div className="legal-content  mx-auto text-charcoal">
          <h2>Welcome to The Beach Hotel</h2>
          <p>
            At The Beach Hotel, your privacy is important to us. We
            understand that when you choose to stay with us or visit our
            website, you place your trust in us. We are committed to
            protecting your personal information and ensuring that it is
            handled with care, transparency, and respect.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and
            protect your information when you visit our website, make a
            reservation, or interact with us. By using our website, you
            agree to the practices described in this policy.
          </p>

          <h2>Information We Collect</h2>
          <p>
            To provide you with a comfortable and seamless experience, we
            may collect the following information:
          </p>
          <ul>
            <li>Your name, phone number, and email address.</li>
            <li>
              Reservation details, including check-in and check-out dates,
              room preferences, and special requests.
            </li>
            <li>
              Billing and payment information required to process your
              booking securely.
            </li>
            <li>
              Information you voluntarily provide when contacting us through
              enquiry forms, email, phone, or social media.
            </li>
            <li>
              Technical information such as your IP address, browser type,
              device information, and website usage statistics collected
              through cookies and similar technologies.
            </li>
          </ul>
          <p>
            We only collect information that is necessary to provide our
            services and improve your experience.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            The information we collect helps us provide you with
            exceptional hospitality and personalized service. We may use
            your information to:
          </p>
          <ul>
            <li>Confirm and manage your reservations.</li>
            <li>Respond to your enquiries and requests.</li>
            <li>Provide guest support before, during, and after your stay.</li>
            <li>Process payments and issue booking confirmations.</li>
            <li>Improve our website, facilities, and guest experience.</li>
            <li>Share important information relating to your reservation.</li>
            <li>
              Inform you about special offers, seasonal packages, or events
              if you have chosen to receive such communications.
            </li>
          </ul>
          <p>
            Your information is never sold to third parties for marketing
            purposes.
          </p>

          <h2>Cookies &amp; Website Analytics</h2>
          <p>
            Our website uses cookies and similar technologies to enhance
            your browsing experience.
          </p>
          <p>
            Cookies help us understand how visitors interact with our
            website, remember your preferences, and improve website
            performance.
          </p>
          <p>
            You may choose to disable cookies through your browser settings.
            However, doing so may affect certain features of the website.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We respect your privacy and treat your personal information
            with the utmost care.
          </p>
          <p>We may share your information only when necessary:</p>
          <ul>
            <li>
              With trusted service providers who assist us in operating our
              business, such as secure payment processors or booking
              platforms.
            </li>
            <li>
              When required by applicable law, legal proceedings, or
              government authorities.
            </li>
            <li>
              To protect the rights, safety, and security of our guests,
              employees, or property.
            </li>
          </ul>
          <p>
            All third-party partners handling your information are expected
            to maintain appropriate confidentiality and security standards.
          </p>

          <h2>Data Security</h2>
          <p>
            Protecting your information is a responsibility we take
            seriously.
          </p>
          <p>
            We implement reasonable administrative, technical, and physical
            safeguards to protect your personal information from
            unauthorized access, misuse, disclosure, alteration, or loss.
          </p>
          <p>
            While we make every effort to safeguard your information, no
            method of internet transmission or electronic storage is
            completely secure. Therefore, we cannot guarantee absolute
            security.
          </p>

          <h2>Retention of Information</h2>
          <p>
            We retain your personal information only for as long as
            necessary to fulfil the purposes outlined in this Privacy
            Policy, comply with legal obligations, resolve disputes, and
            maintain business records where required.
          </p>
          <p>
            Once your information is no longer required, we securely delete
            or anonymize it whenever reasonably possible.
          </p>

          <h2>Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites for your
            convenience.
          </p>
          <p>
            Please note that these websites operate independently and have
            their own privacy practices. We encourage you to review their
            privacy policies, as The Beach Hotel is not responsible for the
            content, security, or privacy practices of external websites.
          </p>

          <h2>Your Rights</h2>
          <p>
            We believe you should have control over your personal
            information.
          </p>
          <p>Subject to applicable laws, you may request to:</p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Correct or update inaccurate information.</li>
            <li>Request deletion of your information where legally permitted.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the
            details provided below.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is intended for general audiences and is not
            designed to knowingly collect personal information from
            children without the consent of a parent or legal guardian.
          </p>
          <p>
            If you believe that a child has provided personal information
            through our website, please contact us so that appropriate
            action can be taken.
          </p>

          <h2>Updates to This Privacy Policy</h2>
          <p>
            As our services continue to evolve, we may update this Privacy
            Policy from time to time.
          </p>
          <p>
            Any changes will be published on this page, and the revised
            policy will become effective immediately upon posting. We
            encourage you to review this page periodically to stay informed
            about how we protect your information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or the way your information is handled, we would
            be happy to assist you.
          </p>
          <p>The Beach Hotel</p>
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
            <li>Address: Beach Rd, Kanniyakumari, Tamil Nadu 629702, India</li>
          </ul>
          <p>
            Thank you for choosing The Beach Hotel. We appreciate the trust
            you place in us and look forward to welcoming you with warmth,
            comfort, and memorable hospitality.
          </p>
        </div>
      </CenterSection>
    </div>
  );
}
