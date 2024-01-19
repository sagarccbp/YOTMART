import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useLoggedIn } from "auth/ApiService";
import { menuItems } from "../../../service/Categories";
import "./mobileFooter.scss";
import { IoMail } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import { TbBrandSnapchat } from "react-icons/tb";

const MobileFooter = () => {
  const user = useLoggedIn();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    menuItems((result) => {
      setMenus(result.data);
    });
  }, []);

  return (
    <>
      <div className="mobile-footer-main-container">
        <div className="mobile-footer-follow-us-container">
          <h2 className="mobile-footer-followus-title">Follow us</h2>
          <div className="mobile-footer-follow-us-icons-container">
            <IoMail
              className="mobile-footer-react-icons"
              style={{ border: "1px solid #0b0e8e" }}
            />
            <FaFacebook
              className="mobile-footer-react-icons"
              style={{ border: "1px solid #0b0e8e" }}
            />
            <BsInstagram
              className="mobile-footer-react-icons"
              style={{ border: "1px solid #0b0e8e" }}
            />
            <BsPinterest
              className="mobile-footer-react-icons"
              style={{ border: "1px solid #0b0e8e" }}
            />
            <TbBrandSnapchat
              className="mobile-footer-react-icons"
              style={{ border: "1px solid #0b0e8e" }}
            />
          </div>
        </div>
        <div className="mobile-footer-accordion-container">
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h2 className="mobile-footer-accordion-header">Shop</h2>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="mobile-footer-list-container">
                  <li className="mobile-footer-list-item">Gift Card</li>
                  <Link
                    to="/allcategories"
                    state={{
                      menuItems: menus,
                    }}>
                    <li className="mobile-footer-list-item">Categories</li>
                  </Link>
                  <li className="mobile-footer-list-item">Registry</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h2 className="mobile-footer-accordion-header">Company</h2>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="mobile-footer-list-container">
                  <li className="mobile-footer-list-item">About</li>
                  <li className="mobile-footer-list-item">Careers</li>
                  <li className="mobile-footer-list-item">Blog</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h2 className="mobile-footer-accordion-header">Support</h2>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="mobile-footer-list-container">
                  <li className="mobile-footer-list-item">Help Center</li>
                  <li className="mobile-footer-list-item">
                    Shipping & Returns
                  </li>
                  {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
                    <Link
                      to="/orders"
                      className="footer-link"
                      state={{ userId: loggedInUser.user._id }}>
                      <li className="mobile-footer-list-item">
                        Track Your Order
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}

                  <li className="mobile-footer-list-item">Contact Us</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <hr className="mobile-footer-line" />
        <div className="mobile-footer-bottom-container">
          <div className="mobile-footer-bottom-description-container">
            <p className="mobile-footer-bottom-description">Corporate Orders</p>
            <div className="vertical"></div>
            <p className="mobile-footer-bottom-description">Scholarships</p>
            <div className="vertical"></div>
            <p className="mobile-footer-bottom-description">Privacy Policy</p>
          </div>
          <div>
            <p className="mobile-footer-bottom-description">
              Copyright © 2023 YOTINDIA.
            </p>
          </div>
          <div>
            <p className="mobile-footer-bottom-description">
              Powered by YOTINDIA.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
