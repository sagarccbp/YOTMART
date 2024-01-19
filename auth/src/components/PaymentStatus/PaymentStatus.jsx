import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./paymentStatus.scss";
const PaymentStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("");

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
      } else {
        const timeId = setTimeout(() => {
          window.location.replace("#/cart");
          window.location.reload(true);
          setSearchParams("");
        }, 10000);
      }
    }
  }, []);
  return (
    <div className="payment-status-main-container">
      <h2>
        Payment failed because of uncertainty.. Please sit back we will get back
      </h2>
    </div>
  );
};

export default PaymentStatus;
