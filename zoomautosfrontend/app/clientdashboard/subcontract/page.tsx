import React from "react";
import RegisteredContactFormMovex from "@/components/registeredform/getaquoteformregistered";
import Carousel from "@/components/homepage/carousel/carousel";

export const metadata = {
  title: "Zoom Autos - Get A Quote",
  description:
    "Get a free quote for fast and secure car transport services with Zoom Autos. Nationwide vehicle delivery across the UK.",
  keywords:
    "get a quote, car transport quote, vehicle delivery quote, UK car shipping, car moving service, Zoom Autos quote",
  openGraph: {
    title: "Zoom Autos - Get A Quote",
    description:
      "Request a free, no-obligation car transport quote from Zoom Autos. Fast and reliable nationwide car shipping service.",
    url: "https://zoomautos.co.uk/getaquote",
    type: "website",
  },
};

const imagesWithText = [
  { image: "/truck1.jpg" },
  { image: "/truck2.jpg" },
];

export default function GetAQuotePage() {
  return (
    <>
    <img
              src="/Background Logistics Homepage.png"
              alt="Logistics Background"
              className="background-image"
            />
      <div className='overalls'>
    
      <div className="headings">
      <h1 >
        Sub Contract Form
      </h1>
</div>
      <RegisteredContactFormMovex />
      </div>
    </>
  );
}
