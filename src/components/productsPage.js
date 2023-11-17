import React, { useState, state, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductDetailsPage from "./productDetailsPage";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import Slider from "react-slick";
import Login from "./login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Modal } from "bootstrap";
import $ from "jquery";
const ProductsPage = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchResults = location.state?.searchResults || [];
  const results = searchResults.categories;
  const [similarProduct, setSimilarProduct] = useState(null);
  const [stylistProduct, setStylistProduct] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const [isStylistActive, setStylistActive] = useState(false);
  const [totalLength, setTotalLength] = useState();
  const [limitReached, setLimitReached] = useState(false);
  const google = window.google;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [searchCount, setSearchCount] = useState(
    parseInt(localStorage.getItem("searchCount")) || 0
  );

  const handleCallbackResponse = async (response) => {
    const idToken = response.credential;
    var userObject = jwtDecode(response.credential);
    localStorage.setItem("googleUserInfo", JSON.stringify(userObject));
    console.log(userObject);
    try {
      // Perform the Axios call and get search results
      const loginResponse = await axios.post(
        `https://rumine.ca/_search/user/sso/google/create?idToken=${encodeURIComponent(
          idToken
        )}`
      );
      console.log(loginResponse);
      let token = loginResponse.data.token;
      localStorage.setItem("accessToken", token);
      //   console.log(searchResults);
      window.location.reload();
      // Navigate to the ProductsPage route and pass searchResults as state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("googleUserInfo");
    localStorage.removeItem("emailUserInfo");
    setUser(null);
    setEmail(null);
    setToken(null);
    window.location.reload();
  };

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken"); // Assuming you store the token in localStorage

    if (userToken) {
      setToken(userToken);
      setLimitReached(false);
      const googleInfoString = localStorage.getItem("googleUserInfo");
      const emailInfoString = localStorage.getItem("emailUserInfo");
      if (googleInfoString != null) {
        const userInfo = JSON.parse(googleInfoString);
        console.log("HI");
        setUser(userInfo);
        setEmail(null);
      } else if (emailInfoString) {
        setEmail(emailInfoString);
        setUser(null);
      }
    }

    if (userToken === null) {

      if (searchCount >= 10) {
        setLimitReached(true);

        //   return;
      }  else{
        setLimitReached(false);
      }
    }

    setTotalLength(
      results.reduce((acc, item) => acc + item.products.length, 0)
    );

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
    }
  }, []);

  const getStylist = async (productId) => {
    setIsLoading(true);
    try {
      // Perform the Axios call and get search results
      const response = await axios.get(
        `https://rumine.ca/_search/gw/product/${productId}/stylist`
      );
      const productResults = response.data;
      setStylistProduct(productResults);
      setStylistActive(true);
      setIsLoading(false);
      // Navigate to the ProductsPage route and pass searchResults as state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDetails = async (productId) => {
    closeModal();
    try {
      const [productResponse, similarProductResponse] = await Promise.all([
        axios.get(`https://rumine.ca/_search/gw/product/${productId}`),
        axios.get(`https://rumine.ca/_search/gw/product/${productId}/similar`),
      ]);

      const productResults = productResponse.data;
      setSelectedProduct(productResults);

      const similarProductResults = similarProductResponse.data;
      setSimilarProduct(similarProductResults);

      openModals(); // Call openModals after setting similarProduct
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModals = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct((prevSelectedProduct) => {
      // Ensure that the state update is based on the latest state

      return null; // Set selectedProduct to null
    });
    setStylistProduct(null);
    setIsLoading(false);
    setShowModal(false);
    setStylistActive(false);
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

    if (token === null) {
      if (searchCount >= 10) {
  
        //  const productsPage = document.getElementById('productsPage');
        // productsPage.style.filter = 'blur(25px)';
        setLimitReached(true);

        //   return;
      }  else{
        setLimitReached(false);
      }
    }

    try {
      // Perform the Axios call and get search results
      const response = await axios.get(
        `https://rumine.ca/_search/gw/search?query=${query}`
      );
      const searchResults = response.data;
      //   console.log(searchResults);

      const updatedCount = searchCount + 1;
      setSearchCount(updatedCount);
      localStorage.setItem("searchCount", updatedCount.toString());

      // Navigate to the ProductsPage route and pass searchResults as state
      navigate(`/productPage?query=${query}`, { state: { searchResults } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: results[2].products.length > 4,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    prevArrow: <SlArrowLeft />,
    nextArrow: <SlArrowRight />,
    responsive: [
      {
        breakpoint: 1535, // width to change options
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280, // width to change options
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  });

  return (
    <div id="productsPage" className="container-flush">
      <div>
        <div className={`${showModal ? "show   blurBackground" : "  "}`}>
          <div className="row ">
            <div
              className="col-xl-2 col-xxl-1 col-lg-2 pe-0 col-md-3 col-sm-6 col-6 d-flex justify-content-xl-center justify-content-center align-items-center mt-1 mb-1"
              style={{ borderRight: "1px solid #00000062" }}
            >
              <Link to="/">
                <label className="product-logo"> ESEMBLY</label>
              </Link>
            </div>
            <div className="col-6 col-sm-6 d-lg-none d-md-none d-xl-none d-flex align-items-center ">
              <div className="col-12 p-3 d-flex align-items-center justify-content-start justify-content-sm-center">
                {email ? (
                  <div
                    className="dropdown "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="dropdown-toggle profile-container  d-flex justify-content-end align-items-center ">
                      <p className="pe-2  profile-name "> {email}</p>
                    </div>

                    <ul class="dropdown-menu dropdown-menu-end mt-2 p-0">
                      <button className="signOutButton" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </ul>
                  </div>
                ) : user ? (
                  <div
                    className="dropdown "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="dropdown-toggle profile-container  d-flex justify-content-end align-items-center ">
                      <p className="pe-2  profile-name ">
                        {" "}
                        {user.given_name} {user.family_name}
                      </p>
                      <img
                        className="profile-img"
                        src={user.picture}
                        alt="Profile"
                      />
                    </div>

                    <ul class="dropdown-menu dropdown-menu-end mt-2 p-0">
                      <button className="signOutButton" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </ul>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="logButton"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>

            <div className="col-xl-5 col-lg-8 col-12 col-sm-12 col-md-7 p-3 d-flex align-items-center justify-content-center ">
              <form className="w-100">
                <input
                  type="text"
                  className="form-control searchBar-productsPage"
                  placeholder="Search"
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
            </div>
            <div className="col-lg-2 col-xl-6 d-sm-none d-none d-md-flex d-lg-flex col-md-2 ">
              <div className="  p-3 col-12 d-flex align-items-center justify-content-center justify-content-lg-end  justify-content-xl-end ">
                {email ? (
                  <div
                    className="dropdown "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="dropdown-toggle profile-container  d-flex justify-content-end align-items-center ">
                      <p className="pe-2  profile-name "> {email}</p>
                    </div>

                    <ul class="dropdown-menu dropdown-menu-end mt-2 p-0">
                      <button className="signOutButton" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </ul>
                  </div>
                ) : user ? (
                  <div
                    className="dropdown "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="dropdown-toggle profile-container  d-flex justify-content-end align-items-center ">
                      <p className="pe-2  profile-name ">
                        {" "}
                        {user.given_name} {user.family_name}
                      </p>
                      <img
                        className="profile-img"
                        src={user.picture}
                        alt="Profile"
                      />
                    </div>

                    <ul class="dropdown-menu dropdown-menu-end mt-2 p-0">
                      <button className="signOutButton" onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </ul>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="logButton"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="row productTitleContainer ">
            <div className="col-12  d-flex pt-5 ps-5  justify-content-start align-items-center">
              <h1 className="productTitle">
                Elevate Your Style with Our Results:
              </h1>
            </div>
            <div className="col-12  d-flex ps-5 pt-2 pb-5 justify-content-start align-items-center">
              <h1 className="productsubTitle">
                Discovering around {totalLength} matches that suit your
                preferences.{" "}
              </h1>
            </div>
          </div>
          {limitReached ? (
            <div className="products-image-container">
              <div className="products-image-blur container-flush">
                <center>
                <div className="row ">
                  <div className="col-12 d-flex justify-content-center  align-items-center">
                    <div className="  products-limitReached-box" >
                   Looks like you've reached your search limit!  Consider signing up for a free account to continue exploring.
                    </div>
                  </div>
                </div>
                </center>
              </div>
            </div>
          ) : (
            <div>
              <ul className=" list-group list-group-flush item-list">
                {results.map((item, index) => (
                  <li className="list-group-item pb-5 " key={index}>
                    <div className="container">
                      <div
                        className={`productPhrase ${
                          index % 2 === 0
                            ? "even-row mt-5 mb-5 d-flex justify-content-start"
                            : "odd-row d-flex justify-content-start mt-5 mb-5 "
                        }`}
                      >
                        {item.header}
                      </div>
                      <Slider {...sliderSettings}>
                        {item.products.map((product, subIndex) => (
                          <div key={subIndex} className="">
                            <div className="row">
                              <div className="col-12 d-flex justify-content-end justify-content-xl-start pe-4">
                                <p
                                  className={`productStoreName  ${
                                    index % 2 === 0 ? "even-row" : "odd-row"
                                  }`}
                                >
                                  {" "}
                                  {product.store}
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <div className="productImage-container d-flex  justify-content-end">
                                <button>
                                  <img
                                    className="productImg "
                                    src={product.image}
                                    data-bs-toggle="#modal"
                                    alt={`Image ${index}`}
                                    onClick={() =>
                                      getDetails(product.productId)
                                    }
                                  />
                                </button>

                                <div className="productOverlay-container ">
                                  <img
                                    className="productstoreLogo"
                                    src={product.storeLogo}
                                    alt={product.name}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row text-center mt-1 mb-3    ">
                              <div className=" ">
                                <div className=" col-12 d-flex align-items-center justify-content-xl-start d-flex justify-content-end pe-3 ">
                                  <p
                                    className={`productName ${
                                      index % 2 === 0 ? "even-row" : "odd-row"
                                    }`}
                                  >
                                    {" "}
                                    {product.title}
                                  </p>
                                  <i
                                    className={`productDot ${
                                      index % 2 === 0 ? "even-row" : "odd-row"
                                    }`}
                                  >
                                    <LuDot />{" "}
                                  </i>
                                  <p
                                    className={`productPrice ${
                                      index % 2 === 0 ? "even-row" : "odd-row"
                                    }`}
                                  >
                                    {" "}
                                    CA${product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {
        <ProductDetailsPage
          show={openModals}
          similarProduct={similarProduct}
          product={selectedProduct}
          onClose={closeModal}
          onStylistClick={getStylist}
          isLoading={isLoading}
          isStylistActive={isStylistActive}
          stylistProduct={stylistProduct}
          onGetDetails={getDetails}
        />
      }

      {<Login welcomeName={welcomeName} />}
    </div>
  );
};

export default ProductsPage;
