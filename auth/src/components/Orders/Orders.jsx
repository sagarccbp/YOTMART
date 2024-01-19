import React, { useState, useEffect } from "react";
// import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { format } from "date-fns";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import Loader from "auth/Loader";
import { getOrders, writeReview, useLoggedIn } from "../../rest/ApiService";
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
import "./orders.scss";

const Orders = () => {
  const user = useLoggedIn();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;
  // const [isOpen, setIsOpen] = useState();
  // const [selectedOrder, setSelectedOrder] = useState();
  const [isLoading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [orders, setOrders] = useState();
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewHeading, setReviewHeading] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [selectedItemId, setSelectedItemId] = useState();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setLoggedInUser(user);
    console.log(user, "USER");
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      getOrders(userId, loggedInUser.token, (result) => {
        console.log(result);
        if (result === 401) {
          localStorage.clear();
          navigate("/login");
          window.location.reload(false);
        } else {
          setOrders(result.data);

          setLoading(false);
        }
      });
    }
  }, [loggedInUser]);

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmitReview = (event, itemId) => {
    event.preventDefault();

    writeReview(
      itemId,
      reviewHeading,
      reviewDescription,
      rating,
      userId,
      loggedInUser.token
    );
    setModal(!modal);
  };

  return (
    <div className="orders-page-container">
      <h1 className="my-orders-title">My Orders</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="orders-container">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => {
              return (
                <div
                  className="orders"
                  key={index}
                  // onClick={() => {
                  //   console.log(order.isOpen, "outside");
                  //   if (order.isOpen) {
                  //     order["isOpen"] = !order.isOpen;
                  //     console.log("isopen inside if block", order.isOpen);
                  //     isOpen;
                  //   } else {
                  //     order["isOpen"] = true;
                  //     console.log("isopen inside else block", order.isOpen);
                  //   }

                  //   setSelectedOrder(order);
                  // }}
                >
                  <div className="orders-details-container">
                    <div className="orders-details">
                      <div className="orders-placed-date-container">
                        <span className="orders-placed-text">ORDER PLACED</span>
                        <span className="orders-placed-date">
                          {format(
                            new Date(`${order.createdDate}`),
                            "dd/MM/yyyy"
                          )}
                        </span>
                      </div>
                      <div className="orders-total-container">
                        <span className="orders-total-text">TOTAL</span>
                        <span className="orders-total">
                          &#8377;{order.orderAmount}
                        </span>
                      </div>
                      <div className="orders-shipping-details-container">
                        <span className="orders-ship-text">SHIP TO</span>
                        <div className="orders-shipping-details-icon-container">
                          <span className="orders-shipping-details">
                            {order.address.name}
                          </span>
                          {/* <BiChevronDown size={16} /> */}
                        </div>
                        <div className="orders-customer-shipping-details-container">
                          <span className="customer-name">
                            {order.address.name}
                          </span>
                          <span className="customer-address-details">
                            MOBILE NO
                          </span>
                          <span className="customer-address-details">AREA</span>
                          <span className="customer-address-details">CITY</span>
                          <span className="customer-address-details">
                            DISTRICT
                          </span>
                          <span className="customer-address-details">
                            STATE-PINCODE
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="orders-id-container">
                      <span className="orders-id">ORDER # {order._id}</span>
                      <button className="orders-download-invoice">
                        Download Invoice
                      </button>
                    </div>
                  </div>
                  {order.items && order.items.length > 0
                    ? order.items.map((item, index) => {
                        return (
                          <div
                            className="orders-image-track-container"
                            key={index}
                            // style={
                            //   selectedOrder &&
                            //   selectedOrder._id &&
                            //   order._id === selectedOrder._id &&
                            //   order.isOpen
                            //     ? { display: "flex" }
                            //     : { display: "none" }
                            // }
                          >
                            <div className="orders-image-container">
                              <Link
                                to="/items/details"
                                state={{ item: item._id }}>
                                <img
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
                                  alt=""
                                  className="orders-image"
                                />
                              </Link>
                              <div className="orders-item-details-container">
                                <Link
                                  to="/items/details"
                                  state={{ item: item._id }}>
                                  <div className="orders-item-title">
                                    {item._id.name} {item.varient.name}
                                  </div>
                                </Link>
                                <div className="orders-item-price">
                                  Price: &#8377;
                                  {item.varient.price - item.varient.discount}
                                </div>
                                <div className="orders-item-price">
                                  {item.quantity} x{" "}
                                  {item.varient.price - item.varient.discount}
                                </div>
                              </div>
                            </div>
                            <div className="total-items-price-container">
                              <span className="total-items-price">
                                &#8377;
                                {item.varient && item.quantity
                                  ? (item.varient.price -
                                      item.varient.discount) *
                                    item.quantity
                                  : ""}
                              </span>
                              <span className="total-items-discount-price">
                                Saved &#8377;
                                {item.varient && item.quantity
                                  ? item.varient.discount * item.quantity
                                  : ""}
                              </span>
                            </div>
                            <div className="track-review-buttons-container">
                              <button className="track-button">
                                TRACK ORDER
                              </button>
                              <button
                                className="write-review-button"
                                onClick={() => {
                                  setSelectedItemId(item._id._id);
                                  toggle();
                                }}>
                                WRITE REVIEW
                              </button>
                              <div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader
                                    toggle={toggle}
                                    style={{ paddingLeft: "34px" }}>
                                    Write a review
                                  </ModalHeader>
                                  <ModalBody>
                                    <form
                                      onSubmit={(event) =>
                                        onSubmitReview(event, selectedItemId)
                                      }>
                                      <div className="write-review-container">
                                        <label
                                          htmlFor="review-stars"
                                          className="review-label">
                                          Rating
                                        </label>
                                        <div className="stars-container">
                                          {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            return (
                                              <button
                                                className="stars-button"
                                                type="button"
                                                key={index}
                                                onClick={() => setRating(index)}
                                                onDoubleClick={() => {
                                                  setRating(0);
                                                  setHover(0);
                                                }}
                                                onMouseEnter={() =>
                                                  setHover(index)
                                                }
                                                onMouseLeave={() =>
                                                  setHover(rating)
                                                }>
                                                {index <=
                                                ((rating && hover) || hover) ? (
                                                  <FaStar
                                                    size={22}
                                                    style={{
                                                      color: "orange",
                                                    }}
                                                  />
                                                ) : (
                                                  <AiOutlineStar size={24} />
                                                )}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        <label
                                          className="review-label"
                                          htmlFor="reviewTitle">
                                          Review Title
                                        </label>
                                        <input
                                          type="text"
                                          className="review-input-field"
                                          id="reviewTitle"
                                          onChange={(e) =>
                                            setReviewHeading(e.target.value)
                                          }
                                        />
                                        <label
                                          className="review-label"
                                          htmlFor="reviewTitle">
                                          Description
                                        </label>
                                        <textarea
                                          type="textarea"
                                          rows="6"
                                          cols="49"
                                          className="review-input-field"
                                          id="reviewTitle"
                                          onChange={(e) =>
                                            setReviewDescription(e.target.value)
                                          }
                                        />
                                        <button
                                          type="submit"
                                          className="review-submit">
                                          Submit Review
                                        </button>
                                      </div>
                                    </form>
                                  </ModalBody>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            })
          ) : (
            <div className="no-orders-found">No Orders Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
