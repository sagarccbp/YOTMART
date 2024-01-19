import React, { useState } from "react";
import { create, useLoggedIn } from "../../rest/ApiService";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "../AlertComponent/AlertComponent";
import { ToastContainer, toast } from "react-toastify";
import Loader from "auth/Loader";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import app from "../firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";

import "./createaccount.scss";

const auth = getAuth(app);

function CreateAccount() {
  const loggedInUserCred = useLoggedIn();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  let navigate = useNavigate();

  if (loggedInUserCred) {
    return null;
  }

  const toggle = () => {
    setModal(!modal);
    setLoading(false);
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    onCaptchaVerify();

    const phoneNumber = "+91" + mobileNumber;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast("OTP Sent to your Mobile number");
        setVerifyOtp(true);
        toggle();
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  const verifyCode = () => {
    console.log(otp.join(""), "OTP");
    window.confirmationResult
      .confirm(otp.join(""))
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user, "UDER DATA");
        toast("OTP Verified");
        setVerified(true);
        setIsDisabled(true);
        setVerifyOtp(false);
        // ...
      })
      .catch((error) => {
        toast("Invalid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const onChangeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
    if (e.target.value.length === 10) {
      setVerifyButton(true);
    } else {
      setVerifyButton(false);
    }
  };

  const onClickCreate = (event) => {
    event.preventDefault();
    if (verified) {
      create(fullName, email, mobileNumber, password, (result) => {
        if (result.error) {
          setShowMessage("User credentials not matching");
        } else if (result.message) {
          setShowMessage(result.message);
          toast("Successfully Created the Account");
          navigate("/login");
        }
      });
    } else {
      setShowMessage("Please Verify Mobile Number");
    }
  };

  return (
    <div className="create-account-container">
      <form className="create-account-form-container">
        {showMessage ? (
          <AlertDialog message={showMessage} isShowable={true} />
        ) : (
          ""
        )}
        <h1 className="create-account-form-heading">Create account</h1>
        <div id="recaptcha-container"></div>
        <div className="create-account-input-container">
          <div className="create-account-sub-input-container">
            <div className="mobile-number-verify">
              <input
                type="tel"
                id="mobilenumber"
                required
                value={mobileNumber}
                disabled={isDisabled}
                style={{ margin: "0px", borderRight: "none" }}
                className="create-account-input-field"
                placeholder="Enter your number"
                onChange={(e) => onChangeMobileNumber(e)}
              />

              {verifyButton ? (
                <input
                  type="button"
                  value={verified ? "Verified" : "OTP"}
                  onClick={onSignInSubmit}
                  style={{
                    backgroundColor: "#9a031e",

                    color: "white",
                    border: "none",
                    margin: "10px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                  }}
                />
              ) : null}
            </div>

            <input
              type="email"
              id="email"
              required
              value={email}
              className="create-account-input-field"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="create-account-sub-input-container">
            <input
              type="text"
              id="fullname"
              required
              value={fullName}
              className="create-account-input-field"
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
            />

            {verifyOtp ? (
              <div>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader
                    style={{ border: 0 }}
                    toggle={toggle}
                  ></ModalHeader>
                  <ModalBody>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="row p-5">
                        <div className="col text-center">
                          <p>Enter the OTP sent to your Mobile number</p>

                          {otp.map((data, index) => {
                            return (
                              <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                              />
                            );
                          })}
                          <div className="otp-buttons-container">
                            <button
                              className="btn btn-secondary mr-2"
                              onClick={(e) => setOtp([...otp.map((v) => "")])}
                            >
                              Clear
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={verifyCode}
                            >
                              Verify OTP
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                </Modal>
              </div>
            ) : null}

            {/* {verifyOtp ? (
              <div className="mobile-number-verify-container">
                <input
                  type="number"
                  id="otp"
                  required
                  value={otp}
                  className="create-account-input-field"
                  placeholder="Enter your OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="button"
                  value="SUBMIT OTP"
                  onClick={verifyCode}
                  style={{
                    backgroundColor: "#9a031e",
                    height: "50px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    color: "white",
                    border: "none",
                    margin: "10px",

                    borderRadius: "3px",
                  }}
                />
              </div>
            ) : null} */}

            <input
              type="password"
              id="password"
              required
              value={password}
              className="create-account-input-field"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="create-account-button-container">
          <button
            type="submit"
            className="create-account-button"
            onClick={onClickCreate}
          >
            Create
          </button>
          <div className="create-account-para-container">
            <p className="create-account-para1">
              Returning customer?{" "}
              <Link to="/login">
                <span className="create-account-span">Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateAccount;
