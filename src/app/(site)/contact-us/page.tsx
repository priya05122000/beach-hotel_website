import HeroLocationSection from "./components/HeroLocationSection";
import LocationSection from "./components/LocationSection";
import NearbyLocationsSection from "./components/NearbyLocationsSection";
import TrustedBySection from "./components/TrustedBySection";
import ContactFormSection from "./components/ContactFormSection";

const page = () => {
  return (
    <div className="pt-20 md:pt-18">
      <HeroLocationSection />
      <NearbyLocationsSection />
      <ContactFormSection />
      <TrustedBySection />
      <LocationSection />
    </div>
  );
};

export default page;
