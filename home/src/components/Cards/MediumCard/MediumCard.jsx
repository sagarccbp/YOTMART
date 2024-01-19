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
} from "../../Constants/constants";
import "./mediumcard.scss";

const MediumCard = ({ homeItems }) => {
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
      {homeItems ? (
        <div
          onClick={() => {
            if (
              homeItems &&
              homeItems.listObject &&
              homeItems.listObject._id &&
              homeItems.listObject.name
            ) {
              navigate(
                `${
                  homeItems.layoutType === "CATEGORIES"
                    ? "/categories"
                    : "/sub_categories/items/"
                }`,
                {
                  state: {
                    id: `${
                      homeItems &&
                      homeItems.listObject &&
                      homeItems.listObject._id
                        ? homeItems.listObject._id
                        : null
                    }`,
                    name: `${
                      homeItems &&
                      homeItems.listObject &&
                      homeItems.listObject.name
                        ? homeItems.listObject.name
                        : null
                    }`,
                  },
                }
              );
            } else {
              navigate("/notfound");
            }
          }}
          className="medium-card-container"
          style={
            homeItems && homeItems.listObject && homeItems.listObject.image
              ? {
                  backgroundImage: `url('${
                    windowWidth <= extraSmall &&
                    homeItems.listObject.image.x_sm &&
                    homeItems.listObject.image.x_sm.url
                      ? homeItems.listObject.image.x_sm.url
                      : windowWidth >= minSmall &&
                        windowWidth <= maxSmall &&
                        homeItems.listObject.image.l_small &&
                        homeItems.listObject.image.l_small.url
                      ? homeItems.listObject.image.l_small.url
                      : windowWidth >= minMedium &&
                        windowWidth <= maxMedium &&
                        homeItems.listObject.image.l_medium &&
                        homeItems.listObject.image.l_medium.url
                      ? homeItems.listObject.image.l_medium.url
                      : windowWidth >= minLarge &&
                        windowWidth <= maxLarge &&
                        homeItems.listObject.image.l_large &&
                        homeItems.listObject.image.l_large.url
                      ? homeItems.listObject.image.l_large.url
                      : windowWidth >= extraLarge &&
                        homeItems.listObject.image.l_large &&
                        homeItems.listObject.image.l_large.url
                      ? homeItems.listObject.image.l_large.url
                      : ""
                  }')`,
                }
              : { backgroundColor: "gray" }
          }
        >
          <div className="medium-card">
            <h1 className="medium-heading">
              {homeItems && homeItems.listObject && homeItems.listObject.name
                ? homeItems.listObject.name
                : ""}
            </h1>
            <p className="medium-description">
              {homeItems &&
              homeItems.listObject &&
              homeItems.listObject.smallDescription
                ? homeItems.listObject.smallDescription
                : ""}
            </p>
            <button className="medium-card-button">Shop All</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MediumCard;
