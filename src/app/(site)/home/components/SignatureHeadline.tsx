import Section from "@/src/components/common/Section";

const SignatureHeadline = () => {
    return (
        <Section>

            <section className="pt-16 pb-0 lg:pt-40 lg:pb-20">
                <div className="mx-auto max-w-280 text-center">
                    {/* Only the first phrase is the page's <h1> (inline, so the
                        headline looks unchanged). The full sentence is ~118
                        chars; SEO audits flag an h1 over 70 ("H1: Over 70
                        Characters"). */}
                    <div
                        className="
          bg-[url('/home/ocean-water-texture.jpg')]
          bg-contain
          bg-clip-text
          text-transparent
          uppercase type-display-md
          font-bold
          text-center
          animate-glass
        "
                    >
                        <h1 className="inline">
                            Kanyakumari&apos;s most extraordinary{" "}
                            <span className="text-gray opacity-80">
                                luxury address
                            </span>
                        </h1>{" "}
                        — where every horizon is yours alone, at the meeting point of{" "}
                        <span className="text-gray opacity-80">
                            three oceans
                        </span>
                        .
                    </div>
                </div>
            </section>
        </Section>
    );
};

export default SignatureHeadline;
