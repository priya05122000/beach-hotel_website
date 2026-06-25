"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { submitContactEnquiry } from "@/src/service/contact";

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

export default function ContactFormSection() {
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
      const result = await submitContactEnquiry({
        full_name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone_number: form.phone_number,
        location: "",
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
    <Section id="contact-form" className="bg-primary py-16 lg:py-20">
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2
          className={`font-semibold leading-tight text-white ${typography.textFoXl}`}
        >
          Need More Information? <br /> Get in Touch
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full md:w-100 xl:w-120">
          <p className="text-white/60 text-sm leading-relaxed">
            Leave a request and we will consult you on available rooms and
            packages.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6 w-full md:w-100 xl:w-120"
        >
          {/* Row 1 — First / Last name */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-medium">
                First Name*
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="bg-transparent border-0 border-b border-white/25 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors duration-200"
              />
              {errors.first_name && (
                <p className="text-[11px] text-red-400 mt-0.5">
                  {errors.first_name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-medium">
                Last Name*
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="bg-transparent border-0 border-b border-white/25 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors duration-200"
              />
              {errors.last_name && (
                <p className="text-[11px] text-red-400 mt-0.5">
                  {errors.last_name}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 — Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-medium">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border-0 border-b border-white/25 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors duration-200"
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>
            )}
          </div>

          {/* Row 3 — Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-medium">
              Phone*
            </label>
            <input
              type="tel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              maxLength={10}
              className="bg-transparent border-0 border-b border-white/25 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors duration-200"
            />
            {errors.phone_number && (
              <p className="text-[11px] text-red-400 mt-0.5">
                {errors.phone_number}
              </p>
            )}
          </div>

          {/* Row 4 — Message */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-[0.12em] text-white/50 font-medium">
              Message*
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={2}
              className="bg-transparent border-0 border-b border-white/25 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors duration-200 resize-none"
            />
            {errors.message && (
              <p className="text-[11px] text-red-400 mt-0.5">
                {errors.message}
              </p>
            )}
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 text-xs text-white/40 cursor-pointer">
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
            <p className="text-[11px] text-red-400 -mt-4">{errors.consent}</p>
          )}

          {serverError && <p className="text-sm text-red-400">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-primary text-sm font-semibold uppercase tracking-[0.12em] py-3.5 rounded-sm hover:bg-white/90 transition-colors duration-200 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Sending…" : "Submit Request"}
          </button>
        </form>
      </div>
    </Section>
  );
}
