import "./desirableaddresses.css";
import addressImage1 from "./Images/AmericaProp/3899e7fae3dfaa2889132a9b5b9996b2ae47cbcb.jpg";
import addressImage2 from "./Images/AmericaProp/4a6a454c038631e36b4025d78308a779c309ed67.jpg";
import addressImage3 from "./Images/AmericaProp/901e8214c0ef3951d46e59c89977e609dfec41a2.jpg";
import addressImage4 from "./Images/AmericaProp/9d9eb16d9e53dfcf0be953b8d3c7be267729561a.jpg";

/*
  SAMPLE IMAGES
  Temporary web placeholders (picsum.photos) so the cards render right away.
  Replace each `image` with your own photo:
    - local file:  import alpine from "./images/alpine.jpg"   ->  image: alpine
    - web URL:     on Unsplash, right-click the photo -> "Copy image address"
  `size` controls the card shape and text scale: "xs" (narrow tall), "lg" (big), "md" (medium), "tall".
*/
const ADDRESSES = [
  {
    id: 1,
    size: "xs",
    image: addressImage1,
    name: "Alpine Sanctuarium",
    location: "Big Sur / Aspen",
    price: "$450/night",
  },
  {
    id: 2,
    size: "lg",
    image: addressImage2,
    name: "Ocean Glass House",
    location: "Malibu, USA",
    price: "$820/night",
  },
  {
    id: 3,
    size: "md",
    image: addressImage3,
    name: "Nordic Retreat",
    location: "Lake Tahoe, USA",
    price: "$450/night",
  },
  {
    id: 4,
    size: "tall",
    image: addressImage4,
    name: "Desert Mirage",
    location: "Scottsdale, Arizona",
    price: "$650/night",
  },
];

export default function DesirableAddresses() {
  return (
    <section className="da-section" aria-labelledby="da-heading">
      <h2 id="da-heading" data-scroll-reveal>America’s Most Desirable Addresses</h2>
      <p className="da-sub" data-scroll-reveal>
        From iconic city skylines to quiet coastal escapes, discover a place that moves you.
      </p>

      <div className="da-grid">
        {ADDRESSES.map((a) => (
          <a className={`da-card da-${a.size}`} href="#" key={a.id} data-scroll-reveal>
            <div className="da-media">
              <img src={a.image} alt={`${a.name}, ${a.location}`} loading="lazy" />
            </div>
            <div className="da-caption">
              <div className="da-info">
                <h3>{a.name}</h3>
                <span>{a.location}</span>
              </div>
              <strong className="da-price">{a.price}</strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
