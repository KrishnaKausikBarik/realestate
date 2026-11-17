import React, { useEffect, useState } from "react";
import "./herosection.css";
import heroBg from "./herosectionbg.webp";

import houseIcon from "./Icons/hugeicons_guest-house.svg";
import peopleIcon from "./Icons/bi_people.svg";
import buildingIcon from "./Icons/clarity_building-line.svg";
import awardIcon from "./Icons/basil_award-outline.svg";

const Icon = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const Arrow = () => (
  <Icon className="hs-arrow">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

const Chevron = () => (
  <Icon className="hs-chev" viewBox="0 0 12 12" strokeWidth="1.5">
    <path d="M2 4l4 4 4-4" />
  </Icon>
);

const NAV_LINKS = ["Properties", "About", "Agents", "Services", "Contact"];

const STATS = [
  { value: "1,200+", label: "Premium Properties", icon: houseIcon },
  { value: "3,200+", label: "Happy Clients", icon: peopleIcon },
  { value: "15+", label: "Years of Experience", icon: buildingIcon },
  { value: "Award Winning", label: "Real Estate Agency", icon: awardIcon },
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const detectLocation = () => {
    setLocationMessage("Detecting location…");
    if (!navigator.geolocation) {
      setLocationMessage("Location is unavailable");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationValue(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
        setLocationMessage("");
        setIsLocating(false);
      },
      (error) => {
        setLocationMessage(
          error.code === error.PERMISSION_DENIED
            ? "Allow location access to detect your location"
            : "Unable to detect location",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    );
  };

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      Object.assign(document.body.style, previousBodyStyles);
      document.documentElement.style.overflow = previousRootOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  return (
    <div className="hs-page">
      <header className="hs-hero">
        <div className="hs-hero-image" aria-hidden="true">
          <img src={heroBg} alt="" />
        </div>
        <nav className="hs-nav" aria-label="Main">
          <ul id="hs-mobile-menu" className={menuOpen ? "is-open" : ""}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={
                    l === "Properties"
                      ? "#featured-properties"
                      : l === "Services"
                        ? "#guidance-section"
                        : l === "Contact"
                          ? "#ct-heading"
                          : "#"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a className="hs-btn hs-nav-cta" href="#" data-magnetic>
            <span className="button-label" data-button-label>
              <span className="button-label-current">Schedule a Visit</span>
              <span className="button-label-next" aria-hidden="true">Schedule a Visit</span>
            </span>
            <Arrow />
          </a>
          <button
            className="hs-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="hs-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        <div className="hs-copy">
          <span className="hs-badge">Curated luxury real estate</span>
          <h1 aria-label="Exceptional Properties. Extraordinary Living.">
            <span className="hs-headline-line" aria-hidden="true">
              <span className="hs-headline-line-inner">
                <span className="hs-headline-word">Exceptional</span>{" "}
                <span className="hs-headline-word">Properties.</span>
              </span>
            </span>
            <span className="hs-headline-line" aria-hidden="true">
              <span className="hs-headline-line-inner">
                <span className="hs-headline-word">Extraordinary</span>{" "}
                <span className="hs-headline-word">Living.</span>
              </span>
            </span>
          </h1>
          <p className="hs-lede">
            Discover exceptional residences across
            <br />
            America's most desirable markets.
          </p>
          <div className="hs-ctas">
            <a className="hs-btn hs-primary" href="#" data-magnetic>
              <span className="button-label" data-button-label>
                <span className="button-label-current">Explore Properties</span>
                <span className="button-label-next" aria-hidden="true">Explore Properties</span>
              </span>
              <Arrow />
            </a>
            <a className="hs-ghost" href="#" data-magnetic>
              <i>
                <Icon>
                  <path d="M2 12l5-3 4 3 4-3 7 4M7 9V6M15 9V6" />
                </Icon>
              </i>
              <span className="button-label" data-button-label>
                <span className="button-label-current">Meet Our Advisors</span>
                <span className="button-label-next" aria-hidden="true">Meet Our Advisors</span>
              </span>
            </a>
          </div>
        </div>

        <form className="hs-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <button className="hs-go" type="button" aria-label="Search">
            <Icon strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </Icon>
          </button>

          <div className="hs-field">
            <label htmlFor="hs-loc">Location</label>
            <div className="hs-value">
              <span>
                <button
                  className="hs-location-detect"
                  type="button"
                  aria-label={isLocating ? "Detecting your location" : "Detect my location"}
                  title={isLocating ? "Detecting your location" : "Detect my location"}
                  onClick={detectLocation}
                  disabled={isLocating}
                >
                  <Icon className="hs-pin" strokeWidth="1.8">
                    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </Icon>
                </button>
                <input
                  id="hs-loc"
                  placeholder={locationMessage || "Enter Location"}
                  value={locationValue}
                  onChange={(event) => {
                    setLocationValue(event.target.value);
                    setLocationMessage("");
                  }}
                  onFocus={() => {
                    if (!locationValue && !isLocating && !locationMessage) {
                      detectLocation();
                    } else {
                      setLocationMessage("");
                    }
                  }}
                />
              </span>
              <Chevron />
            </div>
          </div>

          <div className="hs-field">
            <label htmlFor="hs-type">Property Type</label>
            <div className="hs-value">
              <select id="hs-type" defaultValue="All Type">
                <option>All Type</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Estate</option>
              </select>
              <Chevron />
            </div>
          </div>

          <div className="hs-field">
            <label htmlFor="hs-price">Price Range</label>
            <div className="hs-value">
              <select id="hs-price" defaultValue="$2M — $10M+">
                <option>$2M — $10M+</option>
                <option>$2M — $5M</option>
                <option>$5M — $10M</option>
                <option>$10M+</option>
              </select>
              <Chevron />
            </div>
          </div>

          <a className="hs-btn hs-search-btn" href="#" data-magnetic>
            <span className="button-label" data-button-label>
              <span className="button-label-current">Search Properties</span>
              <span className="button-label-next" aria-hidden="true">Search Properties</span>
            </span>
            <Arrow />
          </a>
        </form>
      </header>

      <section className="hs-stats" aria-label="Key figures">
        <ul>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <li className="hs-divider" aria-hidden="true" />}
              <li className="hs-stat">
                <span className="hs-ico">
                  <img src={s.icon} alt="" />
                </span>
                <div>
                  <strong>{s.value}</strong>
                  <small>{s.label}</small>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
}
