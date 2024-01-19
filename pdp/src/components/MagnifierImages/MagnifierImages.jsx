import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Magnifier } from "react-image-magnifiers";

import "./magnifierimages.scss";

const MagnifierImages = ({ item, onClose }) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (item) {
      if (
        item.image &&
        item.image.length > 0 &&
        item.image[0].l_medium &&
        item.image[0].l_medium.url
      ) {
        setMainImage(item.image[0].l_medium.url);
      }
    }
  }, [item]);

  const onClickClose = () => {
    onClose();
  };

  return (
    <div>
      <div className="magnifier-product-image-container">
        <div className="magnifier-sub-image-container">
          {item && item.image && item.image.length > 1
            ? item.image.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={
                      image && image.x_sm && image.x_sm.url
                        ? image.x_sm.url
                        : ""
                    }
                    alt=""
                    className="magnifier-sub-image"
                    onClick={() =>
                      setMainImage(
                        image && image.l_medium && image.l_medium.url
                          ? image.l_medium.url
                          : ""
                      )
                    }
                  />
                );
              })
            : ""}
        </div>
        {mainImage ? (
          <div
            className="magnifier-main-image-container"
            // style={mainImage === "" ? { height: "auto" } : { height: "500px" }}
          >
            <Magnifier
              imageSrc={mainImage}
              imageAlt=""
              className="magnifier-main-image"
            />
          </div>
        ) : (
          ""
        )}

        <MdOutlineCancel
          size={36}
          onClick={onClickClose}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default MagnifierImages;
