import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./forgotpassword.scss";
import { forgotPassword } from "../../rest/ApiService";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email, (result) => {
      console.log(result);
      if (result.Status === "Success") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-form-heading">Forgot Password</h1>

      <form className="forgot-password-form-container" onSubmit={handleSubmit}>
        <h1 className="forgot-password-reset-psw-heading">
          Reset Your Password
        </h1>
        <p className="forgot-password-description">
          We will send you an email to reset your password
        </p>
        <input
          className="forgot-password-input-field"
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="forgot-password-button-container">
          <button className="forgot-password-submit-button">Send</button>
          <button className="forgot-password-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
