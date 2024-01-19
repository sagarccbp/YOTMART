

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    heading : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        max : 5,
        min:1,
        required :true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId, ref : 'User',
        required : true
    },
    reviewCreatedTime: { type : Date, default: Date.now }
});

module.exports = mongoose.model('review',reviewSchema);