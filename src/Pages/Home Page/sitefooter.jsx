import "./sitefooter.css";
import footerLogo from "./Images/footericon.png";

const ADVISORY = [
  "Selected Residences",
  "Private Acquisitions",
  "Our Philosophy",
  "Architectural Monograph",
  "Press & Dispatches",
];

const DESTINATIONS = [
  "New York Penthouses",
  "Miami Waterfront",
  "Aspen Mountain Chalets",
  "Beverly Hills Estates",
  "Advisory Journal",
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

const SOCIALS = [
  {
    label: "Facebook",
    icon: <path d="M14 8h2.500V4.500H14a3.500 3.500 0 00-3.500 3.500v2H8v3.500h2.500V20H14v-6.500h2.500l.5-3.500h-3V8.500c0-.3.200-.5.500-.5z" />,
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.500" />
        <circle cx="12" cy="12" r="3.600" />
        <circle cx="16.800" cy="7.200" r="0.600" />
      </>
    ),
  },
  { label: "X", icon: <path d="M5 4l14 16M19 4L5 20" /> },
  {
    label: "LinkedIn",
    icon: <path d="M6 10v8M6 6.200v.1M10.500 18v-8M10.500 13c0-2 1.300-3 3-3s2.500 1 2.500 3v5" />,
  },
];

export default function SiteFooter() {
  return (
    <footer className="ft-footer">
      <div className="ft-inner">
        <div className="ft-grid">
          {/* ---------- brand ---------- */}
          <div className="ft-brand">
            <a className="ft-logo" href="#" aria-label="VF Digital Designs">
              <img src={footerLogo} alt="VF Digital Designs" />
            </a>

            <p>
              Curating exceptional architectural estates, private off-market residences, and
              advisory for discerning collectors across America’s most coveted destinations.
            </p>

            <ul className="ft-socials">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href="#" aria-label={s.label}>
                    <Svg>{s.icon}</Svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- link columns ---------- */}
          <nav className="ft-col" aria-label="Advisory">
            <h4>Advisory</h4>
            <ul>
              {ADVISORY.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ft-col" aria-label="Destinations">
            <h4>Destinations</h4>
            <ul>
              {DESTINATIONS.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- contact ---------- */}
          <div className="ft-col ft-contact">
            <h4>Get in Touch</h4>
            <ul>
              <li>
                <span className="ft-ico">
                  <Svg>
                    <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  </Svg>
                </span>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li>
                <span className="ft-ico">
                  <Svg>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </Svg>
                </span>
                <a href="mailto:concierge@vfdigitaldesigns.luxury">concierge@vfdigitaldesigns.luxury</a>
              </li>
              <li className="is-dim">
                <span className="ft-ico">
                  <Svg>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </Svg>
                </span>
                <span className="ft-hours">Mon – Fri: 9:00 AM – 6:00 PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} VF Digital Designs. All Rights Reserved.</p>
          <p className="ft-legal">
            <span>Private Client Representation</span>
            <i aria-hidden="true">•</i>
            <span>Discretion &amp; Confidentiality</span>
          </p>
        </div>
      </div>
    </footer>
  );
}