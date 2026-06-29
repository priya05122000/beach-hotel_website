import AboutUs from './components/AboutUs'
import FAQAboutSection from './components/FAQAboutSection'
import ParallaxGallery from './components/ParallaxGallery'
import StatementSection from './components/StatementSection'
import { getFaqData } from '@/src/service/faqs'
import TeamSection from './components/TeamSection'

export default async function page() {
    const faqData = await getFaqData()

    return (
        <>
            <AboutUs />
            <ParallaxGallery />
            <StatementSection />
            <TeamSection />
            <FAQAboutSection faqs={faqData.data.slice(0, 8)} />
        </>
    )
}
