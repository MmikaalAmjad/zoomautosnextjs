"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaClock,
  FaTruck,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import './recovery.css';

const CarRecoveryScreen = () => {
  const phoneNumber = "447920810633";
  const contactNumber = "0333 33 6969";
  const message = "Hi, I need help recovering my vehicle.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const texts = [
    "🚨 Need help fast?",
    "⛔ Stuck on the road?",
    "🚗 We’re always nearby!",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>24/7 Vehicle Recovery Services | Zoom Autos</title>
        <meta
          name="description"
          content="Fast and reliable 24/7 car recovery and vehicle transport services across the UK. Call or WhatsApp Zoom Autos now!"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="24/7 Vehicle Recovery Services | Zoom Autos" />
        <meta property="og:description" content="Fast and reliable 24/7 car recovery and vehicle transport services across the UK." />
        <meta property="og:image" content="/editsuccess.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zoomautos.co.uk/Recovery" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="24/7 Vehicle Recovery Services | Zoom Autos" />
        <meta name="twitter:description" content="Fast and reliable 24/7 car recovery and vehicle transport services across the UK." />
        <meta name="twitter:image" content="/editsuccess.png" />
      </Head>

      <div className="recovery-container">
        {/* Hero Section */}
        <div className="hero-image">
          <img src="/editsuccess.png" alt="Car Recovery" />
          <div className="hero-overlay">
            <h1 className="hero-text">
              Stranded? We Are Just A Call Away, 24/7 Breakdown Recovery and Vehicle Support
            </h1>
            <p className="hero-subtext">
              Fast, Reliable, and Affordable Getting You and Your Vehicle Back on Track
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-box">
            <FaClock className="feature-icon" />
            <p>24/7 Recovery</p>
          </div>
          <div className="feature-box">
            <FaTruck className="feature-icon" />
            <p>Fast Dispatch</p>
          </div>
          <div className="feature-box">
            <FaMapMarkerAlt className="feature-icon" />
            <p>Nationwide Service</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <h2>Vehicle Won’t Start? Don’t Worry.</h2>
          <p>
            At Zoom Autos, we specialise in professional vehicle transport and recovery services across the UK, offering reliable solutions for breakdown and accident recovery, emergency motorway assistance, and both driven and transported vehicle movements. 
            Call or WhatsApp us now.
          </p>
          <div className="cta-buttons">
            <a href={`tel:+${contactNumber}`} className="cta-call">
              <FaPhoneAlt className="cta-icon" />
              Call Now
            </a>
            <a
              href={whatsappLink}
              className="cta-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="cta-icon" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Floating Chat Bubble */}
        <div className="chat-bubble">{texts[currentIndex]}</div>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
    </>
  );
};

export default CarRecoveryScreen;
