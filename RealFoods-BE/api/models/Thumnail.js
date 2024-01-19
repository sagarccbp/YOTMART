

const mongoose = require('mongoose');

const thumnails = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    small: {
        type: String,
    },
    medium: {
        type: String,
    },
    large: {
        type: String,
    }
});

module.exports = mongoose.model('Thumnail',thumnails);