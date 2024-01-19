const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Items = require("../models/item");
const Categories = require("../models/category");
const SubCategories = require("../models/subcategory");
const bannersModel = require("../models/Banners");
const HomeItemsModel = require("../models/HomeItemsModel");
const TrendingItems = require("../models/trendingCollection");
const StaticItems = require("../models/staticElements");
const checkAuth = require("../../middleware/check-auth");
const validateKey = require("../../middleware/validate-key");
const isAdmin = require("../../middleware/is-admin");
const HomeItems = require("../models/HomeItems");

// router.get("/banners",validateKey,(req, res, next) => {
//   bannersModel
//     .find()
//     .then(async (result) => {
//       console.log(result);
//       if (!result || result.length <= 0) {
//         return res.status(200).json({
//           message: "No banners found",
//         });
//       }
//       const items = result[0].items;

//       let banners = [];
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         const layoutType = item.layoutType;
//         console.log(item.id);
//         if (layoutType === "ITEMS") {
//           const itemDetails = await Items.findById(item.item);
//           banners.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             bannerItemId: item._id,
//           });
//         } else if (layoutType === "CATEGORIES") {
//           const itemDetails = await Categories.findById(item.item);
//           banners.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             bannerItemId: item._id,
//           });
//         } else {
//           const itemDetails = await SubCategories.findById(item.item);

//           banners.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             bannerItemId: item._id,
//           });
//         }
//       }
//       console.log(banners);
//       return res.status(200).json({
//         data: banners,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.post("/banners",checkAuth, async (req, res, next) => {
//   const banners = new bannersModel(req.body);
//   const existingBanners = await bannersModel.find({});

//   if (existingBanners && existingBanners.length > 0) {
//     bannersModel
//       .updateMany(
//         { _id: existingBanners[0]._id },
//         { $push: { items: banners.items } }
//       )
//       .then((result) => {
//         return res.status(200).json({
//           message: "Banners Created successfully",
//         });
//       })
//       .catch((err) => {
//         return res.status(500).json({
//           error: err,
//         });
//       });
//   } else {
//     banners._id = mongoose.Types.ObjectId();
//     console.log("Banners are : ", mongoose.Types.ObjectId());
//     bannersModel
//       .insertMany(banners)
//       .then((result) => {
//         return res.status(200).json({
//           message: "Banners Created successfully",
//         });
//       })
//       .catch((err) => {
//         return res.status(500).json({
//           error: err,
//         });
//       });
//   }
// });

// router.delete("/banners/:bannerItemID",checkAuth, async (req, res, next) => {
//   const itemId = req.params.bannerItemID;
//   const banners = await bannersModel.find({
//     "items._id": mongoose.Types.ObjectId(itemId),
//   });

//   if (banners && banners.length > 0) {
//     const banner = banners[0];
//     const bannerId = banner._id;
//     bannersModel
//       .findOne({ "items._id": mongoose.Types.ObjectId(itemId) })
//       .then((result) => {
//         //console.log('Results are : \n',result.items);
//         const filteredItem = result.items.filter(
//           (item) => item._id.toString() != itemId
//         );
//         result.items = filteredItem;
//         result.save().then((r) => {
//           return res.status(200).json({
//             message: "Banner removed succesffully",
//           });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(200).json("Error");
//       });
//   } else {
//     return res.status(500).json({
//       message: "Invalid banner id",
//     });
//   }
// });

// router.post("/homeScreenItems",checkAuth, async (req, res, next) => {
//   const homeItemsModel = new HomeItemsModel(req.body);
//   const existingItems = await HomeItemsModel.find({});
//   if (existingItems && existingItems.length > 0) {
//     HomeItemsModel.updateMany(
//       { _id: existingItems[0]._id },
//       { $push: { items: homeItemsModel.items } }
//     )
//       .then((result) => {
//         return res.status(200).json({
//           message: "Home Screen items created succesfully",
//         });
//       })
//       .catch((err) => {
//         return res.status(500).json({
//           error: err,
//         });
//       });
//   } else {
//     homeItemsModel._id = mongoose.Types.ObjectId();
//     HomeItemsModel.insertMany(homeItemsModel)
//       .then((result) => {
//         return res.status(200).json({
//           message: "Home Screen items created succesfully",
//         });
//       })
//       .catch((err) => {
//         return res.status(500).json({
//           error: err,
//         });
//       });
//   }
// });

