import axios from "axios";
import ContactForm from "./contactform";
import { GET as getContact } from "@/app/api/contact/route";
import { GET as getEmail } from "@/app/api/logisticsemail/route";
import { GET as getLocation } from "@/app/api/logisticslocation/route";
import { GET as getTiming } from "@/app/api/timing/route";
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || ""; // fallback for dev

export const metadata = {
  title: "Contact Us | Zoom Autos - Vehicle Transport & Recovery UK",
   metadataBase: new URL("https://zoomautos.co.uk"), 
  description:
    "Get in touch with Zoom Autos for vehicle transport, car recovery, or logistics inquiries. Find our UK contact number, email, office address, and working hours.",
  keywords: [
    "Zoom Autos",
    "contact Zoom Autos",
    "vehicle transport UK",
    "car recovery UK",
    "UK car transport inquiries",
    "vehicle logistics UK",
    "UK vehicle transport services",
    "fast car delivery UK",
    "professional car transport",
    "nationwide vehicle transport",
    "logistics support UK",
    "trusted car transport company",
  ],
  openGraph: {
    title: "Contact Zoom Autos - UK Vehicle Transport & Recovery",
    description:
      "Reach out to Zoom Autos for professional vehicle transport, nationwide car recovery, and logistics services across the UK.",
    url: "https://zoomautos.co.uk/contact",
    siteName: "Zoom Autos",
    images: [
      {
        url: "/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Zoom Autos - Vehicle Transport UK",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zoom Autos - Vehicle Transport & Recovery UK",
    description:
      "Get in touch with Zoom Autos for professional vehicle transport, car recovery, and logistics services across the UK.",
    images: ["/contact-og-image.jpg"],
  },
};


const convertToAMPM = (time: string) => {
  const [hours, minutes] = time.split(":");
  let h = parseInt(hours);
  const suffix = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${minutes} ${suffix}`;
};

export default async function ContactPage() {
  // Fetch server-side so it's SEO-visible
const [emailRes, contactRes, locationRes, timeRes] = await Promise.all([
    getEmail(),
    getContact(),
    getLocation(),
    getTiming(),
  ]);

  const emailData = await emailRes.json();
  const contactData = await contactRes.json();
  const locationData = await locationRes.json();
  const timeData = await timeRes.json();

  


let timings = timeData.map((t: any) => ({
  ...t,
  startTime: convertToAMPM(t.startTime),
  endTime: convertToAMPM(t.endTime),
}));
  
  const email = emailData.email || "";
  const contactNo = contactData.contactNo || "";
  const { address, locationUrl } = locationData;




  const sortTimingsByDay = (timings:any) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
  
    // Sort timings based on their day index relative to the current day
    return timings.sort((a:any, b:any) => {
      const dayIndexA = daysOfWeek.indexOf(a.day);
      const dayIndexB = daysOfWeek.indexOf(b.day);
  
      const relativeIndexA = (dayIndexA - currentDayIndex + 7) % 7;
      const relativeIndexB = (dayIndexB - currentDayIndex + 7) % 7;
  
      return relativeIndexA - relativeIndexB;
    });
  };
timings = sortTimingsByDay(timings);
  return (
    <>
      <h1 style={{marginTop:'120px'}}>CONTACT US</h1>
      <div className="contact-container">

      <div className="contact-details">
        <div className="info">
        <h2>Address</h2>
        <p>
          <a href={locationUrl} target="_blank" rel="noopener noreferrer">
            {address}
          </a>
        </p>

        <h2>Phone</h2>
        <p>
          <a href={`tel:${contactNo}`}>{contactNo}</a>
        </p>

        <h2>Email</h2>
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>

        <h2>Hours</h2>
        <div className="hours-list">
        <ul>
          {timings.map((timing: any) => (
            
              <div key={timing.day}>
            <span>{timing.day}</span>
            <span>{timing.startTime} - {timing.endTime}</span>
          </div>
            
          ))}
        </ul>
        </div>
</div>

      <ContactForm />
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3134.341395444745!2d-0.6392963992500774!3d51.48104417765142!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48767b7d2acbdb35%3A0x6ebe77a274d46d4a!2sZoom%20Autos%20Ltd!5e0!3m2!1sen!2s!4v1728914130668!5m2!1sen!2s"
        width="800"
        height="600"
        loading="lazy"
        title="Zoom Autos Location"
      ></iframe>
      </div>
      </div>
    </>
  );
}
