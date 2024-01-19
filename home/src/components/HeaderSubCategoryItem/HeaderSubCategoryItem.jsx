import React from "react";
import "./headersubcategoryitem.scss";
import { Link } from "react-router-dom";

const HeaderSubCategoryItem = ({ menuItems }) => {
  return (
    <ul className="header-all-categories-list">
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
              <li className="header-all-categories-item-container" key={index}>
                <div className="header-all-categories-subCategory-container">
                  <Link
                    to="/categories"
                    state={{
                      id: `${menuItem.categories._id}`,
                      name: `${menuItem.categories.name}`,
                    }}>
                    <h2 className="header-all-categories-category-title">
                      {menuItem.categories.name}
                    </h2>
                  </Link>
                  <ul className="header-all-categories-subCategory-list">
                    {menuItem.subCategories.length > 0
                      ? menuItem.subCategories.map((subCategory, index) => {
                          if (!subCategory || !subCategory.name) {
                            return null;
                          }
                          return (
                            <li
                              className="header-all-categories-subCategory-list-item"
                              key={index}>
                              <Link
                                to="/sub_categories/items/"
                                state={{
                                  id: `${subCategory._id}`,
                                  name: `${subCategory.name}`,
                                }}>
                                {subCategory.name}
                              </Link>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default HeaderSubCategoryItem;
