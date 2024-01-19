import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../rest/ApiService";
import "./resetpassword.scss";

function ResetPassword() {
  const [password, setPassword] = useState();
  const { id, token } = useParams();
  //   const navigate = useNavigate();
  console.log(id, token);
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(id, token, password, (result) => {
      console.log(result);
      if (result.Status === "Success") {
        // navigate("/login");
        console.log("SAGAR");
      }
    });
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-form-heading">Reset Password</h1>

      <form className="forgot-password-form-container" onSubmit={handleSubmit}>
        <h1 className="forgot-password-reset-psw-heading">New Password</h1>
        {/* <p className="forgot-password-description">
          We will send you an email to reset your password
        </p> */}
        <input
          className="forgot-password-input-field"
          type="password"
          placeholder="Enter Password"
          autoComplete="off"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="forgot-password-button-container">
          <button className="forgot-password-submit-button">Update</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
