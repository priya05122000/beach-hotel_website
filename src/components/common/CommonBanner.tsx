import Image from 'next/image'
import React from 'react'

const CommonBanner = ({
    title,
    src = "/home/hero-1.webp",
    className = "h-110",
}: {
    title: string;
    src?: string;
    className?: string;
}) => {
    return (
        <div className='relative w-full'>
            <Image
                src={src}
                alt=""
                width={1600}
                height={900}
                quality={90}
                sizes="100vw"
                className={`object-cover ${className}`}
            />
            <div className='absolute inset-x-0 z-10 bottom-10 flex justify-center text-white'>
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
        </div>
    )
}

export default CommonBanner
