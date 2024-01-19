import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsCart2,
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsCardChecklist,
} from "react-icons/bs";

import { FaBars } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { RiSnapchatLine, RiLockPasswordFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useLoggedIn } from "auth/ApiService";
import {
  getCategories,
  menuItems,
  getSearchData,
} from "../../../service/Categories";
import "./newHeader.css";
import { cart, getCartItems } from "cart/ApiService";
import Accordion from "../../Accordion/Accordion";
import SubCategories from "../../SubCategories/SubCategories";
import HeaderSubCategoryItem from "../../HeaderSubCategoryItem/HeaderSubCategoryItem";
import SearchList from "../../SearchList/SearchList";

const NewHeader = () => {
  const user = useLoggedIn();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [menus, setMenus] = useState([]);
  const [nameClick, setNameClick] = useState(false);
  const [myCart, setCart] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropDownSelect, setDropDownSelect] = useState();
  const [searchedResult, setSearchedResult] = useState();
  const toggle = () => setIsOpen(!isOpen);

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

  const nameClickHandler = () => {
    setNameClick((prev) => !prev);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/home");
    window.location.reload(false);
  };

  const onDropDownSelect = (e) => {
    setDropDownSelect(e.target.value);
    console.log(e.target.value);
  };

  const searchInput = (e) => {
    const value = e.target.value;
    const dropDownValue = dropDownSelect ? dropDownSelect : "All";
    if (value) {
      getSearchData(value, dropDownValue, (result) => {
        setSearchedResult(result.item);
      });
    } else {
      setSearchedResult([]);
    }
  };

  const clearSearchedResult = () => {
    setSearchedResult([]);
  };

  return (
    <>
      <div className="nav-container">
        {/* <div className="top-header-container">
        <div className="services-container">
          <Link href="#" className="services-link">
            FAQ
          </Link>
          <Link href="#" className="services-link">
            Services
          </Link>
          <Link href="#" className="services-link">
            Careers
          </Link>
          <Link href="#" className="services-link">
            Affiliate
          </Link>
        </div>
        <div className="social-icons-container">
          <Link href="#">
            <GrMail size={16} className="social-icons" />
          </Link>
          <Link href="#">
            <BsFacebook size={16} className="social-icons" />
          </Link>
          <Link href="#">
            <BsInstagram size={16} className="social-icons" />
          </Link>
          <Link href="#">
            <BsPinterest size={16} className="social-icons" />
          </Link>
          <Link href="#">
            <RiSnapchatLine size={16} className="social-icons" />
          </Link>
          <Link href="#">
            <FaTiktok size={16} className="social-icons" />
          </Link>
        </div>
      </div> */}

        <div className="header-container">
          <FaBars size={20} className="mobile-menu-icon" onClick={toggle} />
          <div className="site-header-logo">
            <Link className="site-logo" to="/">
              <img
                src="https://www.yotmart.in/images/logo.svg"
                alt=""
                className="site-logo-image"
              />
            </Link>
          </div>
          <div className="drop-search-list-container">
            <div className="drop-down-search-container">
              <select
                className="drop-down"
                name="categories"
                id="categories"
                value={dropDownSelect}
                onChange={(e) => onDropDownSelect(e)}>
                <option>All Categories</option>
                {menus
                  ? menus.map((menu, index) => {
                      if (!menu || !menu.categories || !menu.categories.name) {
                        return null;
                      }
                      return (
                        <option key={index} value={menu.categories.name}>
                          {menu.categories.name}
                        </option>
                      );
                    })
                  : "No Items found"}
              </select>
              <input
                placeholder="What are you looking for?"
                className="search-input"
                type="text"
                onChange={(e) => searchInput(e)}
              />
              <button className="search-button">
                <BsSearch />
              </button>
            </div>
            <div className="search-list">
              {searchedResult ? (
                <SearchList
                  searchedResult={searchedResult}
                  clearSearchedResult={clearSearchedResult}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <Link>
            <div className="chat-container">
              <div>
                <IoMdChatboxes size={30} />
              </div>
              <div className="chat-text-container">
                <p className="chat-text-1">Expert Support</p>
                <p className="chat-text-2">Available 24/7 via chat</p>
              </div>
            </div>
          </Link>
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
              <Link to="/login">
                <RxPerson id="login" size={24} />
                <span className="label-login">Login</span>
              </Link>
            )}
            <div
              className="user-profile-container"
              style={nameClick ? { display: "block" } : { display: "none" }}>
              <ul className="user-profile-list">
                {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
                  <Link to="/orders" state={{ userId: loggedInUser.user._id }}>
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
          <Link to={loggedInUser ? "/cart" : "/login"}>
            <div className="cart">
              <span
                className="count"
                style={
                  loggedInUser ? { display: "block" } : { display: "none" }
                }>
                {myCart ? myCart.quantity : 0}
              </span>
              <BsCart2 size={24} className="cart-icon" />
            </div>
          </Link>
        </div>
        <div
          className="mobile-menu-container"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}>
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
                nameClick
                  ? { flexDirection: "column" }
                  : { flexDirection: "row" }
              }>
              {loggedInUser ? (
                <span htmlFor="login" className="label-logged">
                  {loggedInUser &&
                  loggedInUser.user &&
                  loggedInUser.user.fullName
                    ? loggedInUser.user.fullName
                    : ""}
                </span>
              ) : (
                <Link to="/login">
                  <RxPerson id="login" size={24} />
                  <span className="label-login">Login</span>
                </Link>
              )}
            </div>
            <MdCancelPresentation
              style={{ cursor: "pointer" }}
              size={20}
              onClick={toggle}
            />
          </div>
          <Accordion
            categories={categories}
            menuItems={menus}
            toggle={toggle}
          />
          <hr />
          <div className="mobile-help-container">
            <p className="mobile-help-text">Help</p>
            <p className="mobile-help-text">Shipping & Returns</p>
            <p className="mobile-help-text">Gift Card</p>
          </div>
          {/* <div
          className="mobile-menu-container"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="mobile-login-container">
            <div className="login-container">
              <Link to="/login">
                <RxPerson id="login" size={20} />
                <label htmlFor="login" className="label-login">
                  Login
                </label>
              </Link>
            </div>
            <MdCancelPresentation
              style={{ cursor: "pointer" }}
              size={20}
              onClick={toggle}
            />
          </div>
          <Accordion />
          <hr />
          <div className="mobile-help-container">
            <p className="mobile-help-text">Help</p>
            <p className="mobile-help-text">Shipping & Returns</p>
            <p className="mobile-help-text">Gift Card</p>
          </div> */}
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
        <div className="header-categories-container">
          <div className="categories-container">
            <div className="categories">
              <Link
                to="/allcategories"
                state={{
                  menuItems: menus,
                }}>
                <button className="categories-button">
                  Categories <BiChevronDown />
                </button>
              </Link>
              <div className="list">
                <HeaderSubCategoryItem menuItems={menus} />
              </div>
            </div>
            {categories.map((category, index) => {
              if (index === 3) {
                return (
                  <Link
                    to="/allcategories"
                    state={{
                      menuItems: menus,
                    }}
                    key={index}>
                    <button key={index} className="categories-button">
                      More
                    </button>
                  </Link>
                );
              } else {
                if (index > 3) {
                  return null;
                }
                return (
                  <div className="categories" key={index}>
                    <button className="categories-button">
                      {category.name} <BiChevronDown />
                    </button>
                    <div className="list">
                      <SubCategories id={category._id} />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="help-container">
            <Link href="#">
              <p className="help-text">Help</p>
            </Link>
            <Link href="#">
              <p className="help-text">Shipping & Returns</p>
            </Link>
            <Link href="#">
              <p className="help-text">Gift Card</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHeader;
