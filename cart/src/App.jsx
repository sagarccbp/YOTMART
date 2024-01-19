import React from "react";
import ReactDOM from "react-dom";
import CartDetails from "./components/CartDetails/CartDetails";

import "./index.css";

const App = () => (
  <div className="container">
    {/* <CartDetails /> */}
    <h1>Cart Service</h1>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
