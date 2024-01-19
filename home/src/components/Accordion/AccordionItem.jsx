import React, { useState, useRef } from "react";
import SubCategories from "../SubCategories/SubCategories";

import "./accordion.scss";

const AccordionItem = ({ category, toggle }) => {
  const [clicked, setClicked] = useState(false);
  const contentEl = useRef();

  // const { categoryTitle, categoryItem } = category;

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <li className="item-accordion">
        <button className="button-accordion" onClick={handleToggle}>
          {category.name}
          <span className="accordion-control">{clicked ? "-" : "+"} </span>
        </button>

        <div
          ref={contentEl}
          className="category-item-wrapper"
          style={
            clicked
              ? { height: contentEl.current.scrollHeight }
              : { height: "0px" }
          }
        >
          <div className="categoryItem">
            <SubCategories id={category._id} toggle={toggle} />
          </div>
        </div>
      </li>
    </>
  );
};

export default AccordionItem;
