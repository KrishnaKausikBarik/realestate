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
import CustomCursor from "./customcursor"
import ScrollToTop from "./scrolltotop"
import "./buttoninteractions.css"

function HomePage() {
  const pageRef = useRef(null);
  const keepNativeEditingMenu = (event) => {
    if (event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    event.preventDefault();
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(pageRef);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const one = (selector, scope = pageRef.current) => scope?.querySelector(selector) || null;
      const all = (selector, scope = pageRef.current) => Array.from(scope?.querySelectorAll(selector) || []);
      const revealAtScroll = (target, from, to, options = {}) => {
        if (!target) return;
        gsap.fromTo(target, from, {
          ...to,
          scrollTrigger: {
            trigger: options.trigger || target,
            start: options.start || "top 84%",
            once: true,
          },
        });
      };

      // One connected entrance sequence for the first viewport.
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(one(".hs-nav"), { autoAlpha: 0, y: -12, duration: 0.65 })
        .from(one(".hs-badge"), { autoAlpha: 0, y: 12, duration: 0.55 }, "-=0.25")
        .from(all(".hs-headline-line-inner"), { yPercent: 110, duration: 0.9, stagger: 0.13 }, "-=0.08")
        .from(one(".hs-lede"), { autoAlpha: 0, y: 16, duration: 0.65 }, "-=0.2")
        .from(all(".hs-ctas > *"), { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.12 }, "-=0.12")
        .from(one(".hs-search"), { autoAlpha: 0, y: 24, duration: 0.75 }, "-=0.08");

      const heroImage = one(".hs-hero-image img");
      if (heroImage) {
        gsap.fromTo(heroImage, { scale: 1.07 }, { scale: 1.01, duration: 2.4, ease: "power2.out" });
      }

      const sectionIntro = (section, heading, description) => {
        const root = one(section);
        if (!root) return;
        const title = root.querySelector(heading);
        const copy = root.querySelector(description);
        const trigger = { trigger: root, start: "top 83%", once: true };
        if (title) {
          const lines = title.querySelectorAll(".gb-heading-line-inner");
          if (lines.length) {
            gsap.from(lines, { yPercent: 110, duration: 0.85, stagger: 0.12, ease: "power3.out", scrollTrigger: trigger });
          } else {
            gsap.fromTo(
              title,
              { autoAlpha: 0, y: 18, clipPath: "inset(0 0 100% 0)" },
              { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out", scrollTrigger: trigger },
            );
          }
        }
        if (copy) gsap.from(copy, { autoAlpha: 0, y: 14, duration: 0.65, delay: 0.12, ease: "power2.out", scrollTrigger: trigger });
      };

      sectionIntro(".fp-section", ".fp-head h2", ".fp-head p");
      sectionIntro(".da-section", "h2", ".da-sub");
      sectionIntro(".gb-section", ".gb-content h2", ".gb-text");
      sectionIntro(".tm-section", "h2", ".tm-sub");
      sectionIntro(".ct-section", ".ct-intro h2", ".ct-intro p");

      // Hero statistics arrive when their band enters view.
      const stats = one(".hs-stats");
      if (stats) {
        gsap.from(all(".hs-stat"), {
          autoAlpha: 0,
          y: 16,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: stats, start: "top 88%", once: true },
        });
      }

      // Each featured property reveals its image first, then the details.
      all(".fp-card").forEach((card) => {
        const image = card.querySelector(".fp-media");
        const details = card.querySelectorAll(".fp-meta, h3, .fp-price-row");
        const trigger = { trigger: card, start: "top 88%", once: true };
        if (image) {
          gsap.fromTo(
            image,
            { autoAlpha: 0.7, clipPath: "inset(100% 0 0 0)", scale: 1.035 },
            { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.05, ease: "power3.out", scrollTrigger: trigger },
          );
        }
        if (details.length) gsap.from(details, { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.1, delay: 0.58, ease: "power2.out", scrollTrigger: trigger });
      });

      // The destination gallery keeps its asymmetric layout while captions follow imagery.
      all(".da-card").forEach((card, index) => {
        const image = card.querySelector(".da-media");
        const caption = card.querySelector(".da-caption");
        const trigger = { trigger: card, start: "top 87%", once: true };
        if (image) {
          gsap.fromTo(
            image,
            { autoAlpha: 0.65, clipPath: "inset(100% 0 0 0)", scale: 1.035 },
            { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.05, delay: (index % 2) * 0.08, ease: "power3.out", scrollTrigger: trigger },
          );
        }
        if (caption) gsap.from(caption, { autoAlpha: 0, y: 12, duration: 0.55, delay: 0.62 + (index % 2) * 0.08, ease: "power2.out", scrollTrigger: trigger });
      });

      const advisorImage = one(".gb-bg");
      if (advisorImage) {
        revealAtScroll(
          advisorImage,
          { autoAlpha: 0.7, clipPath: "inset(0 100% 0 0)", scale: 1.035 },
          { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.15, ease: "power3.inOut" },
          { trigger: ".gb-section", start: "top 78%" },
        );
      }
      const advisorItems = all(".gb-list li");
      if (advisorItems.length) {
        gsap.from(advisorItems, {
          autoAlpha: 0,
          y: 12,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gb-list", start: "top 86%", once: true },
        });
      }
      revealAtScroll(one(".gb-btn"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, { trigger: ".gb-list", start: "top 86%" });

      const testimonialCards = all(".tm-card");
      if (testimonialCards.length) {
        gsap.from(testimonialCards, {
          autoAlpha: 0,
          y: 24,
          scale: 0.99,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tm-grid", start: "top 86%", once: true },
        });
      }

      // Keep form access quick while guiding attention from heading to fields to submit.
      const form = one(".ct-form");
      if (form) {
        const trigger = { trigger: form, start: "top 88%", once: true };
        gsap.from(form.querySelector(".ct-form-head"), { autoAlpha: 0, y: 10, duration: 0.45, ease: "power2.out", scrollTrigger: trigger });
        gsap.from(form.querySelectorAll(".ct-field"), { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.06, delay: 0.12, ease: "power2.out", scrollTrigger: trigger });
        gsap.from(form.querySelector(".ct-submit"), { autoAlpha: 0, y: 8, duration: 0.4, delay: 0.48, ease: "power2.out", scrollTrigger: trigger });
      }
      const contactSide = one(".ct-side");
      if (contactSide) {
        const trigger = { trigger: contactSide, start: "top 86%", once: true };
        gsap.from(contactSide.children, { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.09, ease: "power2.out", scrollTrigger: trigger });
        gsap.from(contactSide.querySelectorAll(".ct-contacts li"), { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.07, delay: 0.16, ease: "power2.out", scrollTrigger: trigger });
      }

      // Footer columns conclude the same reveal language with a restrained stagger.
      const footerColumns = all(".ft-grid > *");
      if (footerColumns.length) {
        const trigger = { trigger: one(".ft-grid"), start: "top 90%", once: true };
        gsap.from(footerColumns, { autoAlpha: 0, y: 18, duration: 0.65, stagger: 0.1, ease: "power2.out", scrollTrigger: trigger });
        gsap.from(all(".ft-socials a, nav.ft-col li, .ft-contact li"), {
          autoAlpha: 0,
          y: 8,
          duration: 0.4,
          stagger: 0.045,
          delay: 0.28,
          ease: "power2.out",
          scrollTrigger: trigger,
        });
      }
      revealAtScroll(one(".ft-bottom"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, { trigger: ".ft-bottom", start: "top 94%" });
    });

    const desktopMedia = gsap.matchMedia(pageRef);
    desktopMedia.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const one = (selector) => pageRef.current?.querySelector(selector) || null;
      const all = (selector) => Array.from(pageRef.current?.querySelectorAll(selector) || []);

      // Restrained parallax is limited to larger screens and selected large images.
      const heroImage = one(".hs-hero-image img");
      if (heroImage) {
        gsap.fromTo(heroImage, { yPercent: -4 }, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".hs-hero", start: "top top", end: "bottom top", scrub: 0.7 },
        });
      }
      const advisorImage = one(".gb-bg");
      if (advisorImage) {
        gsap.to(advisorImage, {
          yPercent: -3,
          ease: "none",
          scrollTrigger: { trigger: ".gb-section", start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      }
      all(".da-lg .da-media").forEach((image) => {
        gsap.to(image, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      });
    });

    return () => {
      media.revert();
      desktopMedia.revert();
    };
  }, []);

  return (
    <main ref={pageRef} onContextMenu={keepNativeEditingMenu}>
      <CustomCursor />
      <ScrollToTop />
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
