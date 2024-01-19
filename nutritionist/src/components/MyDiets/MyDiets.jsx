import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "./myDiets.scss";
import { getDietPlanItems } from "../../rest/ApiService";
import { cartItems, kitCartItems } from "cart/ApiService";
import Loader from "auth/Loader";

import "react-toastify/dist/ReactToastify.css";

const MyDiets = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setLoading] = useState(true);
  const [dietPlanItems, setDietPlanItems] = useState();
  // const [selectedVariant, setSelectedVariant] = useState();
  // const [value, setValue] = useState(1);
  useEffect(() => {
    getDietPlanItems(user.token, (result) => {
      if (result === 401) {
        localStorage.clear();
        navigate("/login");
        window.location.reload(false);
      } else {
        setDietPlanItems(result);

        setLoading(false);
      }

      // if (result && result.length > 0) {
      //   result.map((diet, index) => {
      //     if (diet.diatePlan && diet.diatePlan.length > 0) {
      //       diet.diatePlan.map((item, index) => {
      //         if (
      //           item.ingredient.varients &&
      //           item.ingredient.varients.lenght > 0
      //         ) {
      //           setSelectedVariant(item.ingredient.varients[0]);
      //         }
      //       });
      //     }
      //   });
      // }
    });
  }, []);
  const onClickPlanBuy = async (dietPlanItem) => {
    if (
      dietPlanItem &&
      dietPlanItem.diatePlan &&
      dietPlanItem.diatePlan.length > 0
    ) {
      kitCartItems(dietPlanItem, user.user._id, user.token, (result) => {
        if (result) {
          console.log(result);
          toast("Successfully added to the Cart");
        }
      });
    }
  };
  // const onClickVariant = (variant) => {
  //   setSelectedVariant(variant);
  // };

  // const onClickAddToCart = (itemId) => {
  //   if (user) {
  //     setLoading(true);
  //     cartItems(
  //       itemId,
  //       user.user._id,
  //       selectedVariant._id,
  //       value,
  //       user.token,
  //       (result) => {
  //         if (result === 401) {
  //           localStorage.clear();
  //           navigate("/login");
  //           window.location.reload(false);
  //         } else {
  //           if (result) {
  //             setLoading(false);
  //             toast("Successfully added to the Cart");
  //           }
  //         }
  //       }
  //     );
  //   } else {
  //     toast("Please Login");
  //   }
  // };

  return (
    <div className="my-diet-plans-container">
      <h1 className="my-diet-plans-title">My Diet Plans</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="diet-plan-container">
          {dietPlanItems && dietPlanItems.length > 0 ? (
            dietPlanItems.map((dietPlanItem, index) => {
              return (
                <div key={dietPlanItem._id} className="diet-plan">
                  <h1 style={{ textAlign: "center" }}>
                    <b>{dietPlanItem.name}</b>
                  </h1>
                  <div className="diet-plan-items-container">
                    {dietPlanItem && dietPlanItem.diatePlan.length > 0
                      ? dietPlanItem.diatePlan.map((item, index) => {
                          return (
                            <div
                              key={item._id}
                              className="diet-plan-item-container">
                              <div className="diet-plan-item-image-container">
                                <Link
                                  to="/items/details"
                                  state={{
                                    item: item.ingredient,
                                  }}>
                                  <img
                                    src={
                                      item.ingredient &&
                                      item.ingredient.image &&
                                      item.ingredient.image.length > 0
                                        ? item.ingredient.image[0].x_sm.url
                                        : ""
                                    }
                                    alt=""
                                    className="diet-plan-item-image"
                                    style={
                                      item.ingredient &&
                                      item.ingredient.image &&
                                      item.ingredient.image.length > 0 &&
                                      item.ingredient.image[0].x_sm.url
                                        ? { height: "auto" }
                                        : { height: "250px" }
                                    }
                                  />
                                </Link>
                              </div>

                              <div className="diet-plan-item-details-container">
                                <Link
                                  to="/items/details"
                                  state={{
                                    item: item.ingredient,
                                  }}>
                                  <h1 className="diet-plan-item-title">
                                    {item.ingredient.name}{" "}
                                    <span className="diet-variant-name">
                                      {item.ingredient.varients[0].name}
                                    </span>
                                  </h1>
                                </Link>
                                {/* <h5 className="diet-plan-item-price">
                                  &#8377;
                                  {selectedVariant && selectedVariant.price
                                    ? selectedVariant.price
                                    : item.ingredient.price}
                                </h5> */}
                                {/* <label
                                  className="diet-plan-item-description"
                                  htmlFor=""
                                >
                                  Description:
                                </label>
                                <p>{item.ingredient.description}</p> */}
                                <div className="diet-plan-item-quantity-container">
                                  <p
                                    className="diet-plan-item-description"
                                    htmlFor="">
                                    Quantity:
                                  </p>
                                  <p className="diet-plan-item-description">
                                    {item.quantity}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="diet-plan-item-variants-buttons-container">
                                <div className="diet-plan-item-variants-container">
                                  {item.ingredient &&
                                  item.ingredient.varients &&
                                  item.ingredient.varients.length > 0
                                    ? item.ingredient.varients.map(
                                        (varient, index) => {
                                          return (
                                            <div
                                              key={varient._id}
                                              className={
                                                selectedVariant &&
                                                selectedVariant._id ===
                                                  varient._id
                                                  ? "diet-plan-item-variant diet-plan-item-variant-selected"
                                                  : "diet-plan-item-variant"
                                              }
                                              onClick={() =>
                                                onClickVariant(varient)
                                              }
                                            >
                                              {varient.name}
                                            </div>
                                          );
                                        }
                                      )
                                    : ""}
                                </div>
                                <div className="diet-plan-item-buttons-container">
                                  <div className="diet-plan-item-new-quantity">
                                    <TextField
                                      id="outlined-number"
                                      label="Quantity"
                                      type="number"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      inputProps={{
                                        min: 1,
                                        max: item.ingredient.presentStock,
                                        step: 1,
                                        defaultValue: 1,
                                      }}
                                      onChange={(e) => {
                                        var value = parseInt(e.target.value);

                                        if (value > max) value = max;
                                        if (value < min) value = min;

                                        setValue(value);
                                      }}
                                      InputProps={{ sx: { height: 40 } }}
                                    />
                                  </div>

                                  <button
                                    className="diet-plan-item-add-to-cart-button"
                                    type="button"
                                    onClick={() =>
                                      onClickAddToCart(item.ingredient._id)
                                    }
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                              </div> */}
                            </div>
                          );
                        })
                      : "No Records Found"}
                  </div>
                  <div className="diet-plan-item-suggestions-button-container">
                    <div className="diet-plan-item-suggestions-container">
                      <h4>Usage:</h4>
                      <p className="diet-plan-item-suggestions-text">
                        {dietPlanItem.notes}
                      </p>
                    </div>
                    <div className="diet-plan-buy-button-container">
                      <button
                        className="diet-plan-buy-button"
                        type="button"
                        onClick={() => {
                          onClickPlanBuy(dietPlanItem);
                        }}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-plans-found">No Records Found</div>
          )}
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default MyDiets;
