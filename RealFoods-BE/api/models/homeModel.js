
const mongoose = require('mongoose');

const homeModel = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    displayName: String,
    items: [
        {
            type: {
                type:mongoose.Types.ObjectId
            },
            layoutType: {
                type : String,
                enum : [ 'CATEGORIES' ,'SUB_CATEGORIES', 'ITEMS']
            }
        }
    ]
});

module.exports = mongoose.model('HomeModel',homeModel);