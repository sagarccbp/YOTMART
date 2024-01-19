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
import "./screenItems.scss";

const ScreenItems = ({ homeItems }) => {
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
        <div className="screen-items-container">
          <div className="screen-items-description-container">
            <h1 className="screen-items-description-title">
              {homeItems &&
              homeItems[0] &&
              homeItems[0].listObject &&
              homeItems[0].listObject.name
                ? homeItems[0].listObject.name
                : null}
            </h1>
            <p className="screen-items-description-details">
              {homeItems &&
              homeItems[0] &&
              homeItems[0].listObject &&
              homeItems[0].listObject.smallDescription
                ? homeItems[0].listObject.smallDescription
                : null}
            </p>
            <button
              className="screen-items-description-button"
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
                } else {
                  navigate("/notfound");
                }
              }}>
              Shop All
            </button>
          </div>
          <div className="screen-items-image-container">
            <img
              className="screen-items-image"
              src={
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
                    homeItems[0].listObject.image.l_large &&
                    homeItems[0].listObject.image.l_large.url
                  ? homeItems[0].listObject.image.l_large.url
                  : windowWidth >= extraLarge &&
                    homeItems[0].listObject.image.l_large &&
                    homeItems[0].listObject.image.l_large.url
                  ? homeItems[0].listObject.image.l_large.url
                  : ""
              }
              alt=""
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScreenItems;
