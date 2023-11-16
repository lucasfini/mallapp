import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const Login = ({ welcomeName }) => {
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [reference, setReference] = useState("");

  const google = window.google;

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login logic goes here");
  };

  // Use effect to load the rememberMe state from local storage on component mount
  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe) {
      setRememberMe(JSON.parse(storedRememberMe));
    }
  }, []);

  useEffect(() => {
    if (showLogin) {
      // Render the Google button when showLogin is true
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "signin_with",
        text_color: "white",
        background_color: "#00000",
        border_color: "black",
        icon_color: "white",
        corner_radius: 10,
      });
    }
  }, [showLogin]);

  // Use effect to save the rememberMe state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const toggleRegister = () => {
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(true);
  };

  // Function to handle form submission to generate OTP
  const handleGenerateOTP = async (e) => {
    e.preventDefault();
console.log(email);
    try {
      // Call the endpoint to generate OTP
      const response = await axios.get(
        `https://rumine.ca/_search/user/email/otp/generate?email=${email}`
      );
      const results = response.data;
        console.log(results);
      const data = results.data
      // Assuming 'data' contains the reference for further verification
      setReference(data);
  
      // Update state to show OTP input field
      setOtpSent(true);
    } catch (error) {
      console.error("Error generating OTP:", error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      // Call the endpoint to verify OTP
      const response = await axios.get(
        `https://rumine.ca/_search/user/email/otp/verify?reference=${encodeURIComponent(reference)}&passcode=${encodeURIComponent(otpCode)}`
      );
      console.log(response.data);
      // Check response status and perform necessary actions
      if (response.data.success == true) {
        // OTP verification successful, proceed with sign-in
        // You can add your logic here to handle successful sign-in
        console.log("OTP verified successfully. Proceed with sign-in.");
        let token = response.token
        localStorage.setItem("emailUserInfo",email);
        localStorage.setItem("accessToken", token);
        //   console.log(searchResults);
        window.location.reload();
      } else {
        // OTP verification failed
        console.error("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="login-page">
      <div
        className={`modal fade  `}
        style={{ display: showModal ? "block" : "" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content login-background ">
            <div className="modal-body">
              {/* Your login form goes here */}
              <div className="row">
                <div className="col-12 d-flex justify-content-end m-0">
                  <button
                    type="button"
                    className="close me-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleLogin}
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
              <div className="container">
                
                  <form>
                    <div className="d-flex justify-content-center">
                      <div className="col-12 p-4 pt-0  ">
                        <div className="row">
                          <div className="col-12 d-flex justify-content-center mb-4">
                            <p className="login-storeName">ESEMBLY</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-title">
                              Welcome back, {welcomeName}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-subtitle">
                              Please enter your details
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-12 ">
                            <div
                              className="login-google  w-100 d-flex justify-content-center"
                              id="signInDiv"
                            ></div>
                          </div>
                        </div>
                        <div className="row mt-3 ">
                          <div className="d-flex align-items-center">
                            <hr
                              className="flex-grow-1"
                              style={{ borderTop: "1px solid #000" }}
                            />
                            <span className="mx-2">or</span>
                            <hr
                              className="flex-grow-1"
                              style={{ borderTop: "1px solid #000" }}
                            />
                          </div>
                        </div>
                        { !otpSent ? (
                    <div>
                        <div className="row">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control login-inputs"
                              id="email"
                              value={email}
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                              
                            />
                          </div>
                        </div>
                        <div className="row mt-2 ">
                          <div className="col-6">
                            <label className="login-rememberMe">
                              <input
                                className="me-2"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                              />
                              Remember Me
                            </label>
                          </div>
                        </div>
                        </div>
                        ) : ("")}
                       { otpSent ? (
                          /* OTP input field */
                          <div className="row">
                             <div className="col-12 mb-2 d-flex justify-content-center">
                             <p>Check your email for a one-time passcode</p>
                            </div>
                            <div className="col-12">
                              <input
                                type="text"
                                className="form-control login-inputs"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="Enter OTP"
                              />
                            </div>
                            <div className="col-12 mt-3 mb-3">
                              <button
                                type="button"
                                className="login-pageButton"
                                onClick={handleVerifyOTP}
                              >
                               Sign In
                              </button>
                            </div>
                          </div>
                       ) : ("")}
                        
                        {!otpSent ? (
                          <div className="row">
                            <div className="col-12 mt-3 mb-3">
                              <button
                                type="button"
                                className="login-pageButton"
                                onClick={handleGenerateOTP}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        ) : ("")}
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
