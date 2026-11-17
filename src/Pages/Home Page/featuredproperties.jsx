import "./featuredproperties.css";
import propertyImage1 from "./Images/FeaturedProperties/008a15063da1d4b5d1a63c873a54e10cff0b219f.jpg";
import propertyImage2 from "./Images/FeaturedProperties/1e223e1f55a922792f67c7c9bc03125a30f0a40e.jpg";
import propertyImage3 from "./Images/FeaturedProperties/89582ee26f252013b38821174f68938c60c15b22.jpg";
import propertyImage4 from "./Images/FeaturedProperties/9d9eb16d9e53dfcf0be953b8d3c7be267729561a.jpg";
import propertyImage5 from "./Images/FeaturedProperties/deb74e31d180ea72de376f01f4f0f262e37c6570.jpg";

/*
  SAMPLE IMAGES
  These are temporary web placeholders (picsum.photos) so the cards render right away.
  Replace each `image` with your own house photo:
    - a local file:  import house1 from "./images/house1.jpg"   ->  image: house1
    - or a web URL:  on Unsplash open a photo, right-click the image -> "Copy image address"
*/
const PROPERTIES = [
  {
    id: 1,
    image: propertyImage1,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$3,567,980.00",
    address: "123 Maple Street, New York",
  },
  {
    id: 2,
    image: propertyImage2,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$3,567,980.00",
    address: "123 Maple Street, New York",
  },
  {
    id: 3,
    image: propertyImage3,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$2,490,899.99",
    address: "789 Forest Lane, Denver, CO",
  },
  {
    id: 4,
    image: propertyImage4,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$2,490,899.99",
    address: "789 Forest Lane, Denver, CO",
  },
  {
    id: 5,
    image: propertyImage5,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$4,567,450.00",
    address: "123 Serenity Drive, Austin, TX",
  },
  {
    id: 6,
    image: propertyImage5,
    status: "For Sale",
    beds: 5,
    baths: 2,
    title: "The Pinnacle at Highland Park",
    price: "$4,567,450.00",
    address: "123 Serenity Drive, Austin, TX",
  },
];

const Svg = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const BedIcon = () => (
  <Svg className="fp-meta-ico">
    <path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5" />
    <circle cx="7" cy="11" r="1.6" />
  </Svg>
);

const BathIcon = () => (
  <Svg className="fp-meta-ico">
    <path d="M3 12h18v2a5 5 0 01-5 5H8a5 5 0 01-5-5v-2zM6 12V6a2 2 0 013.5-1.3M7 19l-1 2M17 19l1 2" />
  </Svg>
);

const Arrow = () => (
  <Svg className="fp-arrow">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

export default function FeaturedProperties() {
  return (
    <section id="featured-properties" className="fp-section" aria-labelledby="fp-heading">
      <div className="fp-head" data-scroll-reveal>
        <div className="fp-head-text">
          <h2 id="fp-heading">
            Featured Properties<span>.</span>
          </h2>
          <p>
            A curated selection of exceptional residences, each with a story entirely its own.
          </p>
        </div>
        <a className="fp-btn" href="#" data-magnetic>
          <span className="button-label" data-button-label>
            <span className="button-label-current">Explore destinations</span>
            <span className="button-label-next" aria-hidden="true">Explore destinations</span>
          </span>
          <Arrow />
        </a>
      </div>

      <div className="fp-grid">
        {PROPERTIES.map((p) => (
          <article className="fp-card" key={p.id} data-scroll-reveal>
            <div className="fp-media">
              <img src={p.image} alt={`${p.title}, ${p.address}`} loading="lazy" />
              <span className="fp-pill">{p.status}</span>
            </div>

            <ul className="fp-meta">
              <li>
                <BedIcon /> {p.beds} Bedrooms
              </li>
              <li>
                <BathIcon /> {p.baths} Bathroom
              </li>
            </ul>

            <h3>{p.title}</h3>

            <p className="fp-price-row">
              <strong>{p.price}</strong>
              <span>{p.address}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