// router.get("/homeScreenItems",validateKey, (req, res, next) => {
//   HomeItemsModel.find()
//     .then(async (result) => {
//       if (!result || result.length <= 0) {
//         return res.status(200).json({
//           message: "No items found",
//         });
//       }
//       const items = result[0].items;

//       let homeItems = [];
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         const layoutType = item.layoutType;
//         if (layoutType === "ITEMS") {
//           const itemDetails = await Items.findById(item.item);
//           homeItems.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             homeItemId: item._id,
//           });
//         } else if (layoutType === "CATEGORIES") {
//           const itemDetails = await Categories.findById(item.item);
//           homeItems.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             homeItemId: item._id,
//           });
//         } else {
//           const itemDetails = await SubCategories.findById(item.item);

//           homeItems.push({
//             layoutType: layoutType,
//             item: itemDetails,
//             homeItemId: item._id,
//           });
//         }
//       }
//       return res.status(200).json({
//         data: homeItems,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.delete("/homeScreenItems/:id",checkAuth, async (req, res, next) => {
//   const itemId = req.params.id;
//   const homeItems = await HomeItemsModel.find({
//     "items._id": mongoose.Types.ObjectId(itemId),
//   });
//   if (homeItems && homeItems.length > 0) {
//     const homeItem = homeItems[0];
//     const homeItemId = homeItem._id;
//     console.log();
//     HomeItemsModel.findOne({ "items._id": mongoose.Types.ObjectId(itemId) })
//       .then((result) => {
//         console.log(result);
//         const filteredItem = result.items.filter(
//           (item) => item._id.toString() != itemId
//         );
//         result.items = filteredItem;
//         result.save().then((r) => {
//           return res.status(200).json({
//             message: "Home elements removed",
//           });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(200).json("Error");
//       });
//   } else {
//     return res.status(500).json({
//       message: "Invalid Home Element id",
//     });
//   }
// });

// router.post("/trendingCollections",checkAuth, (req, res, next) => {
//   const items = req.body;
//   console.log(items, "BE");
//   if (items && items.length > 0) {
//     items.forEach(async (item) => {
//       if (item) {
//         item['_id'] =  mongoose.Types.ObjectId();
//         const myItem = new TrendingItems(item)
//         const result = await myItem.save();
//       }
//     });
//     return res.status(200).json({
//       message: "Added items successfully"
//     });
//   } else {
//     return res.status(400).json({
//       message : "Bad request"
//     })
//   }
// });

// router.delete("/trendingCollections/:id",checkAuth, (req, res, next) => {
//   TrendingItems.remove({ _id: req.params.id }).then((result) => {
//     return res.status(200).json({
//       message: "Deleted successfully",
//     });
//   });
// });

// router.get("/trendingCollections",validateKey, async (req, res, next) => {
//   const trendingItems = await TrendingItems.find({});
//   return res.status(200).json(trendingItems);
// });

// router.delete("/trendingCollections/:id",checkAuth, async (req, res, next) => {
//   const result = await TrendingItems.findByIdAndDelete({ _id: req.params.id });
//   const results = await TrendingItems.find();
//   return res.status(200).json(results);
// });

router.post("/staticElements", isAdmin, (req, res, next) => {
  const staticEle = req.body;
  staticEle["_id"] = mongoose.Types.ObjectId();
  const StaticElem = new StaticItems(staticEle);
  StaticElem.save().then((result) => {
    return res.status(200).json({
      message: "Static element created",
    });
  });
});

router.get("/staticElements", validateKey, (req, res, next) => {
  StaticItems.find().then((result) => {
    return res.status(200).json({
      items: result,
    });
  });
});

router.delete("/staticElements/:id", isAdmin, async (req, res, next) => {
  const result = await StaticItems.findByIdAndDelete({ _id: req.params.id });
  const results = await StaticItems.find();
  return res.status(200).json(results);
});

router.get("/", validateKey, async (req, res, next) => {
  const items = await HomeItems.find().populate("homeItems.listObject");
  return res.status(200).json(items);
});

router.post("/", isAdmin, async (req, res, next) => {
  const homeItem = HomeItems(req.body);
  await homeItem.save();
  console.log(req.body);
  return res.status(200).json({
    message: "Inserted successfully",
  });
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  const homeId = req.params.id;
  const home = await HomeItems.findByIdAndDelete(homeId);
  if (home) {
    return res.status(200).json({
      message: "Item deleted successfully",
    });
  } else {
    return res.status(404).json({
      message: "No home element found",
    });
  }
});

module.exports = router;
