import React, { useState, useEffect } from "react";
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
} from "../../Constants/constants";

import "./bigcard.scss";

const BigCard = ({ homeItems, displayName }) => {
  const navigate = useNavigate();
  console.log(homeItems, "BIGHSI");
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

  var bigCardItems;
  if (homeItems && homeItems.length > 0) {
    bigCardItems = homeItems.filter(
      (bigCardItem) =>
        bigCardItem.layoutType !== "CATEGORIES" &&
        bigCardItem.layoutType !== "SUB_CATEGORIES"
    );
    console.log(bigCardItems, "BIG");
  }

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
        <>
          <h1 className="big-card-main-heading">{displayName}</h1>
          <div className="big-card-container">
            <div
              className="big-card"
              onClick={() => {
                if (
                  homeItems &&
                  homeItems[0] &&
                  homeItems[0].listObject &&
                  homeItems[0].listObject._id &&
                  homeItems[0].listObject.name
                ) {
                  navigate(
                    `${
                      homeItems[0].layoutType === "CATEGORIES"
                        ? "/categories"
                        : "/sub_categories/items/"
                    }`,
                    {
                      state: {
                        id: `${homeItems[0].listObject._id}`,
                        name: `${homeItems[0].listObject.name}`,
                      },
                    }
                  );
                }
              }}
              style={
                homeItems &&
                homeItems[0] &&
                homeItems[0].listObject &&
                homeItems[0].listObject.image
                  ? {
                      backgroundImage: `url('${
                        windowWidth <= extraSmall &&
                        homeItems[0].listObject.image.x_sm &&
                        homeItems[0].listObject.image.x_sm.url
                          ? homeItems[0].listObject.image.x_sm.url
                          : windowWidth >= minSmall &&
                            windowWidth <= maxSmall &&
                            homeItems[0].listObject.image.l_small &&
                            homeItems[0].listObject.image.l_small.url
                          ? homeItems[0].listObject.image.l_small.url
                          : windowWidth >= minMedium &&
                            windowWidth <= maxMedium &&
                            homeItems[0].listObject.image.l_medium &&
                            homeItems[0].listObject.image.l_medium.url
                          ? homeItems[0].listObject.image.l_medium.url
                          : windowWidth >= minLarge &&
                            windowWidth <= maxLarge &&
                            homeItems[0].listObject.image.l_medium &&
                            homeItems[0].listObject.image.l_medium.url
                          ? homeItems[0].listObject.image.l_medium.url
                          : windowWidth >= extraLarge &&
                            homeItems[0].listObject.image.l_medium &&
                            homeItems[0].listObject.image.l_medium.url
                          ? homeItems[0].listObject.image.l_medium.url
                          : ""
                      }')`,
                    }
                  : { backgroundColor: "gray" }
              }
            >
              <p className="big-text">
                {" "}
                {homeItems &&
                homeItems[0] &&
                homeItems[0].listObject &&
                homeItems[0].listObject.name
                  ? homeItems[0].listObject.name
                  : ""}
              </p>
              {/* <h1 className="big-heading">Save up to 40%</h1> */}
              <p className="big-text2">Shop All</p>
            </div>
            <div className="big-card-products-container">
              {bigCardItems && bigCardItems.length > 0
                ? bigCardItems.map((bigCardItem, index) => {
                    return (
                      <li className="big-card-product-item" key={index}>
                        <img
                          onClick={() => {
                            if (
                              bigCardItem &&
                              bigCardItem.listObject &&
                              bigCardItem.listObject._id
                            ) {
                              getProductDetails(bigCardItem.listObject._id);
                            } else {
                              navigate("/notfound");
                            }
                          }}
                          className="product-image"
                          src={
                            bigCardItem &&
                            bigCardItem.listObject &&
                            bigCardItem.listObject.image &&
                            bigCardItem.listObject.image.length > 0 &&
                            bigCardItem.listObject.image[0].l_small &&
                            bigCardItem.listObject.image[0].l_small.url
                              ? windowWidth <= extraSmall
                                ? bigCardItem.listObject.image[0].l_small.url
                                : windowWidth >= minSmall &&
                                  windowWidth <= maxSmall
                                ? bigCardItem.listObject.image[0].l_small.url
                                : windowWidth >= minMedium &&
                                  windowWidth <= maxMedium
                                ? bigCardItem.listObject.image[0].l_small.url
                                : windowWidth >= minLarge &&
                                  windowWidth <= maxLarge
                                ? bigCardItem.listObject.image[0].l_small.url
                                : windowWidth >= extraLarge
                                ? bigCardItem.listObject.image[0].l_small.url
                                : ""
                              : ""
                          }
                          alt=""
                        />

                        <p className="price">
                          &#8377;{" "}
                          {bigCardItem &&
                          bigCardItem.listObject &&
                          bigCardItem.listObject.price
                            ? bigCardItem.listObject.price
                            : ""}
                        </p>

                        <p
                          className="product-name"
                          onClick={() => {
                            if (
                              bigCardItem &&
                              bigCardItem.listObject &&
                              bigCardItem.listObject._id
                            ) {
                              getProductDetails(bigCardItem.listObject._id);
                            } else {
                              navigate("/notfound");
                            }
                          }}
                        >
                          {bigCardItem &&
                          bigCardItem.listObject &&
                          bigCardItem.listObject.name
                            ? bigCardItem.listObject.name
                            : ""}
                        </p>

                        <p className="stock">
                          {bigCardItem &&
                          bigCardItem.listObject &&
                          bigCardItem.listObject.presentStock
                            ? bigCardItem.listObject.presentStock
                            : ""}{" "}
                          only left
                        </p>

                        <div className="buttons-container">
                          <button
                            className="button button-add-to-cart"
                            onClick={() => {
                              if (
                                bigCardItem &&
                                bigCardItem.listObject &&
                                bigCardItem.listObject._id
                              ) {
                                getProductDetails(bigCardItem.listObject._id);
                              } else {
                                navigate("/notfound");
                              }
                            }}
                          >
                            Shop Now
                          </button>
                        </div>
                      </li>
                    );
                  })
                : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default BigCard;
