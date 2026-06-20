import Image from 'next/image'
import React from 'react'

const CommonBanner = () => {
    return (
        <div className='relative w-full'>
            <Image
                src="/home/hero-1.webp"
                alt=""
                width={1600}
                height={900}
                quality={90}
                sizes="100vw"
                className="object-cover h-110"
            />
            <div className='absolute inset-x-0 bottom-6 flex justify-center text-white'>
                <span className="text-2xl font-semibold">About Us</span>
            </div>
        </div>
    )
}

export default CommonBanner
