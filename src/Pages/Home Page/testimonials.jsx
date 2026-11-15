import "./testimonials.css";
import sarah from "./Images/sarah.jpg";
import james from "./Images/james.jpg";
import emily from "./Images/emily.jpg";

const TESTIMONIALS = [
  {
    id: 1,
    ref: "REF. NY-4802",
    quote:
      "Their understanding of the luxury market made the entire process feel effortless. We found a home that genuinely felt like ours.",
    name: "Sarah Mitchell",
    role: "Private Client · New York, NY",
    photo: sarah,
  },
  {
    id: 2,
    ref: "REF. MIA-1194",
    quote:
      "From the first conversation to closing, every detail was handled with exceptional care and discretion.",
    name: "James Anderson",
    role: "Property Investor · Miami, FL",
    photo: james,
  },
  {
    id: 3,
    ref: "REF. LA-9021",
    quote:
      "They understood what we were looking for before we could even articulate it. The experience was completely personal.",
    name: "Emily Carter",
    role: "Homeowner · Los Angeles, CA",
    photo: emily,
  },
];

const QuoteMark = () => (
  <svg className="tm-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 4h7v6.5c0 4-2.6 7-6.6 7.9L2.4 16c2.2-.8 3.4-2.300 3.600-4.500H3z" />
    <path d="M14 4h7v6.5c0 4-2.600 7-6.600 7.900L13.400 16c2.200-.800 3.400-2.300 3.600-4.500H14z" />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="tm-section" aria-labelledby="tm-heading">
      <h2 id="tm-heading">Experiences Beyond the Address.</h2>
      <p className="tm-sub">
        Deep market knowledge, private access, and a highly personalized approach to
        <br />
        luxury property. Because the right home is never simply found. It is understood.
      </p>

      <div className="tm-grid">
        {TESTIMONIALS.map((t) => (
          <figure className="tm-card" key={t.id}>
            <div className="tm-body">
              <div className="tm-top">
                <QuoteMark />
                <span className="tm-ref">{t.ref}</span>
              </div>
              <blockquote>“{t.quote}”</blockquote>
            </div>

            <figcaption className="tm-foot">
              <img src={t.photo} alt={t.name} />
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}