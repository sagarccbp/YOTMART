import React, { useState, useEffect } from "react";
import { useLoggedIn } from "../../rest/ApiService";

import { Link, useSearchParams } from "react-router-dom";
import "./thankyoupage.scss";

const ThankYouPage = () => {
  const user = useLoggedIn();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);
  useEffect(() => {
    console.log(searchParams, "S");
    if (searchParams.size > 0) {
      const phonePeRes = searchParams.get("data");
      console.log(phonePeRes, "P");

      const decodedData = atob(phonePeRes);
      console.log(decodedData, "P");
      const data = JSON.parse(decodedData);
      console.log(data, "P");

      if (data && data.code === "PAYMENT_SUCCESS") {
        window.location.replace("#/thankyou");
        window.location.reload(true);
        setSearchParams("");
      }
    }
  }, []);
  return (
    <>
      <div className="thankyou-page-container">
        <h1 className="thankyou-heading">THANK YOU</h1>
        <div className="thankyou-page-buttons-container">
          <Link to="/">
            <button className="thankyou-continue-shopping-button">
              CONTINUE SHOPPING
            </button>
          </Link>
          {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
            <Link to="/orders" state={{ userId: loggedInUser.user._id }}>
              <button className="thankyou-myorders-button">MY ORDERS</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
