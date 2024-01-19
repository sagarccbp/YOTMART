import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Row,
  Column,
  Heading,
  FooterLink,
  Icons,
} from "./FooterStyle";
import { useLoggedIn } from "auth/ApiService";
import { menuItems } from "../../../service/Categories";
import { IoMail } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import { TbBrandSnapchat } from "react-icons/tb";
import "./footer.css";

const Footer = () => {
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
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>Follow us</Heading>
            <Icons>
              <IoMail className="react-icons" />
              <FaFacebook className="react-icons" />
              <BsInstagram className="react-icons" />
              <BsPinterest className="react-icons" />
              <TbBrandSnapchat className="react-icons" />
            </Icons>
          </Column>
          {/* <Column>
            <Heading>Shop</Heading>
            <FooterLink href="#">Gift Card</FooterLink>
            <Link
              to="/allcategories"
              state={{
                menuItems: menus,
              }}
              className="footer-link">
              Categories
            </Link>
            <FooterLink href="#">Collaborations</FooterLink>
            <FooterLink href="#">Sourcing</FooterLink>
            <FooterLink href="#">Export</FooterLink>
            <FooterLink href="#">Media</FooterLink>
          </Column> */}
          <Column>
            <Heading>Company</Heading>
            <Link className="footer-link" to="/aboutus">
              <FooterLink href="#">About Us</FooterLink>
            </Link>
            <FooterLink href="#">Become A Delivery Man</FooterLink>
            {/* <FooterLink href="#">Blog</FooterLink> */}
          </Column>
          <Column>
            <Heading>Policy Details</Heading>
            {/* <FooterLink href="#">Help Center</FooterLink> */}
            {/* <Link className="footer-link" to="/">
              <FooterLink className="footer-link" href="#">
                Disclaimer
              </FooterLink>
            </Link> */}
            <Link className="footer-link" to="/privacy-policy">
              <FooterLink href="#">Privacy Policy</FooterLink>
            </Link>
            {/* <Link className="footer-link" to="/">
              <FooterLink href="#">Shipping And Delivery</FooterLink>
            </Link> */}
            <Link className="footer-link" to="/termsofuse">
              <FooterLink href="#">Terms and Conditions</FooterLink>
            </Link>
            {/* {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
              <Link
                to="/orders"
                className="footer-link"
                state={{ userId: loggedInUser.user._id }}>
                Track Your Order
              </Link>
            ) : (
              ""
            )} */}

            <FooterLink href="#">Contact Us</FooterLink>
          </Column>
          {/* <Column>
            <Heading>Newsletter</Heading>
            <p className="footer-para">
              Subscribe and get 10% off your first order!
            </p>
            <input
              className="footer-input"
              type="email"
              placeholder="Email address"
            />
            <button className="footer-button">Sign up</button>
          </Column> */}
        </Row>
        <hr className="mobile-footer-line" />
        <div className="footer-container-1">
          {/* <div className="footer-container-2">
            <p className="footer-para">Corporate Orders</p>
            <div className="vertical"></div>
            <p className="footer-para">Scholarships</p>
            <div className="vertical"></div>
            <p className="footer-para">Privacy Policy</p>
          </div> */}
          <div>
            <p className="footer-para">Copyright © 2024 YOTINDIA.</p>
          </div>
          <div>
            <p className="footer-para">Powered by YOTINDIA.</p>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
