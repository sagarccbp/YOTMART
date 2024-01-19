import React, { useState, useEffect } from "react";
import { subCategoriesOfCategory } from "plp/ApiService";
import { Link } from "react-router-dom";

import "./subCategories.scss";

const SubCategories = ({ id, toggle }) => {
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    subCategoriesOfCategory(id, (result) => {
      setSubCategoryList(result.data);
    });
  }, [id]);

  const onClickClose = () => {
    toggle();
  };

  return (
    <>
      <ul className="subCategory-list">
        {subCategoryList && subCategoryList.length > 0
          ? subCategoryList.map((subCategory, index) => {
              if (!subCategory || !subCategory.name) {
                return null;
              }
              return (
                <li
                  className="subCategory-list-item"
                  key={index}
                  value={subCategory}
                  onClick={onClickClose}
                >
                  <Link
                    to="/sub_categories/items/"
                    state={{
                      id: `${subCategory._id}`,
                      name: `${subCategory.name}`,
                    }}
                  >
                    {subCategory.name}
                  </Link>
                </li>
              );
            })
          : "No Data Found"}
      </ul>
    </>
  );
};

export default SubCategories;
