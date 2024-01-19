import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressList from "../AddressList/AddressList";
import CreateNewAddress from "../CreateNewAddress/CreateNewAddress";
import { cart, getCartItems } from "cart/ApiService";
import { useLoggedIn } from "auth/ApiService";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./buyNowPage.scss";
import {
  createRazorPayOrder,
  verifyOrder,
  createOrderForOwner,
} from "auth/ApiService";
import useRazorpay from "react-razorpay";

const KEY_ID = "rzp_test_BzL96moj3BjfEI";

const BuyNowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedVariant, itemId, quantity } = location.state;
  const user = useLoggedIn();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartResult, setCartResult] = useState({});
  const [address, setAddress] = useState({});
  const Razorpay = useRazorpay();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  const discount = selectedVariant.discount * quantity;
  const originalPrice = selectedVariant.price * quantity;
  const totalPrice = originalPrice - discount;

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      //   getCartItems(loggedInUser.user._id);

      let buyNowItem = {
        totalPrice: totalPrice,
        userId: loggedInUser.user._id,
        discountedPrice: discount,
        originalPrice: originalPrice,
        itemId: itemId,
      };
      setCartResult(buyNowItem);
    }
  }, [loggedInUser]);

  //   useEffect(() => {
  //     cart.subscribe((value) => {
  //       if (value) {
  //         setCartResult(value);
  //       }
  //     });
  //   }, []);

  const razorPayOption = (result) => {
    return {
      key: KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: result.paymentGatewayOrder.amount * 10, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "YOTINDIA",
      description: "Test Transaction",
      image:
        "https://res.cloudinary.com/sagarsai/image/upload/v1701752242/Burette_logo-removebg-preview_icgjmf.png",
      order_id: result.paymentGatewayOrder.razorPayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        // Pass here selected address id, owner id, items selected.. payment mode, payable amount as 0.
        // Navigate here to another page..
        // makeOrder("ONLINE_PAYMENT");
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
          verifyOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            result.paymentGatewayOrder._id,
            (result) => {
              if (result) {
                console.log("Your order is successfully placed");
                // Trigger order api here..
                makeOrder("ONLINE_PAYMENT");
              }
            }
          );
        }
      },
      prefill: {
        name: loggedInUser.user.fullName,
        email: loggedInUser.user.email,
        contact: loggedInUser.user.mobileNumber,
      },
      notes: {
        address: "Real Foods Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  };

  const doPayment = (event) => {
    event.preventDefault();
    createRazorPayOrder(cartResult, loggedInUser.token, (result) => {
      if (result) {
        console.log("Result is : ", result.paymentGatewayOrder.amount);
        const razorPayOptions = razorPayOption(result);
        const rzp1 = new Razorpay(razorPayOptions);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      }
    });
  };

  const getSelectAddress = (address) => {
    setAddress(address);
  };

  const makeOrder = (selectedPaymentMode) => {
    const itemArr = [];
    let item = {
      _id: itemId,
      quantity: quantity,
      varient: selectedVariant._id,
    };
    itemArr.push(item);

    const body = {
      customer: address.userId,
      address: address._id,
      items: itemArr,
      paymentMode: selectedPaymentMode,
      payableAmount: selectedPaymentMode === "CASH" ? cartResult.totalPrice : 0,
      orderAmount: cartResult.totalPrice,
    };

    createOrderForOwner(body, loggedInUser.token, (result) => {
      if (result) {
        navigate("/thankyou", { replace: true });
      }
    });
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-page-address-container">
        <AddressList getAddress={getSelectAddress} />
        <CreateNewAddress />
      </div>
      <div className="checkout-page-cart-card">
        <div className="price-details-container">PRICE DETAILS</div>
        <div className="price-container">
          <p className="price-text">Price</p>
          <p className="price-amount">&#8377;{cartResult.originalPrice}</p>
        </div>
        <div className="price-container">
          <p className="discount-text">Discount</p>
          <p className="discount-amount">&#8377;{cartResult.discountedPrice}</p>
        </div>
        <div className="price-container">
          <p className="delivery-text">Delivery Charges</p>
          <p className="delivery-amount">FREE</p>
        </div>
        <hr style={{ margin: "0px 20px" }} />
        <div className="price-container">
          <p className="total-amount-text">Total Amount</p>
          <p className="total-amount-amount">&#8377;{cartResult.totalPrice}</p>
        </div>
        <hr />
        <div className="price-container">
          <p className="saving-on-order-text">
            You will save &#8377;{cartResult.discountedPrice} on this order.
          </p>
        </div>
        <button onClick={(e) => doPayment(e)} className="pay-now-button">
          PAY NOW
        </button>
        <button
          className="cod-button"
          onClick={(e) => {
            if (address && Object.keys(address).length > 0) {
              makeOrder("CASH");
            } else {
              toast("Please Add & Select Address or Select Address");
            }
          }}>
          PROCEED WITH CASH ON DELIVERY
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuyNowPage;
