import React from "react";
import { Link } from "react-router-dom";
import AccordionItem from "./AccordionItem";

import "./accordion.scss";

// const categories = [
//   {
//     categoryTitle: "Categories",
//     categoryItem: "Vegetables",
//   },
//   {
//     categoryTitle: "Gifts",
//     categoryItem: "Frames",
//   },
// ];

const Accordion = ({ categories, menuItems, toggle }) => {
  const onClickClose = () => {
    toggle();
  };

  return (
    <ul className="mobile-accordion">
      {categories && categories.length > 0
        ? categories.map((category, index) => {
            if (index === 3) {
              return (
                <Link
                  to="/allcategories"
                  state={{
                    menuItems: menuItems,
                  }}
                  key={index}
                >
                  <button
                    type="button"
                    onClick={onClickClose}
                    key={index}
                    className="mobile-categories-button"
                  >
                    More
                  </button>
                </Link>
              );
            } else {
              if (index > 3) {
                return null;
              }
              return (
                <AccordionItem
                  key={index}
                  category={category}
                  toggle={toggle}
                />
              );
            }
          })
        : ""}
    </ul>
  );
};

export default Accordion;
