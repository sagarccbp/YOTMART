import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./stars.scss";

const Stars = ({ reviews }) => {
  let sum = reviews.reduce(function (prev, current) {
    return prev + +current.rating;
  }, 0);

  const stars = sum / reviews.length;
  const reviewsLength = reviews.length;
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon empty-icon" />
        )}
      </span>
    );
  });

  return (
    <section className="section">
      <div className="icon-style">
        {ratingStar}
        <p className="reviews-style">
          {reviewsLength}{" "}
          {reviewsLength === 0
            ? "No reviews found"
            : reviewsLength > 1
            ? "Reviews"
            : "Review"}
        </p>
      </div>
    </section>
  );
};

export default Stars;
