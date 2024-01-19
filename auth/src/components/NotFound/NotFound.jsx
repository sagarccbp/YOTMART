import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt=""
      src="https://res.cloudinary.com/aneesmon/image/upload/v1648988139/Insta_Share/page-not-found-image_wqlqmz.png"
    />
    <h1 className="not-found-message">Page Not Found</h1>
    <p className=" not-found-description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-homepage-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
);

export default NotFound;
