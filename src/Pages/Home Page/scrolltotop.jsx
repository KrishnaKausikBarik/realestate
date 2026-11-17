import { useEffect, useState } from "react";
import "./scrolltotop.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hs-hero");
    if (!hero) return undefined;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(!entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    const updateVisibility = () => {
      setIsVisible(hero.getBoundingClientRect().bottom <= 0);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      className={`scroll-top${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg className="scroll-top-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
