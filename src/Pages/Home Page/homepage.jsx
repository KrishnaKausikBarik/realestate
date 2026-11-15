import HeroSection from "./herosection";
import FeaturedProperties from "./featuredproperties";
import DesirableAddresses from "./desirableaddresses"
import GuidanceSection from "./guidancesection"
import Testimonials from "./testimonials"
import ContactSection from "./contactsection"
import SiteFooter from "./sitefooter"

function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <DesirableAddresses />
      <GuidanceSection/>
      <Testimonials/>
      <ContactSection/>
      <SiteFooter/>
    </main>
  );
}

export default HomePage;