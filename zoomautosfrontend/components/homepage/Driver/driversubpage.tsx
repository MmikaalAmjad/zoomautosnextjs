import Link from "next/link";
import Image from "next/image";
import "./becomdriver.css";

const BecomeDriver = () => {
  return (
    <section className="become-driver">
      <div className="become-driver-content">
        <Image
          src="/Driver1.jpg"
          alt="Professional driver at Zoom Autos UK"
          width={600}
          height={400}
          className="become-driver-image"
          priority
        />
        <div className="become-driver-text">
          <h1 className="become-driver-heading">
            Join Our Team as a Driver
          </h1>

          <p className="become-driver-paragraph">
            Are you passionate about driving and looking for an exciting opportunity in the car transport industry? 
            Join our team at <strong>Zoom Autos</strong>, where you’ll be part of a dedicated and professional 
            team delivering exceptional service across the UK.
          </p>

          <div className="become-driver-paragraph">
            <strong>What We’re Looking For:</strong>
            <ul>
              <li>A valid UK driving license (HGV or standard, depending on the role).</li>
              <li>A strong commitment to safety and professionalism.</li>
              <li>Experience in vehicle transport or logistics is a plus, but not required.</li>
              <li>A positive attitude and excellent customer service skills.</li>
            </ul>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Link href="/DriveDetail" className="become-driver-button">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeDriver;
