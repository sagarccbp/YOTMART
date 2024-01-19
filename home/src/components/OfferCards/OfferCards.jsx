import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "./offerCards.scss";

const OfferCards = ({ homeItems }) => {
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

  return (
    <>
      {homeItems && homeItems.length > 0 ? (
        <div className="offer-cards-main-container">
          {homeItems && homeItems.length > 0
            ? homeItems.map((homeItem, index) => {
                return (
                  <div
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
                              id: `${homeItem.listObject._id}`,
                              name: `${homeItem.listObject.name}`,
                            },
                          }
                        );
                      } else {
                        navigate("/notfound");
                      }
                    }}
                    key={index}
                    className="offer-cards-container"
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
                                  homeItem.listObject.image.l_large &&
                                  homeItem.listObject.image.l_large.url
                                ? homeItem.listObject.image.l_large.url
                                : ""
                            }')`,
                          }
                        : { backgroundColor: "gray" }
                    }
                  >
                    <div className="offer-cards-description-container">
                      <h1 className="offer-cards-description-title">
                        {homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.name
                          ? homeItem.listObject.name
                          : null}
                      </h1>
                      <p className="offer-cards-description-details">
                        {homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.smallDescription
                          ? homeItem.listObject.smallDescription
                          : null}
                      </p>
                      <button className="offer-cards-description-button">
                        Shop All
                      </button>
                    </div>
                  </div>
                );
              })
            : null}

          {/* <div
          className="offer-cards-container"
          style={{
            backgroundImage: `url(
            "https://cdn.shopify.com/s/files/1/2111/1167/files/Box-Mockup-Banner_1196x513.jpg?v=1622143895"
          )`,
          }}
        >
          <div className="offer-cards-description-container">
            <h1 className="offer-cards-description-title">Open Box Deal</h1>
            <p className="offer-cards-description-details">
              Their return, your reward! Starting today, shop new exclusive
              products for less.
            </p>
            <button className="offer-cards-description-button">Save Now</button>
          </div>
        </div> */}
        </div>
      ) : null}
    </>
  );
};

export default OfferCards;
