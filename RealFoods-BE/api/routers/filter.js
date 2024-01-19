const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middleware/check-auth");
const validateKey = require("../../middleware/validate-key");

const Items = require("../models/item");

router.get("/", validateKey, (req, res, next) => {
  const query = req.query.q;
  Items.find({
    $or: [
      { name: { $regex: new RegExp("^" + query.toLowerCase(), "i") } },
      {
        tags: {
          $elemMatch: { $regex: new RegExp("^" + query.toLowerCase(), "i") },
        },
      },
    ],
  })
    .populate("categories")
    .populate("subCategories")
    .then((result) => {
      return res.status(200).json({
        item: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.get("/filterWithQuery", validateKey, async (req, res, next) => {
  const inStock = req.query.instock;
  const priceFrom = req.query.priceFrom;
  const priceTo = req.query.priceTo;
  const itemId = req.query.subCatId;

  if (inStock && priceFrom && priceTo) {
    const items = await Items.find({
      $and: [
        { price: { $gte: priceFrom, $lte: priceTo } },
        { presentStock: { $gt: 0 } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");

    return res.status(200).json(items);
  }
  if (priceFrom && priceTo) {
    const items = await Items.find({
      $and: [
        { price: { $gte: priceFrom, $lte: priceTo } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock && priceFrom) {
    const items = await Items.find({
      $and: [
        { presentStock: { $gt: 0 } },
        { price: { $gte: priceFrom } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock && priceTo) {
    const items = await Items.find({
      $and: [
        { presentStock: { $gt: 0 } },
        { price: { $lte: priceTo } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (priceTo) {
    const items = await Items.find({
      $and: [
        { price: { $gte: 0, $lte: priceTo } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (priceFrom) {
    const items = await Items.find({
      $and: [
        { price: { $gte: priceFrom } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock) {
    const items = await Items.find({
      $and: [
        { presentStock: { $gt: 0 } },
        { subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } },
      ],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
});

router.get("/shopByPrice", validateKey, async (req, res, next) => {
  const inStock = req.query.instock;
  const priceFrom = req.query.priceFrom;
  const priceTo = req.query.priceTo;

  if (inStock && priceFrom && priceTo) {
    console.log("INSIDE 1");
    const items = await Items.find({
      $and: [
        { price: { $gte: priceFrom, $lte: priceTo } },
        { presentStock: { $gt: 0 } },
      ],
    })
      .populate("categories")
      .populate("subCategories");

    return res.status(200).json(items);
  }
  if (priceFrom && priceTo) {
    console.log("INSIDE 2");
    const items = await Items.find({
      $and: [{ price: { $gte: priceFrom, $lte: priceTo } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock && priceFrom) {
    console.log("INSIDE 3");
    const items = await Items.find({
      $and: [{ presentStock: { $gt: 0 } }, { price: { $gte: priceFrom } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock && priceTo) {
    console.log("INSIDE 4");
    const items = await Items.find({
      $and: [{ presentStock: { $gt: 0 } }, { price: { $lte: priceTo } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (priceTo) {
    console.log("INSIDE 5");
    const items = await Items.find({
      $and: [{ price: { $gte: 0, $lte: priceTo } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (priceFrom) {
    console.log("INSIDE 6");
    const items = await Items.find({
      $and: [{ price: { $gte: priceFrom } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
  if (inStock) {
    console.log("INSIDE 7");
    const items = await Items.find({
      $and: [{ presentStock: { $gt: 0 } }],
    })
      .populate("categories")
      .populate("subCategories");
    return res.status(200).json(items);
  }
});

router.get("/:price", validateKey, async (req, res, next) => {
  const price = req.params.price;
  const items = await Items.find({
    price: { $lt: price },
  });
  return res.status(200).json(items);
});

module.exports = router;
