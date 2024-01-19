import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import "./pdpscreen.scss";
import Stars from "./Stars/Stars";
import CustomerReviews from "../CustomerReviews/CustomerReviews";
import MagnifierImages from "../MagnifierImages/MagnifierImages";
import { cartItems } from "cart/ApiService";
import { useLoggedIn } from "auth/ApiService";
import Loader from "auth/Loader";
import { getItemDetails } from "pdp/ApiService";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PDPScreen = () => {
  const location = useLocation();
  const { item } = location.state;
  const user = useLoggedIn();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [shippingClicked, setShippingClicked] = useState(false);
  const [returnClicked, setReturnClicked] = useState(false);
  const [mainImage, setMainImage] = useState(
    item &&
      item.image &&
      item.image.length > 0 &&
      item.image[0].l_medium &&
      item.image[0].l_medium.url
      ? item.image[0].l_medium.url
      : ""
  );
  const [clickMainImage, setClickMainImage] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [value, setValue] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState();

  let min = 1;
  let max = item.presentStock;

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getItemDetails(item._id, (result) => {
      if (result && result.data) {
        setItemDetails(result.data);
        setLoading(false);
      }

      if (result.data.varients.length > 0) {
        setSelectedVariant(result.data.varients[0]);
      }
    });
  }, [item]);

  const onClickAddToCart = () => {
    if (user) {
      cartItems(
        itemDetails._id,
        user.user._id,
        selectedVariant._id,
        value,
        loggedInUser.token,
        (result) => {
          if (result) {
            setValue(1);
            setLoading(false);
            toast("Successfully added to the Cart");
          }
        }
      );
    } else {
      toast("Please Login");
    }
  };

  const onClickMainImage = () => {
    setClickMainImage(!clickMainImage);
  };

  const onClickShippingInformation = () => {
    setShippingClicked((prev) => !prev);
  };

  const onClickReturnAndWarranty = () => {
    setReturnClicked((prev) => !prev);
  };

  function getDiscountedPrice() {
    if (selectedVariant) {
      return (
        100 -
        ((selectedVariant.price - selectedVariant.discount) /
          selectedVariant.price) *
          100
      );
    } else {
      return "";
    }
  }

  const goToBuyNowPage = () => {
    if (!user) {
      toast("Please Login");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div
            className="pdp-container"
            style={clickMainImage ? { display: "none" } : { display: "block" }}
          >
            <div className="new-product-details-container">
              <div className="new-product-image-container">
                <div className="new-sub-image-container">
                  {itemDetails &&
                  itemDetails.image &&
                  itemDetails.image.length > 1
                    ? itemDetails.image.map((image, index) => {
                        return (
                          <img
                            key={index}
                            src={
                              image && image.x_sm && image.x_sm.url
                                ? image.x_sm.url
                                : ""
                            }
                            alt=""
                            className="new-sub-image"
                            onClick={() =>
                              setMainImage(
                                image && image.l_medium && image.l_medium.url
                                  ? image.l_medium.url
                                  : ""
                              )
                            }
                          />
                        );
                      })
                    : ""}
                </div>
                <div className="main-image-container">
                  <img
                    src={mainImage}
                    alt=""
                    className="new-main-image"
                    onClick={onClickMainImage}
                  />
                </div>
              </div>
              <div className="new-product-details-description-container">
                <div className="new-product-details">
                  <h1 className="new-product-title">{itemDetails.name}</h1>
                  {itemDetails && itemDetails.reviews ? (
                    <Stars reviews={itemDetails.reviews} />
                  ) : (
                    ""
                  )}

                  <div className="product-price-container">
                    {selectedVariant && selectedVariant.discount !== 0 ? (
                      <span className="new-product-discount">
                        Save {Math.round(getDiscountedPrice() * 100) / 100}%
                      </span>
                    ) : (
                      ""
                    )}

                    {selectedVariant && selectedVariant.discount !== 0 ? (
                      <span className="new-product-original-price">
                        &#8377; {selectedVariant ? selectedVariant.price : ""}
                      </span>
                    ) : (
                      ""
                    )}

                    <span className="new-product-discount-price">
                      &#8377;{" "}
                      {selectedVariant
                        ? selectedVariant.price - selectedVariant.discount
                        : ""}
                    </span>
                  </div>
                  <p className="new-product-stock">
                    Availability:{" "}
                    <span className="new-span-stock">
                      Only{" "}
                      {selectedVariant && selectedVariant.presentStock
                        ? selectedVariant.presentStock
                        : itemDetails.presentStock}{" "}
                      left!
                    </span>
                  </p>
                  <div className="new-product-variants-container">
                    {itemDetails &&
                    itemDetails.varients &&
                    itemDetails.varients.length > 0
                      ? itemDetails.varients.map((varient, index) => {
                          return (
                            <div
                              onClick={() => setSelectedVariant(varient)}
                              key={index}
                              className={
                                selectedVariant &&
                                selectedVariant._id === varient._id
                                  ? "new-product-variants new-product-variants-selected"
                                  : "new-product-variants"
                              }
                            >
                              {varient.name}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="new-product-buttons">
                  <div className="new-quantity-container">
                    <div className="new-quantity">
                      <TextField
                        id="outlined-number"
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ min, max, step: 1, defaultValue: 1 }}
                        value={value}
                        onChange={(e) => {
                          var value = parseInt(e.target.value);

                          if (value > max) value = max;
                          if (value < min) value = min;

                          setValue(value);
                        }}
                        InputProps={{ sx: { height: 50 } }}
                      />
                    </div>

                    <button
                      onClick={onClickAddToCart}
                      className="new-product-add-to-cart-button"
                    >
                      Add to cart
                    </button>
                  </div>
                  {user ? (
                    <Link
                      to="/buynow"
                      state={{
                        selectedVariant: selectedVariant,
                        quantity: value,
                        itemId: itemDetails._id,
                      }}
                    >
                      <button className="new-product-buy-now-button">
                        Buy it now
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={goToBuyNowPage}
                      className="new-product-buy-now-button"
                    >
                      Buy it now
                    </button>
                  )}
                </div>
                <p className="new-product-full-details">
                  {itemDetails.description}
                </p>
                <hr />
                <div className="shipping-information-container">
                  <div
                    onClick={onClickShippingInformation}
                    className="shipping-information"
                  >
                    <span className="shipping-information-title">
                      Shipping Information
                    </span>
                    {shippingClicked ? <BiChevronUp /> : <BiChevronDown />}
                  </div>
                  <div
                    className="information-container"
                    style={
                      shippingClicked
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <p className="information-text">
                      {itemDetails.shippingInfo
                        ? itemDetails.shippingInfo
                        : "No Shipping Information Found"}
                    </p>
                  </div>
                  <hr />
                  <div
                    onClick={onClickReturnAndWarranty}
                    className="shipping-information"
                  >
                    <span className="shipping-information-title">
                      Returns & warranty
                    </span>
                    {returnClicked ? <BiChevronUp /> : <BiChevronDown />}
                  </div>
                  <div
                    className="information-container"
                    style={
                      returnClicked ? { display: "block" } : { display: "none" }
                    }
                  >
                    <p className="information-text">
                      {itemDetails.returnNotes
                        ? itemDetails.returnNotes
                        : "No Return Information Found"}
                    </p>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            {itemDetails && itemDetails.reviews ? (
              <CustomerReviews reviews={itemDetails.reviews} />
            ) : (
              ""
            )}
            <div></div>
          </div>
          <div
            className="magnifier-images-container"
            style={clickMainImage ? { display: "block" } : { display: "none" }}
          >
            {itemDetails ? (
              <MagnifierImages item={itemDetails} onClose={onClickMainImage} />
            ) : (
              ""
            )}
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default PDPScreen;
