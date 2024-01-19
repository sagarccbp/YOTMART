import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MagnifierImages from "pdp/MagnifierImages";
import { cartItems } from "cart/ApiService";
import { useLoggedIn } from "auth/ApiService";
import { getItemDetails } from "pdp/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./productdetails.scss";

const ProductDetails = ({ homeItems }) => {
  const navigate = useNavigate();
  const user = useLoggedIn();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState(
    homeItems &&
      homeItems[0] &&
      homeItems[0].listObject &&
      homeItems[0].listObject.image &&
      homeItems[0].listObject.image.length > 0 &&
      homeItems[0].listObject.image[0].l_medium &&
      homeItems[0].listObject.image[0].l_medium.url
      ? homeItems[0].listObject.image[0].l_medium.url
      : ""
  );
  const [clickMainImage, setClickMainImage] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [value, setValue] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState();

  let min = 1;
  let max =
    homeItems &&
    homeItems[0] &&
    homeItems[0].listObject &&
    homeItems[0].listObject.presentStock
      ? homeItems[0].listObject.presentStock
      : null;

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      homeItems &&
      homeItems[0] &&
      homeItems[0].listObject &&
      homeItems[0].listObject._id
    ) {
      getItemDetails(homeItems[0].listObject._id, (result) => {
        setItemDetails(result.data);
        setLoading(false);
        if (result.data.varients.length > 0) {
          setSelectedVariant(result.data.varients[0]);
        }
      });
    }
  }, [homeItems]);

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
      <div
        className="pdp-container"
        style={clickMainImage ? { display: "none" } : { display: "block" }}
      >
        <div className="home-new-product-details-container">
          <div className="home-new-product-image-container">
            <div className="home-new-sub-image-container">
              {itemDetails && itemDetails.image && itemDetails.image.length > 1
                ? itemDetails.image.map((image, index) => {
                    return image && image.length > 0 ? (
                      <img
                        key={index}
                        src={image.x_sm && image.x_sm.url ? image.x_sm.url : ""}
                        alt=""
                        className="new-sub-image"
                        onClick={() =>
                          setMainImage(() => {
                            image.l_medium && image.l_medium.url
                              ? image.l_medium.url
                              : "";
                          })
                        }
                      />
                    ) : null;
                  })
                : ""}
            </div>
            <div className="home-main-image-container">
              <img
                src={mainImage}
                alt=""
                className="home-new-main-image"
                onClick={onClickMainImage}
              />
            </div>
          </div>
          <div className="new-product-details-description-container">
            <div className="home-new-product-details">
              <h1 className="new-product-title">
                {itemDetails && itemDetails.name ? itemDetails.name : ""}
              </h1>
              {/* {itemDetails && itemDetails.reviews ? (
                <Stars reviews={itemDetails.reviews} />
              ) : (
                ""
              )} */}

              <div className="product-price-container">
                <span className="new-product-discount">
                  Save {Math.round(getDiscountedPrice() * 100) / 100}%
                </span>
                <span className="new-product-original-price">
                  &#8377; {selectedVariant ? selectedVariant.price : ""}
                </span>
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
              <div className="home-new-product-variants-container">
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
            <p
              className="home-new-product-full-details"
              onClick={() => {
                if (itemDetails) {
                  navigate("/items/details", {
                    state: { item: itemDetails },
                  });
                }
              }}
            >
              View full details
            </p>
          </div>
        </div>
        {/* {itemDetails && itemDetails.reviews ? (
          <CustomerReviews reviews={itemDetails.reviews} />
        ) : (
          ""
        )}
        <div></div> */}
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
  );
};

export default ProductDetails;
