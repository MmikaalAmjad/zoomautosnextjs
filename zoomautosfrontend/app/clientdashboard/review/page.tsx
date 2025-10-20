"use client"
import React, { useEffect, useState, useCallback , useRef} from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';


import { useDealerAdmin } from '@/components/clientcontext/clientcontext';

const ReviewFormWithID = () => {
  const formRef = useRef(null);
  const [driver, setDriver] = useState(0);
  const [professionalism, setProfessionalism] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [records, setRecords] = useState([]);
  const { dealerDetails, updateDealerDetails } = useDealerAdmin();
  const [jobId, setJobId] = useState("");
  const [jobSuggestions, setJobSuggestions] = useState<any>([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Load dealer details from local storage if missing
  useEffect(() => {
    const storedUser = localStorage.getItem("DealerData");
    if (storedUser && !dealerDetails?.name) {
      updateDealerDetails(JSON.parse(storedUser));
    }
  }, [dealerDetails, updateDealerDetails]);
  const token = sessionStorage.getItem("authTokenDealer");
     
  // Fetch Completed Job Records
  useEffect(() => {
    const fetchRecords = async () => {
      if (!dealerDetails?.Id ) return;

      try {
        const response = await axios.get('/api/subcontract', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
        },
          params: { _t: new Date().getTime() } // Add timestamp to bypass cache
      });
        const filteredData = response.data.filter(
          (item:any) => item.status.toLowerCase() === "completed" &&
                    item.customerid===dealerDetails.Id && item.Review==="No"
        );

        setRecords(filteredData);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, [dealerDetails]);

  // Handle Job ID Suggestions
  useEffect(() => {
    if (!jobId) {
      setJobSuggestions([]);
    } else {
      const uniqueJobIds = [...new Set(records.map((record:any) => record.jobId).filter(Boolean))];

      if (uniqueJobIds.includes(jobId)) {
        setJobSuggestions([]);
      } else {
        setJobSuggestions(uniqueJobIds.filter((id) => id.includes(jobId)));
      }
    }
  }, [jobId, records]);

  // Handle Review Submission
  const onSubmit = async (data:any) => {
    
    try {
      const formData = {
        Name: dealerDetails.name,
        jobId: jobId.trim(),
        feedback: data.reviewContent.trim(),
        driver,
        professionalism,
        communication,
        rating,
      };
  
      console.log("Submitting Data:", formData); // Debugging step
  
      setLoading(true);
      const response = await axios.post('/api/movereviews', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 201) {
        setLoading(false);
        setSuccess(true);
        setJobId("");
        reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error:any) {
      console.error("API Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "There was an error submitting your review. Please try again.");
    }
  };
  

  // Optimized Star Rating Handler
  const handleRatingClick = useCallback((setter:any, star:any) => {
    setter(star);
  }, []);

  // Render Star Rating Component
  const renderStars = (ratingValue:any, setRatingValue:any) => (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingClick(setRatingValue, star)}
          style={{ cursor: 'pointer', color: star <= ratingValue ? '#e80f17' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div style={{ marginTop: '100px' }}>
      <img src="/TC.png" alt="Logistics Background" className="background-image" />

      <div className="review-form">
        <h2 style={{ color: '#01103b' }}>Write A Review</h2>

        <label><strong>JOB ID:</strong></label>
        <input
          type="text"
          placeholder="Search by Job ID..."
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />
        {jobSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {jobSuggestions.map((id:any, index:any) => (
              <li key={index} onClick={() => setJobId(id)} className="suggestion-item">
                {id}
              </li>
            ))}
          </ul>
        )}

<form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="reviewPerson">Your Name</label>
          <input type="text" id="reviewPerson" value={dealerDetails?.name || ""} readOnly />

          <label htmlFor="reviewContent">Description</label>
          <textarea
            placeholder="Tip: Ideal length for a good review is 200 to 350 words. Minimum 50 words."
            rows={5}
            {...register('reviewContent', {
              required: 'Review content is required',
              minLength: { value: 50, message: 'Review must be at least 50 words' },
            })}
          />

          <label>Driver</label>
          {renderStars(driver, setDriver)}

          <label>Professionalism</label>
          {renderStars(professionalism, setProfessionalism)}

          <label>Communication</label>
          {renderStars(communication, setCommunication)}

          <label>Overall Rating</label>
          {renderStars(rating, setRating)}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="contact-button">Submit</button>
          </div>
        </form>

        {loading && <div className='overlayStyle'><div className='loadingStyle'>Submitting...</div></div>}
        {success && <div className='overlayStyle'><div className='successStyle'>Thanks for Submitting your Review! It means a lot to us!</div></div>}
      </div>
    </div>
  );
};

export default ReviewFormWithID;
