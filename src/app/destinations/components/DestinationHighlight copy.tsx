import Section from '@/src/components/common/Section'
import { typography } from '@/src/lib/typography'
import Image from 'next/image'
import React from 'react'

const gradientBase =
    'p-0.75 bg-[linear-gradient(to_right,#040286,#FF992AC2,#040286,#040286,#FF992AC2,#040286)] bg-size-[250%] bg-left duration-1000 transition-all hover:bg-right shadow-xl'

type ImageCardProps = {
    src: string
    alt?: string
    heightClass?: string
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt = '', heightClass = '' }) => {
    const classes = `relative ${heightClass} min-h-0 group overflow-hidden rounded-md ${gradientBase}`
    return (
        <div className={classes}>
            <Image src={src} alt={alt} fill className="object-cover p-1" />
        </div>
    )
}

const LeftContent: React.FC = () => (
    <div className="order-1  lg:col-span-4 flex flex-col justify-center">
        <span className="rounded bg-primary px-3 py-1 text-xs font-semibold uppercase text-white font-marcellus w-fit">
            Waterfalls
        </span>

        <h2
            className={`mt-6 lg:mt-8 max-w-xl font-marcellus font-semibold leading-tight text-primary ${typography.textFiXl}`}
        >
            Step Out Of Bed And Straight Onto The Sun-Kissed Sands Of Kanyakumari.
        </h2>

        <p className={`mt-4 max-w-sm text-primary ${typography.textLg}`}>
            Hotel facilities are designated spaces and services designed to enhance the guest
            experience, distinct from individual room amenities. Key offerings include 24-hour
            reception, swimming pools, fitness centers, restaurants/bars, meeting rooms, and parking.
        </p>
    </div>
)

const Gallery: React.FC = () => (
    <div className="order-2 lg:order-1 lg:col-span-8 h-full">
        {/* Mobile: single stacked column */}
        <div className="flex flex-col gap-3 h-64 sm:h-80 lg:hidden">
            <ImageCard src="/home/hero-1.webp" heightClass="flex-1" />
        </div>

        {/* Desktop: original 2-column grid */}
        <div className="hidden lg:grid grid-cols-12 gap-3 h-full">
            <div className="col-span-5 flex flex-col gap-3 h-full min-h-0">
                <ImageCard src="/home/hero-1.webp" heightClass="flex-1" />
                <ImageCard src="/home/hero-1.webp" heightClass="flex-1" />
            </div>
            <div className="col-span-7 h-full min-h-0">
                <ImageCard src="/home/hero-1.webp" heightClass="h-full" />
            </div>
        </div>
    </div>
)

const sections = [
    { bgClass: 'bg-accent/46', reverse: false },
    { bgClass: 'bg-accent/32', reverse: true },
    { bgClass: 'bg-accent/17', reverse: false },
    { bgClass: 'bg-accent/6', reverse: true },
]

const DestinationHighlight = () => {
    return (
        <>
            {sections.map((s, i) => (
                <section key={i} className={`${s.bgClass} py-12 lg:py-20`}>
                    <Section>
                        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch">
                            {s.reverse ? (
                                <>
                                    <Gallery />
                                    <LeftContent />
                                </>
                            ) : (
                                <>
                                    <LeftContent />
                                    <Gallery />
                                </>
                            )}
                        </div>
                    </Section>
                </section>
            ))}
        </>
    )
}

export default DestinationHighlight
