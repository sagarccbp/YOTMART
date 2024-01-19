const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cart = require("../models/cart");

const Items = require("../models/item");
const User = require("../models/user");
const ItemVarient = require("../models/itemVarient");
const checkAuth = require("../../middleware/check-auth");

router.post("/:userId", checkAuth, (req, res, next) => {
  // {itemId: "item id goes here.."}

  const userId = req.params.userId;
  const requestedQuants = req.body.quantity;
  const varientId = req.body.varientId;

  if (!userId) {
    return res.status(404).json({
      message: "No user id found",
    });
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "No user id found",
        });
      } else {
        console.log(req.body.itemId);
        const myItem = Items.findById(req.body.itemId).then(async (result) => {
          if (!result) {
            return res.status(404).json({
              message: "Invalid item",
            });
          }
          const cart = await Cart.findOne({
            userId: userId,
            "items._id": mongoose.Types.ObjectId(result._id),
            "items.varient": varientId,
          });
          const varientDetails = await ItemVarient.findOne({ _id: varientId });

          if (cart) {
            // Cart is already there with item id. just increment the value.
            const updatedCart = await Cart.findOneAndUpdate(
              {
                userId: userId,
                "items._id": result._id,
                "items.varient": varientId,
              },
              {
                $inc: {
                  "items.$.itemQuantity": requestedQuants,
                  quantity: requestedQuants,
                  discountedPrice: requestedQuants * varientDetails.discount,
                  totalPrice:
                    requestedQuants *
                    (varientDetails.price - varientDetails.discount),
                },
              },
              { new: true }
            );
            return res.status(200).json({
              message: "Added successfully",
              item: updatedCart,
            });
          } else {
            Cart.findOneAndUpdate(
              { userId: userId },
              {
                $push: {
                  items: {
                    _id: result._id,
                    itemQuantity: requestedQuants,
                    varient: varientId,
                  },
                },
                $inc: {
                  quantity: requestedQuants,
                  discountedPrice: varientDetails.discount * requestedQuants,
                  totalPrice:
                    requestedQuants *
                    (varientDetails.price - varientDetails.discount),
                },
              },
              { upsert: true, new: true }
            )
              .then((cartStatus) => {
                return res.status(200).json({
                  message: "Added successfully",
                  item: cartStatus,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Internal server error",
      });
    });
});

router.get("/:userId", checkAuth, (req, res, next) => {
  const id = req.params.userId;

  Cart.findOne({ userId: id })
    .populate("items._id")
    .populate("items.varient")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

router.put("/updateQuantity/:userId", checkAuth, async (req, res, next) => {
  const userId = req.params.userId;
  const varient = req.body.varient;
  const itemId = req.body.itemId;
  const type = req.body.type;

  let result = await Cart.findOne({ userId: userId }).populate("items.varient");
  if (!result) {
    return res.status(404).json({
      message: "No data found",
    });
  }
  const index = result.items.findIndex(
    (element) =>
      element._id.toString() === itemId &&
      element.varient._id.toString() === varient
  );
  const myItem = result.items[index];
  if (!myItem) {
    return res.status(404).json({
      message: "No item found for the item key",
    });
  }
  if (type && type === "INC") {
    myItem.itemQuantity = myItem.itemQuantity + 1;
    result.totalPrice =
      result.totalPrice + (myItem.varient.price - myItem.varient.discount);
    result.discountedPrice = result.discountedPrice + myItem.varient.discount;
    result.quantity = result.quantity + myItem.itemQuantity;
  } else if (type && type === "DEC") {
    if (myItem.itemQuantity === 0) {
      return res.status(400).json({
        message: "Operation not valid",
      });
    }
    myItem.itemQuantity = myItem.itemQuantity - 1;
    result.totalPrice =
      result.totalPrice - (myItem.varient.price - myItem.varient.discount);
    result.discountedPrice = result.discountedPrice - myItem.varient.discount;
    result.quantity = result.quantity - myItem.itemQuantity;
  }
  result.items[index] = myItem;
  const update = await result.save();
  return res.status(200).json({
    message: "Quantity updated successfully",
    item: update,
  });
});

router.delete("/:cartId", checkAuth, (req, res, next) => {
  const id = req.params.cartId;
  Cart.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          message: "Nothing found in cart",
        });
      }
      return res.status(200).json({ message: "Cart cleared successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    });
});

// This method mainly for remove a perticular item from cart.
router.delete("/clearItem/:userId", async (req, res, next) => {
  const itemId = req.body.itemId;
  const varient = req.body.varient;
  const userId = req.params.userId;
  let result = await Cart.findOne({ userId: userId });
  if (!result) {
    return res.status(404).json({
      message: "No data found",
    });
  }

  const index = result.items.findIndex(
    (element) =>
      element._id.toString() === itemId &&
      element.varient.toString() === varient
  );
  const myItem = result.items[index];

  if (!myItem) {
    return res.status(404).json({
      message: "No item found for the item key",
    });
  }
  let varientDetails = await ItemVarient.findById(varient);

  const itemPrice = varientDetails.price;
  const discountedPrice = varientDetails.discount;
  const totalItemPrice = itemPrice * myItem.itemQuantity;
  const totalDiscountedPrice = discountedPrice * myItem.itemQuantity;

  result.totalPrice =
    result.totalPrice - (totalItemPrice - totalDiscountedPrice);
  if (result.totalPrice <= 0) {
    result.totalPrice = 0;
  }
  result.discountedPrice = result.discountedPrice - totalDiscountedPrice;
  result.quantity = result.quantity - myItem.itemQuantity;
  result.items.splice(index, 1);
  if (result.items.length === 0) {
    Cart.findByIdAndRemove(result._id)
      .then((myResult) => {
        console.log(myResult);
        return res.status(200).json({
          message: "Removed from cart",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({
          error: err,
        });
      });
  } else {
    result
      .save()
      .then((myResult) => {
        return res.status(200).json({
          message: "Removed from cart",
          item: myResult,
        });
      })
      .catch((err) => {
        return res.status(404).json({
          error: err,
        });
      });
  }
});

module.exports = router;
