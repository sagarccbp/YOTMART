import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { itemsOfSubCategory } from "../../rest/ApiService";

import Loader from "auth/Loader";

import "./productitemlist.scss";
import ProductItemListProduct from "../ProductItemListProduct/ProductItemListProduct";

const ProductItemList = ({ subCategory }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = subCategory._id;
    itemsOfSubCategory(id, (result) => {
      if (result) {
        setItems(result.data);
        setLoading(false);
      }
    });
  }, [subCategory]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : items && items.length > 0 ? (
        <div className="product-list-container">
          <div className="product-list-text-container">
            <h3 className="product-list-text">{subCategory.name}</h3>
            <Link
              to="/sub_categories/items/"
              state={{
                id: `${subCategory._id}`,
                name: `${subCategory.name}`,
              }}
            >
              <div className="product-list-icon">
                <p className="product-list-shopall">Shop all </p>
                <BsArrowRightShort />
              </div>
            </Link>
          </div>
          <div className="product-item-list-container">
            {items.map((item, index) => {
              if (index === 4) {
                return (
                  <div
                    key={index}
                    className="shop-all-card"
                    onClick={() => {
                      navigate(`${"/sub_categories/items/"}`, {
                        state: {
                          id: `${subCategory._id}`,
                          name: `${subCategory.name}`,
                        },
                      });
                    }}
                  >
                    <p className="card-text">Shop all</p>
                    <h1 className="card-heading">{subCategory.name}</h1>
                  </div>
                );
              } else {
                if (index > 4) {
                  return null;
                }
                return <ProductItemListProduct key={index} item={item} />;
              }
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductItemList;
