"use client";

import Image from "next/image";
import { useState } from "react";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";
import { submitContactEnquiry } from "@/src/service/contact";

const INPUT_CLASS =
    "w-full border-b border-white/10 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none";

const initialForm = {
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
    message: "",
    consent: false,
};

export default function ContactSection() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!form.full_name.trim() || !form.email.trim() || !form.phone_number.trim()) {
            setError("Full name, email, and mobile number are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(form.phone_number)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!form.consent) {
            setError("Please accept the terms to proceed.");
            return;
        }

        try {
            setLoading(true);
            const result = await submitContactEnquiry({
                full_name: form.full_name,
                email: form.email,
                phone_number: form.phone_number,
                location: form.location,
                message: form.message,
            });

            if (result.success) {
                setSuccess(true);
                setForm(initialForm);
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/home/hero-1.webp"
                    alt="Luxury Room"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <Section className="relative z-10 py-16 lg:py-20">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">
                            Enquire
                        </p>
                        <h2
                            className={`max-w-xl font-semibold leading-tight text-white ${typography.textFiXl}`}
                        >
                            Reserve Your Moment of Quiet Luxury
                        </h2>
                        <p className="mt-4 text-sm text-white/80 max-w-sm leading-relaxed">
                            A quiet moment away from the coast is all it takes to begin your journey. Share your details and our team will respond with care.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="lg:flex lg:justify-end">
                        <div className="w-full lg:max-w-lg overflow-hidden  bg-primary/62 p-4 shadow-lg backdrop-blur-md lg:p-6">
                            <h3
                                className={` font-semibold text-white ${typography.textTwoXl}`}
                            >
                                Prefer to Message Us?
                            </h3>
                            <p className="mt-2 text-xs text-white">
                                Fill out the form, and our team will get back to
                                you as soon as possible.
                            </p>

                            {success ? (
                                <div className="mt-8 rounded bg-white/10 p-4 text-center text-sm text-white">
                                    Thank you! We&apos;ll get back to you shortly.
                                </div>
                            ) : (
                                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Full name"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        className={INPUT_CLASS}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={INPUT_CLASS}
                                    />
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        placeholder="Mobile number"
                                        value={form.phone_number}
                                        onChange={handleChange}
                                        maxLength={10}
                                        className={INPUT_CLASS}
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        value={form.location}
                                        onChange={handleChange}
                                        className={INPUT_CLASS}
                                    />
                                    <textarea
                                        rows={2}
                                        name="message"
                                        placeholder="Message"
                                        value={form.message}
                                        onChange={handleChange}
                                        className={`${INPUT_CLASS} resize-none`}
                                    />

                                    <label className="flex items-start gap-3 text-xs text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="consent"
                                            checked={form.consent}
                                            onChange={handleChange}
                                            className="mt-1"
                                        />
                                        <span>
                                            I agree to be contacted by the team regarding
                                            my enquiry. My information will be handled
                                            in accordance with the privacy policy.
                                        </span>
                                    </label>

                                    {error && (
                                        <p className="text-sm text-red-300">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="h-10 w-full rounded bg-accent font-medium text-primary transition hover:opacity-90 disabled:opacity-60"
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}
