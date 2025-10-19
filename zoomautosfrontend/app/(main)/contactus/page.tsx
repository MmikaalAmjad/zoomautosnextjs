import axios from "axios";
import ContactForm from "./contactform";

export const metadata = {
  title: "Contact Us | Zoom Autos",
  description:
    "Get in touch with Zoom Autos for car sales, delivery, or inquiries. Find our address, contact number, email, and working hours.",
  openGraph: {
    title: "Contact Zoom Autos",
    description:
      "Reach Zoom Autos for quality used cars, fast nationwide delivery, and expert customer support.",
    url: "https://zoomautos.co.uk/contact",
    siteName: "Zoom Autos",
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
    axios.get("https://zoomautos.co.uk/api/LogisticsEmail"),
    axios.get("https://zoomautos.co.uk/api/LogisticsContact"),
    axios.get("https://zoomautos.co.uk/api/LogisticsLocation"),
    axios.get("https://zoomautos.co.uk/api/LogTime"),
  ]);

  const email = emailRes.data.email || "";
  const contactNo = contactRes.data.contactNo || "";
  const { address, locationUrl } = locationRes.data;
  let timings = timeRes.data.map((t: any) => ({
    ...t,
    startTime: convertToAMPM(t.startTime),
    endTime: convertToAMPM(t.endTime),
  }));



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
