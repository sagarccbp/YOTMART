const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");

const Orders = require("../models/order");
const isAdmin = require("../../middleware/is-admin");
const isSuperAdmin = require("../../middleware/is-superadmin");

router.get("/:ownerId", isSuperAdmin, async (req, res, next) => {
  const toDate = req.query.toDate;
  const fromDate = req.query.fromDate;
  const ownerId = req.params.ownerId;
  if (!ownerId || !ownerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: "Invalid owner id",
    });
  }
  console.log(moment(fromDate, "YYYY-MM-DD", true).isValid(), toDate);
  if (
    !moment(fromDate, "YYYY-MM-DD", true).isValid() ||
    !moment(fromDate, "YYYY-MM-DD", true).isValid()
  ) {
    return res.status(500).json({
      message: "Invalid date format",
    });
  }
  if (fromDate || toDate) {
    if (!fromDate || !toDate) {
      return res.status(400).json({
        message: "Invalid date range",
      });
    } else {
      console.log("INside if else");
      const orderReport = await Orders.aggregate([
        {
          $match: {
            $and: [
              {
                createdDate: {
                  $gte: new Date(fromDate),
                  $lte: new Date(toDate),
                },
              },
              { owner: mongoose.Types.ObjectId(ownerId) },
            ],
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdDate" },
              day: { $dayOfMonth: "$createdDate" },
              year: { $year: "$createdDate" },
            },
            totalPrice: { $sum: "$orderAmount" },
            numberOfOrders: { $sum: 1 },
          },
        },
      ]);
      const orders = await Orders.find({
        owner: mongoose.Types.ObjectId(ownerId),
        createdDate: {
          $gte: new Date(fromDate),
          $lt: new Date(toDate),
        },
      })
        .populate("items._id")
        .populate("customer")
        .populate("address");

      data = {
        statistics: orderReport,
        orders: orders,
      };
      if (data) {
        return res.status(200).json({
          data: data,
        });
      } else {
        return res.status(500).json({
          error: "Something went wrong",
        });
      }
    }
  } else {
    const orderReport = await Orders.aggregate([
      {
        $match: {
          owner: mongoose.Types.ObjectId(ownerId),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdDate" },
            day: { $dayOfMonth: "$createdDate" },
            year: { $year: "$createdDate" },
          },
          totalPrice: { $sum: "$orderAmount" },
          numberOfOrders: { $sum: 1 },
        },
      },
    ]);
    const orders = await Orders.find({
      owner: mongoose.Types.ObjectId(ownerId),
    })
      .populate("items._id")
      .populate("customer")
      .populate("address");

    data = {
      statistics: orderReport,
      orders: orders,
    };
    if (data) {
      return res.status(200).json({
        data: data,
      });
    } else {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  }
});

module.exports = router;
