const mongoose = require('mongoose');

const homeModel = mongoose.Schema({
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

module.exports = mongoose.model('homeItems',homeModel);