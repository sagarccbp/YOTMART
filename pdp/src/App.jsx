import React from "react";
import ReactDOM from "react-dom";
import MagnifierImages from "./components/MagnifierImages/MagnifierImages";
// import CustomerReviews from "./components/CustomerReviews/CustomerReviews";

// import PDPScreen from "./components/PDPScreen/PDPScreen";

import "./index.css";
// import Header from "home/Header";
// import Footer from "home/Footer";

const App = () => (
  <div className="container">
    {/* <CustomerReviews /> */}
    {/* <PDPScreen /> */}
    {/* <MagnifierImages /> */}
    <h1>PDP Service</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
