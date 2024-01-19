import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { getItemDetails } from "pdp/ApiService";
import Loader from "auth/Loader";
import "./carousel.css";
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
} from "../Constants/constants";

function CarouselHome({ homeItems }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
    setLoading(false);
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
          {homeItems && homeItems.length > 0
            ? homeItems.map((homeItem, index) => {
                if (!homeItem) {
                  return null;
                }

                if (homeItem.layoutType === "ITEMS") {
                  return (
                    <Carousel.Item
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => {
                        if (
                          homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject._id
                        ) {
                          getItemDetails(homeItem.listObject._id, (result) => {
                            if (result) {
                              navigate("/items/details", {
                                state: { item: result.data },
                              });
                            }
                          });
                        } else {
                          navigate("/notfound");
                        }
                      }}
                    >
                      <img
                        className="carousel-image-size"
                        src={
                          homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.image &&
                          homeItem.listObject.image.length > 0
                            ? windowWidth <= extraSmall &&
                              homeItem.listObject.image[0].x_sm &&
                              homeItem.listObject.image[0].x_sm.url
                              ? homeItem.listObject.image[0].x_sm.url
                              : windowWidth >= minSmall &&
                                windowWidth <= maxSmall &&
                                homeItem.listObject.image[0].l_small &&
                                homeItem.listObject.image[0].l_small.url
                              ? homeItem.listObject.image[0].l_small.url
                              : windowWidth >= minMedium &&
                                windowWidth <= maxMedium &&
                                homeItem.listObject.image[0].l_medium &&
                                homeItem.listObject.image[0].l_medium.url
                              ? homeItem.listObject.image[0].l_medium.url
                              : windowWidth >= minLarge &&
                                windowWidth <= maxLarge &&
                                homeItem.listObject.image[0].l_large &&
                                homeItem.listObject.image[0].l_large.url
                              ? homeItem.listObject.image[0].l_large.url
                              : windowWidth >= extraLarge &&
                                homeItem.listObject.image[0].x_l_large &&
                                homeItem.listObject.image[0].x_l_large.url
                              ? homeItem.listObject.image[0].x_l_large.url
                              : ""
                            : ""
                        }
                        alt=""
                      />
                      <Carousel.Caption
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="carousel-content-container"
                      >
                        <h1 className="carousel-heading">
                          {homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.name
                            ? "Indian Heirloom Rice"
                            : null}
                        </h1>
                        <p className="carousel-description">
                          {homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.smallDescription
                            ? "A Medicinal Delicacy for a Healthier Lifestyle"
                            : ""}
                        </p>

                        <div className="carousel-buttons-container">
                          <button className="carousel-button carousel-button-shop">
                            SHOP NOW
                          </button>
                          {/* <button className="carousel-button carousel-button-add-cart">
                              Add Cart
                            </button> */}
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                }
                if (homeItem.layoutType === "SUB_CATEGORIES") {
                  return (
                    <Carousel.Item key={index}>
                      <Link
                        to={
                          homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.name &&
                          homeItem.listObject._id
                            ? "/sub_categories/items/"
                            : "/notfound"
                        }
                        state={{
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
                        }}
                      >
                        <img
                          className="carousel-image-size"
                          src={
                            homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.image
                              ? windowWidth <= extraSmall &&
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
                              : ""
                          }
                          alt=""
                        />
                        <Carousel.Caption
                          data-aos="fade-up"
                          data-aos-delay="200"
                          className="carousel-content-container"
                        >
                          <h1 className="carousel-heading">
                            {homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.name
                              ? homeItem.listObject.name
                              : null}
                          </h1>
                          <p className="carousel-description">
                            {homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.smallDescription
                              ? homeItem.listObject.smallDescription
                              : ""}
                          </p>

                          <div className="carousel-buttons-container">
                            <button className="carousel-button carousel-button-shop">
                              Shop{" "}
                              {homeItem &&
                              homeItem.listObject &&
                              homeItem.listObject.name
                                ? homeItem.listObject.name
                                : null}
                            </button>
                            {/* <button className="carousel-button carousel-button-add-cart">
                                Add Cart
                              </button> */}
                          </div>
                        </Carousel.Caption>
                      </Link>
                    </Carousel.Item>
                  );
                }
                if (homeItem.layoutType === "CATEGORIES") {
                  return (
                    <Carousel.Item key={index}>
                      <Link
                        to={
                          homeItem &&
                          homeItem.listObject &&
                          homeItem.listObject.name &&
                          homeItem.listObject._id
                            ? "/categories"
                            : "/notfound"
                        }
                        state={{
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
                        }}
                      >
                        <img
                          className="carousel-image-size"
                          src={
                            homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.image
                              ? windowWidth <= extraSmall &&
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
                              : ""
                          }
                          alt=""
                        />

                        <Carousel.Caption
                          data-aos="fade-up"
                          data-aos-delay="200"
                          className="carousel-content-container"
                        >
                          <h1 className="carousel-heading">
                            {homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.name
                              ? "Indian Heirloom Rice"
                              : null}
                          </h1>
                          <p className="carousel-description">
                            {homeItem &&
                            homeItem.listObject &&
                            homeItem.listObject.smallDescription
                              ? "A Medicinal Delicacy for a Healthier Lifestyle"
                              : ""}
                          </p>

                          <div className="carousel-buttons-container">
                            <button className="carousel-button carousel-button-shop">
                              {/* Shop{" "}
                              {homeItem &&
                              homeItem.listObject &&
                              homeItem.listObject.name
                                ? homeItem.listObject.name
                                : null} */}
                              SHOP NOW
                            </button>
                            {/* <button className="carousel-button carousel-button-add-cart">
                                Add Cart
                              </button> */}
                          </div>
                        </Carousel.Caption>
                      </Link>
                    </Carousel.Item>
                  );
                }
              })
            : ""}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselHome;
