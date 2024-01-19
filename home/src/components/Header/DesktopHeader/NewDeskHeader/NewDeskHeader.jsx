import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { BsPersonFill, BsCardChecklist } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { useLoggedIn } from "auth/ApiService";

import {
  getCategories,
  menuItems,
  getSearchData,
} from "./../../../../service/Categories";
import { cart, getCartItems } from "cart/ApiService";
import HeaderSubCategoryItem from "../../../HeaderSubCategoryItem/HeaderSubCategoryItem";
import SubCategories from "../../../SubCategories/SubCategories";
import SearchList from "../../../SearchList/SearchList";
import "./newDeskHeader.scss";
import "../newHeader.css";
//import ExpertChat from "messanger/ExpertChat";

const NewDeskHeader = ({ onClickPadding }) => {
  const user = useLoggedIn();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [menus, setMenus] = useState([]);
  const [nameClick, setNameClick] = useState(false);
  const [myCart, setCart] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchedValue, setSearchedValue] = useState();
  const [searchedResult, setSearchedResult] = useState();
  const [chatmodal, setChatModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    getCategories((result) => {
      setCategories(result.categories);
      console.log(result);
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
        setNameClick(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const nameClickHandler = () => {
    setNameClick((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/home");
    window.location.reload(false);
  };

  const searchInput = (e) => {
    const value = e.target.value;
    setSearchedValue(value);

    if (value) {
      getSearchData(value, "All", (result) => {
        setSearchedResult(result.item);
      });
    } else {
      setSearchedResult([]);
    }
  };

  const clearSearchedResult = () => {
    setSearchedResult([]);
    setSearchedValue("");
  };

  // const onClickContactUs = () => {
  //   setChatModal(!chatmodal);
  // };

  return (
    <>
      <div className="new-desk-header-container">
        {/* <div
          className="new-desk-header-offer-container"
          style={isOpen ? { display: "none" } : { display: "flex" }}
        >
          <p className="new-desk-header-offer-text">
            Get <span className="new-desk-header-offer-text-span">15% off</span>{" "}
            on your First Purchase, Use Code -{" "}
            <span className="new-desk-header-offer-text-span">FIRST15</span>
          </p>
          <span className="new-desk-header-offer-container-close">
            <RxCross2
              size={20}
              onClick={() => {
                setIsOpen(true), onClickPadding();
              }}
            />
          </span>
        </div> */}
        <div className="new-desk-header-container-two">
          <div className="new-desk-header-part-container">
            <div className="new-desk-header-part-logo-container">
              <Link className="site-logo" to="/">
                <img
                  // src="https://res.cloudinary.com/sagarsai/image/upload/v1701751916/Burette_logo_wt3zmr.jpg"
                  // src="https://res.cloudinary.com/sagarsai/image/upload/v1701752242/Burette_logo-removebg-preview_icgjmf.png"
                  // src="https://res.cloudinary.com/sagarsai/image/upload/v1701752386/Burette_logo2-removebg-preview_ndjpui.png"

                  src="https://res.cloudinary.com/sagarsai/image/upload/v1704446206/yot-removebg-preview_1_xjqzsi.png"
                  alt=""
                  className="desk-header-logo-image"
                />
              </Link>
            </div>
            <div className="new-desk-header-part-items-container">
              <div className="new-desk-header-part-items">
                <div className="new-desk-header-part-items-search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchedValue}
                    style={{ margin: "0px" }}
                    className="new-desk-header-part-items-search-input"
                    onChange={(e) => searchInput(e)}
                  />
                  <div className="new-desk-header-part-items-search-button">
                    <FiSearch size={16} style={{ color: "#0b0e8e" }} />
                  </div>
                  <div className="search-list">
                    {searchedResult && searchedResult.length > 0 ? (
                      <SearchList
                        searchedResult={searchedResult}
                        clearSearchedResult={clearSearchedResult}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  // onClick={onClickContactUs}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <div className="chat-container" style={{ color: "#0b0e8e" }}>
                    <div>
                      <IoMdChatboxes size={30} />
                    </div>
                    <div className="chat-text-container">
                      <p className="chat-text-1">Expert Support</p>
                      <p className="chat-text-2">Available 24/7 via chat</p>
                    </div>
                  </div>
                </div>

                <div
                  className="new-desk-header-part-items-login-container"
                  style={
                    nameClick
                      ? { flexDirection: "column" }
                      : { flexDirection: "row" }
                  }>
                  {loggedInUser ? (
                    <span
                      onClick={nameClickHandler}
                      className="new-desk-header-part-items-label">
                      {loggedInUser &&
                      loggedInUser.user &&
                      loggedInUser.user.fullName ? (
                        <Avatar
                          name={loggedInUser.user.fullName}
                          size="40"
                          maxInitials={2}
                          color="#0b0e8e"
                          fgColor="#ffffff"
                          round={true}
                        />
                      ) : (
                        ""
                      )}{" "}
                      {loggedInUser && loggedInUser.user ? "My Account" : ""}
                    </span>
                  ) : (
                    <Link to="/login">
                      <BsPersonFill size={26} style={{ color: "#0b0e8e" }} />
                      <span className="new-desk-header-part-items-label">
                        Login
                      </span>
                    </Link>
                  )}
                  <div
                    ref={menuRef}
                    className="user-profile-container"
                    style={
                      nameClick ? { display: "block" } : { display: "none" }
                    }>
                    <ul className="user-profile-list">
                      {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
                        <Link
                          to="/orders"
                          state={{ userId: loggedInUser.user._id }}
                          onClick={nameClickHandler}>
                          <li className="user-profile-list-item">
                            <BsCardChecklist
                              size={20}
                              className="profile-icons"
                            />
                            My Orders
                          </li>
                        </Link>
                      ) : (
                        ""
                      )}
                      {/* <Link to="/mydiets">
                        <li className="user-profile-list-item">
                          <BsCardChecklist
                            size={20}
                            className="profile-icons"
                          />
                          My Diets
                        </li>
                      </Link> */}
                      <Link to="/">
                        <li className="user-profile-list-item">
                          {" "}
                          <CgProfile size={20} className="profile-icons" />
                          Profile
                        </li>
                      </Link>
                      {/* <Link to="/">
                        <li className="user-profile-list-item">
                          {" "}
                          <RiLockPasswordFill
                            size={20}
                            className="profile-icons"
                          />
                          Change Password
                        </li>
                      </Link> */}

                      <Link>
                        <li className="user-profile-list-item" onClick={logout}>
                          <TbLogout size={20} className="profile-icons" />
                          Logout
                        </li>
                      </Link>
                    </ul>
                  </div>
                  {/* <BsPersonFill size={26} style={{ color: "white" }} />
                <span className="new-desk-header-part-items-label" htmlFor="">
                  Login
                </span> */}
                </div>

                <div className="new-desk-header-part-items-cart-container">
                  <Link to={loggedInUser ? "/cart" : "/login"}>
                    <div className="cart">
                      <span
                        className="count"
                        style={
                          loggedInUser
                            ? { display: "block" }
                            : { display: "none" }
                        }>
                        {myCart && myCart.items && myCart.items.length > 0
                          ? myCart.items.length
                          : 0}
                      </span>
                      <FaShoppingCart size={26} style={{ color: "#0b0e8e" }} />
                    </div>
                  </Link>
                  {/* <span className="new-desk-header-part-items-label">Cart</span> */}
                </div>
              </div>
              <div
                className="expert-chat-container"
                style={{
                  transform: chatmodal ? "translate(-100%)" : "translate(0)",
                }}>
                {/* <ExpertChat onClickContactUs={onClickContactUs} /> */}
              </div>
            </div>
          </div>
          <div className="new-desk-header-part-categories-container">
            <div className="new-desk-header-part-categories">
              <div className="categories">
                <Link
                  to="/allcategories"
                  state={{
                    menuItems: menus,
                  }}>
                  <button className="categories-button">SHOP</button>
                </Link>
                <div className="list">
                  <HeaderSubCategoryItem menuItems={menus} />
                </div>
              </div>
              <div className="categories">
                <button className="categories-button">YOUR DIET</button>
              </div>
              <div className="categories">
                <button className="categories-button">OUR BRANDS</button>
              </div>
              <div className="categories">
                <button className="categories-button">BLOGS</button>
              </div>
              <div className="categories">
                <button className="categories-button">RECIPES</button>
              </div>
              {/* {categories.map((category, index) => {
                if (index === 8) {
                  return (
                    <Link
                      to="/allcategories"
                      state={{
                        menuItems: menus,
                      }}
                      key={index}
                    >
                      <button key={index} className="categories-button">
                        More
                      </button>
                    </Link>
                  );
                } else {
                  if (index > 8) {
                    return null;
                  }
                  return (
                    <div className="categories" key={index}>
                      <button className="categories-button">
                        {category.name}
                      </button>
                      <div className="list">
                        <SubCategories id={category._id} />
                      </div>
                    </div>
                  );
                }
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDeskHeader;
