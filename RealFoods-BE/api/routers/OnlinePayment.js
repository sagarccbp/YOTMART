const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Razorpay = require("razorpay");

const PaymentModel = require("../models/PaymentModel")
var crypto = require("crypto");
const checkAuth = require("../../middleware/check-auth");

const KEY_ID = "rzp_test_BzL96moj3BjfEI"
const KEY_SECRETE = "WbzgNG5xUfRKy1HMeahZ8NdW";
var instance = new Razorpay({
  key_id: KEY_ID,
  key_secret:KEY_SECRETE ,
});

router.post("/createOrder",checkAuth, (req, res, next) => {
  const amount = req.body.amount;
  const reciept = req.body.receipt;
  const userId = req.body.userId;
  console.log(req.body);
  var options = {
    amount: amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: reciept,
  };
  instance.orders.create(options, async function (err, order) {
    console.log('Order is : ',order);
    if (order) {
      const paymentModel = new PaymentModel({
        _id:mongoose.Types.ObjectId(),
        userId: userId,
        razorPayOrderId: order.id,
        entity: order.entity,
        amount: order.amount,
        amount_paid: order.amount_paid,
        amount_due: order.amount_due,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
      });
      paymentModel
        .save()
        .then((result) => {
          return res.status(200).json({
            paymentGatewayOrder: order,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            error: err,
          });
        });
    } else {
      return res.status(500).json({
        message: "Something goes wrong while fetching information",
      });
    }
  });
});

router.post("/verifyOrder",checkAuth, (req, res, next) => {
  const razorPayOrderId = req.body.response.razorpay_order_id;
  const razorPayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.razorpay_signature;
  const body = razorPayOrderId + "|" + razorPayPaymentId;
  const exptectedSignature = crypto.createHmac('sha256', KEY_SECRETE)
    .update(body.toString()).digest('hex');
  
  const razorPayModelId = req.body.razorPayModelId;
  if (exptectedSignature === signature) {
    PaymentModel.findByIdAndUpdate(razorPayModelId, {'$set': {"status" : "success"} } )
      .then(result => { 
        return res.status(200).json({
          message : "Payment successfull"
        })
      }).catch(err => { 
        return res.status(500).json({
          message : "Payment verification failed. Please try again"
        })
      })
  }

});

module.exports = router;
