"use client";

import React, { useState } from "react";
import ContactFormStandardMovex from "./standardcontractform";

import ReturnJobform from "./returnjob";
import MultidropoffVehicleForm from "./multidropoff";
import Onwardvehicle from "./onwardvehicle";
import { useRouter } from "next/navigation";

import "./styles/buttonbar.css";

const GetAQuoteForm = () => {
  const router = useRouter();
  const [formContent, setFormContent] = useState("STANDARD");
  const [usertype, setUserType] = useState("Business");

  const handleoptionPress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const handleoptionPress2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormContent(e.target.value);
  };

  const onLoginClick = () => router.push("/login");
  const onSignupClick = () => router.push("/signup");

  return (
    <div className="move-container">
      <div className="mve-form">
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <h2>Are You a </h2>
          <select onChange={handleoptionPress} style={{ width: "max-content" }}>
            <option value="Business">Business</option>
            <option value="Individual">Individual</option>
          </select>
          <h2>?</h2>
        </div>

        {usertype === "Business" && (
          <div className="stats">
            <button className="contact-button" onClick={onLoginClick}>
              Login
            </button>
            <button className="contact-button" onClick={onSignupClick}>
              Register
            </button>
          </div>
        )}

        {usertype === "Individual" && (
          <>
            <div className="form-group">
              <h2>Service Type</h2>
              <select
                onChange={handleoptionPress2}
                style={{ width: "max-content" }}
              >
                <option value="STANDARD">STANDARD</option>
                <option value="RETURN JOB">RETURN JOB</option>
                <option value="ONWARD VEHICLES">ONWARD VEHICLES</option>
                <option value="MULTI DROP OFF">MULTI DROP OFF</option>
              </select>
            </div>

            {formContent === "STANDARD" && <ContactFormStandardMovex />}
             {formContent === "RETURN JOB" && <ReturnJobform />}
            {formContent === "ONWARD VEHICLES" && <Onwardvehicle />}
            {formContent === "MULTI DROP OFF" && <MultidropoffVehicleForm />} 
          </>
        )}
      </div>
    </div>
  );
};

export default GetAQuoteForm;
