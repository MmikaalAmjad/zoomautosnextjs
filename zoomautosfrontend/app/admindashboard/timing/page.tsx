"use client"
import React, { useState, useEffect } from 'react';
// Helper function to convert 24-hour format to 12-hour AM/PM format
const convertToAMPM = (time:any) => {
  const [hours, minutes] = time.split(':');
  let hoursInt = parseInt(hours, 10);
  const suffix = hoursInt >= 12 ? 'PM' : 'AM';
  if (hoursInt > 12) hoursInt -= 12;
  if (hoursInt === 0) hoursInt = 12;
  return `${hoursInt}:${minutes} ${suffix}`;
};
const LogisticsTiming = () => {
  const [timings, setTimings] = useState([]);
  const [formData, setFormData] = useState({ day: '', startTime: '', endTime: '' });

  // Fetch timings from the backend
  useEffect(() => {
    fetchTimings();
  }, []);

  const fetchTimings = async () => {
    const response = await fetch(
  `/api/timing?_t=${new Date().getTime()}`
);

    const data = await response.json();
    // Convert times to AM/PM format before setting the state
    const convertedData = data.map((timing:any) => ({
      ...timing,
      startTime: convertToAMPM(timing.startTime),
      endTime: convertToAMPM(timing.endTime),
    }));
    setTimings(convertedData);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.day || !formData.startTime || !formData.endTime) {
      alert('Please fill all fields.');
      return;
    }

    // Convert the form data times to 24-hour format before sending to the server
    const startTime24 = formData.startTime.split(' ')[0];
    const endTime24 = formData.endTime.split(' ')[0];

    await fetch('/api/timing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        startTime: startTime24,
        endTime: endTime24,
      }),
    });

    setFormData({ day: '', startTime: '', endTime: '' }); // Reset form
    fetchTimings(); // Refresh timings list
  };

  return (
    <div className='overalls'>
       
    <div className="Timing">
      <h1>Edit Timings for Each Day</h1>
      
      {/* Form for adding/editing timings */}
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <select name="day" value={formData.day} onChange={handleInputChange} required>
            <option value="">Select Day</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className='contact-button'>Save</button>
      </form>

      {/* List of existing timings */}
      <h2>Timings List</h2>
      <ul className="uli">
        {timings.map((timing:any) => (
          <li className="lis" key={timing.day}>
            <strong>{timing.day}:</strong> {timing.startTime} - {timing.endTime}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default LogisticsTiming;
