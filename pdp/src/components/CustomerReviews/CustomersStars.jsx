import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./customersstars.scss";

const CustomersStars = ({ reviews }) => {
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
          <FaStar className="crs-icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="crs-icon" />
        ) : (
          <AiOutlineStar className="crs-icon crs-empty-icon" />
        )}
      </span>
    );
  });

  return (
    <section className="section">
      <div className="crs-icon-style">
        <div className="stars">{ratingStar}</div>
        <p className="crs-reviews-style">
          Based on {reviewsLength} {reviewsLength > 1 ? "Reviews" : "Review"}
        </p>
      </div>
    </section>
  );
};

export default CustomersStars;
