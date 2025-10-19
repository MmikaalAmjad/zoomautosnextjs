import React from "react";
import Link from "next/link";

import "../Driver/becomdriver.css"; // ✅ Make sure this path is correct

const Transport: React.FC = () => {
  return (
    <section className="become-driver">
      <div className="become-driver-content">
        <img
          src="/editsuccess.png"
          alt="Zoom Autos Vehicle Recovery Service"
          className="become-driver-image"
        />

        <div className="become-driver-text">
          <h2 className="become-driver-heading">
            Reliable Vehicle Recovery Service
          </h2>

          <p className="become-driver-paragraph">
            At <strong>Zoom Autos</strong>, we understand how stressful a
            breakdown or accident can be. That’s why our Vehicle Recovery
            service is designed to get you back on the road quickly, safely, and
            with complete peace of mind.
          </p>

          <div className="become-driver-paragraph">
            <strong>Benefits of Our Vehicle Recovery Service:</strong>
            <ul>
              <li>24/7 nationwide coverage across the UK.</li>
              <li>Fast response times to minimise your waiting.</li>
              <li>
                Safe and secure transport of your vehicle to your chosen
                destination.
              </li>
              <li>Experienced recovery drivers you can trust.</li>
              <li>
                Affordable and transparent pricing with no hidden costs.
              </li>
            </ul>
          </div>

          {/* ✅ Using a real link instead of JS-based navigation (better SEO) */}
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

export default Transport;
