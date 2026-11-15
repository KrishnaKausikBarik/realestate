import React from "react";
import "./desirableaddresses.css";

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
    image: "https://picsum.photos/seed/alpine-sanctuarium/600/1040",
    name: "Alpine Sanctuarium",
    location: "Big Sur / Aspen",
    price: "$450/night",
  },
  {
    id: 2,
    size: "lg",
    image: "https://picsum.photos/seed/ocean-glass-house/900/1100",
    name: "Ocean Glass House",
    location: "Malibu, USA",
    price: "$820/night",
  },
  {
    id: 3,
    size: "md",
    image: "https://picsum.photos/seed/nordic-retreat/900/660",
    name: "Nordic Retreat",
    location: "Lake Tahoe, USA",
    price: "$450/night",
  },
  {
    id: 4,
    size: "tall",
    image: "https://picsum.photos/seed/desert-mirage/900/1100",
    name: "Desert Mirage",
    location: "Scottsdale, Arizona",
    price: "$650/night",
  },
];

export default function DesirableAddresses() {
  return (
    <section className="da-section" aria-labelledby="da-heading">
      <h2 id="da-heading">America’s Most Desirable Addresses</h2>
      <p className="da-sub">
        From iconic city skylines to quiet coastal escapes, discover a place that moves you.
      </p>

      <div className="da-grid">
        {ADDRESSES.map((a) => (
          <a className={`da-card da-${a.size}`} href="#" key={a.id}>
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
