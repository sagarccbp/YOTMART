import React from "react";
import "./failureView.scss";

const FailureView = () => {
  return (
    <>
      <div className="failure-view-container">
        <img
          className="failure-view-error-image"
          alt="failure view"
          src="https://res.cloudinary.com/aneesmon/image/upload/v1648988134/Insta_Share/failure-image_hzoet8.png"
        />
        <p className="failure-view-error-message">
          Something went wrong. Please try again
        </p>
        <button className="failure-view-error-button" type="button">
          Try again
        </button>
      </div>
    </>
  );
};

export default FailureView;
