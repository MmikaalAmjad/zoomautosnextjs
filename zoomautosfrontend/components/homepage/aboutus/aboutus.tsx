'use client';

import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import './aboutus.css';

// Define the type for your API response items
interface WhatWeDoItem {
  _id: string;
  title: string;
  description: string;
}

const AboutUs: React.FC = () => {
  const [content, setContent] = useState<WhatWeDoItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async (): Promise<void> => {
  try {
    const res = await fetch(`/api/whatwedo?_t=${new Date().getTime()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch content");
    }
    const data: WhatWeDoItem[] = await res.json();
    setContent(data);
  } catch (error) {
    console.error("Error fetching content:", error);
  }
};

  return (
    <section className="about-us-container">
      <section className="about-us">
        <div className="about-us-content">
          <div className="about-us-text">
            <p className="about-us-paragraph">
              At <strong>Zoom Autos</strong>, we specialise in{" "}
              <strong>professional vehicle transport and recovery services</strong> across the UK,
              offering reliable solutions for{" "}
              <strong>breakdown and accident recovery, emergency motorway assistance</strong>, and both{" "}
              <strong>driven and transported vehicle movements</strong>. Our comprehensive service
              range includes <strong>dealer-to-dealer transfers, internal fleet logistics, auction
              collections,</strong> and <strong>direct home deliveries</strong> — catering to private
              customers, dealerships, and fleet operators alike.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 className="about-us-title">About Us</h2>
            <img
              src="/Logo4.png"
              alt="Driver"
              className="about-us-image"
            />
          </div>

          <div className="about-us-text">
            <p className="about-us-paragraph">
              With years of experience in the <strong>automotive logistics industry</strong>, we have
              built a strong reputation for <strong>excellence, efficiency, and customer
              satisfaction</strong>. Whether it’s a single vehicle or an entire fleet, we ensure every
              movement is handled with precision, providing a smooth and stress-free experience for
              our clients.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <section className="our-mission">
          <div className="checkings">
            <h2 className="our-mission-title">Our Mission</h2>
            <div className="our-mission-text">
              <p className="our-mission-paragraph">
                Our mission is simple:{" "}
                <strong>to redefine vehicle transport by combining technology, professionalism, and
                customer-focused service</strong>. We are committed to delivering{" "}
                <strong>seamless, secure, and transparent vehicle movements,</strong> ensuring peace
                of mind for every client we serve.
              </p>
              <p className="our-mission-paragraph">
                At <strong>Zoom Autos</strong>, we believe in going beyond just transporting vehicles
                — we ensure that each handover is a{" "}
                <strong>comprehensive experience</strong>, making sure that the recipient understands
                their new vehicle’s features, functions, and capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="what-we-do">
          <div className="flex-containerRole">
            <h2 className="what-we-do-title">What We Do</h2>
            <div className="what-we-do-content">
              <div className="what-we-do-text">
                {content.map((item) => (
                  <div key={item._id}>
                    <h2 className="what-we-do-heading">{item.title}</h2>
                    <p className="what-we-do-paragraph">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="ourPromise">
          <div className="checkings">
            <div className="promiseimageandheading">
              <h2 className="about-us-title">Our Promise</h2>
              <img
                src="/Ourmission.png"
                alt="Our Promise"
                className="ourPromiseimage"
              />
            </div>

            <div className="ourPromisecontent">
              <p className="ourPromiseparagraph">
                At Zoom Autos, we take pride in our reputation as a{" "}
                <strong>trusted and customer-focused vehicle logistics provider.</strong> We are
                committed to <strong>efficiency, reliability, and professionalism,</strong> ensuring
                that every vehicle delivery is completed{" "}
                <strong>smoothly and securely.</strong>
              </p>

              <p className="ourPromiseparagraph">
                Whether you're a <strong>business</strong> needing a large-scale fleet transfer or an{" "}
                <strong>individual</strong> looking to move your personal vehicle,{" "}
                <strong>Zoom Autos</strong> is your go-to solution for professional vehicle
                transportation across the UK.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default AboutUs;
