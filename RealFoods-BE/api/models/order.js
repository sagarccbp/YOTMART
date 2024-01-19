const mongoose = require("mongoose");

const orders = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    creditReferenceNo: {
      type: String,
      required: false,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "items",
        },
        quantity: {
          type: Number,
          default: 0,
        },
        varient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "itemVarient",
        },
        trackingId: {
          type: String,
        },
      },
    ],
    orderStatus: [
      {
        type: String,
        enum: ["ORDER_INITIATED", "ORDER_TRANSITION", "ORDER_COMPLETED"],
        default: ["ORDER_INITIATED"],
      },
    ],
    paymentMode: {
      type: String,
      enum: ["CASH", "ONLINE_PAYMENT"],
      default: "ONLINE_PAYMENT",
    },
    payableAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    createdDate: {
      type: Date,
      default: new Date().getTime(),
    },
    mobileNumber: {
      type: Number,
      required: false,
      match: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
    },
    orderAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orders);
