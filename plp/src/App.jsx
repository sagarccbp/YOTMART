import React from "react";
import ReactDOM from "react-dom";
import AllCategories from "./components/AllCategories/AllCategories";
import "bootstrap/dist/css/bootstrap.css";
// import Items from "./components/Items/Items";
// import Categories from "plp/Categories";
// import ProductItemList from "./components/ProductItemList/ProductItemList";
import "./index.css";

const App = () => (
  <div className="categories-container">
    {/* <Categories /> */}
    {/* <ProductItemList /> */}
    {/* <Items /> */}
    {/* <AllCategories /> */}
    <h1>PLP Service</h1>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
