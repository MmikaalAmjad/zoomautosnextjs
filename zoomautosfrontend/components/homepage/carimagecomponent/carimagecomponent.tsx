"use client"
import React from 'react';
import './carimagecomponent.css';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { LuMousePointerClick } from "react-icons/lu";
const CarImageComponent = () => {
  const router=useRouter();

  const [activeButton, setActiveButton] = useState(null);
  
  const handleButtonClick = (button:any) => {
    setActiveButton(button);
    console.log(`${button} clicked`);
    if (button==="Get a Quote"){
      router.push("/subcontractform")
    }
    if (button==="Drive For Us"){
      router.push("/becomeadriver")
    }
    if (button==="Contact US"){
      router.push("/contactus")
    }
    if (button==="Login"){
      router.push("/login")
    }

  };

  return (
    <div className="car-image-container">
      <div className="contentcarimage">
        
        <h1
  style={{
    fontSize: '2rem',
    color: 'white',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px', // space between text and icon
  }}
>
  <strong>Move your car in 2 clicks</strong>
  <LuMousePointerClick style={{ color: 'red', fontSize: '2.2rem' }} />
</h1>

        <h1 className="heading" style={{color:'red'}}>Welcome To Zoom Autos</h1>
        <h2 style={{color:'white'}}>Your Trusted Logistics Partner</h2>
        <p className="description">Get your car delivered on your door step</p>
        
        <div style={{display:"flex",justifyContent:"center", width:'100%'}}>
        <div className="buttonm-bar">
      {["Get a Quote", "Drive For Us", "Contact US","Login"].map((button) => (
        <button
          key={button}
          type="button"
          className={`buttonm ${activeButton === button ? "active" : ""}`}
          onClick={() => handleButtonClick(button)}   
        >
          {button}
        </button>
      ))}
            </div>
            </div>
      </div>
      {/* <img
        src={ford2}
        alt="Car"
        className="car-image"
      /> */}
    </div>
  );
};

export default CarImageComponent;
