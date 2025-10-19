import React from 'react';
import './radialcomponent.css';

const MoveBackground = () => {
  return (
    <div className="logisticscontainer">
      {/* Left Side: UK Map */}
      <div className="logisticsleft-section">
        <img src="/UK ZOOM.png" alt="UK Map" className="uk-map" />
      </div>

      {/* Right Side: Circle */}
      <div className="logisticsright-section">
        <div className="blue-circle"></div>
      </div>
    </div>
  );
};

export default MoveBackground;
