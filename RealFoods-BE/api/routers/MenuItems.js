const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const checkAuth = require("../../middleware/check-auth");
const validateKey = require("../../middleware/validate-key");
const menuItemsSchema = require("../models/MenuItemModel");

router.get("/",validateKey,(req,res,next) => {
    menuItemsSchema.find({})
        .populate("categories")
        .populate("subCategories")
        .then(result => {
            return res.status(200).json({
                data : result
            })
        })
        .catch(err=>{
            return res.status(500).json({
                error : err
            })
        })
});

module.exports = router;
