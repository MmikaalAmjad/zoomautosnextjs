"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { MdDesignServices } from "react-icons/md";

import Carousel from '@/components/homepage/carousel/carousel';
const Services = () => {
  const [services, setservices] = useState([]);
  const [error, setError] = useState(''); // Initialize as a string

  useEffect(() => {
    // Fetch features from the backend
    const fetchservices = async () => {
      try {
        const response = await axios.get('https://zoomautos.co.uk/api/moveservices', {
          
        params: {
          _t: new Date().getTime(), // Add timestamp to bypass cache
        },
      
      }); // Ensure the route is lowercase
        setservices(response.data);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to fetch features. Please try again later.');
      }
    };

    fetchservices();
  }, []);

  const imagesWithText = [
    
    { image: "/truck1.jpg"},
    { image: "/truck2.jpg"}
  ];
  return (
    <>
    <Carousel imagesWithText={imagesWithText}/>
    
    <div className='moveoverlay-text'>
      <h1>Welcome To Zoom Autos</h1>
      <h2 style={{ color:'red'}} >Our Sevices</h2>
      
    </div>
    <div className='grid-container-services'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {services.map((service:any, index) => (
        <Card
          key={index}
           style={{
    width: '18rem',
    background: 'linear-gradient(135deg, #01103b, #e80f17)', // Gradient background
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.09)',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '4px solid #7C3AED',
    minHeight: '30rem',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    color: 'white', // Ensure text is visible on dark gradient
  }}
        >
          <div
            style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: '#7C3AED',
              borderRadius: '50%',
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p style={{ color: 'white', fontSize: '1.5rem' }}>{index + 1}</p>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <MdDesignServices size={48} color="#7C3AED" />
          </div>
          <div style={{ flexGrow: 1, textAlign: 'center' }}>
            <Card.Text style={{ color: '#FFFFFF', fontSize: '0.875rem' }}>
              {service.description}
            </Card.Text>
          </div>
        </Card>
      ))}
    </div>
    </>
  );
};

export default Services;
