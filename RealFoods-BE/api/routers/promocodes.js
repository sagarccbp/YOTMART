

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../../middleware/check-auth");
const PromoCode = require('../models/promoCode')

router.get('/',checkAuth,(req,res,next) => {
    PromoCode.find().then(result => {
        return res.status(200).json({
            coupnes : result
        });
    }).catch(err => {
        return res.status(500).json({
            error : err
        });
    })
});

router.post('/',checkAuth,(req,res,next) => {
    const promoCode = new PromoCode(req.body);
    promoCode._id = mongoose.Types.ObjectId();
    promoCode.save().then(result => {
        return res.status(200).json({
            message : 'Promo code created successffully',
            coupnes : result
        })
    }).catch(err => {
        return res.status(500).json({
            error : err
        });
    })
});

module.exports = router;


