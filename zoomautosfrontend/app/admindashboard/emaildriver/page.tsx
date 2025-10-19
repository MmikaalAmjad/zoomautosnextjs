"use client"
import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    if (!email) {
      setMessage("Please enter an email.");
      return;
    }

    const response = await fetch("https://zoomautos.co.uk/api/videosend/Driver-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="review-form" style={{ marginBottom: '400px', marginTop:'200px' }}>
      
      <h2>Send Expiring Video Link</h2>
      <input
        type="email"
        placeholder="Enter driver email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button  className="contact-button" onClick={sendEmail}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
}
