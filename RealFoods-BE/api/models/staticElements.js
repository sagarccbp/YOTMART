const mongoose = require("mongoose");

const staticElements = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
  },
  image: {
    type: String,
  },
  collectionName: {
    type: String,
    default: "StaticElements",
  },
});

module.exports = mongoose.model("StaticElements", staticElements);
