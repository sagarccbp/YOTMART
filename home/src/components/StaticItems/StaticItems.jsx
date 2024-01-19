import React, { useState, useEffect } from "react";

import "./staticItems.scss";

const StaticItems = ({ homeItems }) => {
  return (
    <>
      <div className="static-items-container">
        {homeItems && homeItems.length > 0
          ? homeItems.map((homeItem, index) => {
              return (
                <div className="static-item-container" key={index}>
                  <div className="static-items-image">
                    <img
                      className="static-item-image"
                      src={
                        homeItem &&
                        homeItem.listObject &&
                        homeItem.listObject.image
                          ? homeItem.listObject.image
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <h3 className="static-item-title">
                    {homeItem && homeItem.listObject && homeItem.listObject.name
                      ? homeItem.listObject.name
                      : ""}
                  </h3>
                  <p className="static-item-description">
                    {homeItem &&
                    homeItem.listObject &&
                    homeItem.listObject.description
                      ? homeItem.listObject.description
                      : ""}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default StaticItems;
