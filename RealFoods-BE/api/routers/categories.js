const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const validateKey = require("../../middleware/validate-key");
const Category = require("../models/category");
const SubCategory = require("../models/subcategory");
const isSuperadmin = require("../../middleware/is-superadmin");

router.get("/", validateKey, (req, res, next) => {
  Category.find()
    .then((docs) => {
      return res.status(200).json({
        categories: docs,
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
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    tags: req.body.tags,
    description: req.body.description,
    theme: req.body.theme,
    smallDescription: req.body.smallDescription,
    ownerId: req.body.ownerId,
  });
  category
    .save()
    .then((doc) => {
      return res.status(201).json({
        message: "Category created succesffully",
        category: doc,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.get("/subcategories", validateKey, (req, res, next) => {
  const categoryId = req.query.categoryId;
  if (!categoryId) {
    return res.status(404).json({ message: "Invalid category id" });
  } else {
    SubCategory.find({
      categories: { $in: [mongoose.Types.ObjectId(categoryId)] },
    })
      .populate("categories")
      .then((result) => {
        return res.status(200).json({
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ error: err });
      });
  }
});

// Get all products of owner..
router.get("/user/:userId", checkAuth, (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({ message: "User id not found" });
  } else {
    Category.find({ ownerId: userId })
      .then((result) => {
        return res.status(200).json({
          categories: result,
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
  const id = req.params.id;
  if (id) {
    Category.findById(id)
      .then((doc) => {
        res.status(200).json({
          data: doc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
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
    Category.remove({ _id: id })
      .then((doc) => {
        return res.status(200).json({
          message: "Categories deleted succesfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } else {
    return res.status(404).json({ message: "Invalid category id" });
  }
});

router.post("/updateCategory/:id", isAdmin, (req, res, next) => {
  const id = req.params.id;
  const category = new Category(req.body);

  if (id) {
    Category.findByIdAndUpdate(id, { $set: category })
      .then((result) => {
        if (result) {
          return res.status(200).json({
            message: "Category updated successfully",
            data: result,
          });
        }
      })
      .catch((err) => {
        return res.status(403).json({
          message: "Invalid category id",
          data: result,
        });
      });
  } else {
    return res.status(404).json({ message: "Invalid category id" });
  }
});

module.exports = router;
