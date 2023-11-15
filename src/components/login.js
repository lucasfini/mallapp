import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Login = ({ welcomeName }) => {
  const [showModal, setShowModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
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
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'large',
          shape: 'rectangular',
          text: 'signin_with',
          text_color: 'white',
          background_color: '#00000',
          border_color: 'black',
          icon_color: 'white',
          corner_radius: 10,
        }
      );
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

  return (
    <div className="login-page">
      <div
        className={`modal fade  `}
        style={{ display: showModal ? "block" : "" }}
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content ">
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
                {showLogin ? (
                  <form>
                    <div className="d-flex justify-content-center">
                      <div className="col-12 p-4  ">
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
                        <div className="row">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control login-inputs"
                              id="username"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <input
                              type="password"
                              className="form-control login-inputs"
                              id="password"
                              placeholder="Password"
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
                          <div className="col-6 d-flex justify-content-end">
                            <a className="login-forgotPassword">
                              Forgot Password
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-3 mb-3">
                            <button
                              type="button"
                              className="login-pageButton"
                              onClick={handleLogin}
                            >
                              Sign In
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-noAccountText">
                              Don't have an account?{" "}
                              <a
                                className="login-noAccountLink"
                                onClick={toggleRegister}
                              >
                                Sign up free.
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form>
                    <div className="d-flex justify-content-center">
                      <div className="col-12 p-4  ">
                      <div className="row">
                          <div className="col-12 d-flex justify-content-center mb-4">
                            <p className="login-storeName">ESEMBLY</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-title">Get Started:</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-subtitle">
                              Please enter your details
                            </p>
                          </div>
                        </div>
                        <div className="row mt-1 ">
                          <div className="d-flex align-items-center">
                            <hr
                              className="flex-grow-1"
                              style={{ borderTop: "1px solid #000" }}
                            />
                          </div>
                        </div>
                        <div className="row mt-4 ">
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control login-inputs"
                              id="firstName"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="col-6 ">
                            <input
                              type="text"
                              className="form-control login-inputs"
                              id="lastName"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control login-inputs"
                              id="email"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-12">
                            <input
                              type="password"
                              className="form-control login-inputs"
                              id="password"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-12">
                            <input
                              type="password"
                              className="form-control login-inputs"
                              id="rePassword"
                              placeholder="Re-password"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-3 mb-3">
                            <button
                              type="button"
                              className="login-pageButton"
                              onClick={handleLogin}
                            >
                              Sign Up
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <p className="login-noAccountText">
                              Have an account?{" "}
                              <a
                                className="login-noAccountLink"
                                onClick={toggleLogin}
                              >
                                Sign In Free.
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
