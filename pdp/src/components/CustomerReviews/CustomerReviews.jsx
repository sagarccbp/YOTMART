import React from "react";
import { format } from "date-fns";
import "./customerreviews.scss";
import CustomersStars from "./CustomersStars";
import SingleRating from "./SingleRating";

const CustomerReviews = ({ reviews }) => {
  return (
    <div className="customer-reviews-container">
      <h1 className="customer-reviews-heading">Customer Reviews</h1>
      <div className="stars-container">
        <CustomersStars reviews={reviews} />
      </div>
      <hr />
      <div className="reviews-container">
        {reviews.map((review, index) => {
          return (
            <div className="review-container" key={index}>
              <SingleRating rating={review.rating} />
              <h3 className="review-heading">{review.heading}</h3>
              <p className="review-time">
                {format(new Date(`${review.reviewCreatedTime}`), "dd/MM/yyyy")}
              </p>
              <p className="review">{review.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerReviews;
