import { useEffect } from "react";
import HeroSection from "./herosection";
import FeaturedProperties from "./featuredproperties";
import DesirableAddresses from "./desirableaddresses"
import GuidanceSection from "./guidancesection"
import Testimonials from "./testimonials"
import ContactSection from "./contactsection"
import SiteFooter from "./sitefooter"

function HomePage() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-scroll-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    targets.forEach((target) => {
      const bounds = target.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        target.classList.add("is-visible");
      } else {
        observer.observe(target);
      }
    });

    document.documentElement.classList.add("scroll-reveal-ready");
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-ready");
    };
  }, []);

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