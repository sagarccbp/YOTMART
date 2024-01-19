import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "better-react-carousel";
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
import "./trendingCollections.scss";

const TrendingCollections = ({ homeItems, displayName }) => {
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
        <div className="trending-collections-main-main-container">
          <h1 className="trending-collections-heading">{displayName}</h1>
          <div className="trending-collections-main-container">
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
              mobileBreakpoint={480}
            >
              {homeItems && homeItems.length > 0
                ? homeItems.map((homeItem, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <div
                          onClick={() => {
                            if (
                              homeItem &&
                              homeItem.listObject &&
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
                          className="trending-collection-container"
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
                                        homeItem.listObject.image.l_small &&
                                        homeItem.listObject.image.l_small.url
                                      ? homeItem.listObject.image.l_small.url
                                      : windowWidth >= minLarge &&
                                        windowWidth <= maxLarge &&
                                        homeItem.listObject.image.l_small &&
                                        homeItem.listObject.image.l_small.url
                                      ? homeItem.listObject.image.l_small.url
                                      : windowWidth >= extraLarge &&
                                        homeItem.listObject.image.l_small &&
                                        homeItem.listObject.image.l_small.url
                                      ? homeItem.listObject.image.l_small.url
                                      : ""
                                  }')`,
                                }
                              : { backgroundColor: "gray" }
                          }
                        >
                          <div className="heading">
                            {homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.name
                              ? homeItem.listObject.name
                              : ""}
                          </div>
                        </div>
                      </Carousel.Item>
                    );

                    {
                      /* if (result.type === "SUB_CATEGORIES") {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            navigate("/sub_categories/items/", {
                              state: { id: result.item, name: result.name },
                            });
                          }}
                          className="trending-collection-container"
                          style={
                            result.image
                              ? {
                                  backgroundImage: `url('${result.image}')`,
                                }
                              : { backgroundColor: "gray" }
                          }
                        >
                          <div className="heading">{result.name}</div>
                        </div>
                      );
                    }
                    if (result.type === "CATEGORIES") {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            navigate("/sub_categories/items/", {
                              state: { id: result.item, name: result.name },
                            });
                          }}
                          className="trending-collection-container"
                          style={
                            result.image
                              ? {
                                  backgroundImage: `url('${result.image}')`,
                                }
                              : { backgroundColor: "gray" }
                          }
                        >
                          <div className="heading">{result.name}</div>
                        </div>
                      );
                    } */
                    }
                  })
                : null}
            </Carousel>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default TrendingCollections;
