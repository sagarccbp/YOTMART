import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartItems } from "cart/ApiService";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { TextField } from "@mui/material";
import { useLoggedIn } from "auth/ApiService";
import Loader from "auth/Loader";
import Stars from "pdp/Stars";
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
import { getItemDetails } from "pdp/ApiService";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./productItemListProduct.scss";

const ProductItemListProduct = ({ item }) => {
  // const image = item.image[0];
  const user = useLoggedIn();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [itemDetails, setItemDetails] = useState({});
  const [selectedVariant, setSelectedVariant] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const onDropDownSelect = (e) => {
  //   setDropDownSelect(e.target.value);
  //   console.log(e.target.value);
  // };

  let min = 1;
  let max = item.presentStock;

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

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
    getItemDetails(item._id, (result) => {
      setItemDetails(result.data);
      if (result.data.varients.length > 0) {
        setSelectedVariant(result.data.varients[0]);
      }
    });
  }, [item]);

  const toggle = () => {
    setModal(!modal);
    setLoading(false);
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

  const onClickAddToCart = () => {
    if (user) {
      setLoading(true);
      cartItems(
        itemDetails._id,
        user.user._id,
        selectedVariant._id,
        value,
        loggedInUser.token,
        (result) => {
          if (result === 401) {
            localStorage.clear();
            navigate("/login");
            window.location.reload(false);
          } else {
            if (result) {
              setValue(1);
              setLoading(false);
              toast("Successfully added to the Cart");
            }
          }
        }
      );
    } else {
      toast("Please Login");
    }
  };

  const goToBuyNowPage = () => {
    if (user) {
      toggle();
    } else {
      toast("Please Login");
    }
  };

  return (
    <li className="plp-product-item">
      <Link
        to="/items/details"
        state={{
          item: item,
        }}>
        <img
          className="plp-product-image"
          // style={
          //   item && item.image && item.image.length > 0
          //     ? { height: "150px" }
          //     : { height: "150px" }
          // }
          src={
            item &&
            item.image &&
            item.image.length > 0 &&
            item.image[0].l_small &&
            item.image[0].l_small.url
              ? windowWidth <= extraSmall
                ? item.image[0].l_small.url
                : windowWidth >= minSmall && windowWidth <= maxSmall
                ? item.image[0].l_small.url
                : windowWidth >= minMedium && windowWidth <= maxMedium
                ? item.image[0].l_small.url
                : windowWidth >= minLarge && windowWidth <= maxLarge
                ? item.image[0].l_small.url
                : windowWidth >= extraLarge
                ? item.image[0].l_small.url
                : ""
              : ""
          }
          alt=""
        />
      </Link>

      <p className="plp-price">&#8377; {itemDetails.price}</p>
      <Link
        to="/items/details"
        state={{
          item: item,
        }}>
        <p className="plp-product-name">{itemDetails.name}</p>
      </Link>
      <p className="plp-stock">{item.presentStock} only left</p>

      <div className="plp-buttons-container">
        {/* <button
          className="button button-add-to-cart"
          onClick={onClickAddToCart}
        >
          Add to cart
        </button>
        <button className="button button-quick-shop" onClick={goToCheckOutPage}>
          Quick shop
        </button> */}
        <button className="plp-button plp-button-add-to-cart" onClick={toggle}>
          Choose Options
        </button>

        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader style={{ border: 0 }} toggle={toggle}></ModalHeader>
            <ModalBody>
              {isLoading ? (
                <Loader />
              ) : (
                <div>
                  <div
                    className="new-product-details"
                    style={{ padding: "0 0 30px 30px" }}>
                    <h1 className="new-product-title">{itemDetails.name}</h1>
                    {itemDetails && itemDetails.reviews ? (
                      <Stars reviews={itemDetails.reviews} />
                    ) : (
                      ""
                    )}

                    <div className="product-price-container">
                      {selectedVariant.discount !== 0 ? (
                        <span className="new-product-discount">
                          Save {Math.round(getDiscountedPrice() * 100) / 100}%
                        </span>
                      ) : (
                        ""
                      )}
                      {selectedVariant.discount !== 0 ? (
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
                        Only {itemDetails.presentStock} left!
                      </span>
                    </p>
                    <div
                      className="new-product-variants-container"
                      style={{ marginBottom: "0px" }}>
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
                                }>
                                {varient.name}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  <div
                    className="new-product-buttons"
                    style={{ padding: " 0 30px  30px 30px" }}>
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
                        className="new-product-add-to-cart-button">
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
                        onClick={goToBuyNowPage}>
                        <button className="new-product-buy-now-button">
                          Buy it now
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={goToBuyNowPage}
                        className="new-product-buy-now-button">
                        Buy it now
                      </button>
                    )}
                  </div>
                </div>
              )}
            </ModalBody>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </li>
  );
};

export default ProductItemListProduct;
