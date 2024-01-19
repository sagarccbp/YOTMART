import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import "./allCategories.scss";

const AllCategories = () => {
  const location = useLocation();
  const { menuItems } = location.state;
  console.log(menuItems);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="all-categories-container">
      <img
        src="https://cdn.shopify.com/s/files/1/2111/1167/collections/categories-banner_1650x266.jpg?v=1621353244"
        className="all-categories-image"
        alt=""
      />
      <h1 className="all-categories-title">Categories</h1>
      <div>
        <ul className="all-categories-list">
          {menuItems && menuItems.length > 0
            ? menuItems.map((menuItem, index) => {
                if (
                  !menuItem ||
                  !menuItem.categories ||
                  !menuItem.categories.name
                ) {
                  return null;
                }
                return (
                  <li className="all-categories-item-container" key={index}>
                    <div className="all-categories-item">
                      <div className="all-categories-item-image">
                        <Link
                          to="/categories"
                          state={{
                            id: `${menuItem.categories._id}`,
                            name: `${menuItem.categories.name}`,
                          }}>
                          <img
                            src={
                              menuItem &&
                              menuItem.categories &&
                              menuItem.categories.image &&
                              menuItem.categories.image.l_small &&
                              menuItem.categories.image.l_small.url
                                ? windowWidth <= extraSmall
                                  ? menuItem.categories.image.l_small.url
                                  : windowWidth >= minSmall &&
                                    windowWidth <= maxSmall
                                  ? menuItem.categories.image.l_small.url
                                  : windowWidth >= minMedium &&
                                    windowWidth <= maxMedium
                                  ? menuItem.categories.image.l_small.url
                                  : windowWidth >= minLarge &&
                                    windowWidth <= maxLarge
                                  ? menuItem.categories.image.l_small.url
                                  : windowWidth >= extraLarge
                                  ? menuItem.categories.image.l_small.url
                                  : ""
                                : ""
                            }
                            className="all-categories-image"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="all-categories-subCategory-container">
                        <Link
                          to="/categories"
                          state={{
                            id: `${menuItem.categories._id}`,
                            name: `${menuItem.categories.name}`,
                          }}>
                          <h2 className="all-categories-category-title">
                            {menuItem.categories.name}
                          </h2>
                        </Link>
                        <ul className="all-categories-subCategory-list">
                          {menuItem.subCategories.length > 0
                            ? menuItem.subCategories.map(
                                (subCategory, index) => {
                                  if (!subCategory || !subCategory.name) {
                                    return null;
                                  }
                                  return (
                                    <Link
                                      to="/sub_categories/items/"
                                      state={{
                                        id: `${subCategory._id}`,
                                        name: `${subCategory.name}`,
                                      }}>
                                      <li
                                        className="all-categories-subCategory-list-item"
                                        key={index}>
                                        {subCategory.name}
                                      </li>
                                    </Link>
                                  );
                                }
                              )
                            : ""}
                          <Link
                            to="/categories"
                            state={{
                              id: `${menuItem.categories._id}`,
                              name: `${menuItem.categories.name}`,
                            }}>
                            <li className="all-categories-subCategory-list-item all-categories-shopall">
                              Shop all
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default AllCategories;
