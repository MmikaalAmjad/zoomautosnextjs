"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./emailform.css"
const EmailManagerLogisitcs = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    const token = sessionStorage.getItem('Transport Admin AuthToken'); // Retrieve token from storage 
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // Fetch existing email data
    useEffect(() => {
        const fetchEmailData = async () => {
            try {
                const response = await axios.get('/api/logisticsemail'
                    ,{ params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      }
                );
                setEmail(response.data.email || '');
            } catch (error) {
                console.error('Error fetching email data:', error);
            }
        };
        fetchEmailData();
    }, []);

    // Handle save/update
    const handleSave = async () => {
        if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.put(
                '/api/logisticsemail',
                { email: newEmail },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
            setEmail(newEmail);
            setNewEmail('');
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving email data:', error);
            setMessage('Failed to save email data.');
        }
    };

    return (
        <div className="review-form" style={{ marginLeft:'250px',marginBottom:'200px', marginTop:'100px'}}>
            <h2>Manage Email Address</h2>
            {message && <p>{message}</p>}
            <div className='form-group'>
            <label>
                Current Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Current Email Address"
                    disabled
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </label>
            </div>
            {isEditing && (
                <div className='form-group'>
            
                <label>
                    New Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter New Email Address"
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                </label>
                </div>
            )}
            {!isEditing ? (
                <button className="contact-button" onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
                <button className="contact-button" onClick={handleSave}>Save</button>
            )}
        </div>
    );
};

export default EmailManagerLogisitcs;
