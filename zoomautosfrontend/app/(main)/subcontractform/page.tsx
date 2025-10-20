import React from "react";
import GetAQuoteForm from "@/components/unregisteredform/getaquoteformnotregistered";
import Carousel from "@/components/homepage/carousel/carousel";

export const metadata = {
  title: "Zoom Autos - Get A Quote | Vehicle Transport & Car Shipping UK",
  description:
    "Request a free quote for professional car transport and vehicle delivery services with Zoom Autos. Fast, secure, and reliable nationwide car shipping across the UK.",
  keywords: [
    "get a quote",
    "car transport quote",
    "vehicle delivery quote",
    "UK car shipping",
    "car moving service UK",
    "Zoom Autos quote",
    "vehicle relocation UK",
    "UK vehicle transport quote",
    "secure car transport UK",
    "nationwide car delivery",
    "professional car shipping",
    "UK automotive transport services",
  ],
  openGraph: {
    title: "Zoom Autos - Get A Quote",
    description:
      "Request a free, no-obligation car transport quote from Zoom Autos. Fast, secure, and reliable nationwide vehicle delivery services in the UK.",
    url: "https://zoomautos.co.uk/getaquote",
    siteName: "Zoom Autos",
    images: [
      {
        url: "/quote-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Get a car transport quote with Zoom Autos",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoom Autos - Get A Quote",
    description:
      "Request a free quote for professional car transport and nationwide vehicle delivery with Zoom Autos in the UK.",
    images: ["/quote-og-image.jpg"],
  },
};


const imagesWithText = [
  { image: "/truck1.jpg" },
  { image: "/truck2.jpg" },
];

export default function GetAQuotePage() {
  return (
    <>
      <Carousel imagesWithText={imagesWithText} />

      <div className="overlay-text">
        <h1>Welcome To Zoom Autos</h1>
        <h2 style={{ color: "red" }}>Get A Quote</h2>
      </div>
      <div className="headings">
      <h1 >
        Sub Contract Form
      </h1>
</div>
      <GetAQuoteForm />
    </>
  );
}
