"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [formdata, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://zoomautos.co.uk/subcontract", {
        formType: "Message",
        ...formdata,
      });
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formss">
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Your Contact Number"
          name="phone"
          value={formdata.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Message"
          name="message"
          value={formdata.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading} className="contact-button">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {success && <p>✅ Thanks for contacting us!</p>}
    </div>
  );
}
