import React from "react";
import { makePhonePe } from "../rest/ApiService";
import Loader from "auth/Loader";

const Payment = () => {
  const onClickPayment = () => {
    makePhonePe((res) => {
      console.log(res, "PHONEPE");
      window.location.replace(res.data.instrumentResponse.redirectInfo.url);
    });
  };
  return <div onClick={onClickPayment}>Payment</div>;
};

export default Payment;
