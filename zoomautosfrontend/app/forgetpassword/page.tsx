"use client"
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("https://zoomautos.co.uk/api/Signup/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    
      <div className="login-page">
            <div className="login-container">
              <div className="logo-container">
                <img src="/Logo4.png" alt="Logo" />
              </div>
              <div className="login-form">
      <h2 style={{marginTop:'40px'}}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
