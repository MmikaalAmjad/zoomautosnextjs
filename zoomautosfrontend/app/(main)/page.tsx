import Script from "next/script";
import Image from "next/image";
import AboutUs from "@/components/homepage/aboutus/aboutus";
import Stats from "@/components/homepage/stats/stats";
import LogoSlideshow from "@/components/homepage/logos/logos";
import BecomeDriver from "@/components/homepage/Driver/driversubpage";
import Transport from "@/components/homepage/transport/transport";
import GetQuote from "@/components/homepage/getaquote/getaquote";
import MoveReviewForm from "@/components/homepage/reviews/reviewform";
import CarImageComponent from "@/components/homepage/carimagecomponent/carimagecomponent";
import MoveBackground from "@/components/homepage/background/background";
import MoveRatingWithFeedback from "@/components/homepage/reviews/overallreviews";
export default function Home() {
  return (
    <div style={{backgroundColor:'white'}}>
      <Script id="structured-data" type="application/ld+json">
  {`
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Zoom Autos",
    "image": "https://zoomautos.co.uk/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Spaces, The Porter Building, 1 Brunel Way",
      "addressLocality": "Slough",
      "postalCode": "SL1 1FQ",
      "addressCountry": "UK"
    },
    "telephone": "0333 335 6969",
    "url": "https://zoomautos.co.uk",
    "description": "Zoom Autos is a UK-based car transport company providing fast, safe, and reliable vehicle delivery services nationwide."
  }
  `}
</Script>
      <CarImageComponent/>
      <MoveBackground/>
      <LogoSlideshow/>
      <AboutUs/>
        <Stats/>
        <Transport/>
        <GetQuote/>
        <BecomeDriver/>
        <MoveRatingWithFeedback/>
    </div>
  );
}
