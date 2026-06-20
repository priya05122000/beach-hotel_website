import Section from '@/src/components/common/Section'
import { getNearbyDestinationData } from '@/src/service/nearbyDestination'
import { typography } from '@/src/lib/typography'
import type { NearbyDestination } from '@/src/types'
import Image from 'next/image'
import React from 'react'

const FALLBACK_IMG = '/home/hero-1.webp'

const bgClasses = ['bg-accent/46', 'bg-accent/32', 'bg-accent/17', 'bg-accent/6']

const gradientBase =
    'p-0.75 bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)] bg-size-[250%] bg-left duration-1000 transition-all hover:bg-right shadow-xl'

type ImageCardProps = {
    src: string
    alt?: string
    heightClass?: string
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt = '', heightClass = '' }) => {
    const classes = `relative ${heightClass} min-h-0 group overflow-hidden rounded-[14px] ${gradientBase}`
    return (
        <div className={classes}>
            <Image src={src} alt={alt} fill className="object-cover p-1" />
        </div>
    )
}

function parseImages(imageUrl?: string | string[]): [string, string, string] {
    const imgs = Array.isArray(imageUrl) ? imageUrl : imageUrl ? [imageUrl] : []
    return [imgs[0] ?? FALLBACK_IMG, imgs[1] ?? FALLBACK_IMG, imgs[2] ?? FALLBACK_IMG]
}

type ContentProps = { destination: NearbyDestination }

const LeftContent: React.FC<ContentProps> = ({ destination }) => (
    <div className="order-1 lg:col-span-4 flex flex-col justify-center">
        {destination.tag_name && (
            <span className="rounded bg-primary px-3 py-1 text-xs font-semibold uppercase text-white w-fit">
                {destination.tag_name}
            </span>
        )}

        <h2
            className={`mt-6 lg:mt-8 max-w-xl font-semibold leading-tight text-primary ${typography.textFiXl}`}
        >
            {destination.title}
        </h2>

        {(destination.short_description || destination.description) && (
            <p className={`mt-4 max-w-sm text-primary ${typography.textLg}`}>
                {destination.short_description ?? destination.description}
            </p>
        )}
    </div>
)

type GalleryProps = { images: [string, string, string]; alt: string }

const Gallery: React.FC<GalleryProps> = ({ images, alt }) => (
    <div className="order-2 lg:order-1 lg:col-span-8 h-full">
        {/* Mobile: single stacked column */}
        <div className="flex flex-col gap-3 h-64 sm:h-80 lg:hidden">
            <ImageCard src={images[0]} alt={alt} heightClass="flex-1" />
        </div>

        {/* Desktop: original 2-column grid */}
        <div className="hidden lg:grid grid-cols-12 gap-3 h-full">
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

    return (
        <>
            {destinations.map((destination, i) => {
                const reverse = i % 2 !== 0
                const bgClass = bgClasses[i % bgClasses.length]
                const images = parseImages(destination.image_url)

                return (
                    <section key={destination.id} className={`${bgClass} py-12 lg:py-20`}>
                        <Section>
                            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch">
                                {reverse ? (
                                    <>
                                        <Gallery images={images} alt={destination.title} />
                                        <LeftContent destination={destination} />
                                    </>
                                ) : (
                                    <>
                                        <LeftContent destination={destination} />
                                        <Gallery images={images} alt={destination.title} />
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
