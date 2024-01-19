
const mongoose = require('mongoose');

const mainMenus = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    categories: {
        type:mongoose.Schema.Types.ObjectId,ref:"Categories",
    },
    subCategories : {
        type:[mongoose.Schema.Types.ObjectId],ref:"SubCategories",
    }
});

module.exports = mongoose.model('MenuItems',mainMenus);