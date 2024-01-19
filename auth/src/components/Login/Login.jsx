import React, { useState, useEffect } from "react";
import { login, useLoggedIn } from "../../rest/ApiService";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import AlertDialog from "../AlertComponent/AlertComponent";

export default function Login() {
  const loggedInUserCred = useLoggedIn();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loggedInUserCred) {
    return null;
  }

  const onClickLogin = (event) => {
    event.preventDefault();
    login(mobileNumber, password, (result) => {
      if (Number.isInteger(result)) {
        setShowMessage("User credentials not matching");
      } else if (result.message) {
        setShowMessage(result.message);
        navigate("/", { replace: true });
        window.location.reload(false);
      }
    });
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        {showMessage ? (
          <AlertDialog message={showMessage} isShowable={true} />
        ) : (
          ""
        )}

        <h1 className="login-form-heading">Login</h1>
        <div>
          <input
            type="tel"
            id="username"
            className="login-form-input-field"
            placeholder="Enter your number"
            required={true}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="login-form-input-container">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="login-form-input-field"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form-button-container">
          <button type="submit" className="login-button" onClick={onClickLogin}>
            Sign in
          </button>
          <div className="login-form-para-container">
            <p className="login-form-para1">
              New Customer?{" "}
              <Link to="/register">
                <span className="login-form-span">Create account</span>
              </Link>{" "}
            </p>
            <Link to="/forgotpassword">
              <p className="login-form-para2 login-form-span">
                Forgot your password?
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
