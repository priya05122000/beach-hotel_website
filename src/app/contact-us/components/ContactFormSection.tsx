"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import FormField from "@/src/components/ui/FormField";
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
    <section id="contact-form" className="bg-white py-16 lg:py-20">
      <Section>
        <div className="grid lg:grid-cols-[5fr_7fr] gap-6 items-stretch">
          <div className="bg-primary rounded-2xl p-8 lg:p-10 flex flex-col gap-6">
            <div>
              {/* Badge */}
              <span className="inline-block bg-accent text-primary text-[11px] font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-3">
                Contact Us
              </span>

              <h2
                className={`font-semibold leading-tight text-white ${typography.textFoXl}`}
              >
                Need More Information? Get in Touch
              </h2>

              <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-100">
                Contact us today for tailored hospitality experiences and expert
                advice. We&apos;re eager to make your stay memorable.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-200">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/40 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-200 whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="flex flex-col justify-center py-2 lg:px-6">
            <span className="inline-flex items-center self-start bg-silver/30 text-primary/60 text-[11px] font-medium px-3 py-1 rounded-full mb-2 tracking-wide">
              Get in touch
            </span>

            <h3
              className={`font-semibold text-primary leading-tight ${typography.textFoXl}`}
            >
              Send Message
            </h3>

            <p className="mt-1 mb-5 text-sm text-gray leading-relaxed max-w-md">
              Please fill out the form below with your details and message, and
              our team will get back to you as soon as possible.
            </p>

            {success ? (
              <div className="rounded-lg border border-accent/40 bg-accent/10 p-6 text-center">
                <p className="text-sm font-semibold text-primary">
                  Thank you! We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* Row 1 — First / Last name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    as="input"
                    type="text"
                    name="first_name"
                    placeholder="First Name*"
                    value={form.first_name}
                    onChange={handleChange}
                    error={errors.first_name}
                  />
                  <FormField
                    as="input"
                    type="text"
                    name="last_name"
                    placeholder="Last Name*"
                    value={form.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                  />
                </div>

                {/* Row 2 — Email / Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    as="input"
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <FormField
                    as="input"
                    type="tel"
                    name="phone_number"
                    placeholder="Phone*"
                    value={form.phone_number}
                    onChange={handleChange}
                    maxLength={10}
                    error={errors.phone_number}
                  />
                </div>

                {/* Row 3 — Message */}
                <FormField
                  as="textarea"
                  name="message"
                  placeholder="Write Message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  error={errors.message}
                />

                {/* Consent */}
                <label className="flex items-start gap-3 text-xs text-gray cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    className="mt-0.5 accent-primary"
                  />
                  <span>
                    I agree to be contacted by the team regarding my enquiry. My
                    information will be handled in accordance with the privacy
                    policy.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-red-500 -mt-2">
                    {errors.consent}
                  </p>
                )}

                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 self-start bg-accent text-primary text-sm font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </section>
  );
}
