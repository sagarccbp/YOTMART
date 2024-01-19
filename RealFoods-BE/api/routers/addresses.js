const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middleware/check-auth");
const Address = require("../models/address");

router.get("/:userId", checkAuth, (req, res, next) => {
  const userId = req.params.userId;
  Address.find({ userId: userId })
    .exec()
    .then((docs) => {
      return res.status(200).json({
        address: docs,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/", checkAuth, (req, res, next) => {
  console.log("Request is : ", req.body);
  const address = new Address(req.body);

  address
    .save()
    .then((doc) => {
      return res.status(200).json({
        message: "Address added successfully",
        address: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Address.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: "Address deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", checkAuth, async (req, res, next) => {
  const id = req.params.id;
  const addressItem = req.body;

  Object.keys(addressItem).forEach(
    (k) => addressItem[k] == "" && delete addressItem[k]
  );

  console.log("Length is : ", Object.keys(addressItem).length);
  if (Object.keys(addressItem).length === 1) {
    const addressUpdate = await Address.updateMany(
      {},
      { isDefaultAddress: false },
      { multi: true }
    );
  }
  console.log("Address is updated", addressItem);
  Address.findByIdAndUpdate(id, addressItem)
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Address eddited successfully",
        address: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
