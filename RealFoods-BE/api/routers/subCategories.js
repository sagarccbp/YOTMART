const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SubCategory = require("../models/subcategory");
const Items = require("../models/item");
const menuItemsSchema = require("../models/MenuItemModel");
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const validateKey = require("../../middleware/validate-key");
const isSuperadmin = require("../../middleware/is-superadmin");

router.get("/", (req, res, next) => {
  SubCategory.find()
    .then((docs) => {
      return res.status(200).json({
        subCategory: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/", isSuperadmin, (req, res, next) => {
  const categories = req.body.categories;
  category = new SubCategory({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    tags: req.body.tags,
    description: req.body.description,
    theme: req.body.theme,
    smallDescription: req.body.smallDescription,
    categories: categories,
    ownerId: req.body.ownerId,
  });

  category
    .save()
    .then((doc) => {
      for (let i = 0; i < categories.length; i++) {
        const catId = categories[i];
        menuItemsSchema
          .findOneAndUpdate(
            { categories: catId },
            { $push: { subCategories: doc._id } },
            { upsert: true }
          )
          .then((menuResult) => {
            console.log(menuResult);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log("Inside sub cat save func");
      return res.status(201).json({
        message: "Sub Categories created succesffully",
        subCategory: doc,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

// Get all products of owner..
router.get("/user/:userId", isSuperadmin, (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({ message: "User id not found" });
  } else {
    SubCategory.find({ ownerId: userId })
      .then((result) => {
        return res.status(200).json({
          subCategory: result,
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

router.get("/items", validateKey, (req, res, next) => {
  const itemId = req.query.subCatId;
  console.log("Inside items method .. ");
  if (itemId) {
    Items.find({ subCategories: { $in: [mongoose.Types.ObjectId(itemId)] } })
      .populate("subCategories")
      .populate({
        path: "reviews",
        populate: "user",
      })
      .then((result) => {
        return res.status(200).json({
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      });
  } else {
    return res.status(404).json({
      message: "Invalid Item ID",
    });
  }
});

router.get("/:id", validateKey, (req, res, next) => {
  const id = req.params.id;
  if (id) {
    SubCategory.findById(req.params.id)
      .populate("items")
      .then((doc) => {
        res.status(200).json({
          data: doc,
        });
      })
      .catch((err) => {
        res.status(200).json({
          error: err,
        });
      });
  } else {
    return res.status(404).json({ message: "Invalid category id" });
  }
});

router.delete("/:id", isAdmin, (req, res, next) => {
  const id = req.params.id;
  if (id) {
    SubCategory.remove({ _id: id })
      .then((doc) => {
        return res.status(200).json({
          message: "Sub Categories deleted succesfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } else {
    return res.status(404).json({ message: "Invalid category id" });
  }
});

router.post("/updateSubcategories/:id", isAdmin, (req, res, next) => {
  const subId = req.params.id;
  const subCat = new SubCategory(req.body);
  if (subId) {
    SubCategory.findByIdAndUpdate(subId, subCat)
      .then((result) => {
        if (result) {
          return res.status(200).json({
            message: "Subcategory updated successfully",
          });
        } else {
          return res.status(404).json({
            message: "Invalid subcategory id",
          });
        }
      })
      .catch((err) => {
        return res.status(404).json({
          error: err,
        });
      });
  } else {
    return res.status(404).json({ message: "Invalid sub category id" });
  }
});

module.exports = router;
