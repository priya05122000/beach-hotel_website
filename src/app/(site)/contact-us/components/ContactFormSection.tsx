"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { applySlideUp } from "@/src/lib/gsap/useSlideUp";
import { Phone, Mail, MapPin } from "lucide-react";
import Section from "@/src/components/common/Section";
import { submitAppointmentEnquiry } from "@/src/service/appointment-request";
import Link from "next/link";
import Image from "next/image";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  message: "",
  consent: false,
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone Number",
    value: "04652 237 491",
    href: "tel:04652237491",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "thebeachhotel@gmail.com",
    href: "mailto:thebeachhotel@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office Location",
    value: "Erumanayakkanpatti Beach Road,\nKanyakumari 629702, India",
    href: "https://maps.google.com/?q=Erumanayakkanpatti+Beach+Road,+Kanyakumari",
  },
];

const socialIcons: { href: string; label: string; path: string }[] = [
  {
    href: "https://www.instagram.com/thebeachhotel_/",
    label: "Instagram",
    path: "/icons/instagramblue.svg",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61590909593058",
    label: "Facebook",
    path: "/icons/facebookblue.svg",
  },
  {
    href: "https://www.youtube.com/@The_Beach_Hotel",
    label: "YouTube",
    path: "/icons/youtubeblue.svg",
  },
  {
    href: "https://x.com/TheBeachHotel_",
    label: "X (Twitter)",
    path: "/icons/xblue.svg",
  },
];

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    applySlideUp([headingRef.current], { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" });
  }, []);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof initialForm, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name as keyof typeof initialForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof typeof initialForm, string>> = {};
    if (!form.first_name.trim()) next.first_name = "First name is required.";
    if (!form.last_name.trim()) next.last_name = "Last name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(form.email)) next.email = "Enter a valid email.";
    const phoneRegex = /^[0-9]{10}$/;
    if (!form.phone_number.trim()) next.phone_number = "Phone is required.";
    else if (!phoneRegex.test(form.phone_number))
      next.phone_number = "Enter a valid 10-digit number.";
    if (!form.message.trim()) next.message = "Message is required.";
    if (!form.consent) next.consent = "Please accept to proceed.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    try {
      setLoading(true);
      const result = await submitAppointmentEnquiry({
        name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone_number: String(form.phone_number),
        message: form.message,
      });
      if (result.success) {
        setSuccess(true);
        setForm(initialForm);
      } else {
        setServerError(
          result.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setServerError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact-form" className="px-6 py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        <div ref={sectionRef} className="w-full">
          <div className="overflow-hidden">
            <h2 ref={headingRef} className="type-h2 font-semibold text-primary-dark">
              Your Questions? <br /> Answered
            </h2>
          </div>

          <p className="mt-4 type-body max-w-md">Tell us how we may help, and our team will respond with care. Whether it is a question, a special request or the beginning of a reservation, we are delighted to assist.</p>
          <div className="mt-4 space-y-4 border-t flex flex-col justify-end border-white/20 pt-4">
            <h2 className="type-h5 font-semibold text-primary-dark">Find Us</h2>
            <div className="uppercase">
              <div className="type-body font-arizona-flare-regular">The Beach Hotel</div>
              <div className="type-body font-arizona-flare-regular">
                Beach Road, Kanyakumari,
                <br />
                Tamil Nadu 629702, India
              </div>
            </div>

            <div className="space-y-1">
              <div>
                <span className="type-label-sm font-medium uppercase">General Enquiries :</span>{" "}
                <Link
                  href="mailto:info@thebeachhotel.com"
                  className="type-body hover:underline"
                >
                  info@thebeachhotel.com
                </Link>
              </div>

              <div>
                <span className="type-label-sm font-medium uppercase">Reception :</span>{" "}
                <Link
                  href="tel:+919876543210"
                  className="type-body hover:underline"
                >
                  +91 98765 43210
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-4 space-y-4">
            <h2 className="type-h5 font-semibold text-primary-dark">
              Follow Us
            </h2>

            <div className="flex items-center gap-3">
              {socialIcons.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="border    border-gray-700 p-1.5  hover:border-gray-500 transition-colors"
                >
                  <Image
                    src={item.path}
                    alt={item.label}
                    width={28}
                    height={28}
                    className="w-4 h-4"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <p className="text-xs text-primary-dark/60">
              Leave a request and we will consult you on available rooms and
              packages.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 w-full"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          >
            {/* Row 1 — First / Last name */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="type-label-sm uppercase tracking-[0.12em] text-primary-dark/50 font-medium">
                  First Name*
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200"
                />
                {errors.first_name && (
                  <p className="type-label-sm text-red-400 mt-0.5">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="type-label-sm uppercase tracking-[0.12em] text-primary-dark/50 font-medium">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200"
                />
                {errors.last_name && (
                  <p className="type-label-sm text-red-400 mt-0.5">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2 — Email */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-primary-dark/50 font-medium">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200"
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>
              )}
            </div>

            {/* Row 3 — Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-primary-dark/50 font-medium">
                Phone*
              </label>
              <input
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                maxLength={10}
                className="bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200"
              />
              {errors.phone_number && (
                <p className="text-[11px] text-red-400 mt-0.5">
                  {errors.phone_number}
                </p>
              )}
            </div>

            {/* Row 4 — Message */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-primary-dark/50 font-medium">
                Message*
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={2}
                className="bg-transparent border-0 border-b border-primary/25 py-2 type-body-sm text-primary-dark placeholder:text-primary-dark/30 focus:outline-none focus:border-primary/60 transition-colors duration-200 resize-none"
              />
              {errors.message && (
                <p className="text-[11px] text-red-400 mt-0.5">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 type-label text-primary-dark/40 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-0.5 accent-white"
              />
              <span>
                I agree to be contacted by the team regarding my enquiry.
              </span>
            </label>
            {errors.consent && (
              <p className="type-label-sm text-red-400 -mt-4">{errors.consent}</p>
            )}

            {serverError && <p className="type-body-sm text-red-400">{serverError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white type-label uppercase tracking-[0.12em] py-3.5 hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Sending…" : "Submit Request"}
            </button>

            <div className="type-label text-primary-dark/50">
              {success
                ? "Thank you for reaching out. A member of our team will be in touch shortly. We can't wait to welcome you to the edge of India."
                : "Your details are kept private and used only to respond to your enquiry. We look forward to welcoming you."}
            </div>
          </form>
        </div>
      </div>

    </Section >
  );
}
