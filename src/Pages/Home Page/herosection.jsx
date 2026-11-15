import React, { useState } from "react";
import "./herosection.css";
import heroBg from "./herosectionbg.png";

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

  return (
    <div className="hs-page">
      <header className="hs-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <nav className="hs-nav" aria-label="Main">
          <ul id="hs-mobile-menu" className={menuOpen ? "is-open" : ""}>
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href="#" onClick={() => setMenuOpen(false)}>{l}</a>
              </li>
            ))}
          </ul>
          <a className="hs-btn hs-nav-cta" href="#">
            Schedule a Visit <Arrow />
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
          <h1>
            Exceptional Properties.
            <br />
            Extraordinary Living.
          </h1>
          <p className="hs-lede">
            Discover exceptional residences across
            <br />
            America's most desirable markets.
          </p>
          <div className="hs-ctas">
            <a className="hs-btn hs-primary" href="#">
              Explore Properties <Arrow />
            </a>
            <a className="hs-ghost" href="#">
              <i>
                <Icon>
                  <path d="M2 12l5-3 4 3 4-3 7 4M7 9V6M15 9V6" />
                </Icon>
              </i>
              Meet Our Advisors
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
                <Icon className="hs-pin" strokeWidth="1.8">
                  <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </Icon>
                <input id="hs-loc" placeholder="Enter Location" />
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

          <a className="hs-btn hs-search-btn" href="#">
            Search Properties <Arrow />
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