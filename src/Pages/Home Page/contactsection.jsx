import { useState } from "react";
import "./contactsection.css";

const INTERESTS = ["Buying", "Selling", "Investment", "Rental"];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const OFFICES = [
  { city: "New York", place: "Madison Ave Atelier" },
  { city: "Beverly Hills", place: "Rodeo Private Suite" },
  { city: "Miami", place: "Brickell Bay Penthouse" },
];

const Svg = ({ children, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default function ContactSection() {
  const [interest, setInterest] = useState("Buying");
  const [preferredDate, setPreferredDate] = useState("");
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const openDatePicker = (e) => {
    if (typeof e.currentTarget.showPicker !== "function") return;
    try {
      e.currentTarget.showPicker();
    } catch {
      // The native input remains interactive when showPicker is unavailable or blocked.
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log({ ...data, interest }); // connect this to your backend / email service
  };

  return (
    <section className="ct-section" aria-labelledby="ct-heading">
      <div className="ct-grid">
        {/* ---------- left: intro ---------- */}
        <div className="ct-intro" data-scroll-reveal>
          <h2 id="ct-heading">
            Let’s Find Your
            <br />
            Next Address
          </h2>
          <p>
            Tell us what you’re looking for, and let’s begin a private conversation about your
            next property.
          </p>
          <div className="ct-stats">
            <div>
              <span>Discretion Standard</span>
              <strong>100% NDA</strong>
            </div>
            <div>
              <span>Advisory Reach</span>
              <strong>Tier-1 Global</strong>
            </div>
          </div>
        </div>

        {/* ---------- center: form ---------- */}
        <form className="ct-form" onSubmit={handleSubmit} data-scroll-reveal>
          <div className="ct-form-head">
            <span className="ct-badge">
              <Svg>
                <path d="M4 5h11v8H8l-4 3zM17 9h3v8l-3-2h-5v-2" />
              </Svg>
            </span>
            <div>
              <strong>We’re here to help.</strong>
              <span>Direct concierge intake for acquisitions, private sales, and advisory.</span>
            </div>
          </div>

          <label className="ct-field">
            <span>
              Full Name <i>*</i>
            </span>
            <input name="name" type="text" placeholder="e.g. Eleanor Vance" required />
          </label>

          <label className="ct-field">
            <span>
              Email Address <i>*</i>
            </span>
            <input name="email" type="email" placeholder="e.g. evance@holdings.com" required />
          </label>

          <label className="ct-field">
            <span>Phone Number</span>
            <input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </label>

          <div className="ct-field">
            <span>Property Interest</span>
            <div className="ct-tabs" role="radiogroup" aria-label="Property interest">
              {INTERESTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={interest === t}
                  className={interest === t ? "is-active" : ""}
                  onClick={() => setInterest(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <select
              className="ct-interest-select"
              name="interest"
              aria-label="Property interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              {INTERESTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="ct-row">
            <label className="ct-field" htmlFor="ct-date">
              <span id="ct-date-label">Preferred Date</span>
              <div className={`ct-date-control${preferredDate ? " has-date" : " is-empty"}`}>
                <input
                  id="ct-date"
                  name="date"
                  type="date"
                  min={minDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  onFocus={openDatePicker}
                  onClick={openDatePicker}
                  aria-labelledby="ct-date-label"
                />
                {!preferredDate && <span aria-hidden="true">Select a date</span>}
                <Svg className="ct-date-icon">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </Svg>
              </div>
            </label>
            <label className="ct-field">
              <span>Preferred Time</span>
              <select name="time" defaultValue="">
                <option value="" disabled>
                  Select a time
                </option>
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="ct-field">
            <span>Your Message</span>
            <textarea
              name="message"
              rows="3"
              placeholder="Describe your architectural preferences, location criteria, or transaction timeline..."
            />
          </label>

          <button className="ct-submit" type="submit">
            Schedule a Consultation
            <Svg className="ct-arrow">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </Svg>
          </button>

          <p className="ct-note">
            <Svg>
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </Svg>
            All inquiries are handled under strict non-disclosure.
          </p>
        </form>

        {/* ---------- right: direct contact ---------- */}
        <aside className="ct-side" data-scroll-reveal>
          <span className="ct-eyebrow">Immediate Access</span>
          <h3>Prefer a direct conversation?</h3>
          <p className="ct-side-text">
            Private Advisory — Speak directly with our luxury property advisory team.
          </p>

          <hr />

          <ul className="ct-contacts">
            <li>
              <span className="ct-ico">
                <Svg>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </Svg>
              </span>
              <div>
                <small>Private Desk</small>
                <a href="mailto:advisory@vfdigitaldesigns.luxury">advisory@vfdigitaldesigns.luxury</a>
              </div>
            </li>
            <li>
              <span className="ct-ico">
                <Svg>
                  <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </Svg>
              </span>
              <div>
                <small>Direct Line</small>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
            </li>
            <li>
              <span className="ct-ico">
                <Svg>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </Svg>
              </span>
              <div>
                <small>Consultation Hours</small>
                <p>Monday–Friday · 9:00 AM – 6:00 PM EST</p>
                <em>
                  <b /> Concierge Active
                </em>
              </div>
            </li>
          </ul>

          <hr />

          <div className="ct-offices">
            <h4>
              <Svg>
                <path d="M4 21V5l9-2v18M13 9h7v12M8 8h1M8 12h1M8 16h1M3 21h18" />
              </Svg>
              Office &amp; Private Salons
            </h4>
            <dl>
              {OFFICES.map((o) => (
                <div key={o.city}>
                  <dt>{o.city}</dt>
                  <dd>{o.place}</dd>
                </div>
              ))}
            </dl>
            <a href="#">View Salon Gallery →</a>
          </div>
        </aside>
      </div>
    </section>
  );
}
