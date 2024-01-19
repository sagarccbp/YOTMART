import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItemDetails } from "pdp/ApiService";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  maxMedium,
  minMedium,
  extraSmall,
  minSmall,
  maxSmall,
  maxLarge,
  minLarge,
  extraLarge,
} from "../../Constants/constants";
import "./largecard.scss";

const LargeCard = ({ homeItems }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(homeItems, "HHSSII");

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);

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
      <div className="large-card-container">
        {homeItems && homeItems.length > 0
          ? homeItems.map((homeItem, index) => {
              if (
                homeItem.layoutType === "CATEGORIES" ||
                homeItem.layoutType === "SUB_CATEGORIES"
              ) {
                return (
                  <div
                    data-aos="flip-left"
                    data-aos-delay="200"
                    onClick={() => {
                      if (
                        homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject._id &&
                        homeItem.listObject.name
                      ) {
                        navigate(
                          `${
                            homeItem.layoutType === "CATEGORIES"
                              ? "/categories"
                              : "/sub_categories/items/"
                          }`,
                          {
                            state: {
                              id: `${
                                homeItem &&
                                homeItem.listObject &&
                                homeItem.listObject._id
                                  ? homeItem.listObject._id
                                  : null
                              }`,
                              name: `${
                                homeItem &&
                                homeItem.listObject &&
                                homeItem.listObject.name
                                  ? homeItem.listObject.name
                                  : null
                              }`,
                            },
                          }
                        );
                      } else {
                        navigate("/notfound");
                      }
                    }}
                    className="large-card"
                    key={index}
                    style={
                      homeItem &&
                      homeItem.listObject &&
                      homeItem.listObject.image
                        ? {
                            backgroundImage: `url('${
                              windowWidth <= extraSmall &&
                              homeItem.listObject.image.x_sm &&
                              homeItem.listObject.image.x_sm.url
                                ? homeItem.listObject.image.x_sm.url
                                : windowWidth >= minSmall &&
                                  windowWidth <= maxSmall &&
                                  homeItem.listObject.image.l_small &&
                                  homeItem.listObject.image.l_small.url
                                ? homeItem.listObject.image.l_small.url
                                : windowWidth >= minMedium &&
                                  windowWidth <= maxMedium &&
                                  homeItem.listObject.image.l_medium &&
                                  homeItem.listObject.image.l_medium.url
                                ? homeItem.listObject.image.l_medium.url
                                : windowWidth >= minLarge &&
                                  windowWidth <= maxLarge &&
                                  homeItem.listObject.image.l_large &&
                                  homeItem.listObject.image.l_large.url
                                ? homeItem.listObject.image.l_large.url
                                : windowWidth >= extraLarge &&
                                  homeItem.listObject.image.x_l_large &&
                                  homeItem.listObject.image.x_l_large.url
                                ? homeItem.listObject.image.x_l_large.url
                                : ""
                            }')`,
                          }
                        : { backgroundColor: "gray" }
                    }
                  >
                    <h1 className="large-heading">
                      {homeItem &&
                      homeItem.listObject &&
                      homeItem.listObject.name
                        ? homeItem.listObject.name
                        : null}
                    </h1>
                    <p className="large-description">
                      {homeItem &&
                      homeItem.listObject &&
                      homeItem.listObject.smallDescription
                        ? homeItem.listObject.smallDescription
                        : ""}
                    </p>

                    <button type="button" className="large-card-button">
                      Shop{" "}
                      {homeItem &&
                      homeItem.listObject &&
                      homeItem.listObject.name
                        ? homeItem.listObject.name
                        : null}
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="large-card-small-product" key={index}>
                    <li className="large-card-product-item">
                      <img
                        onClick={() => {
                          if (
                            homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject._id
                          ) {
                            getProductDetails(homeItem.listObject._id);
                          }
                          {
                            navigate("/notfound");
                          }
                        }}
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
                      />

                      <p className="price">
                        &#8377;{" "}
                        {homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.price
                          ? homeItem.listObject.price
                          : ""}
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
                          }
                          {
                            navigate("/notfound");
                          }
                        }}
                      >
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
                          className="button button-add-to-cart"
                          onClick={() => {
                            if (
                              homeItem &&
                              homeItem.listObject &&
                              homeItem.listObject._id
                            ) {
                              getProductDetails(homeItem.listObject._id);
                            }
                            {
                              navigate("/notfound");
                            }
                          }}
                        >
                          Shop Now
                        </button>
                      </div>
                    </li>
                  </div>
                );
              }
            })
          : null}
      </div>
    </>
  );
};

export default LargeCard;
