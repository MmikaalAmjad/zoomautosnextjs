// React Example for Reset Password Form
"use client"
import React, { useState } from "react";
import { useParams } from "next/navigation";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await fetch(`/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
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
      <h2 style={{marginTop:'40px'}}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default ResetPassword;
