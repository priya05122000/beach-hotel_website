import Section from '@/src/components/common/Section'
import { getNearbyDestinationData } from '@/src/service/nearbyDestination'
import { typography } from '@/src/lib/typography'
import type { NearbyDestination } from '@/src/types'
import Image from 'next/image'
import React from 'react'

const FALLBACK_IMG = '/home/hero-1.webp'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

const bgClasses = ['bg-accent/46', 'bg-accent/32', 'bg-accent/17', 'bg-accent/6']

const gradientBase =
    'p-0.75 bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)] bg-size-[250%] bg-left duration-1000 transition-all hover:bg-right shadow-xl'

type ImageCardProps = {
    src: string
    alt?: string
    heightClass?: string
}

const ImageCard: React.FC<ImageCardProps> = ({
    src,
    alt = "",
    heightClass = "",
}) => {
    const classes = `relative ${heightClass} min-h-0 group overflow-hidden rounded-[14px] ${gradientBase}`;

    return (
        <div className={classes}>
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover p-0.5 rounded-xl"
            />
        </div>
    );
};

function parseImages(imageUrl?: string | string[] | null): [string, string, string] {
    let raw: string[] = []

    if (Array.isArray(imageUrl)) {
        raw = imageUrl
    } else if (typeof imageUrl === 'string' && imageUrl.trim().startsWith('[')) {
        try { raw = JSON.parse(imageUrl) } catch { raw = [] }
    } else if (imageUrl) {
        raw = [imageUrl]
    }

    const toSrc = (v?: string) =>
        v && v.trim()
            ? `${BASE_URL}/${v}`
            : FALLBACK_IMG;

    return [toSrc(raw[0]), toSrc(raw[1]), toSrc(raw[2])]
}

type ContentProps = { destination: NearbyDestination }

const LeftContent: React.FC<ContentProps> = ({ destination }) => (
    <div className="order-1 lg:col-span-4 flex flex-col justify-center">
        {destination.destination_name && (
            <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold uppercase text-white w-fit">
                {destination.destination_name}
            </span>
        )}
        <h2
            className={`mt-6 lg:mt-8 max-w-xl font-semibold leading-tight text-primary ${typography.textFiXl}`}
        >
            {destination.short_description}
        </h2>

        <div
            className={`mt-4 max-w-sm text-primary ${typography.textLg} prose`}
            dangerouslySetInnerHTML={{ __html: destination.description ?? '' }}
        />

    </div>
)

type GalleryProps = { images: [string, string, string]; alt: string }

const Gallery: React.FC<GalleryProps> = ({ images, alt }) => (


   <div className="order-2 lg:order-1 lg:col-span-8 h-full">
        {/* Mobile: single stacked column */}
        <div className="flex flex-col gap-3 h-64 sm:h-80 min-h-64 lg:hidden">
            <ImageCard src={images[0]} alt={alt} heightClass="flex-1" />
        </div>

        {/* Desktop: original 2-column grid */}
        <div className="hidden lg:grid grid-cols-12 gap-3 h-full min-h-[420px]">
            <div className="col-span-5 flex flex-col gap-3 h-full min-h-0">
                <ImageCard src={images[0]} alt={alt} heightClass="flex-1" />
                <ImageCard src={images[1]} alt={alt} heightClass="flex-1" />
            </div>
            <div className="col-span-7 h-full min-h-0">
                <ImageCard src={images[2]} alt={alt} heightClass="h-full" />
            </div>
        </div>
    </div>
)

const DestinationHighlight = async () => {
    const { data: destinations } = await getNearbyDestinationData()

    console.log(destinations)
    return (
        <>
            {destinations.map((destination, i) => {
                const reverse = i % 2 !== 0
                const bgClass = bgClasses[i % bgClasses.length]
                const images = parseImages(destination.image_url)

                  console.log("Image URL:", images[0])
    console.log("All Images:", images)


                return (
                    <section key={destination.id} className={`${bgClass} py-12 lg:py-20`}>
                        <Section>
                            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch">
                                {reverse ? (
                                    <>
                                        <Gallery images={images} alt={destination.destination_name} />
                                        <LeftContent destination={destination} />
                                    </>
                                ) : (
                                    <>
                                        <LeftContent destination={destination} />
                                        <Gallery images={images} alt={destination.destination_name} />
                                    </>
                                )}
                            </div>
                        </Section>
                    </section>
                )
            })}
        </>
    )
}

export default DestinationHighlight
