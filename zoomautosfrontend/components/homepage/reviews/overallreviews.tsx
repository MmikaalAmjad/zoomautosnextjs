"use client"
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import './Reviews.css';
import Slider from 'react-slick';
import MoveReviewForm from './reviewform';

const MoveRatingWithFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const formRef = useRef(null);
  
  const settings = {
    dots: false,
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
        settings: { slidesToShow: 1 ,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://zoomautos.co.uk/api/movereviews',
          {
            
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

  return (
    <>
      <div style={{ marginTop: '50px' }}>
        <h2 className='about-us-title'>Reviews</h2>
      </div>
      <div ref={formRef} className="forms-container animate-on-scroll">
        <MoveReviewForm />
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${"/Reviewbg.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="reviewslider-container">
          {reviews.length > 0 ? (
            <Slider {...settings}>
          {reviews
  .filter(
    (review:any) =>
      (review.professionalism >= 4 &&
      review.driver >= 4 &&
      review.communication >= 4 && review.rating >= 4 && review.jobId !== null)||
      (!review.professionalism &&
        !review.driver &&
        !review.communication && ! review.jobId && review.rating >= 4)
  )
  .map((review:any, index:any) => (
    <div key={index} className="review-tile">
      <div className="review-header">
        <img
          src="/Reviewimage.png"
          alt={`${review.Name}'s avatar`}
          className="review-avatar"
        />
        <Typography
          variant="body2"
          className="review-name"
          style={{ fontWeight: "bold" }}
        >
          {review.Name}
        </Typography>
      </div>

      {review.jobId !== null && (
        <Typography
          variant="body2"
          className="review-name"
          style={{ fontWeight: "bold" }}
        >
          JOB ID: {review.jobId}
        </Typography>
      )}

<div style={{ textAlign: "center", marginBottom: "10px" }}>
  {/* Professionalism */}
  {review.professionalism != null && (
    <>
      <Typography
        variant="body2"
        style={{ display: "block", fontWeight: "bold" }}
      >
        Professionalism
      </Typography>
      <div style={{ display: "block" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`professionalism-${star}`}
            style={{
              color: star <= review.professionalism ? "#e80f17" : "gray",
              fontSize: "18px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  )}

  {/* Driver */}
  {review.driver != null && (
    <>
      <Typography
        variant="body2"
        style={{
          display: "block",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Driver
      </Typography>
      <div style={{ display: "block" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`driver-${star}`}
            style={{
              color: star <= review.driver ? "#e80f17" : "gray",
              fontSize: "18px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  )}

  {/* Communication */}
  {review.communication != null && (
    <>
      <Typography
        variant="body2"
        style={{
          display: "block",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Communication
      </Typography>
      <div style={{ display: "block" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`communication-${star}`}
            style={{
              color: star <= review.communication ? "#e80f17" : "gray",
              fontSize: "18px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  )}

  {/* Rating */}
  {review.rating != null && (
    <>
      <Typography
        variant="body2"
        style={{
          display: "block",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Rating
      </Typography>
      <div style={{ display: "block" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`rating-${star}`}
            style={{
              color: star <= review.rating ? "#e80f17" : "gray",
              fontSize: "18px",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </>
  )}
</div>

      {/* Feedback */}
      <div className="review-text">
        <Typography variant="body2">
          {review.feedback || "No feedback provided"}
        </Typography>
      </div>
    </div>
  ))}

            </Slider>
          ) : (
            <Typography variant="body1">No reviews available.</Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default MoveRatingWithFeedback;
