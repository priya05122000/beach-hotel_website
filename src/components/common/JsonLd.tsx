const HOTEL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "The Beach Hotel",
  description:
    "A luxury hotel in Kanyakumari at the confluence of the Arabian Sea, Bay of Bengal, and Indian Ocean.",
  url: "https://thebeachhotel.in",
  telephone: "+91-5467-898765",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beach Rd",
    addressLocality: "Kanniyakumari",
    addressRegion: "Tamil Nadu",
    postalCode: "629702",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.0883,
    longitude: 77.5385,
  },
  starRating: { "@type": "Rating", ratingValue: "5" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
    { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
  ],
};

export default function HotelJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(HOTEL_SCHEMA) }}
    />
  );
}
