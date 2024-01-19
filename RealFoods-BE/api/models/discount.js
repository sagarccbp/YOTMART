
const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: String,
    discountPrice : Number,
    createdAt: Date
});

module.exports = mongoose.model('Discount',discountSchema);