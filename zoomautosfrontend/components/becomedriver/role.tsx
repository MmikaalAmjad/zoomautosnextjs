"use client"
import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { FaQuestion } from "react-icons/fa";

import { GrAnnounce } from "react-icons/gr";
interface Role {
  id: number;
  name: string;
}

interface Responsibilities {
  id: number;
  name: string;
}

const SelfEmployedDriver = () => {

  const [roles, setRoles] = useState<Role[]>([]);

  const [Responsibilities, setResponsibilites] = useState<Responsibilities[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles", {
          
        params: {
          _t: new Date().getTime(), // Add timestamp to bypass cache
        },
      
      });
        setRoles(response.data);
      } catch (err) {
        console.error("Error fetching roles:", err);
        
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchResponsibilities = async () => {
      try {
        const response = await axios.get("/api/responsibilities");
        setResponsibilites(response.data);
      } catch (err) {
        console.error("Error fetching responsibilities:", err);
        
      }
    };

    fetchResponsibilities();
  }, []);
  return (
    // <div className='contents'>
    //   <h2>Self-Employed Trade Plate Driver</h2>
    //   <p>Is driving your passion?</p>
    //   <p>Would you love a job where every day is different?</p>
    //   <p>Do you enjoy driving a variety of cars ?</p>
    //   <p>Do you like making the most of your day while traveling?</p>
    //   <p>Do you enjoy meeting people across the country?</p>

    //   <h3>The Role:</h3>
    //   <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
    //     <li>Collect and deliver cars and vans throughout Great Britain (Monday to Sunday).</li>
    //     <li>Use mobile apps for planning, inspections, and expenses — no fiddly paperwork!</li>
    //     <li>Provide exceptional customer service by being polite, friendly, and wearing the provided uniform.</li>
    //   </ul>

    //   <h3>What We Offer:</h3>
    //   <ul>
    //     <li><strong>Expenses</strong>: Prepaid debit card for all public transport costs.</li>
    //     <li><strong>Benefits</strong>: Fuel card, trade plates, insurance, and breakdown cover provided.</li>
    //     <li><strong>Flexibility</strong>: Work from home, with your vehicle parked on your driveway (dropped kerb required).</li>
    //   </ul>

    //   <h3>What a Typical Day Looks Like</h3>
    //   <ul>
    //     <li>All public transport and travel expenses are fully covered.</li>
    //     <li>Full-time, self-employed position (Monday to Friday).</li>
    //     <li>Support and guidance provided by our dedicated planning team.</li>
    //     <li>Uniform supplied, including a windproof and waterproof jacket and tie.</li>
    //   </ul>

    //   <h3>Requirements:</h3>
    //   <p>To be eligible for this role:</p>
    //   <ul>
    //     <li>Must be over <strong>25 years old</strong>.</li>
    //     <li>Must possess a <strong>full UK driving licence</strong> (not automatic only).</li>
    //     <li>Must have at least <strong>three years of driving experience</strong>.</li>
    //     <li>Must have no more than <strong>6 points on your licence</strong>.</li>
    //     <li>No bans from driving within the past <strong>5 years</strong>.</li>
    //     <li>Offence codes such as <strong>IN, MS, CD, DR, DG</strong> (or similar) from the past <strong>5-10 years</strong> must be disclosed.</li>
    //   </ul>
    //   <p>If unsure, please email us at <a href="mikaal10802@gmail.com">mikaal10802@gmail.com</a>.</p>

    //   <h3>Ready to take the wheel?</h3>
    //   <p>Join us and start a career that’s always on the move!</p>
    // </div>
    <section className="about-us-container">
          <section className="about-us">
                <div className="about-us-content">
                  
                  <div className="about-us-text">
                  
                  <h2 className='about-us-title'>Self-Employed Trade Plate Driver</h2>
                    <p className="about-us-paragraph">
      <div className='specparapgraphcontainer'>
     <p className='specialparagraph'>Is driving your passion?</p>
     <p className='specialparagraph'>Would you love a job where every day is different?</p>
     <p className='specialparagraph'>Do you enjoy driving a variety of cars ?</p>
     <p className='specialparagraph'>Do you like making the most of your day while traveling?</p>
     <p className='specialparagraph'>Do you enjoy meeting people across the country?</p>
    </div>
                    </p>
                    
                   
                    
                  </div>
                  <FaQuestion size={240} 
  color="#01103b" 
  style={{ opacity: 0.8, transform: "rotate(24deg)" }} 
/>
          
          
                 
                </div>
                
                <section className="what-we-do">
  <div className='flex-containerRole'>
    <h2 className="what-we-do-title">The Role</h2>
    <div className="what-we-do-content">
      <div className="requirementcontainer">
        {roles.map((role, index) => (
          <p key={index} className="specialparagraph3">
            {role.name}
          </p>
        ))}
      </div>
    </div>
  </div>
</section>

              <div className="about-us-content">
              <GrAnnounce 
  size={240} 
  color="#01103b" 
  style={{ opacity: 0.8, transform: "rotate(-24deg)" }} 
/>

                  <div className="about-us-text">
                  
                  <h2 className='Requirement-title'>Requirements</h2>
                  <div className="what-we-do-content">
                    <p className="about-us-paragraph">
                    <div className='requirementcontainer'>
                    {Responsibilities.map((respon, index) => (
        <h1 key={index} className="specialparagraphtwo">
          {respon.name}
        </h1>
      ))} 
      
     </div>
                    </p>
                    </div>
                    </div>                    
                   
                    
                  
    
          
          
                 
                </div>
                
              </section>
              
          </section>
  );
};

export default SelfEmployedDriver;
