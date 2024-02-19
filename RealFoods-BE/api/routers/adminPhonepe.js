const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middleware/check-auth");
const User = require("../models/user");
const Address = require("../models/address");
const { makeOrder } = require("./internalApis");
const crypto = require("crypto");
let fetch = require("node-fetch");
const { response } = require("../../app");
const PhonePeAdmin = require("../models/phonepe-admin");
const jsonWebToken = require("jsonwebtoken");
const { log } = require("console");

router.post("/", checkAuth, async (req, res, next) => {
  const amount = req.body.amount;
  //   const cartId = req.body.cart;
  const addressId = req.body.address;
  const phonePayUrl = process.env.PHONE_PAY_URL + "/pg/v1/pay";
  const userId = req.userdata.userId;
  const mobileNumber = req.userdata.mobileNumber;
  //   console.log(cartId, "CARTID");
  const phonePeModel = PhonePeAdmin({
    amount: amount,
    user: userId,
    // cart: cartId,
    address: addressId,
  });
  const phonePayOrder = await phonePeModel.save();
  console.log("Checking phone pay order id from database ", phonePayOrder);

  const reqBody = {
    merchantId: process.env.MERCHENT_ID,
    merchantTransactionId: phonePayOrder._id,
    merchantUserId: userId,
    amount: amount * 100,
    redirectUrl: `${process.env.REALFOODS_API}/adminPhonePe/phonePayCallBack`,
    redirectMode: "POST",
    callbackUrl: `${process.env.REALFOODS_API}/adminPhonePe/phonePayCallBack`,
    mobileNumber: mobileNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  const base64Encoded = Buffer.from(JSON.stringify(reqBody)).toString("base64"); // Convert to base 64 url.

  const payload = base64Encoded + "/pg/v1/pay" + process.env.PHONE_PAY_SALT; // This is main payload
  var sha256 = crypto.createHash("sha256").update(payload).digest("hex");
  const checkSum = sha256 + "###1";

  let body = { request: base64Encoded };
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checkSum,
    },
    body: JSON.stringify(body),
  };

  const phonePayResponse = await fetch(phonePayUrl, options);
  const phonePayResult = await phonePayResponse.json();

  return res.status(200).json(phonePayResult);
});

router.post("/phonePayCallBack", async (req, res, next) => {
  console.log("CALLBACK");

  const merchantId = req.body.merchantId;
  const transactionId = req.body.transactionId;

  const payload =
    `/pg/v1/status/${merchantId}/${transactionId}` + process.env.PHONE_PAY_SALT; // This is main payload
  var sha256 = crypto.createHash("sha256").update(payload).digest("hex");
  const checkSum = sha256 + "###1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checkSum,
      "X-MERCHANT-ID": merchantId,
    },
  };

  const phonePayStatus = await fetch(
    `${process.env.PHONE_PAY_URL}/pg/v1/status/${merchantId}/${transactionId}`,
    options
  );
  const phonePayStatusResult = await phonePayStatus.json();
  console.log(phonePayStatusResult, "APISTATUS");
  const status = phonePayStatusResult.code;
  const data = phonePayStatusResult.data;
  const base64Encoded = Buffer.from(
    JSON.stringify(phonePayStatusResult)
  ).toString("base64");
  console.log(status, "STATUS");
  await PhonePeAdmin.updateOne(
    { _id: transactionId },
    { $set: { status: status, data: data } }
  );

  const userId = await PhonePeAdmin.findOne();
  console.log(userId.user, "USERID");
  const userDetails = await User.findById(userId.user);

  console.log(userDetails, "USERDATA");

  const token = jsonWebToken.sign(
    {
      mobileNumber: userDetails.email,
      userId: userDetails._id,
      role: userDetails.role.name,
    },
    process.env.EVENTUM_SECRATE_KEY,
    {
      expiresIn: "60s",
    }
  );
  console.log(token, "TOKEN");
  if (status === "PAYMENT_SUCCESS") {
    console.log("PAYMENT SUCCESS");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const userSubscriptionDetails = await fetch(
      `${process.env.REALFOODS_API}/user/subscription/${userDetails._id}?isSubscribed=true`,
      options
    );
    const userSubscriptionDetailsResponse =
      await userSubscriptionDetails.json();
    console.log(userSubscriptionDetailsResponse, "SUBSCRIPTION");
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    // };
    // const cartDetails = await fetch(
    //   `${process.env.REALFOODS_API}/cart/${userId.user}`,
    //   options
    // );
    // const cartDetailsResponse = await cartDetails.json();
    // console.log(cartDetailsResponse, "CARTRESPONCE");
    // if (cartDetailsResponse) {
    //   await makeOrder(
    //     "ONLINE_PAYMENT",
    //     cartDetailsResponse,
    //     userDetails._id,
    //     userId.address,
    //     token
    //   );
    const thankyou = `${process.env.REALFOODS_URL}/admin?data=${base64Encoded}`;
    return res.redirect(thankyou);
    // }
  } else {
    const paymentStatus = `${process.env.REALFOODS_URL}/#/payment-status?data=${base64Encoded}`;
    return res.redirect(paymentStatus);
  }
});

router.get(
  "/fetch-status/:transactionId",
  checkAuth,
  async (req, res, next) => {
    const userId = req.userdata.userId;
    const transactionId = req.body.transactionId;
    const phonePayResult = await PhonePeAdmin.findOne({
      _id: transactionId,
      user: userId,
    }).populate("user");
    return res.status(200).json(phonePayResult);
  }
);

module.exports = router;
