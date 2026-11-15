import "./guidancesection.css";
import guidanceBg from "./Images/guidance.png"; // <- change to your image's file name

const SERVICES = [
  {
    no: "01",
    label: "Market Intelligence",
    icon: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  },
  {
    no: "02",
    label: "Private Access",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    no: "03",
    label: "Strategic Advisory",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M17 14c2.5 0 4 1.5 4 4" />
      </>
    ),
  },
  {
    no: "04",
    label: "Personalized Service",
    icon: <path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16 3-16" />,
  },
];

const Svg = ({ children, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default function GuidanceSection() {
  return (
    <section className="gb-section" aria-labelledby="gb-heading">
      <div className="gb-bg" style={{ backgroundImage: `url(${guidanceBg})` }} role="img" aria-label="Luxury real estate advisor standing in a modern villa" />

      <div className="gb-content">
        <h2 id="gb-heading">
          Guidance Beyond
          <br />
          the Address<span>.</span>
        </h2>

        <p className="gb-text">
          Deep market knowledge, private access, and a highly personalized approach to luxury
          property. Because the right home is never simply found. It is understood.
        </p>

        <ul className="gb-list">
          {SERVICES.map((s) => (
            <li key={s.no}>
              <span className="gb-no">{s.no}</span>
              <Svg className="gb-ico">{s.icon}</Svg>
              <span className="gb-label">{s.label}</span>
            </li>
          ))}
        </ul>

        <a className="gb-btn" href="#">
          Meet with an advisor
          <Svg className="gb-arrow">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </Svg>
        </a>
      </div>
    </section>
  );
}