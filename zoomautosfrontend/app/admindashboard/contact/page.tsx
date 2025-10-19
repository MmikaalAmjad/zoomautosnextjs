"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogisticsContactEditor = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem('authToken'); // Retrieve token from storage
  const [contactNo, setContactNo] = useState('');
  
  // Fetch the contact number on component mount
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://zoomautos.co.uk/api/LogisticsContact' 
          ,{params: {
            _t: new Date().getTime(), // Add timestamp to bypass cache
          },
        }
        );
        setContactNo(response.data.contactNo || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage('Error fetching contact number');
      }
    };
    fetchContact();
  }, []);

  
  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put('https://zoomautos.co.uk/api/LogisticsContact', { contactNo },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
      );
      setMessage(response.data.message || 'Contact number updated successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage('Error updating contact number');
    }
  };

  return (
    <div className="review-form" style={{ marginLeft: '250px', marginBottom: '200px', marginTop: '100px' }}
>
    
    <h2>Contact Number Editor</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
        <div className='form-group'>
        <label >Contact Number:</label>
        <input
          type="text"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          
          required
        />
        </div>
        <button  className="contact-button" onClick={handleSubmit} type="submit" >
          Update
        </button>
      </div>
    
  );
};


export default LogisticsContactEditor;
