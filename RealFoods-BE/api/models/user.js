const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
    match: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  alternativeMobile: Number,
  fullName: String,
  password: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  address: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Address",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "items",
  },
  deviceToken: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  location: {
    defaultLocation: {
      lat: {
        type: String,
      },
      lon: {
        type: String,
      },
    },
    currentLocation: {
      lat: {
        type: String,
      },
      lon: {
        type: String,
      },
    },
  },
  image: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
