

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Review = require("../models/review");
const ItemsSchema = require("../models/item");
const checkAuth = require("../../middleware/check-auth");

router.get('/:itemId',checkAuth,(req,res,next) => {
    const itemId = req.params.itemId;

    Review.find({item:itemId}).populate('user',['fullName']).then(reviews => {
        return res.status(200).json({
            review : reviews
        });
    }).catch(err => {
        return res.status(500).json({
            error : err
        });
    })
});

router.post('/:itemdId',checkAuth,(req,res,next) => {
    const itemId = req.params.itemdId;
    const review = new Review(req.body);
    review._id = mongoose.Types.ObjectId();
    
    review.save().then(async result => {
        const reviewId = result._id;
        await ItemsSchema.updateOne({"_id":itemId},{$push: {reviews: reviewId} })
        //await ItemsSchema.findByIdAndUpdate(itemId,{reviews : [reviewId]},{upsert: true});
        return res.status(200).json({
            message : 'Review added succesffully',
            reviews : result
        });
    }).catch(err => {
        return res.status(500).json({
            error : err
        });
    })
});

module.exports = router;