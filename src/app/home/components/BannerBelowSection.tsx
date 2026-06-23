import { typography } from '@/src/lib/typography'
import Image from 'next/image'

const BannerBelowSection = () => {
    return (
        <>
            {/* Bottom Content */}
            <div className="flex h-[50vh] items-center justify-center bg-primary px-4 text-white relative overflow-hidden">
                <div className="pointer-events-none absolute bottom-0 sm:-bottom-2 lg:-bottom-4 xl:-bottom-6">
                    <Image
                        src="/home/thebeach_hotel.svg"
                        alt="The Beach Hotel"
                        width={1920}
                        height={1200}
                        className="w-full h-full object-cover "
                    />
                </div>

                <div className="z-0 text-center">
                    <h1 className={`${typography.textTwoXl} font-bold uppercase`}>
                        The Beach Hotel
                    </h1>

                    <p className="mt-2 text-sm max-w-80 text-white font-extralight uppercase  ">
                        Erumanayakkanpatti Beach Road, Kanyakumari 629702, India
                    </p>

                    <p className="mt-2 text-sm max-w-80 text-white font-extralight uppercase  ">
                        +91 23456 78654 | +91 43567 86547
                    </p>

                </div>
            </div>
        </>
    )
}

export default BannerBelowSection
