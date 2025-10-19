"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  const [locationUrl, setLocationUrl] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  // Fetch Location
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await axios.get(
          "https://zoomautos.co.uk/api/LogisticsLocation",
          { params: { _t: new Date().getTime() } }
        );
        setLocationUrl(res.data.locationUrl || "");
        setAddress(res.data.address || "");
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };
    fetchLocationData();
  }, []);

  // Fetch Contact Number
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(
          "https://zoomautos.co.uk/api/LogisticsContact",
          { params: { _t: new Date().getTime() } }
        );
        setContactNo(res.data.contactNo || "");
      } catch (err) {
        console.error("Error fetching contact number:", err);
      }
    };
    fetchContact();
  }, []);

  // Fetch Email
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(
          "https://zoomautos.co.uk/api/LogisticsEmail",
          { params: { _t: new Date().getTime() } }
        );
        setEmail(res.data.email || "");
      } catch (err) {
        console.error("Error fetching email:", err);
      }
    };
    fetchEmail();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/" className="link">Home</Link>
            </li>
            <li>
              <Link href="/subcontractform" className="link">Get A Quote</Link>
            </li>
            <li>
              <Link href="/recovery" className="link">Recover Your Car</Link>
            </li>
            <li>
              <Link href="/becomeadriver" className="link">Drive For Us</Link>
            </li>
            <li>
              <Link href="/services" className="link">Our Services</Link>
            </li>
            <li>
              <Link href="/contactus" className="link">Contact Us</Link>
            </li>
            <li>
              <Link href="/termsandconditions" className="link">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            Address:{" "}
            <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="link">
              {address.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </a>
          </p>
          <p>
            Phone: <a href={`tel:${contactNo}`} className="link">{contactNo}</a>
          </p>
        </div>

        {/* Social / Email */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href={`tel:${contactNo}`} aria-label="Call Us">
              <IoCall />
            </a>
          </div>
          <h4>Email Us</h4>
          <p>
            <a href={`mailto:${email}`} className="link">{email}</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Zoom Autos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
