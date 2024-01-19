const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  locality: String,
  district: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  isDefaultAddress: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  area: {
    type: String,
  },
  state: {
    type: String,
  },
  houseNo: {
    type: String,
  },
  landMark: {
    type: String,
  },
  alternativeMobileNumber: {
    type: Number,
  },
  addressType: {
    type: String,
    enum: ["HOME", "OFFICE", "OTHERS"],
  },
});

module.exports = mongoose.model("Address", addressSchema);
