import React, { useState } from "react";
import Login from "auth/Login";
import ForgotPassword from "auth/ForgotPassword";
import ResetPassword from "auth/ResetPassword";
import CreateAccount from "auth/CreateAccount";
import Home from "home/Home";
import Categories from "plp/Categories";
import Items from "plp/Items";
import ShopByPriceItems from "plp/ShopByPriceItems";
import PDPScreen from "pdp/PDPScreen";
import CartDetails from "cart/CartDetails";
import CheckOutPage from "auth/CheckOutPage";
import PaymentStatus from "auth/PaymentStatus";
import BuyNowPage from "auth/BuyNowPage";
import ThankYouPage from "auth/ThankYouPage";
import AllCategories from "plp/AllCategories";
import MyDiets from "nutritionist/MyDiets";
import Orders from "auth/Orders";
import NotFound from "auth/NotFound";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "home/Header";
import Footers from "home/Footers";
import "./index.css";
import "./mainLayout.scss";
import Disclaimer from "./components/Documents/Disclaimer/Disclaimer";
import ShippingAndDelivery from "./components/Documents/ShippingAndDelivery/ShippingAndDelivery";
import TermsOfUse from "./components/Documents/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./components/Documents/PrivacyPolicy/PrivacyPolicy";
import ReactGA from "react-ga4";
import AboutUs from "./components/AboutUs/AboutUs";

export default function MainLayout() {
  const [offerClose, setOfferClose] = useState(false);
  const TRACKING_ID = "G-HPE1MRK618";
  ReactGA.initialize(TRACKING_ID);
  // ReactGA.send({
  //   hitType: "pageview",
  //   page: window.location.pathname,
  // });

  const onClickPadding = () => {
    setOfferClose((prev) => !prev);
  };

  return (
    <Router>
      <div className="main-layout-container">
        <Header onClickPadding={onClickPadding} />

        <div
          className="routes-container"
          // style={offerClose ? { paddingTop: "98px" } : { paddingTop: "98px" }}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}></Route>
            <Route path="/register" element={<CreateAccount />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/sub_categories/items/" element={<Items />}></Route>
            <Route
              path="/shopbyprice/items/"
              element={<ShopByPriceItems />}></Route>
            <Route path="/items/details" element={<PDPScreen />}></Route>
            <Route path="/cart" element={<CartDetails />}></Route>
            <Route path="/checkout" element={<CheckOutPage />}></Route>
            <Route path="/buynow" element={<BuyNowPage />}></Route>
            <Route path="/thankyou" element={<ThankYouPage />}></Route>
            <Route path="/payment-status" element={<PaymentStatus />}></Route>
            <Route path="/allcategories" element={<AllCategories />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/mydiets" element={<MyDiets />}></Route>
            <Route path="/disclaimer" element={<Disclaimer />}></Route>
            <Route
              path="/shipping-and-delivery"
              element={<ShippingAndDelivery />}></Route>
            <Route path="/termsofuse" element={<TermsOfUse />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/notfound" element={<NotFound />}></Route>
          </Routes>
        </div>
        <Footers />
      </div>
    </Router>
  );
}
