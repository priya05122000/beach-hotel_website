import Image from "next/image";
import Section from "@/src/components/common/Section";

const companies = [
    {
        name: "Seashore & Co",
        logo: "/contact-us/seashore.png",
        address:
            "2/12, East Car Street, Kanyakumari, Tamilnadu, India - 629702",
    },
    {
        name: "GT Holidays Pvt LTD",
        logo: "/contact-us/follicle.png",
        address:
            "No.1, Gemini Parsn, Kodambakkam High Road, Nungambakkam, Chennai - 600006 Tamil Nadu, India.",
    },
    {
        name: "Sri Maniya College",
        logo: "/contact-us/srimaniya.png",
        address:
            "No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu - 629702.",
    },
    {
        name: "Follicle",
        logo: "/contact-us/gtholidays.png",
        address:
            "NO 2/75, Customs Colony, Opp To Jain College, Omr Service Road Elliamman Nagar, Thoraipakkam-600097",
    },
];

export default function GroupCompaniesSection() {
    return (
        <section className="bg-primary/13 py-20">
            <Section>
                {/* Top Content */}
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                            Brands
                        </p>

                        <h2 className="text-4xl font-semibold leading-tight text-primary lg:text-6xl">
                            Our Group Of
                            <br />
                            Companies
                        </h2>
                    </div>

                    <div className="lg:col-span-8 lg:pt-10">
                        <p className="max-w-4xl text-2xl leading-relaxed text-neutral-500">
                            Hotel Sangam | Chennai Inn | Rameshwaram Grand |
                            Temple Citi AR Residency | Comorin Grand |
                            Hotel Seaview | Hotel Seaface Ocean Heritage |
                            Triveni Tourist Home | Gopinivas Grand
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {companies.map((company) => (
                        <div key={company.name}>
                            <div className="flex h-28 items-center  ">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={180}
                                    height={80}
                                    className="h-auto w-auto object-contain"
                                />
                            </div>

                            <h3 className="mt-8 text-2xl font-medium text-primary">
                                {company.name}
                            </h3>

                            <p className="mt-4 text-base leading-relaxed text-neutral-500">
                                {company.address}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>
        </section>
    );
}