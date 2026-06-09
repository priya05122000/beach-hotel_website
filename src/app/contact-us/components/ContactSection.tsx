import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

const INPUT_CLASS =
    "w-full border-b border-white/10 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none";

const FORM_FIELDS = [
    { type: "text", placeholder: "Full name" },
    { type: "email", placeholder: "Email" },
    { type: "tel", placeholder: "Mobile number" },
    { type: "text", placeholder: "Location" },
];

export default function ContactSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/home/hero-1.png"
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
                            className={`max-w-xl font-arizona font-semibold leading-tight text-white ${typography.textFiXl}`}
                        >
                            Step Out Of Bed And Straight Onto The Sun-Kissed Sands
                            Of Kanyakumari.
                        </h2>
                    </div>

                    {/* Form Card */}
                    <div className="lg:flex lg:justify-end">
                        <div className="w-full lg:max-w-lg overflow-hidden rounded-sm bg-primary/62 p-4 shadow-lg backdrop-blur-md lg:p-6">
                            <h3
                                className={`font-arizona font-semibold text-white ${typography.textTwoXl}`}
                            >
                                Prefer to Message Us?
                            </h3>

                            <p className="mt-2 text-xs text-white">
                                Fill out the form, and our team will get back to
                                you as soon as possible.
                            </p>

                            <form className="mt-8 space-y-6">
                                {FORM_FIELDS.map((field) => (
                                    <input
                                        key={field.placeholder}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className={INPUT_CLASS}
                                    />
                                ))}

                                <textarea
                                    rows={2}
                                    placeholder="Message"
                                    className={`${INPUT_CLASS} resize-none`}
                                />

                                <label className="flex items-start gap-3 text-xs text-white">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                    />

                                    <span>
                                        Our doctors provide expert medical advice
                                        and consultation for all your eye care
                                        needs. Get in touch with our team to
                                        discuss.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className="h-10 w-full rounded bg-accent font-medium text-white transition hover:opacity-90"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Section>
        </section>
    );
}