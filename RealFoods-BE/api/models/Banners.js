const mongoose = require('mongoose');

const bannersModel = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    items: [
        {
            item: {
                type:String
            },
            layoutType: {
                type : String,
                enum: ['CATEGORIES', 'SUB_CATEGORIES', 'ITEMS']
            }
        }
    ]
});

module.exports = mongoose.model('banners',bannersModel);