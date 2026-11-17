import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./herosection";
import FeaturedProperties from "./featuredproperties";
import DesirableAddresses from "./desirableaddresses"
import GuidanceSection from "./guidancesection"
import Testimonials from "./testimonials"
import ContactSection from "./contactsection"
import SiteFooter from "./sitefooter"

function HomePage() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const targets = gsap.utils.toArray("[data-scroll-reveal]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) return;

      targets.forEach((target, index) => {
        const fromX = index % 2 === 0 ? -64 : 64;

        gsap.fromTo(
          target,
          { autoAlpha: 0, x: fromX, y: 18, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef}>
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
