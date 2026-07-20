"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ANIM, prefersReducedMotion } from "@/src/lib/gsap/config";
import { applySplitSlideUp } from "@/src/lib/gsap/useSplitSlideUp";
import Section from "@/src/components/common/Section";
import SubHeading from "@/src/components/common/SubHeading";
import SocialIconLinks from "@/src/components/common/SocialIconLinks";
import FormField from "@/src/components/ui/FormField";
import { submitAppointmentEnquiry } from "@/src/service/appointment-request";
import Link from "next/link";
import toast from "react-hot-toast";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  message: "",
  consent: false,
};

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const split = applySplitSlideUp({
        target: headingRef.current,
        trigger: sectionRef.current,
        start: "top 85%",
        duration: ANIM.duration.base,
        stagger: ANIM.stagger.base,
        ease: ANIM.ease.default,
      });

      return () => split?.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof initialForm, string>>
  >({});
  const [loading, setLoading] = useState(false);

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
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    try {
      setLoading(true);
      const payload = {
        name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone_number: String(form.phone_number),
        message: form.message,
      };
      const result = await submitAppointmentEnquiry(payload);
      if (result.success) {
        toast.success("Thank you! We'll be in touch shortly.");
        setForm(initialForm);
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact-form" className="px-6 py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div ref={sectionRef} className="w-full">
          <h2
            ref={headingRef}
            className="type-h2 font-semibold text-primary-dark"
          >
            Your Questions? <br /> Answered
          </h2>

          <p className="mt-4 type-body max-w-md">
            Tell us how we may help, and our team will respond with care.
            Whether it is a question, a special request or the beginning of a
            reservation, we are delighted to assist.
          </p>
          <div className="mt-4 space-y-4 border-t flex flex-col justify-end border-white/20 pt-4">
            <SubHeading className="text-primary-dark mb-4">Find Us</SubHeading>
            <div className="uppercase">
              <div className="type-body font-arizona-flare-regular">
                The Beach Hotel
              </div>
              <div className="type-body font-arizona-flare-regular">
                Beach Road, Kanyakumari,
                <br />
                Tamil Nadu 629702, India
              </div>
            </div>

            <div className="space-y-1">
              <div>
                <span className="type-label-sm font-medium uppercase">
                  General Enquiries :
                </span>{" "}
                <Link
                  href="mailto:info@thebeachhotel.com"
                  className="type-body hover:underline"
                >
                  info@thebeachhotel.com
                </Link>
              </div>

              <div>
                <span className="type-label-sm font-medium uppercase">
                  Reception :
                </span>{" "}
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
            <SubHeading className="text-primary-dark mb-4">
              Follow Us
            </SubHeading>

            <SocialIconLinks variant="light" />
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
              <FormField
                variant="underline"
                label="First Name*"
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                error={errors.first_name}
              />
              <FormField
                variant="underline"
                label="Last Name*"
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                error={errors.last_name}
              />
            </div>

            {/* Row 2 — Email */}
            <FormField
              variant="underline"
              label="Email*"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* Row 3 — Phone */}
            <FormField
              variant="underline"
              label="Phone*"
              type="tel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              maxLength={10}
              error={errors.phone_number}
            />

            {/* Row 4 — Message */}
            <FormField
              variant="underline"
              as="textarea"
              label="Message*"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={2}
              error={errors.message}
            />

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
              <p className="type-label-sm text-red-400 -mt-4">
                {errors.consent}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white type-label uppercase tracking-[0.12em] py-3.5 hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Sending…" : "Submit Request"}
            </button>

            <div className="type-label text-primary-dark/50">
              Your details are kept private and used only to respond to your
              enquiry. We look forward to welcoming you.
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
