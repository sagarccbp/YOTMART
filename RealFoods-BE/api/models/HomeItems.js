const mongoose = require("mongoose");

const homeItems = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    displayType: {
      type: String,
      enum: [
        "BANNERS",
        "STATIC_ELEMENTS",
        "1_ITEM_WITH_1_GROUP",
        "TWO_GROUP",
        "GROUP_WITH_4_ITEMS",
        "SINGLE_ITEM",
        "GROUP_LIST",
        "ITEM_LIST",
        "CIRCULAR_GROUP",
        "SINGLE_GROUP",
        "SINGLE_CATEGORIES",
        "OFFER_CARDS",
        "COMMENTS",
        "BLOGS",
      ],
      required: true,
    },
    homeItems: [
      {
        layoutType: {
          type: String,
          enum: ["ITEMS", "SUB_CATEGORIES", "CATEGORIES", "STATIC_ELEMENTS"],
        },
        listObject: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "homeItems.onModel",
        },
        onModel: {
          type: String,
          enum: ["Categories", "SubCategories", "items", "StaticElements"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeItems", homeItems);
