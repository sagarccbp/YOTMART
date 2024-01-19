
const mongoose = require('mongoose');

const trendingItems = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['CATEGORIES', 'SUB_CATEGORIES', 'ITEMS'],
        required: true,
    },
    image: {
        type: String
    },
    item: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('TrendingItems',trendingItems);