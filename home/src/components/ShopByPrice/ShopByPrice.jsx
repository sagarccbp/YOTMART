import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "./shopByPrice.scss";

const ShopByPrice = ({ homeItems, displayName }) => {
  const navigate = useNavigate();
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

  return (
    <>
      {homeItems && homeItems.length > 0 ? (
        <>
          <h1 className="shop-by-price-heading">{displayName}</h1>
          <div className="shop-by-price-main-container">
            {homeItems.map((homeItem, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (
                      homeItem &&
                      homeItem.listObject &&
                      homeItem.listObject._id &&
                      homeItem.listObject.name
                    ) {
                      navigate(
                        `${
                          homeItem.layoutType === "CATEGORIES"
                            ? "/categories"
                            : "/sub_categories/items/"
                        }`,
                        {
                          state: {
                            id: `${homeItem.listObject._id}`,
                            name: `${homeItem.listObject.name}`,
                          },
                        }
                      );
                    } else {
                      navigate("/notfound");
                    }
                  }}
                  className="shop-by-price"
                  style={
                    homeItem &&
                    homeItem.listObject &&
                    homeItem.listObject.image &&
                    homeItem.listObject.image.x_sm &&
                    homeItem.listObject.image.x_sm.url
                      ? {
                          backgroundImage: `url('${
                            windowWidth <= extraSmall
                              ? homeItem.listObject.image.x_sm.url
                              : windowWidth >= minSmall &&
                                windowWidth <= maxSmall
                              ? homeItem.listObject.image.x_sm.url
                              : windowWidth >= minMedium &&
                                windowWidth <= maxMedium
                              ? homeItem.listObject.image.x_sm.url
                              : windowWidth >= minLarge &&
                                windowWidth <= maxLarge
                              ? homeItem.listObject.image.x_sm.url
                              : windowWidth >= extraLarge
                              ? homeItem.listObject.image.x_sm.url
                              : ""
                          }')`,
                        }
                      : { backgroundColor: "gray" }
                  }
                ></div>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ShopByPrice;

{
  /* <div
className="shop-container"
key={index}
onClick={() => {
  getFilterByPriceData(data.price, (result) => {
    console.log(result, "SHOP");
    if (result) {
      navigate("/shopbyprice/items/", {
        state: { itemList: result, price: data.price },
      });
    }
  });
}}
onClick={() => {
  navigate(
    `${
      homeItem.layoutType === "CATEGORIES"
        ? "/categories"
        : "/sub_categories/items/"
    }`,
    {
      state: {
        id: `${homeItem.listObject._id}`,
        name: `${homeItem.listObject.name}`,
      },
    }
  );
}}
>
<div
  className="shop-by-price"
  style={
    homeItem.listObject.image
      ? {
          backgroundImage: `url('${
            windowWidth <= extraSmall
              ? homeItem.listObject.image.x_sm.url
              : windowWidth >= minSmall &&
                windowWidth <= maxSmall
              ? homeItem.listObject.image.x_sm.url
              : windowWidth >= minMedium &&
                windowWidth <= maxMedium
              ? homeItem.listObject.image.x_sm.url
              : windowWidth >= minLarge &&
                windowWidth <= maxLarge
              ? homeItem.listObject.image.x_sm.url
              : windowWidth >= extraLarge
              ? homeItem.listObject.image.x_sm.url
              : ""
          }')`,
        }
      : { backgroundColor: "gray" }
  }
></div>

</div> */
}
