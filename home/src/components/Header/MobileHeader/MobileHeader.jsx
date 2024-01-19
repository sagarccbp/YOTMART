import React, { useState, useEffect, useRef } from "react";
import { useLoggedIn } from "auth/ApiService";
import {
  getCategories,
  menuItems,
  getSearchData,
} from "../../../service/Categories";
import { cart, getCartItems } from "cart/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsCardChecklist, BsCart2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdChatboxes } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { GrMail } from "react-icons/gr";
import SearchList from "../../SearchList/SearchList";
//import ExpertChat from "messanger/ExpertChat";

import { FaTiktok } from "react-icons/fa";
import "./mobileheader.scss";
import Accordion from "../../Accordion/Accordion";

const MobileHeader = () => {
  const user = useLoggedIn();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [menus, setMenus] = useState([]);
  const [nameClick, setNameClick] = useState(false);
  const [myCart, setCart] = useState({});
  const [categories, setCategories] = useState([]);
  const [searchedResult, setSearchedResult] = useState();
  const [searchedValue, setSearchedValue] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [chatmodal, setChatModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen === false) {
    document.body.style.overflow = "unset";
  } else {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    getCategories((result) => {
      setCategories(result.categories);
    });
  }, []);

  useEffect(() => {
    // make categories api and fetch the data here.
    menuItems((result) => {
      setMenus(result.data);
    });
    cart.subscribe((value) => {
      setCart(value);
    });
  }, []);

  // Call this function whenever we need a cart functionalities..
  useEffect(() => {
    if (loggedInUser && Object.keys(loggedInUser).length > 0) {
      getCartItems(loggedInUser.user._id, loggedInUser.token);
    }
  }, [loggedInUser]);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const searchInput = (e) => {
    let value = e.target.value;
    setSearchedValue(value);
    console.log(value, "vvvvvvvvvv");

    if (value) {
      getSearchData(value, "All", (result) => {
        setSearchedResult(result.item);
      });
    } else {
      setSearchedResult([]);
    }
  };

  const onClickShowSearch = () => {
    setShowSearch((prev) => !prev);
    setSearchedValue("");
    setSearchedResult([]);
  };

  const clearSearchedResult = () => {
    setSearchedResult([]);
    setSearchedValue("");
  };

  const nameClickHandler = () => {
    setNameClick((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/home");
    window.location.reload(false);
  };

  // const onClickContactUs = () => {
  //   setChatModal(!chatmodal);
  // };

  return (
    <div className="mobile-main-header-container">
      <div
        className="mobile-header-container"
        style={showSearch ? { display: "none" } : { display: "flex" }}>
        <div className="mobile-header-search-container">
          <FaBars
            size={20}
            className="mobile-menu-icon"
            onClick={toggle}
            style={{ color: "#0b0e8e" }}
          />
          <FiSearch
            onClick={onClickShowSearch}
            size={20}
            style={{ color: "#0b0e8e", cursor: "pointer" }}
          />
        </div>
        <Link to="/home">
          <img
            // src="https://res.cloudinary.com/sagarsai/image/upload/v1701752242/Burette_logo-removebg-preview_icgjmf.png"
            src="https://res.cloudinary.com/sagarsai/image/upload/v1704446206/yot-removebg-preview_1_xjqzsi.png"
            className="mobile-header-logo"
            alt=""
          />
        </Link>
        <Link to={loggedInUser ? "/cart" : "/login"}>
          <div className="cart">
            <span
              className="count"
              style={loggedInUser ? { display: "block" } : { display: "none" }}>
              {myCart && myCart.items && myCart.items.length > 0
                ? myCart.items.length
                : 0}
            </span>
            <FaShoppingCart
              size={24}
              className="cart-icon"
              style={{ color: "#0b0e8e" }}
            />
          </div>
        </Link>
      </div>
      <form
        className="mobile-search-container"
        style={showSearch ? { display: "flex" } : { display: "none" }}>
        <div className="mobile-header-part-items-search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchedValue}
            className="mobile-header-part-items-search-input"
            onChange={(e) => searchInput(e)}
          />
          {/* <div className="mobile-header-part-items-search-button">
            <FiSearch size={16} style={{ color: "#9a031e" }} />
          </div> */}
          <div
            className="mobile-search-close"
            onClick={() => setShowSearch((prev) => !prev)}>
            <MdOutlineCancel size={16} style={{ color: "#0b0e8e" }} />
          </div>

          <div className="mobile-search-list">
            {searchedResult ? (
              <SearchList
                searchedResult={searchedResult}
                clearSearchedResult={clearSearchedResult}
                // onClickShowSearch={onClickShowSearch}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </form>

      <div
        ref={menuRef}
        className="mobile-menu-container"
        style={{ transform: isOpen ? "translate(0)" : "translate(-100%)" }}>
        <div className="mobile-login-container">
          {/* <div className="login-container">
            <Link to="/login">
              <RxPerson id="login" size={20} />
              <label htmlFor="login" className="label-login">
                Login
              </label>
            </Link>
          </div> */}
          <div
            className="login-container"
            style={
              nameClick ? { flexDirection: "column" } : { flexDirection: "row" }
            }>
            {loggedInUser ? (
              <span
                onClick={nameClickHandler}
                htmlFor="login"
                className="label-logged">
                {loggedInUser && loggedInUser.user && loggedInUser.user.fullName
                  ? loggedInUser.user.fullName
                  : ""}
              </span>
            ) : (
              <Link to="/login" onClick={toggle}>
                <RxPerson id="login" size={24} color="#0b0e8e" />
                <span className="label-login">Login</span>
              </Link>
            )}
            <div
              className="user-profile-container"
              style={nameClick ? { display: "block" } : { display: "none" }}>
              <ul className="user-profile-list">
                {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
                  <Link
                    to="/orders"
                    state={{ userId: loggedInUser.user._id }}
                    onClick={nameClickHandler}>
                    <li className="user-profile-list-item">
                      <BsCardChecklist size={20} className="profile-icons" />
                      My Orders
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                <Link>
                  <li className="user-profile-list-item">
                    {" "}
                    <CgProfile size={20} className="profile-icons" />
                    Profile
                  </li>
                </Link>
                <Link>
                  <li className="user-profile-list-item">
                    {" "}
                    <RiLockPasswordFill size={20} className="profile-icons" />
                    Change Password
                  </li>
                </Link>
                <li className="user-profile-list-item" onClick={logout}>
                  <TbLogout size={20} className="profile-icons" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
          <MdCancelPresentation
            style={{ cursor: "pointer" }}
            size={20}
            onClick={toggle}
          />
        </div>
        <Link
          to="/allcategories"
          state={{
            menuItems: menus,
          }}>
          <button onClick={toggle} className="mobile-categories-button">
            Categories
          </button>
        </Link>
        <Accordion categories={categories} menuItems={menus} toggle={toggle} />
        <hr />
        <div className="mobile-help-container">
          {/* <p className="mobile-help-text">Contact Us</p> */}
          <div style={{ cursor: "pointer" }}>
            <div className="chat-container">
              <div>
                <IoMdChatboxes size={30} />
              </div>
              <div className="chat-text-container">
                <p className="chat-text-1">Expert Support</p>
                <p className="chat-text-2">Available 24/7 via chat</p>
              </div>
            </div>
          </div>{" "}
          <p className="mobile-help-text">Shipping & Returns</p>
          {/* <p className="mobile-help-text">Gift Card</p> */}
        </div>
        {/* <hr />
        <div className="mobile-services-icons-container">
          <div className="mobile-services-container">
            <Link href="#" className="mobile-services-link">
              FAQ
            </Link>
            <Link href="#" className="mobile-services-link">
              Services
            </Link>
            <Link href="#" className="mobile-services-link">
              Careers
            </Link>
            <Link href="#" className="mobile-services-link">
              Affiliate
            </Link>
          </div>
          <div className="mobile-social-icons-container">
            <GrMail size={16} className="mobile-social-icons" />
            <BsFacebook size={16} className="mobile-social-icons" />
            <BsInstagram size={16} className="mobile-social-icons" />
            <BsPinterest size={16} className="mobile-social-icons" />
            <RiSnapchatLine size={16} className="mobile-social-icons" />
            <FaTiktok size={16} className="mobile-social-icons" />
          </div>
        </div> */}
      </div>
      <div
        className="mobile-expert-chat-container"
        style={{
          transform: chatmodal ? "translate(-100%)" : "translate(0)",
        }}>
        {/* <ExpertChat onClickContactUs={onClickContactUs} /> */}
      </div>
    </div>
  );
};

export default MobileHeader;
