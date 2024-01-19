const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const path = require("path");

const FileUpload = require("../models/fileupload");

const multer = require("multer");

const fileupload = require("../models/fileupload");

const Thumnail = require("../models/Thumnail");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
router.post(
  "/upload_multiple_files",
  upload.array("productImages"),
  async (req, res, next) => {
    if (req.files) {
      const fileLength = req.files.length;
      let urls = [];
      for (let i = 0; i < fileLength; i++) {
        let file = req.files[i];
        const url = req.protocol + "://" + req.get("host") + "/" + file.path;
        urls.push(url);
        console.log("Added here url.. now ", url);
      }
      return res.status(200).json({
        message: "Success",
        urls: urls,
      });
    }
  }
);

router.post("/", upload.single("productImage"), (req, res, next) => {
  const fileUpoad = new FileUpload({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    productImage: req.protocol + "://" + req.get("host") + "/" + req.file.path,
  });

  fileUpoad
    .save()
    .then((result) =>
      res.status(200).json({
        message: "File saved successfully",
        data: result,
      })
    )
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

module.exports = router;
