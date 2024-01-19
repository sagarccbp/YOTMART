import React, { useState, useEffect } from "react";
import { categoryDetails, subCategoriesOfCategory } from "plp/ApiService";
import ProductItemList from "plp/ProductItemList";
import Loader from "auth/Loader";
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
import "./category.scss";
import { Link, useLocation } from "react-router-dom";

export default function Categories() {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categoryBG, setCategoryBG] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const { id, name } = location.state;

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
    subCategoriesOfCategory(id, (result) => {
      if (result && result.data) {
        setSubCategoryList(result.data);
        setLoading(false);
      }
    });
    categoryDetails(id, (result) => {
      if (result) {
        setCategoryBG(
          windowWidth <= extraSmall &&
            result.data.image.x_sm &&
            result.data.image.x_sm.url
            ? result.data.image.x_sm.url
            : windowWidth >= minSmall &&
              windowWidth <= maxSmall &&
              result.data.image.l_small &&
              result.data.image.l_small.url
            ? result.data.image.l_small.url
            : windowWidth >= minMedium &&
              windowWidth <= maxMedium &&
              result.data.image.l_medium &&
              result.data.image.l_medium.url
            ? result.data.image.l_medium.url
            : windowWidth >= minLarge &&
              windowWidth <= maxLarge &&
              result.data.image.l_large &&
              result.data.image.l_large.url
            ? result.data.image.l_large.url
            : windowWidth >= extraLarge &&
              result.data.image.x_l_large &&
              result.data.image.x_l_large.url
            ? result.data.image.x_l_large.url
            : ""
        );
      }
    });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="product-list-categories-container">
            <h1 className="category-heading">{name}</h1>
            <div
              className="product-list-categories-image-container"
              style={
                categoryBG
                  ? { backgroundImage: `url('${categoryBG}')` }
                  : {
                      backgroundColor: "gray",
                    }
              }>
              <ul className="product-list-categories">
                {subCategoryList
                  ? subCategoryList.map((category, index) => {
                      return (
                        <li
                          className="product-list-category-item"
                          key={index}
                          value={category}>
                          <Link
                            to="/sub_categories/items/"
                            state={{
                              id: `${category._id}`,
                              name: `${category.name}`,
                            }}>
                            {category.name}
                          </Link>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>

          <div className="mobile-product-list-categories-container">
            {categoryBG && (
              <img className="category-image" alt="" src={categoryBG} />
            )}
            <ul className="mobile-product-list-categories">
              {subCategoryList
                ? subCategoryList.map((category, index) => {
                    return (
                      <li
                        className="mobile-product-list-category-item"
                        key={index}
                        value={category}>
                        <Link
                          to="/sub_categories/items/"
                          state={{
                            id: `${category._id}`,
                            name: `${category.name}`,
                          }}>
                          {category.name}
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
          {subCategoryList.map((item, index) => (
            <ProductItemList subCategory={item} key={index} />
          ))}
        </>
      )}
    </>
  );
}
