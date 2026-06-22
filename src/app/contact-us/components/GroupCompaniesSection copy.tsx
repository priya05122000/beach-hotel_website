import Image from "next/image";
import Section from "@/src/components/common/Section";
import { typography } from "@/src/lib/typography";

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
        <section className="bg-primary/13 py-16 lg:py-20">
            <Section>
                {/* Top Content */}
                <div className="grid gap-6 lg:gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">

                        <p className="text-xs mb-2  uppercase tracking-[0.2em] text-primary">
                            Brands
                        </p>

                        <h3
                            className={`max-w-xl font-marcellus font-semibold leading-tight text-primary ${typography.textFiXl}`}
                        >
                            Our Group of Companies
                        </h3>
                    </div>

                    <div className="lg:col-span-7  lg:pt-8">
                        <p className={`max-w-4xl ${typography.textXl} leading-relaxed text-gray`}>
                            Hotel Sangam | Chennai Inn | Rameshwaram Grand |
                            Temple Citi AR Residency | Comorin Grand |
                            Hotel Seaview | Hotel Seaface Ocean Heritage |
                            Triveni Tourist Home | Gopinivas Grand
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {companies.map((company) => (
                        <div key={company.name}>
                            <div className="flex h-14  items-center  ">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={180}
                                    height={80}
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            <h3 className={`mt-6 lg:mt-8 text-2xl font-medium font-marcellus text-primary ${typography.textXl} `}>
                                {company.name}
                            </h3>

                            <p className={`mt-4 ${typography.textBase}  text-gray`}>
                                {company.address}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>
        </section>
    );
}