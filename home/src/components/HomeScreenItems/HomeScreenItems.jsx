import React from "react";
import { Link } from "react-router-dom";
import "./homeScreenItems.scss";

const HomeScreenItems = ({ homeScreenItems }) => {
  console.log(homeScreenItems, "HSI");
  return (
    <>
      {homeScreenItems && homeScreenItems.length > 0 ? (
        <div className="home-screen-items-container">
          <div className="home-screen-items-medium-container">
            {homeScreenItems[0].layoutType === "ITEMS" ? (
              <div
                className="home-screen-items-medium"
                style={{
                  backgroundImage: `url('${homeScreenItems[0].item.image}')`,
                }}
              >
                <h1 className="home-screen-items-medium-heading">
                  {homeScreenItems[0].item.name}
                </h1>
                <p className="home-screen-items-medium-description">
                  {homeScreenItems[0].item.description}
                </p>
                {homeScreenItems[0].layoutType === "ITEMS" ? (
                  <button className="home-screen-items-button">SHOP NOW</button>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {homeScreenItems[0].layoutType === "SUB_CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[0].item._id,
                  name: homeScreenItems[0].item.name,
                }}
              >
                <div
                  className="home-screen-items-medium"
                  style={{
                    backgroundImage: `url('${homeScreenItems[0].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-medium-heading">
                    {homeScreenItems[0].item.name}
                  </h1>
                  <p className="home-screen-items-medium-description">
                    {homeScreenItems[0].item.description}
                  </p>
                  {homeScreenItems[0].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems[0].layoutType === "CATEGORIES" ? (
              <Link
                to="/categories"
                state={{
                  id: homeScreenItems[0].item._id,
                  name: homeScreenItems[0].item.name,
                }}
              >
                <div
                  className="home-screen-items-medium"
                  style={{
                    backgroundImage: `url('${homeScreenItems[0].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-medium-heading">
                    {homeScreenItems[0].item.name}
                  </h1>
                  <p className="home-screen-items-medium-description">
                    {homeScreenItems[0].item.description}
                  </p>
                  {homeScreenItems[0].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}

            {homeScreenItems &&
            homeScreenItems.length > 1 &&
            homeScreenItems[1].layoutType === "ITEMS" ? (
              <div
                className="home-screen-items-medium"
                style={{
                  backgroundImage: `url('${homeScreenItems[1].item.image}')`,
                }}
              >
                <h1 className="home-screen-items-medium-heading">
                  {homeScreenItems[1].item.name}
                </h1>
                <p className="home-screen-items-medium-description">
                  {homeScreenItems[1].item.description}
                </p>
                {homeScreenItems[1].layoutType === "ITEMS" ? (
                  <button className="home-screen-items-button">SHOP NOW</button>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 1 &&
            homeScreenItems[1].layoutType === "SUB_CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[1].item._id,
                  name: homeScreenItems[1].item.name,
                }}
              >
                <div
                  className="home-screen-items-medium"
                  style={{
                    backgroundImage: `url('${homeScreenItems[1].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-medium-heading">
                    {homeScreenItems[1].item.name}
                  </h1>
                  <p className="home-screen-items-medium-description">
                    {homeScreenItems[1].item.description}
                  </p>
                  {homeScreenItems[1].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 1 &&
            homeScreenItems[1].layoutType === "CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[1].item._id,
                  name: homeScreenItems[1].item.name,
                }}
              >
                <div
                  className="home-screen-items-medium"
                  style={{
                    backgroundImage: `url('${homeScreenItems[1].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-medium-heading">
                    {homeScreenItems[1].item.name}
                  </h1>
                  <p className="home-screen-items-medium-description">
                    {homeScreenItems[1].item.description}
                  </p>
                  {homeScreenItems[1].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="home-screen-items-small-container">
            {homeScreenItems &&
            homeScreenItems.length > 2 &&
            homeScreenItems[2].layoutType === "ITEMS" ? (
              <div
                className="home-screen-items-small"
                style={{
                  backgroundImage: `url('${homeScreenItems[2].item.image}')`,
                }}
              >
                <h1 className="home-screen-items-small-heading">
                  {homeScreenItems[2].item.name}
                </h1>
                <p className="home-screen-items-small-description">
                  {homeScreenItems[2].item.description}
                </p>
                {homeScreenItems[2].layoutType === "ITEMS" ? (
                  <button className="home-screen-items-button">SHOP NOW</button>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 2 &&
            homeScreenItems[2].layoutType === "SUB_CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[2].item._id,
                  name: homeScreenItems[2].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[2].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[2].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[2].item.description}
                  </p>
                  {homeScreenItems[2].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 2 &&
            homeScreenItems[2].layoutType === "CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[2].item._id,
                  name: homeScreenItems[2].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[2].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[2].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[2].item.description}
                  </p>
                  {homeScreenItems[2].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 3 &&
            homeScreenItems[3].layoutType === "ITEMS" ? (
              <div
                className="home-screen-items-small"
                style={{
                  backgroundImage: `url('${homeScreenItems[3].item.image}')`,
                }}
              >
                <h1 className="home-screen-items-small-heading">
                  {homeScreenItems[3].item.name}
                </h1>
                <p className="home-screen-items-small-description">
                  {homeScreenItems[3].item.description}
                </p>
                {homeScreenItems[3].layoutType === "ITEMS" ? (
                  <button className="home-screen-items-button">SHOP NOW</button>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 3 &&
            homeScreenItems[3].layoutType === "SUB_CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[3].item._id,
                  name: homeScreenItems[3].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[3].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[3].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[3].item.description}
                  </p>
                  {homeScreenItems[3].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 3 &&
            homeScreenItems[3].layoutType === "CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[3].item._id,
                  name: homeScreenItems[3].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[3].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[3].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[3].item.description}
                  </p>
                  {homeScreenItems[3].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}

            {homeScreenItems &&
            homeScreenItems.length > 4 &&
            homeScreenItems[4].layoutType === "ITEMS" ? (
              <div
                className="home-screen-items-small"
                style={{
                  backgroundImage: `url('${homeScreenItems[4].item.image}')`,
                }}
              >
                <h1 className="home-screen-items-small-heading">
                  {homeScreenItems[4].item.name}
                </h1>
                <p className="home-screen-items-small-description">
                  {homeScreenItems[4].item.description}
                </p>
                {homeScreenItems[4].layoutType === "ITEMS" ? (
                  <button className="home-screen-items-button">SHOP NOW</button>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 4 &&
            homeScreenItems[4].layoutType === "SUB_CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[4].item._id,
                  name: homeScreenItems[4].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[4].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[4].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[4].item.description}
                  </p>
                  {homeScreenItems[4].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
            {homeScreenItems &&
            homeScreenItems.length > 4 &&
            homeScreenItems[4].layoutType === "CATEGORIES" ? (
              <Link
                to="/sub_categories/items/"
                state={{
                  id: homeScreenItems[4].item._id,
                  name: homeScreenItems[4].item.name,
                }}
              >
                <div
                  className="home-screen-items-small"
                  style={{
                    backgroundImage: `url('${homeScreenItems[4].item.image}')`,
                  }}
                >
                  <h1 className="home-screen-items-small-heading">
                    {homeScreenItems[4].item.name}
                  </h1>
                  <p className="home-screen-items-small-description">
                    {homeScreenItems[4].item.description}
                  </p>
                  {homeScreenItems[4].layoutType === "ITEMS" ? (
                    <button className="home-screen-items-button">
                      SHOP NOW
                    </button>
                  ) : null}
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeScreenItems;
