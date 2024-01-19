import React from "react";
import Footer from "./Footer/Footer";
import MobileFooter from "./MobileFooter/MobileFooter";
import "./footers.scss";
const Footers = () => {
  return (
    <>
      <div className="footer-container">
        <Footer />
      </div>
      <div className="mobile-footer-container">
        <MobileFooter />
      </div>
    </>
  );
};

export default Footers;
