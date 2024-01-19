const mongoose = require("mongoose");

const diateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trime: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
    },
    notes: {
      type: String,
    },
    diatePlan: [
      {
        ingredient: {
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
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diate", diateSchema);
