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
import "./exploreWays.scss";

const ExploreWays = ({ homeItems, displayName }) => {
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
        <div className="explore-ways-main-container">
          <h1 className="explore-ways-title">{displayName}</h1>
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
                    className="explore-ways-container"
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
                    <div className="explore-ways-description-container">
                      <h1 className="explore-ways-description-title">
                        {homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.name
                          ? homeItem.listObject.name
                          : null}
                      </h1>
                      <p className="explore-ways-description-details">
                        {homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.smallDescription
                          ? homeItem.listObject.smallDescription
                          : null}
                      </p>
                      <button className="explore-ways-description-button">
                        Shop All
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
    </>
  );
};

export default ExploreWays;
