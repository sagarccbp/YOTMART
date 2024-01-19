import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsCart2, BsArrowRightShort } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useLoggedIn } from "auth/ApiService";
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
import {
  cart,
  getCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from "cart/ApiService";
import Loader from "auth/Loader";

import "./cartdetails.scss";

const CartDetails = () => {
  const user = useLoggedIn();
  const [isLoading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartResult, setCartResult] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

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
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      getCartItems(loggedInUser.user._id, loggedInUser.token);
    }
  }, [loggedInUser]);

  useEffect(() => {
    cart.subscribe((value) => {
      if (value === 401) {
        localStorage.clear();
        navigate("/login");
        window.location.reload(false);
      } else {
        if (value) {
          setCartResult(value);
          setLoading(false);
        } else {
          setCartResult([]);
          setLoading(false);
        }
      }
    });
  }, []);

  const goToHome = () => {
    navigate("/home");
  };

  const goToCheckOutPage = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <div className="cart-details-top-section">
        <div className="mobile-title-and-subtotal-container">
          <h1 className="cart-heading">Your cart</h1>
          {cartResult && cartResult.items && cartResult.items.length > 0 ? (
            <div className="mobile-up-subtotal-container">
              <p className="up-subtotal-text">Subtotal</p>
              <span className="up-subtotal">
                &#8377;{cartResult.totalPrice}
              </span>
            </div>
          ) : null}
        </div>

        {cartResult && cartResult.items && cartResult.items.length > 0 ? (
          <div className="up-subtotal-checkout-container">
            <div className="up-subtotal-container">
              <p className="up-subtotal-text">Subtotal</p>
              <span className="up-subtotal">
                &#8377;{cartResult.totalPrice}
              </span>
            </div>

            <button className="checkout-button" onClick={goToCheckOutPage}>
              <BsCart2 /> Check out
            </button>
          </div>
        ) : (
          <div className="continue-shopping-container" onClick={goToHome}>
            <p className="continue-shopping">Continue shopping</p>
            <BsArrowRightShort size={20} style={{ marginTop: "4px" }} />
          </div>
        )}
      </div>

      <div className="cart-details-section-container">
        {isLoading ? (
          <Loader />
        ) : cartResult && cartResult.items && cartResult.items.length > 0 ? (
          <div className="cart-details-container">
            <div className="cart-item-list-container">
              {cartResult && cartResult.items
                ? cartResult.items.map((item, index) => {
                    return (
                      <div className="cart-item-container" key={index}>
                        <Link to="/items/details" state={{ item: item._id }}>
                          <div>
                            {item._id.image.length > 0 ? (
                              <img
                                className="item-image"
                                alt=""
                                src={
                                  item &&
                                  item._id &&
                                  item._id.image &&
                                  item._id.image.length > 0 &&
                                  item._id.image[0].l_small &&
                                  item._id.image[0].l_small.url
                                    ? windowWidth <= extraSmall
                                      ? item._id.image[0].l_small.url
                                      : windowWidth >= minSmall &&
                                        windowWidth <= maxSmall
                                      ? item._id.image[0].l_small.url
                                      : windowWidth >= minMedium &&
                                        windowWidth <= maxMedium
                                      ? item._id.image[0].l_small.url
                                      : windowWidth >= minLarge &&
                                        windowWidth <= maxLarge
                                      ? item._id.image[0].l_small.url
                                      : windowWidth >= extraLarge
                                      ? item._id.image[0].l_small.url
                                      : ""
                                    : ""
                                }
                              />
                            ) : (
                              <div className="item-image-container"></div>
                            )}
                          </div>
                        </Link>
                        <div className="item-details">
                          <div className="item-title-price">
                            <Link
                              to="/items/details"
                              state={{ item: item._id }}>
                              <h3 className="item-title">
                                {item._id.name}{" "}
                                <span className="item-variant">
                                  {item.varient.name}
                                </span>
                              </h3>
                            </Link>
                            <p className="item-price">
                              Price &#8377;
                              {item.varient
                                ? item.varient.price - item.varient.discount
                                : ""}
                            </p>
                            <p>
                              {item.itemQuantity} x{" "}
                              {item.varient.price - item.varient.discount}
                            </p>
                          </div>
                          <div className="quantity-counter-container">
                            <div
                              className="quantity-control"
                              onClick={() => {
                                if (item.itemQuantity <= 1) {
                                  return null;
                                }
                                updateCartItemQuantity(
                                  cartResult.userId,
                                  item._id._id,
                                  item.varient._id,
                                  "DEC",
                                  loggedInUser.token
                                );
                              }}>
                              -
                            </div>
                            <div className="quantity-counter">
                              {item.itemQuantity}
                            </div>
                            <div
                              className="quantity-control"
                              onClick={() => {
                                console.log(item, "CARTITEM");
                                if (
                                  item.itemQuantity === item._id.presentStock
                                ) {
                                  return null;
                                }
                                updateCartItemQuantity(
                                  cartResult.userId,
                                  item._id._id,
                                  item.varient._id,
                                  "INC",
                                  loggedInUser.token
                                );
                              }}>
                              +
                            </div>
                          </div>
                          <div className="total-items-price-container">
                            <span className="total-items-price">
                              &#8377;
                              {item.varient && item.itemQuantity
                                ? (item.varient.price - item.varient.discount) *
                                  item.itemQuantity
                                : ""}
                            </span>
                            <span className="total-items-discount-price">
                              Saved &#8377;
                              {item.varient && item.itemQuantity
                                ? item.varient.discount * item.itemQuantity
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div
                          className="cancel-button"
                          onClick={() => {
                            deleteCartItem(
                              cartResult.userId,
                              item._id._id,
                              item.varient._id,
                              loggedInUser.token
                            );
                          }}>
                          <MdOutlineCancel size={22} />
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <hr />
            <div className="down-subtotal-container">
              <p className="down-subtotal-text">Subtotal</p>
              <span className="down-subtotal">
                &#8377;{cartResult.totalPrice}
              </span>
            </div>
            <p className="taxes">Taxes and shipping calculated at checkout</p>

            <button className="checkout-button" onClick={goToCheckOutPage}>
              <BsCart2 /> Check out
            </button>

            <div className="continue-shopping-container" onClick={goToHome}>
              <p className="continue-shopping">Continue shopping</p>
              <BsArrowRightShort size={20} style={{ marginTop: "3px" }} />
            </div>
          </div>
        ) : (
          <div className="empty-cart-container">
            <p className="empty-cart-text">Your cart is empty</p>

            <button className="continue-shopping-button" onClick={goToHome}>
              <BsCart2 /> Continue shopping
            </button>
          </div>
        )}

        <div className="shipping-return-info-container">
          <h3 className="shipping-heading">Shipping</h3>
          <p className="shipping-text">Free shipping on all orders over $50!</p>
          <p className="shipping-text">
            All orders are fulfilled within 1 business day. Shipping times range
            from 2 - 10 business days.
          </p>
          <h3 className="shipping-heading">Returns</h3>
          <p className="shipping-text">
            To return an item to us, follow the directions listed on the return
            exchange form included with your order.
          </p>
          <p className="shipping-text">
            For items that are damaged, defective or not what you ordered,
            please contact us so we can best serve you and provide you with
            return instructions. Items that are made-to-order cannot be
            returned.
          </p>
          <p className="shipping-text">
            View full details on our shipping & return policies here
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
