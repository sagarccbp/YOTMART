const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const validateKey = require("../../middleware/validate-key");
const isSuperAdmin = require("../../middleware/is-superadmin");

const ItemsSchema = require("../models/item");
const ItemsVarient = require("../models/itemVarient");

router.get("/", validateKey, (req, res, next) => {
  ItemsSchema.find()
    .populate("varients")
    .populate("categories")
    .populate("subCategories")
    .populate("discount")
    .populate({
      path: "reviews",
      populate: "user",
    })
    .exec()
    .then((doc) => {
      return res.status(200).json({
        items: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/varient/delete", isSuperAdmin, async (req, res, next) => {
  const itemId = req.body.itemId;
  const varientId = req.body.varientId;
  const varientDelete = await ItemsVarient.findByIdAndDelete(varientId);
  const completed = await ItemsSchema.findByIdAndUpdate(itemId, {
    $pull: {
      varients: mongoose.Types.ObjectId(varientId),
    },
  });
  return res.status(200).json(completed);
});

router.post("/addVarient", isSuperAdmin, async (req, res, next) => {
  const varients = req.body.varients;
  const itemId = req.body.itemId;

  let result = [];
  if (varients) {
    const itemVarients = await ItemsVarient.insertMany(varients);
    result.push(...itemVarients.map((itemVarient) => itemVarient._id));
    await ItemsSchema.findByIdAndUpdate(itemId, {
      $push: {
        varients: result,
      },
    });
    return res.status(200).json({
      message: "successfull",
    });
  }
});

router.post("/", isSuperAdmin, async (req, res, next) => {
  const varients = req.body.varients;
  let result = [];
  if (varients) {
    const itemVarients = await ItemsVarient.insertMany(varients);
    result.push(...itemVarients.map((itemVarient) => itemVarient._id));
  }

  const itemBody = req.body;
  itemBody["varients"] = result;

  myItems = new ItemsSchema(itemBody);

  myItems
    .save()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "Item inserted succesffuly",
          data: doc,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/varients/:itemId", validateKey, async (req, res, next) => {
  const item = await ItemsSchema.findOne({ _id: req.params.itemId }).populate(
    "varients"
  );
  const varients = item.varients;
  return res.status(200).json(varients);
});

// Get all products of owner..
router.get("/user/:userId", isSuperAdmin, (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({ message: "User id not found" });
  } else {
    ItemsSchema.find({ ownerId: userId })
      .populate("categories")
      .populate("subCategories")
      .then((result) => {
        return res.status(200).json({
          items: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({
          error: err,
        });
      });
  }
});

router.get("/:id", validateKey, (req, res, next) => {
  ItemsSchema.findById(req.params.id)
    .populate("varients")
    .populate("categories")
    .populate("subCategories")
    .populate("discount")
    .populate({
      path: "reviews",
      populate: "user",
    })
    .then((doc) => {
      res.status(200).json({
        data: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", isSuperAdmin, (req, res, next) => {
  console.log("Delelting method.. ");
  ItemsSchema.remove({ _id: req.params.id })
    .then((docs) => {
      res.status(200).json({
        message: "Item deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", isSuperAdmin, (req, res, next) => {
  const itemId = req.params.id;
  const item = req.body;
  Object.keys(item).forEach((k) => item[k] == "" && delete item[k]);
  ItemsSchema.findByIdAndUpdate(itemId, item)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Item updated successfully",
          result: result,
        });
      } else {
        return res.status(403).json({
          message: "Invalid item id",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
