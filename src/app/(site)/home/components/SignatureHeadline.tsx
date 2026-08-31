import Section from "@/src/components/common/Section";

const SignatureHeadline = () => {
    return (
        <Section>

            <section className="pt-16 pb-0 lg:pt-40 lg:pb-20">
                <div className="mx-auto max-w-280 text-center">
                    <h1
                        className="
          bg-[url('/home/jdjflkajs.jpg')]
          bg-contain
          bg-clip-text
          text-transparent
          uppercase type-display-md
          font-bold
          text-center
          animate-glass
        "
                    >
                        Kanniyakumari&apos;s most extraordinary{" "}
                        <span className="text-gray opacity-80">
                            luxury address
                        </span>{" "}
                        — where every horizon is yours alone, at the meeting point of{" "}
                        <span className="text-gray opacity-80">
                            three oceans
                        </span>
                        .
                    </h1>
                </div>
            </section>
        </Section>
    );
};

export default SignatureHeadline;
