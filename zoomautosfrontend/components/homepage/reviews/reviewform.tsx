"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import "./reviewform.css";

interface ReviewFormInputs {
  reviewPerson: string;
  reviewContent: string;
}

const MoveReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormInputs>();

  const onSubmit: SubmitHandler<ReviewFormInputs> = async (data) => {
    try {
      const formData = {
        Name: data.reviewPerson,
        feedback: data.reviewContent,
        rating,
      };

      setLoading(true);
      const response = await axios.post("/api/movereviews", formData);

      if (response.status === 201) {
        setSuccess(true);
        setLoading(false);
        console.log("✅ Review submitted successfully:", response.data);
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("There was an error submitting your review. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h2 style={{ color: "#01103b" }}>Write A Review</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="reviewPerson">Your Name</label>
        <input
          type="text"
          id="reviewPerson"
          maxLength={25}
          placeholder="Enter Your Name"
          {...register("reviewPerson", { required: "Name is required" })}
        />
        {errors.reviewPerson && (
          <p className="error-message">{errors.reviewPerson.message}</p>
        )}

        <label htmlFor="reviewContent">Description</label>
        <textarea
          rows={5}
          placeholder="Tip: Ideal length for a good review is 200–350 words."
          {...register("reviewContent", {
            required: "Review content is required",
            minLength: { value: 50, message: "Must be at least 50 words" },
          })}
        />
        {errors.reviewContent && (
          <p className="error-message">{errors.reviewContent.message}</p>
        )}

        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          Service Rating
        </label>

        <div className="rating" style={{ alignSelf: "center" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#e80f17" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="contact-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {success && (
        <div className="overlayStyle">
          <div className="successStyle">
            ✅ Thanks for submitting your review! It means a lot to us.
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveReviewForm;
