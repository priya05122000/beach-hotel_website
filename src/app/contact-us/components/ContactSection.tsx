import Image from "next/image";
import Section from "@/src/components/common/Section";

export default function ContactSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/home/hero-1.png"
                    alt="Luxury Room"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <Section className="relative z-10 py-16 lg:py-20 lg:py-28">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="">
                        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">
                            Enquire
                        </p>

                        <h2 className="max-w-xl text-4xl font-semibold leading-tight text-white lg:text-6xl">
                            Step Out Of Bed
                            <br />
                            And Straight Onto
                            <br />
                            The Sun-Kissed
                            <br />
                            Sands Of
                            <br />
                            Kanyakumari.
                        </h2>
                    </div>

                    {/* Form Card */}
                    <div className=" lg:flex lg:justify-end">
                        <div className="w-full max-w-lg rounded-sm bg-[#4F4AA7]/90 p-8 backdrop-blur-md">
                            <h3 className="text-3xl font-semibold text-white">
                                Prefer to Message Us?
                            </h3>

                            <p className="mt-2 text-sm text-white">
                                Fill out the form, and our team will get back to
                                you as soon as possible.
                            </p>

                            <form className="mt-8 space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        className="w-full border-b border-white/20 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border-b border-white/20 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Mobile number"
                                        className="w-full border-b border-white/20 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="w-full border-b border-white/20 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        rows={3}
                                        placeholder="Message"
                                        className="w-full resize-none border-b border-white/20 bg-transparent pb-3 text-white placeholder:text-white focus:outline-none"
                                    />
                                </div>

                                <label className="flex items-start gap-3 text-xs text-white">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                    />

                                    <span>
                                        Our doctors provide expert medical
                                        advice and consultation for all your eye
                                        care needs. Get in touch with our team
                                        to discuss.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full rounded bg-accent py-4 font-medium text-white transition hover:opacity-90"
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