import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import "./searchList.scss";

const SearchList = ({ searchedResult, clearSearchedResult }) => {
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

  const onClickSearchedResult = () => {
    clearSearchedResult();
  };

  console.log(searchedResult, "djffj");

  return (
    <div
      className="search-list-container"
      style={
        searchedResult && searchedResult.length > 0
          ? { display: "flex" }
          : { display: "none" }
      }
    >
      {searchedResult && searchedResult.length > 0
        ? searchedResult.map((searchedItem, index) => {
            return (
              <Link
                key={index}
                to="/items/details"
                state={{
                  item: searchedItem,
                }}
                onClick={onClickSearchedResult}
              >
                <div className="search-list-item-container">
                  <div className="search-list-item-image-container">
                    <img
                      src={
                        searchedItem &&
                        searchedItem.image &&
                        searchedItem.image.length > 0 &&
                        searchedItem.image[0].l_small &&
                        searchedItem.image[0].l_small.url
                          ? windowWidth <= extraSmall
                            ? searchedItem.image[0].l_small.url
                            : windowWidth >= minSmall && windowWidth <= maxSmall
                            ? searchedItem.image[0].l_small.url
                            : windowWidth >= minMedium &&
                              windowWidth <= maxMedium
                            ? searchedItem.image[0].l_small.url
                            : windowWidth >= minLarge && windowWidth <= maxLarge
                            ? searchedItem.image[0].l_small.url
                            : windowWidth >= extraLarge
                            ? searchedItem.image[0].l_small.url
                            : ""
                          : ""
                      }
                      alt=""
                      className="search-list-item-image"
                    />
                  </div>
                  <div className="search-list-item-details-container">
                    <span className="search-list-item-title">
                      {searchedItem.name}
                    </span>
                    <span className="search-list-item-price">
                      &#8377;{searchedItem.price}
                    </span>
                    <span className="search-list-item-stock">
                      Only {searchedItem.presentStock} left!
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        : ""}
    </div>
  );
};

export default SearchList;
