
const mongoose = require('mongoose');

const itemVarient = mongoose.Schema({
    header: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    isStockAvailable: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('itemVarient',itemVarient);