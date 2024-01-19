import React, { useEffect } from "react";
import "./aboutUs.scss";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-description">
        We<span className="about-us-span">BURETTE.IN</span>, inspired by make in
        India concept, an Indian e commerce company Headquartered in
        Koramangala, Bangalore
      </p>
      <p className="about-us-description">
        Buying products online can be quite challenging. Nowadays, most of our
        shopping is done online, and We
        <span className="about-us-span">BURETTE.IN</span>assure all our
        customers delighted while shopping.
        <span className="about-us-span">BURETTE.IN</span> ensures
        <span className="about-us-span">CUSTOMER HAPPY</span> is our moto.
      </p>
    </div>
  );
};

export default AboutUs;
