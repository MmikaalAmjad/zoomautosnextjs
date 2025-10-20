"use client"
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';

const DeleteMoveReviews = () => {
  const [reviews, setReviews] = useState([]);
  const formRef = useRef(null);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/movereviews', {
         
        params: {
          _t: new Date().getTime(), // Add timestamp to bypass cache
        },
      
      });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId:any) => {
    try {
      // Send delete request to the server
      await axios.delete(`/api/movereviews/${reviewId}`);
      // Remove the deleted review from the state
      setReviews(reviews.filter((review:any) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <>
    <div className='overalls'>
      <div style={{ marginTop: '50px' }}>
        <h2 className='about-us-title'>Delete Reviews</h2>
      </div>
      <div className="reviews-container" style={{marginTop:'100px'}}>
      
      {reviews.length > 0 ? (
        <div className="reviews-list">
    
            {reviews.map((review:any, index) => (
                <div key={index} className="review-tile">
                  <div className="review-header">
                    
                    <Typography variant="body2" className="review-name" style={{fontWeight: "bold"}}>
                      {review.Name}
                    </Typography>
                  </div>
                  {review.jobId !== null && (
                    <Typography variant="body2" className="review-name" style={{fontWeight: "bold"}}>
                      JOB ID: {review.jobId}
                    </Typography>
                  )}
                  {/* Ratings */}
                  {review.professionalism  && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <Typography variant="body2" style={{ display: "block", fontWeight: "bold" }}>
                        Professionalism
                      </Typography>
                      <div style={{ display: "block" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color: star <= review.professionalism ? "#e80f17" : "gray",
                              fontSize: "18px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {review.driver && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <Typography variant="body2" style={{ display: "block", fontWeight: "bold" }}>
                        Driver
                      </Typography>
                      <div style={{ display: "block" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color: star <= review.driver ? "#e80f17" : "gray",
                              fontSize: "18px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {review.rating  && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <Typography variant="body2" style={{ display: "block", fontWeight: "bold" }}>
                        Rating
                      </Typography>
                      <div style={{ display: "block" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color: star <= review.rating ? "#e80f17" : "gray",
                              fontSize: "18px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {review.communication  && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <Typography variant="body2" style={{ display: "block", fontWeight: "bold" }}>
                        Communication
                      </Typography>
                      <div style={{ display: "block" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color: star <= review.communication ? "#e80f17" : "gray",
                              fontSize: "18px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Feedback */}
                  <div className="review-text">
                    <Typography variant="body2">{review.feedback || 'No feedback provided'}</Typography>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteReview(review._id)}
                    style={{
                      backgroundColor: "#e80f17",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            
        </div>
          ) : (
            <Typography variant="body1">No reviews available.</Typography>
          )}
      </div>
      </div>
    </>
  );
};

export default DeleteMoveReviews;
