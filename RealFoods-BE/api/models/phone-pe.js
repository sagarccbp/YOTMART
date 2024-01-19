const mongoose = require("mongoose");

const phonePayOrder = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    status: {
      type: String,
      enum: [
        "PAYMENT_INITIATED",
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "PAYMENT_REFUNDED",
        "TRANSACTION_NOT_FOUND",
      ],
      default: "PAYMENT_INITIATED",
    },

    message: String,
    data: {
      merchantId: {
        type: String,
        default: "",
      },
      merchantTransactionId: {
        type: String,
        default: "",
      },
      transactionId: {
        type: String,
        default: "",
      },
      amount: {
        type: Number,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      responseCode: {
        type: String,
        default: "",
      },
      paymentInstrument: {
        type: {
          type: String,
          default: "",
        },
        pgTransactionId: {
          type: String,
          default: "",
        },
        pgServiceTransactionId: {
          type: String,
          default: "",
        },
        bankTransactionId: {
          type: String,
          default: "",
        },
        bankId: {
          type: String,
          default: "",
        },
      },
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("phonePayOrder", phonePayOrder);
