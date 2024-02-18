import React, { useState, useEffect } from "react";
import useWindowSize from "../useWindowSize";
import {
  maxMedium,
  minMedium,
  extraSmall,
  minSmall,
  maxSmall,
  maxLarge,
  minLarge,
  extraLarge,
} from "home/Constants";
import { Link, useLocation } from "react-router-dom";
import CarouselHome from "../Carousel/Carousel";
import LargeCard from "../Cards/LargeCard/LargeCard";
import MediumCard from "../Cards/MediumCard/MediumCard";
import SmallCard from "../Cards/SmallCard/SmallCard";
import BigCard from "../Cards/BigCard/BigCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import { getAllHomeScreenItems, getCategories } from "../../service/Categories";
import StaticItems from "../StaticItems/StaticItems";
import TrendingCollections from "../TrendingCollections/TrendingCollections";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ShopByPrice from "../ShopByPrice/ShopByPrice";
import ItemList from "../ItemList/ItemList";
import ScreenItems from "../ScreenItems/ScreenItems";
import ExploreWays from "../ExploreWays/ExploreWays";
import OfferCards from "../OfferCards/OfferCards";
import Loader from "auth/Loader";
import NutritionistModal from "nutritionist/NutritionistModal";

import "./home.scss";
import { width } from "@mui/system";

export default function Home() {
  const size = useWindowSize();
  const [allHomeScreenItems, setAllHomeScreenItems] = useState();
  const [categories, setCategories] = useState();
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [showNutritionist, setShowNutritionist] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggle = () => {
    setModal(!modal);
    setLoading(false);
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
    getCategories((result) => {
      if (result && result.categories && result.categories.length > 0) {
        setCategories(result.categories);
        console.log(result.categories);
      }
    });
  }, []);

  useEffect(() => {
    getAllHomeScreenItems((result) => {
      if (result) {
        setAllHomeScreenItems(result);
        console.log(result, "HSI");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     setModal(true);
  //     setLoading(false);
  //   }, 5000);

  //   return () => clearTimeout(timeId);
  // }, []);

  // useEffect(() => {
  //   setShowNutritionist(true);
  // }, [showNutritionist]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader style={{ border: 0 }} toggle={toggle}></ModalHeader>
            <ModalBody>
              <NutritionistModal />
            </ModalBody>
          </Modal> */}
          {size.width < 600 && (
            <div className="categories-row-main-container">
              {categories && categories.length > 0
                ? categories.map((category, index) => {
                    return (
                      <div key={index} className="categories-row">
                        <Link
                          to="/categories"
                          state={{
                            id: `${category._id}`,
                            name: `${category.name}`,
                          }}>
                          <img
                            className="categories-row-image"
                            src={
                              category &&
                              category.image &&
                              category.image.l_small &&
                              category.image.l_small.url
                                ? windowWidth <= extraSmall
                                  ? category.image.l_small.url
                                  : windowWidth >= minSmall &&
                                    windowWidth <= maxSmall
                                  ? category.image.l_small.url
                                  : windowWidth >= minMedium &&
                                    windowWidth <= maxMedium
                                  ? category.image.l_small.url
                                  : windowWidth >= minLarge &&
                                    windowWidth <= maxLarge
                                  ? category.image.l_small.url
                                  : windowWidth >= extraLarge
                                  ? category.image.l_small.url
                                  : ""
                                : ""
                            }
                            alt=""
                          />
                        </Link>
                        <Link
                          to="/categories"
                          state={{
                            id: `${category._id}`,
                            name: `${category.name}`,
                          }}>
                          <p className="categories-row-title">
                            {category.name}
                          </p>
                        </Link>
                      </div>
                    );
                  })
                : ""}
            </div>
          )}

          {allHomeScreenItems && allHomeScreenItems.length > 0
            ? allHomeScreenItems.map((homeScreenItem, index) => {
                return (
                  <div key={index}>
                    {homeScreenItem.displayType === "BANNERS" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <CarouselHome homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {homeScreenItem.displayType === "STATIC_ELEMENTS" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <StaticItems homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {homeScreenItem.displayType === "1_ITEM_WITH_1_GROUP" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <LargeCard homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {homeScreenItem.displayType === "TWO_GROUP" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <div className="medium-small-container">
                        <MediumCard homeItems={homeScreenItem.homeItems[0]} />
                        {homeScreenItem.homeItems.length > 1 ? (
                          <SmallCard homeItems={homeScreenItem.homeItems[1]} />
                        ) : null}
                      </div>
                    ) : null}
                    {homeScreenItem.displayType === "GROUP_WITH_4_ITEMS" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <BigCard
                        homeItems={homeScreenItem.homeItems}
                        displayName={homeScreenItem.name}
                      />
                    ) : null}
                    {homeScreenItem.displayType === "SINGLE_ITEM" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <ProductDetails homeItems={homeScreenItem.homeItems} />
                    ) : null}

                    {homeScreenItem.displayType === "GROUP_LIST" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <TrendingCollections
                        homeItems={homeScreenItem.homeItems}
                        displayName={homeScreenItem.name}
                      />
                    ) : null}
                    {homeScreenItem.displayType === "CIRCULAR_GROUP" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <ShopByPrice
                        homeItems={homeScreenItem.homeItems}
                        displayName={homeScreenItem.name}
                      />
                    ) : null}
                    {homeScreenItem.displayType === "SINGLE_GROUP" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <ScreenItems homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {homeScreenItem.displayType === "ITEM_LIST" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <ItemList homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {homeScreenItem.displayType === "SINGLE_CATEGORIES" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <ExploreWays
                        homeItems={homeScreenItem.homeItems}
                        displayName={homeScreenItem.name}
                      />
                    ) : null}
                    {homeScreenItem.displayType === "OFFER_CARDS" &&
                    homeScreenItem.homeItems.length > 0 ? (
                      <OfferCards homeItems={homeScreenItem.homeItems} />
                    ) : null}
                    {/* {showNutritionist ? <NutritionistModal /> : ""} */}
                    {/* <div>
                      <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader
                          style={{ border: 0 }}
                          toggle={toggle}
                        ></ModalHeader>
                        <ModalBody>
                          <NutritionistModal />
                        </ModalBody>
                      </Modal>
                    </div> */}
                  </div>
                );
              })
            : ""}
        </>
      )}
    </>
  );
}
