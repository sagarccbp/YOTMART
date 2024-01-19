const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PromoCode = require("../models/promoCode");
const Orders = require("../models/order");
const Items = require("../models/item");
const user = require("../models/user");
const notifier = require("../../middleware/deliveryApplicationNotifier");
const { generateRandomID } = require("../routers/idGenerator");
const Role = require("../models/role");
const Distance = require("geo-distance");
const ItemsSchema = require("../models/item");
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const isSuperAdmin = require("../../middleware/is-superadmin");

// We have to rewrite this logic for multi admin functionalities...

router.post("/", checkAuth, async (req, res, next) => {
  const order = new Orders(req.body);
  (order._id = mongoose.Types.ObjectId()),
    (order.orderStatus = ["ORDER_INITIATED"]);
  const items = order.items;

  // const randomId = generateRandomID(10);
  // console.log(randomId, "IDDDDDDDD");
  // await Orders.update({ randomId: randomId });
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      const myItem = await ItemsSchema.findOne({ _id: item._id });
      console.log(myItem, "KUMSR");
      if (myItem) {
        const ownerId = myItem.ownerId;
        order.owner = ownerId;
        break;
      }
    }
  }
  order
    .save()
    .then(async (result) => {
      if (result) {
        const owner = await user.findById(result.owner);

        if (owner != null && owner.get("deviceToken") != null) {
          const deviceToken = owner.deviceToken;
          if (deviceToken) {
            notifier(
              deviceToken,
              "Order Placed",
              "Hi, You have got the order."
            );
          }
        }
        return res.status(200).json({
          message: "Order successfully inserted",
          data: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.get("/owner/:ownerID", isSuperAdmin, (req, res, next) => {
  const ownerID = req.params.ownerID;
  console.log("Owner id : ", ownerID);
  Orders.find({ owner: mongoose.Types.ObjectId(ownerID) })
    .populate("items._id")
    .populate("items.varient")
    .populate("customer")
    .populate("address")
    .then((result) => {
      console.log(result);
      if (result) {
        return res.status(200).json({
          data: result,
        });
      } else {
        return res.status(404).json({
          message: "No result found for the provided owner id",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/assignOrder", checkAuth, async (req, res, next) => {
  const hotelLatLong = {
    lat: req.body.lat,
    lon: req.body.lon,
  };
  const customerId = req.body.customerId;
  const hotelId = req.body.hotelId;
  const hotel = await user.findById(hotelId);
  const orderId = req.body.orderId;

  const role = await Role.findOne({ name: "DELIVERY_BOY" });
  const roleId = role["_id"];
  const deliveryBoys = await user
    .find({ role: roleId, isActive: true })
    .populate("role");

  const nearByBoys = deliveryBoys.filter((db) => {
    const location = db.location.currentLocation;
    const distance = Distance.between(hotelLatLong, location).human_readable();
    console.log("Distance : ", distance);
    console.log(distance);
    if (distance["unit"] === "m") {
      if (distance["distance"] <= 5000) {
        return db;
      }
    } else if (distance["unit"] === "Km" || distance["unit"] === "km") {
      if (distance["distance"] <= 5) {
        return db;
      }
    }
  });
  if (!nearByBoys) {
    return res.status(404).json({
      message: "No one is available at this movment. Please cancel the order",
    });
  } else {
    console.log("Near by dbs are : " + nearByBoys);
    for (let i = 0; i < nearByBoys.length; i++) {
      const boy = nearByBoys[i];
      const deviceToken = boy.deviceToken;
      if (deviceToken) {
        console.log("Device token : " + deviceToken);
        const body = {
          customerId: customerId,
          orderId: orderId,
          message: "New order request from " + hotel.fullName,
        };
        // We may have to send notifications to customer notification service.
        notifier(
          deviceToken,
          "New order request",
          "Hi! You have got an order request",
          body
        );
      }
    }
    return res.status(200).json({
      message: "Request has been sent to delivery boys",
    });
  }
});

router.post("/deliveryBoy/acceptOrder", checkAuth, async (req, res, next) => {
  const orderId = req.body.orderId;
  const deliveryBoyId = req.body.deliveryBoyId;

  // @todo we have to check whether order is accepted by some one
  const order = await Orders.findByIdAndUpdate(orderId, {
    $set: { deliveryBoyId: deliveryBoyId },
    $push: { orderStatus: "ORDER_ACCEPTED" },
  });

  if (order) {
    const owner = await user.findOne({ _id: order.ownerId });
    const ownerDeviceToken = owner.deviceToken;
    const customer = await user.findOne({ _id: order.customerId });
    const customerToken = customer.deviceToken;
    notifier(
      ownerDeviceToken,
      "Recieved Is accepted by delivery agent",
      "",
      {}
    );
    notifier(customerToken, "Recieved Is accepted by delivery agent", "", {});
    return res.status(200).json({
      message: "Order accepted successfully",
      order: order,
      owner: owner,
    });
  }
});

router.get("/deliveryBoy/:id", checkAuth, (req, res, next) => {
  const deliveryBoyId = req.params.id;
  console.log(deliveryBoyId);
  Orders.find({ deliveryBoyId: mongoose.Types.ObjectId(deliveryBoyId) })
    .populate("customerId")
    .populate("address")
    .populate({
      path: "items._id",
    })
    .then((result) => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

router.get("/:customerID", checkAuth, (req, res, next) => {
  const customerId = req.params.customerID;
  console.log(customerId);
  Orders.find({ customer: mongoose.Types.ObjectId(customerId) })
    .populate("address")
    .populate("items._id")
    .populate("items.varient")
    .then((result) => {
      if (result) {
        return res.status(200).json({
          data: result,
        });
      } else {
        return res.status(404).json({
          message: "No result found for the customer id",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
      });
    });
});

router.post(
  "/deliveryBoy/changeOrderStatus",
  checkAuth,
  async (req, res, next) => {
    const orderId = req.body.orderId;
    const status = req.body.status;
    console.log(status);
    const order = await Orders.findByIdAndUpdate(orderId, {
      $push: { orderStatus: status },
    });
    if (order) {
      return res.status(200).json({
        message: "Order status changed succesffully",
      });
    }
  }
);

router.get(
  "/deliveryBoy/track/:deliveryBoyId",
  checkAuth,
  async (req, res, next) => {
    const deliveryBoy = req.params.deliveryBoyId;
    const userLocation = await user.findById(deliveryBoy).select("location");
    if (user) {
      return res.status(200).json({
        data: userLocation,
      });
    } else {
      return res.status(404).json({
        message: "No user found",
      });
    }
  }
);

router.post(
  "/deliveryBoy/updateLocation/:deliveryBoyId",
  async (req, res, next) => {
    const deliveryBoy = req.params.deliveryBoyId;
    const location = {
      lat: req.body.lat,
      lon: req.body.lon,
    };
    await user.findByIdAndUpdate(deliveryBoy, {
      $set: { "location.currentLocation": location },
    });
    return res.status(200).json({
      message: "Location updated succesffully",
    });
  }
);

router.put(
  "/:internalOrderId/updateOrderId",
  checkAuth,
  async (req, res, next) => {
    const orderId = req.params.internalOrderId;
    const shipRocketId = req.body.shipRocketId;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;

    let orders = await Orders.find({
      _id: mongoose.Types.ObjectId(orderId),
      "items._id": mongoose.Types.ObjectId(itemId),
      "items.quantity": quantity,
    });
    if (orders && orders.length > 0) {
      orders = orders.map(async (order) => {
        let items = order.items;

        const updatedItems = items.map((item) => {
          item.trackingId = shipRocketId;
          return (item["trackingId"] = shipRocketId);
        });

        order["items"] = items;
        console.log("Order is :", order);
        //await Orders.updateOne({ _id: mongoose.Types.ObjectId(orderId) }, { set: { order } },{new: true})
        order.save();
      });
      //orders.save();
    }
    //const order = await Orders.updateMany({ _id: mongoose.Types.ObjectId(orderId), 'items._id': mongoose.Types.ObjectId(itemId) }, { $set: { trackingId: shipRocketId }},{upsert: true})
    return res.status(200).json(orders);
  }
);

module.exports = router;
