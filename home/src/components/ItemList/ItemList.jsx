import React, { useState, useEffect } from "react";
import Carousel from "better-react-carousel";
import { useNavigate } from "react-router-dom";
import { getItemDetails } from "pdp/ApiService";
import {
  maxMedium,
  minMedium,
  extraSmall,
  minSmall,
  maxSmall,
  maxLarge,
  minLarge,
  extraLarge,
} from "../Constants/constants";

import "./itemList.scss";

const ItemList = ({ homeItems }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 5,
  //   initialSlide: 0,
  //   prevArrow: <SlickArrowLeft />,
  //   nextArrow: <SlickArrowRight />,

  //   responsive: [
  //     {
  //       breakpoint: 1279,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         initialSlide: 0,
  //       },
  //     },
  //     {
  //       breakpoint: 769,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 0,
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: false,
  //         dots: false,
  //         initialSlide: 0,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };

  const getProductDetails = (productId) => {
    getItemDetails(productId, (result) => {
      if (result) {
        navigate("/items/details", {
          state: { item: result.data },
        });
      }
    });
  };

  return (
    <>
      {homeItems && homeItems.length > 0 ? (
        <div className="sliding-items-container">
          <Carousel
            cols={5}
            rows={1}
            gap={20}
            responsiveLayout={[
              {
                breakpoint: 1278,
                cols: 4,
              },
              {
                breakpoint: 912,
                cols: 3,
              },
              {
                breakpoint: 560,
                cols: 2,
              },
            ]}
            mobileBreakpoint={400}>
            {homeItems && homeItems.length > 0
              ? homeItems.map((homeItem, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <li className="sliding-product-item">
                        <img
                          className="product-image"
                          src={
                            homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.image &&
                            homeItem.listObject.image.length > 0 &&
                            homeItem.listObject.image[0].l_small &&
                            homeItem.listObject.image[0].l_small.url
                              ? windowWidth <= extraSmall
                                ? homeItem.listObject.image[0].l_small.url
                                : windowWidth >= minSmall &&
                                  windowWidth <= maxSmall
                                ? homeItem.listObject.image[0].l_small.url
                                : windowWidth >= minMedium &&
                                  windowWidth <= maxMedium
                                ? homeItem.listObject.image[0].l_small.url
                                : windowWidth >= minLarge &&
                                  windowWidth <= maxLarge
                                ? homeItem.listObject.image[0].l_small.url
                                : windowWidth >= extraLarge
                                ? homeItem.listObject.image[0].l_small.url
                                : ""
                              : ""
                          }
                          alt=""
                          onClick={() => {
                            if (
                              homeItem &&
                              homeItem.listObject &&
                              homeItem.listObject._id
                            ) {
                              getProductDetails(homeItem.listObject._id);
                            } else {
                              navigate("/notfound");
                            }
                          }}
                        />
                        <p className="price">
                          &#8377;{" "}
                          {homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.price
                            ? homeItem.listObject.price
                            : null}
                        </p>
                        <p
                          className="product-name"
                          onClick={() => {
                            if (
                              homeItem &&
                              homeItem.listObject &&
                              homeItem.listObject._id
                            ) {
                              getProductDetails(homeItem.listObject._id);
                            } else {
                              navigate("/notfound");
                            }
                          }}>
                          {homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.name
                            ? homeItem.listObject.name
                            : null}
                        </p>
                        <p className="stock">
                          {homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.presentStock
                            ? homeItem.listObject.presentStock
                            : null}{" "}
                          only left
                        </p>
                        <div className="buttons-container">
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                homeItem &&
                                homeItem.listObject &&
                                homeItem.listObject._id
                              ) {
                                getProductDetails(homeItem.listObject._id);
                              } else {
                                navigate("/notfound");
                              }
                            }}
                            className="button button-add-to-cart">
                            Shop Now
                          </button>
                        </div>
                      </li>
                    </Carousel.Item>
                  );
                })
              : null}
          </Carousel>
        </div>
      ) : null}
    </>
  );
};

export default ItemList;
