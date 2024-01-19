import React, { useState, useEffect } from "react";
// import { itemsOfSubCategory } from "../../rest/ApiService";
import { useLocation } from "react-router-dom";
import Loader from "auth/Loader";

import FiltersForShopByPrice from "../FiltersForShopByPrice/FiltersForShopByPrice";
import Product from "../Product/Product";

const Items = () => {
  const location = useLocation();
  const { itemList, price } = location.state;
  const [isLoading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setItemsList(itemList);
    setLoading(false);
  }, []);

  //   useEffect(() => {
  //     itemsOfSubCategory(id, (result) => {
  //       setItemsList(result.data);
  //       setLoading(false);
  //     });
  //   }, [id]);

  const onReceiveFilteredData = (result) => {
    setItemsList(result);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="items">
          <h1 className="items-heading">Under ₹{price}</h1>

          <div className="filters-product-container">
            <div className="items-filter-container">
              <FiltersForShopByPrice
                dataReceiveCallBack={onReceiveFilteredData}
                itemList={itemList}
                price={price}
              />
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
