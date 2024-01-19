import React, { useState, useEffect } from "react";
import { itemsOfSubCategory } from "../../rest/ApiService";
import { useLocation } from "react-router-dom";
import Loader from "auth/Loader";

import Filters from "../Filters/Filters";
import Product from "../Product/Product";

import "./items.scss";

const Items = () => {
  const location = useLocation();
  const { id, name } = location.state;
  const [isLoading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    itemsOfSubCategory(id, (result) => {
      setItemsList(result.data);
      setLoading(false);
    });
  }, [id]);

  const onReceiveFilteredData = (result) => {
    setItemsList(result);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="items">
          <h1 className="items-heading">{name}</h1>

          <div className="filters-product-container">
            <div className="items-filter-container">
              {id ? (
                <Filters
                  dataReceiveCallBack={onReceiveFilteredData}
                  subCatId={id}
                />
              ) : (
                ""
              )}
            </div>
            {itemsList && itemsList.length > 0 ? (
              <div className="items-product-container">
                {itemsList && itemsList.length > 0
                  ? itemsList.map((item, index) => {
                      return <Product key={index} item={item} />;
                    })
                  : ""}
              </div>
            ) : (
              <div className="no-items-found">No Items Found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
