import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./singlerating.scss";

const SingleRating = ({ rating }) => {
  const stars = rating;

  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="sr-icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="sr-icon" />
        ) : (
          <AiOutlineStar className="sr-icon sr-empty-icon" />
        )}
      </span>
    );
  });

  return (
    <section className="section">
      <div className="sr-icon-style">
        <div className="stars">{ratingStar}</div>
      </div>
    </section>
  );
};

export default SingleRating;
