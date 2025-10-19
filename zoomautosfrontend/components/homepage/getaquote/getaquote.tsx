import React from "react";
import "./getaquote.css"; 
import Link from "next/link";
const GetQuote: React.FC = () => {
  return (
    <section className="get-quote">
      <div className="get-quote-content">
        <img
          src="/truck1.jpg"
          alt="Zoom Autos Vehicle Transport Quote"
          className="get-quote-image"
        />

        <div className="get-quote-text">
          <h2 className="get-quote-heading">Get a Quote for Car Movement</h2>

          <p className="get-quote-paragraph">
            Ready to transport your vehicle? Click below to get a personalized
            quote for your car movement. We offer <strong>competitive pricing</strong> 
            and <strong>reliable service</strong> to ensure your vehicle reaches 
            its destination safely and on time.
          </p>

          {/* ✅ Using a normal link instead of JS navigation (better for SEO + accessibility) */}
         <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Link href="/DriveDetail" className="become-driver-button">
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetQuote;
