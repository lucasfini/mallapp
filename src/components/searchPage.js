import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import Fade from "react-reveal/Fade";
import Footer from "./footer";
import Login from "./login";
import axios from "axios";
import { WiStars } from "react-icons/wi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { PiGoogleCardboardLogo } from "react-icons/pi";

function SearchPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [welcomeName, setWelcomeName] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const google = window.google;

  const exampleSearch = (query) => {
    setQuery(query);
    var inputElement = document.getElementById("searchQuery");
    inputElement.value = query;

    setTimeout(function () {
      // Change the value of the input after another 1 second

      // Call the original function after the timeouts
      performSearch();
    }, 2000);
  };

  const handleCallbackResponse = async (response) => {
    console.log(response.credential);

    try {
      // Perform the Axios call and get search results
      const loginResponse = await axios.post(
        'https://rumine.ca/_search/user/sso/google/create',{
        idToken: response.credential
        }
      );
     console.log(loginResponse);
      //   console.log(searchResults);

      // Navigate to the ProductsPage route and pass searchResults as state
     
    } catch (error) {
      console.error("Error:", error);
    }



    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    localStorage.setItem("welcomeName", userObject.given_name);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "806227482991-edi5d5sikhpcg0ujg53u8ns31v80cjg5.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      shape: "rectangular", // Set the button shape
      text: "signin_with", // Set custom text (e.g., "Sign in with Google")
      text_color: "white", // Set the text color
      background_color: "#00000", // Set the background color
      border_color: "black", // Set the border color
      icon_color: "white", // Set the icon color
      corner_radius: 10, // Set the corner radius
    });

    const storedWelcomeName = localStorage.getItem("welcomeName");
    if (storedWelcomeName) {
      setWelcomeName(storedWelcomeName);
      console.log(welcomeName);
    }
  }, []);

  const makeMeALook = async () => {
    console.log("HI");
    try {
      // Perform the Axios call and get search results
      const response = await axios.get(
        `https://rumine.ca/_search/gw/search?makeMeALook=${true}`
      );
      const searchResults = response.data;
      //   console.log(searchResults);

      // Navigate to the ProductsPage route and pass searchResults as state
      navigate(`/productPage?makeMeALook`, { state: { searchResults } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the form submission
      performSearch();
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    performSearch();
  };

  const performSearch = async () => {
    try {
      // Perform the Axios call and get search results
      const response = await axios.get(
        `https://rumine.ca/_search/gw/search?query=${query}`
      );
      const searchResults = response.data;
      //   console.log(searchResults);

      // Navigate to the ProductsPage route and pass searchResults as state
      navigate(`/productPage?query=${query}`, { state: { searchResults } });
    } catch (error) {
      console.error("Error:", error);
    }
  };


const toggleLogin = () => {
  setShowLogin(false);
}


  return (
    <div className="container-flush blur-img" style={{ height: "100vh" }}>
     
        <div className="row m-3 ">
          <div className="col-12  text-end">
            <button
              type="button"
              className="logButton"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="h-100 d-flex flex-column ">
          <div className="row justify-content-center mt-3 mb-5">
            <div className="col-12 d-flex justify-content-center">
              <p className="searchpage-title">ESEMBLY</p>
            </div>
          </div>

          <div className="row justify-content-center mt-5 d-flex ">
            <div className="col-10 col-sm-8 col-md-7">
              <form>
                <input
                  type="text"
                  id="searchQuery"
                  className="form-control searchBar"
                  placeholder="Search..."
                  value={query}
                  onKeyDown={handleKeyDown} // Trigger search on Enter key down
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="searchButton" onClick={handleButtonClick}>
                  <i>
                    <GoSearch />
                  </i>
                </button>
              </form>
              <div className="row justify-content-lg-end justify-content-center mt-2 d-flex ">
            <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4   ">
            <div className="card special-button d-flex justify-content-center ">
                    <div className="card-body p-3" onClick={makeMeALook}>
                      Make me a Look{" "}
                      <button className="exampleButton">
                        {" "}
                        <i className="arrowIcon-mmal">
                          {" "}
                          <WiStars />
                        </i>
                      </button>
                    </div>
                  </div>
            </div>
          </div>
            </div>
            
          </div>
         
          <div className="row justify-content-center mt-2">
            <div className="col-7 ">
              <p className="users-searching-text">
                {" "}
                Dive into what everyone's searching for right now
              </p>
            </div>
          </div>

          <div className="row justify-content-center mt-2">
            <div className="col-7">
              <div className="row">
                <div className="col-12 col-sm-12 col-xl-4 ">
                  <div className="card ">
                    <div
                      className="card-body  p-3"
                      onClick={() =>
                        exampleSearch("Women's casual winter coats.")
                      }
                    >
                      Women's casual winter coats
                      <button className="exampleButton">
                        {" "}
                        <i className="arrowIcon">
                          {" "}
                          <IoIosArrowForward />
                        </i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 mt-2 mt-md-2 mt-lg-2 mt-xl-0 col-xl-4 ">
                  <div className="card">
                    <div
                      className="card-body p-3"
                      onClick={() =>
                        exampleSearch("Men's business casual outfits")
                      }
                    >
                      {" "}
                      Men's business casual outfits{" "}
                      <button className="exampleButton">
                        {" "}
                        <i className="arrowIcon">
                          {" "}
                          <IoIosArrowForward />
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-xl-4 mt-2 mt-lg-2 mt-xl-0 ">
                  <div className="card">
                    <div
                      className="card-body p-3"
                      onClick={() => exampleSearch("Zara winter collection")}
                    >
                      Zara winter collection{" "}
                      <button className="exampleButton">
                        {" "}
                        <i className="arrowIcon">
                          {" "}
                          <IoIosArrowForward />
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>

      {<Login welcomeName={welcomeName} />}
    </div>
  );
}

export default SearchPage;
