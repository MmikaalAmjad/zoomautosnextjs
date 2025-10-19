"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogisticsLocation = () => {
    const [locationUrl, setLocationUrl] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    const token = sessionStorage.getItem('authToken'); // Retrieve token from storage 

    // Fetch existing data
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get('https://zoomautos.co.uk/api/LogisticsLocation',{ params: { _t: new Date().getTime() } // Add timestamp to bypass cache
            });
                setLocationUrl(response.data.locationUrl || '');
                setAddress(response.data.address || '');
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };
        fetchLocationData();
    }, []);

    // Handle save/update
    const handleSave = async () => {
        try {
            const response = await axios.put(
                'https://zoomautos.co.uk/api/LogisticsLocation',
                { locationUrl, address },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving location data:', error);
            setMessage('Failed to save location data.');
        }
    };

    return (
        <div className="review-form" style={{marginLeft:'250px',marginBottom:'200px', marginTop:'100px'}}>
    
            <h2>Manage Google Location</h2>
            {message && <p>{message}</p>}
            <div className='form-group'>
            <label>
                Google Location URL:
                
            </label>
                <input
                    type="text"
                    value={locationUrl}
                    onChange={(e) => setLocationUrl(e.target.value)}
                    placeholder="Enter Google Maps URL"
                    disabled={!isEditing}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </div>
            <div className='form-group'>
            <label>
                Address:
                </label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                    disabled={!isEditing}
                    style={{ width: '100%', height: '100px', marginBottom: '10px' }}
                />
            </div>
            {!isEditing ? (
                <button className='contact-button' onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
                <button className='contact-button' onClick={handleSave}>Save</button>
            )}
        </div>
    );
};

export default LogisticsLocation;
