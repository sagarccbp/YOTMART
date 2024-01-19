const mongoose = require("mongoose");

const razorPayOrder = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  razorPayOrderId: String,
  entity: String,
  amount: Number,
  amount_paid: Number,
  amount_due: Number,
  currency: String,
  receipt: String,
  status: String,
  created_at: Number,
  phonePayId: String,
});

module.exports = mongoose.model("razorPayOrders", razorPayOrder);
