const express = require("express");

// Need to remove during production use.
//const morgan = require('morgan');

const userRoutes = require("./api/routers/users");
const rolesRoutes = require("./api/routers/roles");
const addressRoutes = require("./api/routers/addresses");
const categoryRoutes = require("./api/routers/categories");
const subCategories = require("./api/routers/subCategories");
const items = require("./api/routers/items");
const uploads = require("./api/routers/uploadfiles");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cartRoute = require("./api/routers/cartController");
const orderRoute = require("./api/routers/orders");
const filterRouter = require("./api/routers/filter");
const reviewrRouter = require("./api/routers/reviews");
const promoCodeRouter = require("./api/routers/promocodes");
const homeScreenRouter = require("./api/routers/homeScreen");
const menuItemsRouter = require("./api/routers/MenuItems");
const onlinePaymentRouter = require("./api/routers/OnlinePayment");
const report = require("./api/routers/Report");
const chatRoutes = require("./api/routers/chatRoutes");
const messageRoutes = require("./api/routers/messageRoutes");
const invoiceRoutes = require("./api/routers/invoiceRoutes");
const secrateKeysRoutes = require("./api/routers/createSecratekey");
const nutritionist = require("./api/routers/nutritionist");
const phonePayRouter = require("./api/routers/Online-Payment-PhonePay");

const cors = require("cors");

const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_YOTINDIA_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log("Error connecting in DB : " + err));

// Need to remove during production use.
//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,DELETE"
    );
    return res.status(200).json({});
  }
  next();
});
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST, GET, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/user", userRoutes);
app.use("/role", rolesRoutes);
app.use("/address", addressRoutes);
app.use("/categories", categoryRoutes);
app.use("/sub_categories", subCategories);
app.use("/items", items);
app.use("/uploads", uploads);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/filter", filterRouter);
app.use("/review", reviewrRouter);
app.use("/promoCodes", promoCodeRouter);
app.use("/homeScreenItems", homeScreenRouter);
app.use("/menuItems", menuItemsRouter);
app.use("/payOnline", onlinePaymentRouter);
app.use("/reports", report);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/secrateKeys", secrateKeysRoutes);
app.use("/nutritionist", nutritionist);
app.use("/phonePay", phonePayRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// app.post("/ccavRequestHandler", function (request, response) {
//   ccavReqHandler.postReq(request, response);
// });

// app.post("/ccavResponseHandler", function (request, response) {
//   ccavResHandler.postRes(request, response);
// });

module.exports = app;
