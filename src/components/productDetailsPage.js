import React, { useState, state, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import axios from "axios";
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Slider from "react-slick";
const ProductDetailsPage = ({ 
  show,
  similarProduct,
  product,
  onClose,
  onStylistClick,
  isLoading,
  isStylistActive,
  stylistProduct,
  onGetDetails,
}) => {
  if (!product || !similarProduct) {
    console.log("HI");
    return null; // Return null if product is not defined
  }
  console.log(stylistProduct);
  console.log(similarProduct);
  console.log(product);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
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
          dots: true
        }
      },
      {
        breakpoint: 1280, // width to change options
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const similarStyles = {
    data: [
      {
        id: 1,
        storeName: "American Eagle",
        name: "AE Whoa So Cozy Waffle V-Neck Sweater",
        price: 59.95,
        img: require("../img/img1.jpg"),
      },
      {
        id: 2,
        storeName: "LuLuLemon",
        name: "Steady State Hoodie",
        price: 128,
        img: require("../img/img3.jpg"),
      },
      {
        id: 3,
        storeName: "American Eagle",
        name: "AE Whoa So Cozy Waffle V-Neck Sweater",
        price: 59.95,
        img: require("../img/img1.jpg"),
      },
      {
        id: 4,
        storeName: "LuLuLemon",
        name: "Steady State Hoodie",
        price: 128,
        img: require("../img/img3.jpg"),
      },
      {
        id: 5,
        storeName: "ZARA",
        name: "WATER REPELLENT DOWN JACKET",
        price: 219,
        img: require("../img/img4.jpg"),
      },
      {
        id: 1,
        storeName: "ZARA",
        name: "WATER REPELLENT DOWN JACKET",
        price: 219,
        img: require("../img/img4.jpg"),
      },
      {
        id: 1,
        storeName: "LuLuLemon",
        name: "Steady State Hoodie",
        price: 128,
        img: require("../img/img3.jpg"),
      },
    ],
  };

  return (
    <div
    id="mydetailsModal"
      className={`modal fade   ${show ? " modal-open  show" : ""}  `}
      tabIndex="-1"
      style={{ display: show ? "block " : "none" }}
      onClick={onClose} // Add onClick to close the modal
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content ">
          <div className="modal-body  p-4">
            <div className="row">
              <div className="col-12">
                <button type="button" className="close" onClick={onClose}>
                  <span>&times;</span>
                </button>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12  col-lg-6 d-flex justify-content-center">
                <div id="carouselExample" className="carousel slide carousel-fade">
                  <div className="carousel-inner">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-item   justify-content-end align-items-end   ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <div className="image-container details-img-border">
                          <img
                            className="details-img"
                            src={image}
                            alt={`Image ${index}`}
                          />

                          <div className="overlay-container">
                            <img
                              className="details-storeLogo"
                              src={product.storeLogo}
                              alt={product.name}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-6 mt-5 mt-lg-0 col-12">
           
                <div className="row">
                  <div className="col-12 d-flex">
                    <p className="details-storeName"> {product.store}</p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 d-flex">
                    <p className="details-productName"> {product.title}</p>
                  </div>
                </div>
                <div className="row mt-1 ">
                  <div className="col-12 mb-5 ">
                    <p className="details-productPrice">{product.price} CAD</p>
                  </div>
                </div>
          

                <div className="row mt-1 d-flex ">
                  <div className="col-12">
                    <p className="details-productDetails">Description:</p>
                  </div>
                  <div className="col-12 mt-2 mb-5">
                    <p className="details-productDescription">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="row mt-3  ">
                  <div className="col-12 d-flex justify-content-center">
                    <button className="btn details-getButton">
                      Get Product
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 d-flex justify-content-start ">
                  <p className="details-similarTitle mt-1">{similarProduct.header}</p>
                </div>
              </div>

              <div className="row mt-2 d-flex align-items-center ">
                <div className="">
                  <Slider {...sliderSettings}>
                    {similarProduct.products.map((product, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center flex-column "
                      >
                        <div className="row">
                          <div className="text-center">
                            <p className={""}> {product.store}</p>
                          </div>
                        </div>
                        <div className="row   d-flex justify-content-end align-items-end ">
                          <div className="detailsImgContainer   ">
                            <img
                              className="detailsSimilarImg "
                              src={product.image}
                              alt={product.name}
                              onClick={() =>onGetDetails(product.productId)}
                            />

                            <div className=" productSimilarstoreLogoContainer ">
                              <img
                                className="productSimilarstoreLogo   "
                                data-bs-toggle="#modal"
                                data-bs-target="#productModal"
                                src={product.storeLogo}
                                alt={product.name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row text-center     ">
                          <div className=" ">
                            <div className=" col-12 d-flex align-items-center justify-content-center">
                              <p className={""}> {product.title}</p>
                            </div>
                          </div>
                        </div>
                        <div className="row text-center ">
                          <div className="col-12">
                            <p className={""}> CA${product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12 ">
                  {isStylistActive ? (
                    
                    <div> 
                        <div className="row mt-4">
                <div className="col-12 d-flex justify-content-start ">
                  <p className="details-similarTitle mt-1">{stylistProduct.header}</p>
                </div>
              </div>
                      <Slider {...sliderSettings}>
                    {stylistProduct.products.map((product, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center flex-column "
                      >
                        <div className="row">
                          <div className="text-center">
                            <p className={""}> {product.store}</p>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-end ">
                          <div className="detailsImgContainer  ">
                            <img
                              className="detailsSimilarImg "
                              src={product.image}
                              alt={product.name}
                              onClick={() => onGetDetails(product.productId)}
                            />

                            <div className=" productSimilarstoreLogoContainer ">
                              <img
                                className="productSimilarstoreLogo "
                                data-bs-toggle="#modal"
                                data-bs-target="#productModal"
                                src={product.storeLogo}
                                alt={product.name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row text-center     ">
                          <div className=" ">
                            <div className=" col-12 d-flex align-items-center justify-content-center">
                              <p className={""}> {product.title}</p>
                            </div>
                          </div>
                        </div>
                        <div className="row text-center ">
                          <div className="col-12">
                            <p className={""}> CA${product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider></div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      {isLoading ? (
                        // Display the loading animation
                        <div className="lds-ring">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ) : (
                        // Display the "Ask a Stylist" button
                        <button
                          className="details-stylistButton d-flex align-items-center"
                          onClick={() => onStylistClick(product.productId)}
                        >
                          Ask a Stylist
                          <i className="ps-2 details-aiStars">
                            <WiStars />
                          </i>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
