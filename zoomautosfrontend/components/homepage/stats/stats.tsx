import React from "react";
import { FaCar, FaTrophy, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import "./stats.css";

const Stats: React.FC = () => {
  return (
    <section className="stats">
      <div className="stat-item">
        <FaCar size={40} color="#e80f17" />
        <p className="stat-number">+10,000</p>
        <p className="stat-text">Movements carried out</p>
      </div> 
      <div className="stat-item">
        <FaTrophy size={40} color="#e80f17" />
        <p className="stat-number">99%</p>
        <p className="stat-text">Customer satisfaction rate</p>
      </div>
      <div className="stat-item">
        <FaUsers size={40} color="#e80f17" />
        <p className="stat-number">+750</p>
        <p className="stat-text">More than 750 companies trust us</p>
      </div>
      <div className="stat-item">
        <FaMapMarkerAlt size={40} color="#e80f17" />
        <p className="stat-number">UK</p>
        <p className="stat-text">Nationwide Delivery</p>
      </div>
    </section>
  );
};

export default Stats;
